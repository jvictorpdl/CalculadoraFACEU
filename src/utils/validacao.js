import { coeficienteK2 } from "./autoDepuraCalculation";

// Regras de preenchimento de cada passo; cada regra devolve a lista de erros,
// cada um com a mensagem e os rótulos dos campos que devem ser destacados

const preenchido = (v) => v !== null && v !== undefined && v !== '' && !Number.isNaN(Number(v));
const positivo = (v) => preenchido(v) && Number(v) > 0;
const decimal = (v) => String(v).replace('.', ',');
const erro = (mensagem, ...campos) => ({ mensagem, campos });

const faltando = (dados, campos) => campos.filter(([chave]) => !preenchido(dados[chave])).map(([, rotulo]) => rotulo);

function exigir(dados, campos) {
    const rotulos = faltando(dados, campos);
    return rotulos.length ? [erro(`Preencha: ${rotulos.join(', ')}.`, ...rotulos)] : [];
}

function exigirPositivo(dados, campos) {
    return campos
        .filter(([chave]) => preenchido(dados[chave]) && !positivo(dados[chave]))
        .map(([, rotulo]) => erro(`${rotulo} deve ser maior que zero.`, rotulo));
}

function exigirTrechos(dados, chave, rotulo) {
    const n = Number(dados[chave]);
    // acima de 1000 trechos o gráfico não ganha nada e valores enormes travam a página
    return preenchido(dados[chave]) && (!Number.isInteger(n) || n < 1 || n > 1000)
        ? [erro('Nº de trechos deve ser um número inteiro entre 1 e 1000.', rotulo)]
        : [];
}

// faixas fisicamente plausíveis; valores fora delas costumam ser erro de digitação ou de unidade
function exigirFaixa(dados, campos) {
    return campos
        .filter(([chave, , minimo, maximo]) => preenchido(dados[chave]) && (Number(dados[chave]) < minimo || Number(dados[chave]) > maximo))
        .map(([, rotulo, minimo, maximo, unidade]) => erro(`${rotulo} deve estar entre ${decimal(minimo)} e ${decimal(maximo)}${unidade ? ' ' + unidade : ''}.`, rotulo));
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
                return [erro('Informe a DBOe (com ou sem E) ou a DBOefl, não os dois.', 'E', 'DBOe', 'DBOefl')];
            }
            if (!preenchido(d.dboefl) && !preenchido(d.dboe)) {
                return [erro('Informe a DBOe ou a DBOefl.', 'DBOe', 'DBOefl')];
            }
            if (preenchido(d.e) && (Number(d.e) < 0 || Number(d.e) > 100)) {
                return [erro('E deve estar entre 0 e 100%.', 'E')];
            }
            return [];
        },
    ],
    'Dados adicionais': [
        (d) => {
            if (!(positivo(d.k1t) || (positivo(d.k120c) && positivo(d.tetak1) && preenchido(d.temperatura)))) {
                return [erro('Informe K1 (20 °C), θ para K1 e T, ou então K1T.',
                    ...faltando(d, [['k120c', 'K1 (20 °C)'], ['tetak1', 'θ para K1'], ['temperatura', 'T'], ['k1t', 'K1T']]))];
            }
            return exigirFaixa(d, [['tetak1', 'θ para K1', 1, 1.2], faixaT]);
        },
        (d) => {
            const faixas = exigirFaixa(d, [['tetak2', 'θ para K2', 1, 1.2], faixaT, faixaV]);
            if (positivo(d.k2t)) return faixas;
            const erros = [...faixas];
            if (!positivo(d.k220c)) {
                if (!positivo(d.h) || !positivo(d.velocidade)) {
                    return [...erros, erro('Informe K2 (20 °C), K2T, ou H e v para calcular o K2.',
                        ...faltando(d, [['velocidade', 'v'], ['h', 'H'], ['k220c', 'K2 (20 °C)'], ['k2t', 'K2T']]))];
                }
                if (coeficienteK2(Number(d.h), Number(d.velocidade)) === null) {
                    erros.push(erro(`H = ${decimal(d.h)} m e v = ${decimal(d.velocidade)} m/s estão fora das faixas das fórmulas de K2 (O'Connor-Dobbins, Churchill, Owens). Informe K2 (20 °C) ou K2T.`, 'v', 'H'));
                }
            }
            if (!positivo(d.tetak2) || !preenchido(d.temperatura)) {
                erros.push(erro('Informe θ para K2 e T para corrigir o K2 pela temperatura.',
                    ...faltando(d, [['tetak2', 'θ para K2'], ['temperatura', 'T']])));
            }
            return erros;
        },
        (d) => [
            ...exigir(d, [['distancia', 'd'], ['velocidade', 'v'], ['particoes', 'Nº']]),
            ...exigirPositivo(d, [['distancia', 'd'], ['velocidade', 'v']]),
            ...exigirFaixa(d, [faixaD, faixaV]),
            ...exigirTrechos(d, 'particoes', 'Nº'),
        ],
        (d) => positivo(d.cslinha) || preenchido(d.temperatura)
            ? exigirFaixa(d, [['cslinha', "Cs'", 0, 20, 'mg/L'], ['altitude', 'Altitude', 0, 5000, 'm'], faixaT])
            : [erro("Informe Cs', ou a temperatura T (e a altitude, se houver) para calculá-lo.", 'T', "Cs'")],
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
            ...exigirTrechos(d, 'particoes', 'Nº trechos'),
        ],
};

const semRepetidos = (erros) => erros.filter((e, i) => erros.findIndex((outro) => outro.mensagem === e.mensagem) === i);

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
