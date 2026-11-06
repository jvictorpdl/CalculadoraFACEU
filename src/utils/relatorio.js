import { trechosDe } from './autoDepuraCalculation';

// O Resumo e os relatórios leem os parâmetros daqui, e a tela de resultado e os
// relatórios usam as mesmas conclusões; assim o arquivo baixado nunca diverge da tela

const COLIFORMES = 'org/100 mL';

export const camposAutodepura = [
    {
        titulo: 'Dados do rio',
        campos: [
            { chave: 'qr', rotulo: 'Qr', dica: 'Vazão do rio', unidade: 'm³/s' },
            { chave: 'odr', rotulo: 'ODr', dica: 'Oxigênio dissolvido no rio', unidade: 'mg/L' },
            { chave: 'dbor', rotulo: 'DBOr', dica: 'Demanda bioquímica de oxigênio do rio', unidade: 'mg/L' },
            { chave: 'odmin', rotulo: 'ODmín', dica: 'Oxigênio dissolvido mínimo exigido para o rio', unidade: 'mg/L' },
        ],
    },
    {
        titulo: 'Dados do esgoto',
        campos: [
            { chave: 'qe', rotulo: 'Qe', dica: 'Vazão do esgoto', unidade: 'm³/s' },
            { chave: 'ode', rotulo: 'ODe', dica: 'Oxigênio dissolvido no esgoto', unidade: 'mg/L' },
            { chave: 'e', rotulo: 'E', dica: 'Eficiência do tratamento de esgoto na remoção de DBO', unidade: '%', opcional: true },
            { chave: 'dboe', rotulo: 'DBOe', dica: 'Demanda bioquímica de oxigênio do esgoto', unidade: 'mg/L', opcional: true },
            { chave: 'dboefl', rotulo: 'DBOefl', dica: 'DBO do efluente tratado', unidade: 'mg/L', opcional: true },
        ],
    },
    {
        titulo: 'Dados adicionais',
        campos: [
            { chave: 'k120c', rotulo: 'K1 (20 °C)', dica: 'Coeficiente de desoxigenação a 20 °C', unidade: '1/dia', opcional: true },
            { chave: 'tetak1', rotulo: 'θ para K1', dica: 'Coeficiente de temperatura', opcional: true },
            { chave: 'k1t', rotulo: 'K1T', dica: 'Coeficiente de desoxigenação na temperatura do rio (T)', unidade: '1/dia', opcional: true },
            { chave: 'kd20c', rotulo: 'Kd (20 °C)', dica: 'Coeficiente de decomposição da DBO no rio a 20 °C', unidade: '1/dia', opcional: true },
            { chave: 'kdt', rotulo: 'KdT', dica: 'Coeficiente de decomposição da DBO no rio na temperatura do rio (T)', unidade: '1/dia', opcional: true },
            { chave: 'temperatura', rotulo: 'T', dica: 'Temperatura do rio', unidade: '°C' },
            { chave: 'velocidade', rotulo: 'v', dica: 'Velocidade do rio', unidade: 'm/s' },
            { chave: 'tetak2', rotulo: 'θ para K2', dica: 'Coeficiente de temperatura', opcional: true },
            { chave: 'h', rotulo: 'H', dica: 'Profundidade do rio', unidade: 'm', opcional: true },
            { chave: 'k220c', rotulo: 'K2 (20 °C)', dica: 'Coeficiente de reaeração a 20 °C', unidade: '1/dia', opcional: true },
            { chave: 'k2t', rotulo: 'K2T', dica: 'Coeficiente de reaeração na temperatura do rio (T)', unidade: '1/dia', opcional: true },
            { chave: 'distancia', rotulo: 'd', dica: 'Distância percorrida a partir do lançamento', unidade: 'm' },
            { chave: 'particoes', rotulo: 'Nº', dica: 'Número de divisões de cada trecho no cálculo do perfil' },
            { chave: 'altitude', rotulo: 'Altitude', dica: 'Altitude do local', unidade: 'm', opcional: true },
            { chave: 'cslinha', rotulo: "Cs'", dica: 'Concentração de saturação de oxigênio dissolvido no rio', unidade: 'mg/L', opcional: true },
        ],
    },
];

