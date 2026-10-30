import { coeficienteK2 } from "./autoDepuraCalculation";

// Regras de preenchimento de cada passo; cada regra devolve a lista de mensagens de erro

const preenchido = (v) => v !== null && v !== undefined && v !== '' && !Number.isNaN(Number(v));
const positivo = (v) => preenchido(v) && Number(v) > 0;
const decimal = (v) => String(v).replace('.', ',');

function exigir(dados, campos) {
    const faltando = campos.filter(([chave]) => !preenchido(dados[chave])).map(([, rotulo]) => rotulo);
    return faltando.length ? [`Preencha: ${faltando.join(', ')}.`] : [];
}

function exigirPositivo(dados, campos) {
    return campos
        .filter(([chave]) => preenchido(dados[chave]) && !positivo(dados[chave]))
        .map(([, rotulo]) => `${rotulo} deve ser maior que zero.`);
}

function exigirTrechos(dados, chave) {
    const n = Number(dados[chave]);
    // acima de 1000 trechos o gráfico não ganha nada e valores enormes travam a página
    return preenchido(dados[chave]) && (!Number.isInteger(n) || n < 1 || n > 1000) ? ['Nº de trechos deve ser um número inteiro entre 1 e 1000.'] : [];
}

// faixas fisicamente plausíveis; valores fora delas costumam ser erro de digitação ou de unidade
function exigirFaixa(dados, campos) {
    return campos
        .filter(([chave, , minimo, maximo]) => preenchido(dados[chave]) && (Number(dados[chave]) < minimo || Number(dados[chave]) > maximo))
        .map(([, rotulo, minimo, maximo, unidade]) => `${rotulo} deve estar entre ${decimal(minimo)} e ${decimal(maximo)}${unidade ? ' ' + unidade : ''}.`);
}

const faixaT = ['temperatura', 'T', 0, 40, '°C'];
const faixaV = ['velocidade', 'v', 0, 5, 'm/s'];
const faixaD = ['distancia', 'd', 0, 1000000, 'm'];

const regrasAutodepura = {
    'Dados do rio': [
        (d) => [
            ...exigir(d, [['qr', 'Qr'], ['odr', 'ODr'], ['dbor', 'DBOr'], ['odmin', 'ODmín']]),
            ...exigirPositivo(d, [['qr', 'Qr']]),
            ...exigirFaixa(d, [['odr', 'ODr', 0, 20, 'mg/L'], ['odmin', 'ODmín', 0, 20, 'mg/L']]),
        ],
    ],
    'Dados do esgoto': [
        (d) => [
            ...exigir(d, [['qe', 'Qe'], ['ode', 'ODe']]),
            ...exigirPositivo(d, [['qe', 'Qe']]),
            ...exigirFaixa(d, [['ode', 'ODe', 0, 20, 'mg/L']]),
        ],
        (d) => {
            if (preenchido(d.dboefl) && (preenchido(d.e) || preenchido(d.dboe))) {
                return ['Informe a DBOe (com ou sem E) ou a DBOefl, não os dois.'];
            }
            if (!preenchido(d.dboefl) && !preenchido(d.dboe)) {
                return ['Informe a DBOe ou a DBOefl.'];
            }
            if (preenchido(d.e) && (Number(d.e) < 0 || Number(d.e) > 100)) {
                return ['E deve estar entre 0 e 100%.'];
            }
            return [];
        },
    ],
    'Dados adicionais': [
        (d) => {
            if (!(positivo(d.k1t) || (positivo(d.k120c) && positivo(d.tetak1) && preenchido(d.temperatura)))) {
                return ['Informe K1 (20 °C), θ para K1 e T, ou então K1T.'];
            }
            return exigirFaixa(d, [['tetak1', 'θ para K1', 1, 1.2], faixaT]);
        },
        (d) => {
            const faixas = exigirFaixa(d, [['tetak2', 'θ para K2', 1, 1.2], faixaT, faixaV]);
            if (positivo(d.k2t)) return faixas;
            const erros = [...faixas];
            if (!positivo(d.k220c)) {
                if (!positivo(d.h) || !positivo(d.velocidade)) {
                    return [...erros, 'Informe K2 (20 °C), K2T, ou H e v para calcular o K2.'];
                }
                if (coeficienteK2(Number(d.h), Number(d.velocidade)) === null) {
                    erros.push(`H = ${decimal(d.h)} m e v = ${decimal(d.velocidade)} m/s estão fora das faixas das fórmulas de K2 (O'Connor-Dobbins, Churchill, Owens). Informe K2 (20 °C) ou K2T.`);
                }
            }
            if (!positivo(d.tetak2) || !preenchido(d.temperatura)) {
                erros.push('Informe θ para K2 e T para corrigir o K2 pela temperatura.');
            }
            return erros;
        },
        (d) => [
            ...exigir(d, [['distancia', 'd'], ['velocidade', 'v'], ['particoes', 'Nº']]),
            ...exigirPositivo(d, [['distancia', 'd'], ['velocidade', 'v']]),
            ...exigirFaixa(d, [faixaD, faixaV]),
            ...exigirTrechos(d, 'particoes'),
        ],
        (d) => positivo(d.cslinha) || preenchido(d.temperatura)
            ? exigirFaixa(d, [['cslinha', "Cs'", 0, 20, 'mg/L'], ['altitude', 'Altitude', 0, 5000, 'm'], faixaT])
            : ["Informe Cs', ou a temperatura T (e a altitude, se houver) para calculá-lo."],
    ],
};

