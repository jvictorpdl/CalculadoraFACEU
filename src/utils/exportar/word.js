import {
    AlignmentType, BorderStyle, Document, Footer, HeadingLevel, ImageRun, Packer, PageNumber, Paragraph,
    ShadingType, Table, TableCell, TableRow, TextRun, WidthType,
} from 'docx';
import { numero, textoGerado } from '../relatorio';
import { ALTURA_GRAFICO, LARGURA_GRAFICO } from './grafico';

const VERDE = '17737A';
const TEXTO = '374151';
const CINZA = '6B7280';
const CORES_CONCLUSAO = { true: '047857', false: 'B91C1C', null: VERDE };
const LARGURA_TABELA = 9070; // A4 com margens padrão, em DXA (1/20 de ponto)
const LARGURA_IMAGEM = 600;

const borda = { style: BorderStyle.SINGLE, size: 4, color: 'E5E7EB' };
const bordas = { top: borda, bottom: borda, left: borda, right: borda };

function celula(texto, largura, { negrito = false, cor = TEXTO, fundo, direita = false, colunas = 1 } = {}) {
    return new TableCell({
        width: { size: largura, type: WidthType.DXA },
        columnSpan: colunas,
        borders: bordas,
        margins: { top: 50, bottom: 50, left: 80, right: 80 },
        shading: fundo ? { type: ShadingType.CLEAR, fill: fundo, color: 'auto' } : undefined,
        children: [new Paragraph({
            alignment: direita ? AlignmentType.RIGHT : AlignmentType.LEFT,
            children: [new TextRun({ text: texto, bold: negrito, color: cor, size: 19 })],
        })],
    });
}

function tabela(larguras, cabecalho, linhas) {
    return new Table({
        width: { size: LARGURA_TABELA, type: WidthType.DXA },
        columnWidths: larguras,
        rows: [
            new TableRow({
                tableHeader: true,
                children: cabecalho.map((texto, i) => celula(texto, larguras[i], { negrito: true, cor: 'FFFFFF', fundo: VERDE })),
            }),
            ...linhas,
        ],
    });
}

const LARGURAS_PARAMETROS = [1400, 4470, 1600, 1600];

const linhaParametro = ({ rotulo, descricao, texto, unidade }) => new TableRow({
    children: [
        celula(rotulo, LARGURAS_PARAMETROS[0], { negrito: true }),
        celula(descricao, LARGURAS_PARAMETROS[1]),
        celula(texto, LARGURAS_PARAMETROS[2], { direita: true }),
        celula(unidade, LARGURAS_PARAMETROS[3]),
    ],
});

const titulo2 = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    children: [new TextRun({ text, bold: true, color: TEXTO, size: 24 })],
});

const TRECHOS_POR_TABELA = 5;

// um parâmetro por linha e até cinco trechos por tabela, como no PDF
function tabelasPorTrecho(porTrecho) {
    const tabelas = [];
    for (let inicio = 0; inicio < porTrecho.colunas.length; inicio += TRECHOS_POR_TABELA) {
        const colunas = porTrecho.colunas.slice(inicio, inicio + TRECHOS_POR_TABELA);
        const larguraTrecho = Math.floor((LARGURA_TABELA - 4300) / colunas.length);
        const larguras = [3400, 900, ...colunas.map(() => larguraTrecho)];
        if (inicio > 0) tabelas.push(new Paragraph({ spacing: { before: 200 }, children: [] }));
        tabelas.push(tabela(larguras, ['Parâmetro', 'Unidade', ...colunas], porTrecho.linhas.map(({ rotulo, descricao, unidade, valores }) => new TableRow({
            children: [
                celula(`${descricao} (${rotulo})`, larguras[0]),
                celula(unidade, larguras[1]),
                ...valores.slice(inicio, inicio + TRECHOS_POR_TABELA).map(({ texto }, i) => celula(texto, larguras[i + 2], { direita: true })),
            ],
        }))));
    }
    return tabelas;
}