// cada trecho seguinte começa com uma contribuição opcional (esgoto ou afluente com dados conhecidos)
export const camposTrecho = [
    { chave: 'qe', rotulo: 'Qe', dica: 'Vazão da contribuição no início do trecho (esgoto ou afluente)', unidade: 'm³/s', opcional: true },
    { chave: 'ode', rotulo: 'ODe', dica: 'Oxigênio dissolvido da contribuição', unidade: 'mg/L', opcional: true },
    { chave: 'dboe', rotulo: 'DBOe', dica: 'DBO5 da contribuição', unidade: 'mg/L', opcional: true },
    { chave: 'e', rotulo: 'E', dica: 'Eficiência do tratamento na remoção de DBO da contribuição', unidade: '%', opcional: true },
    { chave: 'distancia', rotulo: 'd', dica: 'Extensão do trecho', unidade: 'm' },
    { chave: 'velocidade', rotulo: 'v', dica: 'Velocidade do rio no trecho', unidade: 'm/s' },
    { chave: 'h', rotulo: 'H', dica: 'Profundidade do rio no trecho, para calcular o K2', unidade: 'm', opcional: true },
    { chave: 'k220c', rotulo: 'K2 (20 °C)', dica: 'Coeficiente de reaeração do trecho a 20 °C', unidade: '1/dia', opcional: true },
    { chave: 'k2t', rotulo: 'K2T', dica: 'Coeficiente de reaeração do trecho na temperatura do rio (T)', unidade: '1/dia', opcional: true },
];

export function camposColicalc(isRio) {
    return [
        {
            titulo: isRio ? 'Dados do rio' : 'Dados da represa',
            campos: [
                { chave: 'qr', rotulo: 'Qr', dica: 'Vazão do rio', unidade: 'm³/s' },
                { chave: 'nr', rotulo: 'Nr', dica: 'Concentração de coliformes no rio, a montante do lançamento', unidade: isRio ? 'NMP/100 mL' : COLIFORMES },
                ...(isRio ? [] : [{ chave: 'volume', rotulo: 'V', dica: 'Volume da represa', unidade: 'm³' }]),
            ],
        },
        {
            titulo: 'Dados do esgoto',
            campos: [
                { chave: 'qe', rotulo: 'Qe', dica: 'Vazão do esgoto', unidade: 'm³/s' },
                { chave: 'ne', rotulo: 'Ne', dica: 'Concentração de coliformes no esgoto', unidade: COLIFORMES },
            ],
        },
        {
            titulo: 'Dados da mistura',
            campos: [
                { chave: 'nop', rotulo: 'Nop', dica: 'Concentração máxima permissível de coliformes no ponto de mistura em função da legislação ambiental', unidade: COLIFORMES },
            ],
        },
        {
            titulo: 'Dados adicionais',
            campos: [
                { chave: 'temperatura', rotulo: 'T', dica: 'Temperatura da água', unidade: '°C' },
                { chave: 'kb', rotulo: 'Kb', dica: 'Coeficiente de decaimento bacteriano', unidade: '1/dia' },
                { chave: 'teta', rotulo: 'θ para Kb', dica: 'Coeficiente de temperatura' },
                ...(isRio ? [
                    { chave: 'distancia', rotulo: 'd', dica: 'Distância percorrida a partir do lançamento', unidade: 'm' },
                    { chave: 'velocidade', rotulo: 'v', dica: 'Velocidade do rio', unidade: 'm/s' },
                    { chave: 'particoes', rotulo: 'Nº trechos', dica: 'Número de trechos em que o percurso é dividido no cálculo' },
                ] : []),
            ],
        },
    ];
}

export const numero = (valor, casas) => Number(valor).toLocaleString('pt-BR', casas === undefined
    ? { maximumFractionDigits: 5 }
    : { minimumFractionDigits: casas, maximumFractionDigits: casas });

const preenchido = (valor) => valor !== null && valor !== undefined && valor !== '';

