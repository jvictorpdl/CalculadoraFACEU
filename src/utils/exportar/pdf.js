import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import fonteRegular from '../../assets/fontes/Inter-Regular.ttf';
import fonteSemiBold from '../../assets/fontes/Inter-SemiBold.ttf';
import { numero, textoGerado } from '../relatorio';
import { ALTURA_GRAFICO, LARGURA_GRAFICO } from './grafico';

const MARGEM = 18;
const VERDE = [23, 115, 122];
const TEXTO = [55, 65, 81];
const CINZA = [107, 114, 128];
const CORES_CONCLUSAO = {
    true: { fundo: [236, 253, 245], borda: [110, 231, 183], titulo: [4, 120, 87] },
    false: { fundo: [254, 242, 242], borda: [252, 165, 165], titulo: [185, 28, 28] },
    null: { fundo: [240, 249, 250], borda: [43, 163, 171], titulo: VERDE },
};

// as fontes padrão do PDF não têm "θ"; só são baixadas quando alguém gera um PDF
async function adicionarFonte(doc, url, arquivo, estilo) {
    const bytes = new Uint8Array(await (await fetch(url)).arrayBuffer());
    doc.addFileToVFS(arquivo, btoa(String.fromCharCode(...bytes)));
    doc.addFont(arquivo, 'Inter', estilo);
}

