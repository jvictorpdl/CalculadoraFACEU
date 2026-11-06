import writeExcelFile from 'write-excel-file/browser';
import { textoGerado } from '../relatorio';

const VERDE = '#17737A';
const titulo = (value, opcoes) => ({ value, fontWeight: 'bold', ...opcoes });
const cabecalho = (value) => ({ value, fontWeight: 'bold', textColor: '#FFFFFF', backgroundColor: VERDE });
const CABECALHO_PARAMETROS = ['Parâmetro', 'Descrição', 'Valor', 'Unidade'].map(cabecalho);

// os valores vão como número, para a planilha aceitar fórmulas e gráficos
const linhaParametro = ({ rotulo, descricao, valor, unidade }) => [
    titulo(rotulo),
    descricao,
    { value: valor, type: Number },
    unidade,
];

export async function gerarExcel(relatorio, gerado) {
    const { titulo: nome, descricao, conclusao, fornecidos, calculados, porTrecho, perfil } = relatorio;

    const dados = [
        [titulo(`Relatório ${nome}`, { fontSize: 14 })],
        [descricao],
        [`Gerado em ${textoGerado(gerado)}`],
        [],
        [titulo('Conclusão')],
        [conclusao.titulo],
        ...conclusao.linhas.map((linha) => [linha]),
        [],
        [titulo('Valores fornecidos')],
        CABECALHO_PARAMETROS,
        ...fornecidos.flatMap((grupo) => [
            [titulo(grupo.titulo, { backgroundColor: '#ECF5F6', columnSpan: 4 }), null, null, null],
            ...grupo.linhas.map(linhaParametro),
        ]),
        ...(calculados.length ? [
            [],
            [titulo('Valores calculados')],
            CABECALHO_PARAMETROS,
            ...calculados.map(linhaParametro),
        ] : []),
    ];

    const planilhas = [{
        data: dados,
        sheet: 'Relatório',
        columns: [{ width: 14 }, { width: 60 }, { width: 16 }, { width: 14 }],
    }];

    // uma coluna por trecho, como as subplanilhas do Exemplo 8.5
    if (porTrecho) {
        planilhas.push({
            data: [
                ['Parâmetro', 'Descrição', 'Unidade', ...porTrecho.colunas].map(cabecalho),
                ...porTrecho.linhas.map(({ rotulo, descricao: texto, unidade, valores }) => [
                    titulo(rotulo),
                    texto,
                    unidade,
                    ...valores.map(({ valor }) => ({ value: valor, type: Number })),
                ]),
            ],
            sheet: 'Trechos',
            columns: [{ width: 14 }, { width: 50 }, { width: 10 }, ...porTrecho.colunas.map(() => ({ width: 12 }))],
            stickyRowsCount: 1,
        });
    }

    if (perfil) {
        planilhas.push({
            data: [
                perfil.colunas.map((coluna) => cabecalho(coluna.titulo)),
                ...perfil.linhas.map((linha) => linha.map((value) => ({ value, type: Number }))),
            ],
            sheet: 'Perfil',
            columns: perfil.colunas.map(() => ({ width: 18 })),
            stickyRowsCount: 1,
        });
    }

    return writeExcelFile(planilhas).toBlob();
}
