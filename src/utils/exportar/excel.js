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
    const { titulo: nome, descricao, conclusao, fornecidos, calculados, perfil } = relatorio;

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

    if (perfil) {
        planilhas.push({
            data: [
                perfil.colunas.map((coluna) => cabecalho(coluna.titulo)),
                ...perfil.linhas.map((linha) => linha.map((value) => ({ value, type: Number }))),
            ],
            sheet: 'Perfil',
            columns: [{ width: 18 }, { width: 22 }],
            stickyRowsCount: 1,
        });
    }

    return writeExcelFile(planilhas).toBlob();
}