export async function gerarWord(relatorio, imagens, gerado) {
    const { titulo, descricao, conclusao, fornecidos, calculados, porTrecho, perfil } = relatorio;
    const cabecalhoParametros = ['Parâmetro', 'Descrição', 'Valor', 'Unidade'];
    const bytes = (imagem) => Uint8Array.from(atob(imagem.split(',')[1]), (letra) => letra.charCodeAt(0));
    const larguraPerfil = perfil ? Math.floor(LARGURA_TABELA / perfil.colunas.length) : 0;

    const documento = new Document({
        creator: 'Calimpe-H20',
        title: `Relatório ${titulo}`,
        styles: { default: { document: { run: { font: 'Calibri', size: 22, color: TEXTO } } } },
        sections: [{
            footers: {
                default: new Footer({
                    children: [new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [new TextRun({
                            color: CINZA,
                            size: 16,
                            children: [`Calimpe-H20 · ${titulo} · Página `, PageNumber.CURRENT, ' de ', PageNumber.TOTAL_PAGES],
                        })],
                    })],
                }),
            },
            children: [
                new Paragraph({ children: [new TextRun({ text: 'Calimpe-H20', bold: true, color: VERDE, size: 20 })] }),
                new Paragraph({
                    heading: HeadingLevel.HEADING_1,
                    children: [new TextRun({ text: `Relatório ${titulo}`, bold: true, color: TEXTO, size: 36 })],
                }),
                new Paragraph({ children: [new TextRun({ text: descricao, color: CINZA, size: 20 })] }),
                new Paragraph({ children: [new TextRun({ text: `Gerado em ${textoGerado(gerado)}`, color: CINZA, size: 18 })] }),

                titulo2('Conclusão'),
                new Paragraph({ children: [new TextRun({ text: conclusao.titulo, bold: true, color: CORES_CONCLUSAO[conclusao.atende] })] }),
                ...conclusao.linhas.map((linha) => new Paragraph({ children: [new TextRun(linha)] })),

                titulo2('Valores fornecidos'),
                tabela(LARGURAS_PARAMETROS, cabecalhoParametros, fornecidos.flatMap((grupo) => [
                    new TableRow({ children: [celula(grupo.titulo, LARGURA_TABELA, { negrito: true, fundo: 'ECF5F6', colunas: 4 })] }),
                    ...grupo.linhas.map(linhaParametro),
                ])),

                ...(calculados.length ? [
                    titulo2('Valores calculados'),
                    tabela(LARGURAS_PARAMETROS, cabecalhoParametros, calculados.map(linhaParametro)),
                ] : []),

                ...(porTrecho ? [titulo2('Resultados por trecho'), ...tabelasPorTrecho(porTrecho)] : []),

                ...(imagens.length ? [
                    titulo2(imagens.length > 1 ? 'Gráficos' : 'Gráfico'),
                    ...imagens.map((imagem, i) => new Paragraph({
                        children: [new ImageRun({
                            type: 'png',
                            data: bytes(imagem),
                            transformation: { width: LARGURA_IMAGEM, height: LARGURA_IMAGEM * ALTURA_GRAFICO / LARGURA_GRAFICO },
                            altText: { name: `Gráfico ${i + 1}`, title: 'Gráfico', description: `Perfil do ${titulo} ao longo do percurso` },
                        })],
                    })),
                ] : []),

                ...(perfil ? [
                    titulo2('Perfil ao longo do percurso'),
                    tabela(
                        perfil.colunas.map(() => larguraPerfil),
                        perfil.colunas.map((coluna) => coluna.titulo),
                        perfil.linhas.map((linha) => new TableRow({
                            children: linha.map((valor, i) => celula(numero(valor, perfil.colunas[i].casas), larguraPerfil, { direita: true })),
                        })),
                    ),
                ] : []),
            ],
        }],
    });

    return Packer.toBlob(documento);
}