function valoresFornecidos(grupos, dados) {
    return grupos
        .map(({ titulo, campos }) => ({
            titulo,
            linhas: campos
                .filter(({ chave }) => preenchido(dados[chave]))
                .map(({ chave, rotulo, dica, unidade = '' }) => ({
                    rotulo,
                    descricao: dica,
                    valor: Number(dados[chave]),
                    texto: numero(dados[chave]),
                    unidade,
                })),
        }))
        .filter(({ linhas }) => linhas.length);
}

const calculado = (rotulo, descricao, valor, unidade, casas = 2) => ({
    rotulo,
    descricao,
    valor: Number(valor.toFixed(casas)),
    texto: numero(valor, casas),
    unidade,
});

// OD negativo dentro de algum trecho simulado, mesmo entre os pontos amostrados
export const odNegativo = ({ ctVet, trechos }) =>
    ctVet.some((od) => od < 0) || trechos.some((trecho) => trecho.odc < 0 && trecho.xcKm <= trecho.distanciaKm);

const avisosSaturacao = ({ odmin, cs, odr }) => [
    ...(odmin >= cs ? [`Atenção: o ODmín (${numero(odmin, 2)} mg/L) é maior ou igual à saturação (Cs' = ${numero(cs, 2)} mg/L), então nenhum trecho do rio consegue atendê-lo. Confira os valores.`] : []),
    ...(odr > cs ? [`Atenção: o ODr (${numero(odr, 2)} mg/L) está acima da saturação (Cs' = ${numero(cs, 2)} mg/L). Isso só ocorre em rios supersaturados; confira os valores.`] : []),
];

const listaTrechos = (numeros) => (numeros.length === 1
    ? `trecho ${numeros[0]}`
    : `trechos ${numeros.slice(0, -1).join(', ')} e ${numeros[numeros.length - 1]}`);

function conclusaoTrechos({ critico, trechos }) {
    const { tc, xcKm, odc, odmin, trecho, tipo } = critico;
    const atende = odc >= odmin;
    const onde = {
        critico: `no ponto crítico do trecho ${trecho}, a ${numero(xcKm, 1)} km do primeiro lançamento (tc = ${numero(tc, 2)} dia após a mistura)`,
        inicio: `logo após a mistura do trecho ${trecho}, a ${numero(xcKm, 1)} km do primeiro lançamento`,
        fim: `no fim do trecho ${trecho}, a ${numero(xcKm, 1)} km do primeiro lançamento, antes da contribuição seguinte`,
        alem: `no ponto crítico do trecho ${trecho}, a ${numero(xcKm, 1)} km do primeiro lançamento, além do fim do último trecho`,
    }[tipo];

    return {
        atende,
        titulo: atende ? 'Atende o OD mínimo' : 'Não atende o OD mínimo',
        linhas: [
            `Menor OD do rio: ${numero(odc, 2)} mg/L, ${onde}. ODmín = ${numero(odmin, 2)} mg/L.`,
            ...(tipo === 'alem' ? [`Aumente d do trecho ${trecho} para ver esse ponto no gráfico.`] : []),
            ...(atende ? [] : [`Abaixo do ODmín: ${listaTrechos(trechos.filter((t) => t.minimo.od < odmin).map((t) => t.numero))}.`]),
            ...(odc < 0 ? ['Abaixo de zero o modelo de Streeter-Phelps deixa de valer nesse trecho.'] : []),
            ...avisosSaturacao(critico),
        ],
    };
}

export function conclusaoAutodepura(resultado) {
    if (odNegativo(resultado)) {
        return {
            atende: false,
            titulo: 'Concentração negativa de oxigênio dissolvido',
            linhas: ['O modelo de Streeter-Phelps não tem validade para este caso.'],
        };
    }
    if (resultado.trechos.length > 1) return conclusaoTrechos(resultado);

    const { tc, xcKm, odc, co, odmin, distanciaKm } = resultado.critico;
    const atende = odc >= odmin;

    return {
        atende,
        titulo: atende ? 'Atende o OD mínimo' : 'Não atende o OD mínimo',
        linhas: [
            tc > 0
                ? `Ponto crítico: OD de ${numero(odc, 2)} mg/L a ${numero(xcKm, 1)} km do lançamento (tc = ${numero(tc, 2)} dia). ODmín = ${numero(odmin, 2)} mg/L.`
                : `O OD não cai depois do lançamento: o menor valor é o da mistura, ${numero(co, 2)} mg/L. ODmín = ${numero(odmin, 2)} mg/L.`,
            ...(xcKm > distanciaKm ? [`O ponto crítico fica além da distância simulada (${numero(distanciaKm, 1)} km). Aumente d para ver o trecho mais crítico no gráfico.`] : []),
            ...(odc < 0 ? ['Abaixo de zero o modelo de Streeter-Phelps deixa de valer nesse trecho.'] : []),
            ...avisosSaturacao(resultado.critico),
        ],
    };
}