const regrasColicalc = {
    'Dados do rio': (d) => [
        ...exigir(d, [['qr', 'Qr'], ['nr', 'Nr']]),
        ...exigirPositivo(d, [['qr', 'Qr']]),
    ],
    'Dados da represa': (d) => [
        ...exigir(d, [['qr', 'Qr'], ['nr', 'Nr'], ['volume', 'V']]),
        ...exigirPositivo(d, [['qr', 'Qr'], ['volume', 'V']]),
    ],
    'Dados do esgoto': (d) => [
        ...exigir(d, [['qe', 'Qe'], ['ne', 'Ne']]),
        ...exigirPositivo(d, [['qe', 'Qe'], ['ne', 'Ne']]),
    ],
    'Dados da mistura': (d) => [
        ...exigir(d, [['nop', 'Nop']]),
        ...exigirPositivo(d, [['nop', 'Nop']]),
    ],
    'Dados adicionais': (d) => d.represa
        ? [
            ...exigir(d, [['temperatura', 'T'], ['kb', 'Kb'], ['teta', 'θ para Kb']]),
            ...exigirPositivo(d, [['kb', 'Kb'], ['teta', 'θ para Kb']]),
            ...exigirFaixa(d, [faixaT, ['teta', 'θ para Kb', 1, 1.2]]),
        ]
        : [
            ...exigir(d, [['temperatura', 'T'], ['distancia', 'd'], ['velocidade', 'v'], ['kb', 'Kb'], ['teta', 'θ para Kb'], ['particoes', 'Nº trechos']]),
            ...exigirPositivo(d, [['distancia', 'd'], ['velocidade', 'v'], ['kb', 'Kb'], ['teta', 'θ para Kb']]),
            ...exigirFaixa(d, [faixaT, ['teta', 'θ para Kb', 1, 1.2], faixaD, faixaV]),
            ...exigirTrechos(d, 'particoes'),
        ],
};

const semRepetidos = (erros) => [...new Set(erros)];

export function errosPassoAutodepura(colecao, passo, dados) {
    const regra = regrasAutodepura[colecao]?.[passo];
    return regra ? regra(dados) : [];
}

export function errosAutodepura(dados) {
    return semRepetidos(Object.values(regrasAutodepura).flat().flatMap((regra) => regra(dados)));
}

export function errosPassoColicalc(colecao, dados) {
    const regra = regrasColicalc[colecao];
    return regra ? regra(dados) : [];
}

export function errosColicalc(dados) {
    const colecoes = [dados.represa ? 'Dados da represa' : 'Dados do rio', 'Dados do esgoto', 'Dados da mistura', 'Dados adicionais'];
    return semRepetidos(colecoes.flatMap((colecao) => regrasColicalc[colecao](dados)));
}
