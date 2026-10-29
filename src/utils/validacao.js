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
    return preenchido(dados[chave]) && (!Number.isInteger(n) || n < 1) ? ['Nº de trechos deve ser um número inteiro maior que zero.'] : [];
}

const regrasAutodepura = {
    'Dados do rio': [
        (d) => [
            ...exigir(d, [['qr', 'Qr'], ['odr', 'ODr'], ['dbor', 'DBOr'], ['odmin', 'ODmín']]),
            ...exigirPositivo(d, [['qr', 'Qr']]),
        ],
    ],
    'Dados do esgoto': [
        (d) => [
            ...exigir(d, [['qe', 'Qe'], ['ode', 'ODe']]),
            ...exigirPositivo(d, [['qe', 'Qe']]),
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
        (d) => positivo(d.k1t) || (positivo(d.k120c) && positivo(d.tetak1) && preenchido(d.temperatura))
            ? []
            : ['Informe K1(20ºC), θ para K1 e T, ou então K1T.'],
        (d) => {
            if (positivo(d.k2t)) return [];
            const erros = [];
            if (!positivo(d.k220c)) {
                if (!positivo(d.h) || !positivo(d.velocidade)) {
                    return ['Informe K2(20ºC), K2T, ou H e v para calcular o K2.'];
                }
                if (coeficienteK2(Number(d.h), Number(d.velocidade)) === null) {
                    erros.push(`H = ${decimal(d.h)} m e v = ${decimal(d.velocidade)} m/s estão fora das faixas das fórmulas de K2 (O'Connor-Dobbins, Churchill, Owens). Informe K2(20ºC) ou K2T.`);
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
            ...exigirTrechos(d, 'particoes'),
        ],
        (d) => positivo(d.cslinha) || preenchido(d.temperatura)
            ? []
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
        ...exigirPositivo(d, [['qe', 'Qe']]),
    ],
    'Dados da mistura': (d) => [
        ...exigir(d, [['nop', 'Nop']]),
        ...exigirPositivo(d, [['nop', 'Nop']]),
    ],
    'Dados adicionais': (d) => d.represa
        ? [
            ...exigir(d, [['temperatura', 'T'], ['kb', 'Kb'], ['teta', 'θ para Kb']]),
            ...exigirPositivo(d, [['kb', 'Kb'], ['teta', 'θ para Kb']]),
        ]
        : [
            ...exigir(d, [['temperatura', 'T'], ['distancia', 'd'], ['velocidade', 'v'], ['kb', 'Kb'], ['teta', 'θ para Kb'], ['particoes', 'Nº trechos']]),
            ...exigirPositivo(d, [['distancia', 'd'], ['velocidade', 'v'], ['kb', 'Kb'], ['teta', 'θ para Kb']]),
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