export function conclusaoColicalc(dados, resultado) {
    const { inviavel, semTratamento, eficiencia, n0, nop } = resultado;
    const isRio = dados.represa === false;

    if (inviavel) {
        return {
            atende: false,
            titulo: 'Mesmo removendo 100% dos coliformes do esgoto, o padrão não é atendido: a concentração do rio a montante (Nr) já é alta demais.',
            linhas: [],
        };
    }
    if (semTratamento) {
        return {
            atende: true,
            titulo: isRio
                ? `Não é necessário tratamento: a mistura (N0 = ${numero(n0, 0)} ${COLIFORMES}) já atende o padrão (Nop = ${numero(nop, 0)} ${COLIFORMES}).`
                : 'Não será necessário nenhum tratamento',
            linhas: [],
        };
    }
    return {
        atende: null,
        titulo: `Valor resultante de eficiência: ${eficiencia}`,
        linhas: isRio ? [`O perfil considera o esgoto tratado, com a mistura saindo com Nop = ${numero(nop, 0)} ${COLIFORMES}.`] : [],
    };
}

// a mesma organização das subplanilhas do Exemplo 8.5: um parâmetro por linha, um trecho por coluna
const LINHAS_POR_TRECHO = [
    ['Início', 'Distância do início do trecho ao primeiro lançamento', 'km', 2, (t) => t.inicioKm],
    ['Extensão', 'Comprimento do trecho', 'km', 2, (t) => t.distanciaKm],
    ['Qr', 'Vazão do rio a montante da contribuição', 'm³/s', 3, (t) => t.qr],
    ['ODr', 'OD do rio a montante da contribuição', 'mg/L', 2, (t) => t.odr],
    ['DBOr', 'DBO5 do rio a montante da contribuição', 'mg/L', 2, (t) => t.dbor],
    ['Qe', 'Vazão da contribuição', 'm³/s', 3, (t) => t.qe],
    ['Qt', 'Vazão total após a mistura', 'm³/s', 3, (t) => t.qt],
    ['C0', 'OD da mistura', 'mg/L', 2, (t) => t.co],
    ['DBO5', 'DBO5 da mistura', 'mg/L', 2, (t) => t.dbo5],
    ['L0', 'DBO última da mistura', 'mg/L', 2, (t) => t.lo],
    ['K2T', 'Coeficiente de reaeração na temperatura do rio', '1/dia', 3, (t) => t.k2t],
    ['t', 'Tempo de percurso no trecho', 'dia', 3, (t) => t.tempo],
    ['DBO5 final', 'DBO5 no fim do trecho', 'mg/L', 2, (t) => t.dbo5Fim],
    ['OD final', 'OD no fim do trecho', 'mg/L', 2, (t) => t.odFim],
    ['Menor OD', 'Menor OD do trecho (no último, vale o ponto crítico mesmo além do fim)', 'mg/L', 2, (t) => t.minimo.od],
    ['Local', 'Distância do menor OD ao primeiro lançamento', 'km', 2, (t) => t.minimo.km],
];

function tabelaPorTrecho(trechos) {
    return {
        colunas: trechos.map((trecho) => `Trecho ${trecho.numero}`),
        linhas: LINHAS_POR_TRECHO.map(([rotulo, descricao, unidade, casas, valorDe]) => ({
            rotulo,
            descricao,
            unidade,
            valores: trechos.map((trecho) => ({ valor: Number(valorDe(trecho).toFixed(casas)), texto: numero(valorDe(trecho), casas) })),
        })),
    };
}

