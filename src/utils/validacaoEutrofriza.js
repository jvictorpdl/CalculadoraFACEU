// Regras de preenchimento do EutroFriza, no mesmo formato de validacao.js: cada erro traz a
// mensagem e os rótulos dos campos que devem ser destacados. Fica num arquivo próprio para que
// esta calculadora não dependa das mudanças das outras.

const preenchido = (v) => v !== null && v !== undefined && v !== '' && !Number.isNaN(Number(v));
const positivo = (v) => preenchido(v) && Number(v) > 0;
const decimal = (v) => String(v).replace('.', ',');
const erro = (mensagem, ...campos) => ({ mensagem, campos });

function exigir(dados, campos) {
    const rotulos = campos.filter(([chave]) => !preenchido(dados[chave])).map(([, rotulo]) => rotulo);
    return rotulos.length ? [erro(`Preencha: ${rotulos.join(', ')}.`, ...rotulos)] : [];
}

function exigirPositivo(dados, campos) {
    return campos
        .filter(([chave]) => preenchido(dados[chave]) && !positivo(dados[chave]))
        .map(([, rotulo]) => erro(`${rotulo} deve ser maior que zero.`, rotulo));
}

// faixas fisicamente plausíveis; fora delas costuma ser erro de digitação ou de unidade
function exigirFaixa(dados, campos) {
    return campos
        .filter(([chave, , minimo, maximo]) => preenchido(dados[chave]) && (Number(dados[chave]) < minimo || Number(dados[chave]) > maximo))
        .map(([, rotulo, minimo, maximo, unidade]) => erro(`${rotulo} deve estar entre ${decimal(minimo)} e ${decimal(maximo)}${unidade ? ' ' + unidade : ''}.`, rotulo));
}

// os rótulos são os mesmos dos campos da tela, que casam o destaque de erro pelo label
export const ROTULOS_EUTROFRIZA = {
    volume: 'V', vazao: 'Q',
    areaMatas: 'Matas', areaAgricola: 'Agrícola', areaUrbana: 'Urbana',
    coefMatas: 'Coef. matas', coefAgricola: 'Coef. agrícola', coefUrbana: 'Coef. urbana',
    populacao: 'População', percapita: 'Per capita', e: 'E', outras: 'Outras cargas',
    pmax: 'Pmáx',
};
const R = ROTULOS_EUTROFRIZA;

const temFonte = (d) => ['areaMatas', 'areaAgricola', 'areaUrbana', 'populacao', 'outras'].some((chave) => positivo(d[chave]));

const regrasEutrofriza = {
    'Dados da represa': (d) => [
        ...exigir(d, [['volume', R.volume], ['vazao', R.vazao]]),
        ...exigirPositivo(d, [['volume', R.volume], ['vazao', R.vazao]]),
        ...exigirFaixa(d, [['volume', R.volume, 0, 1e12, 'm³'], ['vazao', R.vazao, 0, 300000, 'm³/s']]),
    ],
    'Dados da bacia': (d) => exigirFaixa(d, [
        ['areaMatas', R.areaMatas, 0, 10000000, 'km²'],
        ['areaAgricola', R.areaAgricola, 0, 10000000, 'km²'],
        ['areaUrbana', R.areaUrbana, 0, 10000000, 'km²'],
        ['coefMatas', R.coefMatas, 0, 10000, 'kgP/km²·ano'],
        ['coefAgricola', R.coefAgricola, 0, 10000, 'kgP/km²·ano'],
        ['coefUrbana', R.coefUrbana, 0, 10000, 'kgP/km²·ano'],
    ]),
    'Dados do esgoto': (d) => {
        const erros = exigirFaixa(d, [
            ['populacao', R.populacao, 0, 1e9, 'hab'],
            ['percapita', R.percapita, 0, 10, 'kgP/hab·ano'],
            ['e', R.e, 0, 100, '%'],
            ['outras', R.outras, 0, 1e9, 'kgP/ano'],
        ]);
        if (preenchido(d.populacao) && !Number.isInteger(Number(d.populacao))) {
            erros.push(erro('População deve ser um número inteiro de habitantes.', R.populacao));
        }
        if (!preenchido(d.populacao) && (preenchido(d.percapita) || preenchido(d.e))) {
            erros.push(erro('Informe a População para usar a carga per capita e a eficiência E, ou apague esses campos.', R.populacao));
        }
        // a bacia vem antes; sem nenhuma fonte o fósforo da represa sairia zero
        if (!erros.length && !temFonte(d)) {
            erros.push(erro('Informe ao menos uma fonte de fósforo: áreas da bacia, População ou Outras cargas.', R.populacao, R.outras));
        }
        return erros;
    },
    'Dados adicionais': (d) => [
        ...exigir(d, [['pmax', R.pmax]]),
        ...exigirPositivo(d, [['pmax', R.pmax]]),
        ...exigirFaixa(d, [['pmax', R.pmax, 0, 10000, 'mg/m³']]),
    ],
};

const semRepetidos = (erros) => erros.filter((e, i) => erros.findIndex((outro) => outro.mensagem === e.mensagem) === i);

export function errosPassoEutrofriza(colecao, dados) {
    const regra = regrasEutrofriza[colecao];
    return regra ? regra(dados) : [];
}

export function errosEutrofriza(dados) {
    return semRepetidos(Object.values(regrasEutrofriza).flatMap((regra) => regra(dados)));
}