export async function gerarPdf(relatorio, imagem, gerado) {
    const { titulo, descricao, conclusao, fornecidos, calculados, perfil } = relatorio;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    await adicionarFonte(doc, fonteRegular, 'Inter-Regular.ttf', 'normal');
    await adicionarFonte(doc, fonteSemiBold, 'Inter-SemiBold.ttf', 'bold');
    doc.setProperties({ title: `Relatório ${titulo}`, creator: 'Calimpe-H20' });

    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();
    const largura = larguraPagina - 2 * MARGEM;
    let y = MARGEM;

    const escrever = (texto, tamanho, estilo, cor) => {
        doc.setFont('Inter', estilo).setFontSize(tamanho).setTextColor(...cor);
        const linhas = doc.splitTextToSize(texto, largura);
        doc.text(linhas, MARGEM, y, { baseline: 'top' });
        y += doc.getTextDimensions(linhas).h;
    };

    const garantirEspaco = (altura) => {
        if (y + altura > alturaPagina - MARGEM) {
            doc.addPage();
            y = MARGEM;
        }
    };

    const secao = (texto, alturaConteudo = 24) => {
        garantirEspaco(alturaConteudo + 14);
        y += 6;
        escrever(texto, 12, 'bold', TEXTO);
        y += 2;
    };

    const tabela = (cabecalho, linhas, estiloColunas) => {
        autoTable(doc, {
            startY: y,
            head: [cabecalho],
            body: linhas,
            margin: { left: MARGEM, right: MARGEM, top: MARGEM, bottom: MARGEM },
            styles: { font: 'Inter', fontSize: 9, textColor: TEXTO, cellPadding: 1.8, lineColor: [229, 231, 235], lineWidth: 0.1 },
            headStyles: { fillColor: VERDE, textColor: 255, fontStyle: 'bold' },
            columnStyles: estiloColunas,
            alternateRowStyles: { fillColor: [249, 250, 251] },
            // o título da coluna acompanha o alinhamento dos valores
            didParseCell: ({ section, column, cell }) => {
                if (section === 'head') cell.styles.halign = estiloColunas[column.index]?.halign ?? 'left';
            },
        });
        y = doc.lastAutoTable.finalY + 3;
    };

    escrever('Calimpe-H20', 10, 'bold', VERDE);
    y += 1;
    escrever(`Relatório ${titulo}`, 18, 'bold', TEXTO);
    y += 1;
    escrever(descricao, 10, 'normal', CINZA);
    y += 1;
    escrever(`Gerado em ${textoGerado(gerado)}`, 9, 'normal', CINZA);
    y += 6;

    const cores = CORES_CONCLUSAO[conclusao.atende];
    doc.setFont('Inter', 'bold').setFontSize(11);
    const linhasTitulo = doc.splitTextToSize(conclusao.titulo, largura - 8);
    const alturaTitulo = doc.getTextDimensions(linhasTitulo).h;
    doc.setFont('Inter', 'normal').setFontSize(9.5);
    const linhasCorpo = conclusao.linhas.flatMap((linha) => doc.splitTextToSize(linha, largura - 8));
    const alturaCorpo = linhasCorpo.length ? doc.getTextDimensions(linhasCorpo).h + 1.5 : 0;

    doc.setFillColor(...cores.fundo).setDrawColor(...cores.borda).setLineWidth(0.3);
    doc.roundedRect(MARGEM, y, largura, alturaTitulo + alturaCorpo + 8, 1.5, 1.5, 'FD');
    doc.setFont('Inter', 'bold').setFontSize(11).setTextColor(...cores.titulo);
    doc.text(linhasTitulo, MARGEM + 4, y + 4, { baseline: 'top' });
    if (linhasCorpo.length) {
        doc.setFont('Inter', 'normal').setFontSize(9.5).setTextColor(...TEXTO);
        doc.text(linhasCorpo, MARGEM + 4, y + 4 + alturaTitulo + 1.5, { baseline: 'top' });
    }
    y += alturaTitulo + alturaCorpo + 11;

    const colunasParametros = {
        0: { cellWidth: 26, fontStyle: 'bold' },
        2: { cellWidth: 28, halign: 'right' },
        3: { cellWidth: 26 },
    };

    secao('Valores fornecidos');
    tabela(
        ['Parâmetro', 'Descrição', 'Valor', 'Unidade'],
        fornecidos.flatMap((grupo) => [
            [{ content: grupo.titulo, colSpan: 4, styles: { fontStyle: 'bold', fillColor: [236, 245, 246] } }],
            ...grupo.linhas.map(({ rotulo, descricao: texto, texto: valor, unidade }) => [rotulo, texto, valor, unidade]),
        ]),
        colunasParametros,
    );

    if (calculados.length) {
        // poucas linhas: a tabela de resultados não vale a pena dividir entre páginas
        secao('Valores calculados', 8 + calculados.length * 7.2);
        tabela(
            ['Parâmetro', 'Descrição', 'Valor', 'Unidade'],
            calculados.map(({ rotulo, descricao: texto, texto: valor, unidade }) => [rotulo, texto, valor, unidade]),
            colunasParametros,
        );
    }

    if (imagem) {
        const alturaImagem = largura * ALTURA_GRAFICO / LARGURA_GRAFICO;
        garantirEspaco(alturaImagem + 14);
        y += 6;
        escrever('Gráfico', 12, 'bold', TEXTO);
        y += 2;
        doc.addImage(imagem, 'PNG', MARGEM, y, largura, alturaImagem, undefined, 'FAST');
        y += alturaImagem + 3;
    }

    if (perfil) {
        secao('Perfil ao longo do percurso');
        tabela(
            perfil.colunas.map((coluna) => coluna.titulo),
            perfil.linhas.map((linha) => linha.map((valor, i) => numero(valor, perfil.colunas[i].casas))),
            { 0: { halign: 'right' }, 1: { halign: 'right' } },
        );
    }

    const paginas = doc.getNumberOfPages();
    for (let pagina = 1; pagina <= paginas; pagina++) {
        doc.setPage(pagina);
        doc.setFont('Inter', 'normal').setFontSize(8).setTextColor(...CINZA);
        doc.text(`Calimpe-H20 · ${titulo}`, MARGEM, alturaPagina - 9);
        doc.text(`Página ${pagina} de ${paginas}`, larguraPagina - MARGEM, alturaPagina - 9, { align: 'right' });
    }

    return doc.output('blob');
}