export function relatorioAutodepura(dados, resultado) {
    const { critico, calculados, kmvet, ctVet, dboVet, trechos } = resultado;
    const valido = !odNegativo(resultado);
    const varios = trechos.length > 1;
    // sem K2 informado, ele vem das fórmulas hidráulicas (H e v)
    const k2PelaFormula = !preenchido(dados.k220c) && !preenchido(dados.k2t);
    const linhaKd = preenchido(dados.kd20c) || preenchido(dados.kdt)
        ? [calculado('KdT', 'Coeficiente de decomposição da DBO no rio, na temperatura do rio', calculados.kdt, '1/dia', 3)]
        : [];
    const pontosPorTrecho = kmvet.length / trechos.length;

    return {
        titulo: 'AutoDepura',
        descricao: varios
            ? `Autodepuração de rio em ${trechos.length} trechos pelo modelo de Streeter-Phelps`
            : 'Autodepuração de rio pelo modelo de Streeter-Phelps',
        arquivo: 'autodepura',
        conclusao: conclusaoAutodepura(resultado),
        fornecidos: [
            ...valoresFornecidos(camposAutodepura, dados),
            ...trechosDe(dados).flatMap((trecho, i) => valoresFornecidos([{ titulo: `Trecho ${i + 2}`, campos: camposTrecho }], trecho)),
        ],
        calculados: !valido ? [] : varios ? [
            calculado('K1T', 'Coeficiente de desoxigenação na temperatura do rio', calculados.k1t, '1/dia', 3),
            ...linhaKd,
            calculado("Cs'", 'Concentração de saturação de OD', critico.cs, 'mg/L'),
        ] : [
            calculado('C0', 'OD da mistura', critico.co, 'mg/L'),
            calculado('DBO5', 'DBO5 da mistura', calculados.dbo5, 'mg/L'),
            calculado('L0', 'DBO última da mistura', calculados.lo, 'mg/L'),
            calculado('K1T', 'Coeficiente de desoxigenação na temperatura do rio', calculados.k1t, '1/dia', 3),
            ...linhaKd,
            ...(k2PelaFormula ? [calculado('K2 (20 °C)', 'Coeficiente de reaeração a 20 °C, pelas fórmulas de H e v', calculados.k220c, '1/dia', 3)] : []),
            calculado('K2T', 'Coeficiente de reaeração na temperatura do rio', calculados.k2t, '1/dia', 3),
            calculado("Cs'", 'Concentração de saturação de OD', critico.cs, 'mg/L'),
            calculado('D0', 'Déficit inicial de oxigênio', calculados.deficit, 'mg/L'),
            ...(critico.tc > 0 ? [
                calculado('tc', 'Tempo até o ponto crítico', critico.tc, 'dia'),
                calculado('xc', 'Distância do ponto crítico', critico.xcKm, 'km'),
            ] : []),
            calculado('ODc', 'OD no ponto crítico', critico.odc, 'mg/L'),
        ],
        porTrecho: valido && varios ? tabelaPorTrecho(trechos) : null,
        // com vários trechos, as mesmas colunas da aba Resumo do Exemplo 8.5
        perfil: valido ? {
            colunas: [
                ...(varios ? [
                    { titulo: 'Trecho', casas: 0 },
                    { titulo: 'Distância no trecho (km)', casas: 3 },
                    { titulo: 'Distância acumulada (km)', casas: 3 },
                ] : [{ titulo: 'Distância (km)', casas: 3 }]),
                { titulo: 'OD (mg/L)', casas: 2, chave: 'od' },
                { titulo: 'DBO5 (mg/L)', casas: 2 },
            ],
            linhas: kmvet.map((km, i) => {
                const trecho = trechos[Math.floor(i / pontosPorTrecho)];
                return [
                    ...(varios ? [trecho.numero, Number((km - trecho.inicioKm).toFixed(6))] : []),
                    km,
                    Number(ctVet[i]),
                    dboVet[i],
                ];
            }),
        } : null,
    };
}

export function relatorioColicalc(dados, resultado) {
    const { inviavel, semTratamento, n0, kbt, nep, tDetencao, nMaximo, eficienciaValor, kmvet, novet } = resultado;
    const isRio = dados.represa === false;
    const precisaTratar = !inviavel && !semTratamento;

    return {
        titulo: 'ColiCalc',
        descricao: `Coliformes após lançamento de esgoto em ${isRio ? 'rio' : 'represa'}`,
        arquivo: `colicalc-${isRio ? 'rio' : 'represa'}`,
        conclusao: conclusaoColicalc(dados, resultado),
        fornecidos: valoresFornecidos(camposColicalc(isRio), dados),
        calculados: [
            ...(isRio
                ? [calculado('N0', 'Concentração de coliformes na mistura, sem tratamento', n0, COLIFORMES, 0)]
                : [
                    calculado('td', 'Tempo de detenção na represa', tDetencao, 'dia'),
                    calculado('Nmáx', 'Concentração máxima admitida no afluente à represa', nMaximo, COLIFORMES, 0),
                ]),
            calculado('KbT', 'Coeficiente de decaimento na temperatura da água', kbt, '1/dia', 3),
            ...(precisaTratar ? [
                calculado('Nep', 'Concentração de coliformes admitida no esgoto tratado', nep, COLIFORMES, 0),
                calculado('E', 'Eficiência de remoção necessária', eficienciaValor * 100, '%', 3),
            ] : []),
        ],
        perfil: isRio && !inviavel ? {
            colunas: [{ titulo: 'Distância (km)', casas: 3 }, { titulo: `N (${COLIFORMES})`, casas: 2 }],
            linhas: kmvet.map((km, i) => [km, novet[i]]),
        } : null,
    };
}

export const textoGerado = (gerado) => gerado.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

// sv-SE escreve a data local como AAAA-MM-DD
export const nomeArquivo = (relatorio, gerado, extensao, parte = '') =>
    `${relatorio.arquivo}${parte}-${gerado.toLocaleDateString('sv-SE')}.${extensao}`;

// abre direto no Excel em português: separador ";", vírgula decimal e BOM para os acentos
export function relatorioCsv(relatorio, gerado) {
    const decimal = (valor) => String(valor).replace('.', ',');
    const escapar = (celula) => (/[;"\r\n]/.test(celula) ? `"${celula.replaceAll('"', '""')}"` : celula);
    const parametro = ({ rotulo, descricao, valor, unidade }, grupo) => [grupo, rotulo, descricao, decimal(valor), unidade];
    const cabecalho = ['Grupo', 'Parâmetro', 'Descrição', 'Valor', 'Unidade'];
    const { titulo, descricao, conclusao, fornecidos, calculados, porTrecho, perfil } = relatorio;

    const linhas = [
        [`Relatório ${titulo}`],
        [descricao],
        [`Gerado em ${textoGerado(gerado)}`],
        [],
        ['Conclusão'],
        [conclusao.titulo],
        ...conclusao.linhas.map((linha) => [linha]),
        [],
        ['Valores fornecidos'],
        cabecalho,
        ...fornecidos.flatMap((grupo) => grupo.linhas.map((linha) => parametro(linha, grupo.titulo))),
        ...(calculados.length ? [
            [],
            ['Valores calculados'],
            cabecalho,
            ...calculados.map((linha) => parametro(linha, 'Calculado')),
        ] : []),
        ...(porTrecho ? [
            [],
            ['Resultados por trecho'],
            ['Parâmetro', 'Descrição', 'Unidade', ...porTrecho.colunas],
            ...porTrecho.linhas.map(({ rotulo, descricao: texto, unidade, valores }) => [rotulo, texto, unidade, ...valores.map(({ valor }) => decimal(valor))]),
        ] : []),
        ...(perfil ? [
            [],
            ['Perfil ao longo do percurso'],
            perfil.colunas.map((coluna) => coluna.titulo),
            ...perfil.linhas.map((linha) => linha.map(decimal)),
        ] : []),
    ];

    return `﻿${linhas.map((linha) => linha.map(escapar).join(';')).join('\r\n')}\r\n`;
}
