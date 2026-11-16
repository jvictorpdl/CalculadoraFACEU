import { CARGA_PER_CAPITA_PADRAO, COEFICIENTES_PADRAO, MODELOS_KS } from './eutroFrizaCalculation';
import { numero } from './relatorio';
import { ROTULOS_EUTROFRIZA as R } from './validacaoEutrofriza';

// Campos, Resumo e relatório do EutroFriza. A tela de resultado e os arquivos baixados usam a mesma
// conclusão, como nas outras calculadoras; o formato do relatório é o que os exportadores já leem.

const COEF = 'kgP/km²·ano';
const PER_CAPITA = 'kgP/hab·ano';

export const camposEutrofriza = [
    {
        titulo: 'Dados da represa',
        campos: [
            { chave: 'volume', rotulo: R.volume, dica: 'Volume da represa', unidade: 'm³' },
            { chave: 'vazao', rotulo: R.vazao, dica: 'Vazão média afluente à represa (tributários + esgotos)', unidade: 'm³/s' },
        ],
    },
    {
        titulo: 'Dados da bacia',
        campos: [
            { chave: 'areaMatas', rotulo: R.areaMatas, dica: 'Área de matas e florestas na bacia de drenagem', unidade: 'km²', opcional: true },
            { chave: 'areaAgricola', rotulo: R.areaAgricola, dica: 'Área agrícola na bacia de drenagem', unidade: 'km²', opcional: true },
            { chave: 'areaUrbana', rotulo: R.areaUrbana, dica: 'Área urbana na bacia de drenagem', unidade: 'km²', opcional: true },
            { chave: 'coefMatas', rotulo: R.coefMatas, dica: `Contribuição de fósforo por área de matas (em branco, ${numero(COEFICIENTES_PADRAO.coefMatas)} ${COEF})`, unidade: COEF, opcional: true, padrao: COEFICIENTES_PADRAO.coefMatas },
            { chave: 'coefAgricola', rotulo: R.coefAgricola, dica: `Contribuição de fósforo por área agrícola (em branco, ${numero(COEFICIENTES_PADRAO.coefAgricola)} ${COEF})`, unidade: COEF, opcional: true, padrao: COEFICIENTES_PADRAO.coefAgricola },
            { chave: 'coefUrbana', rotulo: R.coefUrbana, dica: `Contribuição de fósforo por área urbana (em branco, ${numero(COEFICIENTES_PADRAO.coefUrbana)} ${COEF})`, unidade: COEF, opcional: true, padrao: COEFICIENTES_PADRAO.coefUrbana },
        ],
    },
    {
        titulo: 'Dados do esgoto',
        campos: [
            { chave: 'populacao', rotulo: R.populacao, dica: 'População cujo esgoto chega à represa (ligada à rede coletora)', unidade: 'hab', opcional: true },
            { chave: 'percapita', rotulo: R.percapita, dica: `Carga de fósforo por habitante no esgoto doméstico (em branco, ${numero(CARGA_PER_CAPITA_PADRAO)} ${PER_CAPITA})`, unidade: PER_CAPITA, opcional: true, padrao: CARGA_PER_CAPITA_PADRAO },
            { chave: 'e', rotulo: R.e, dica: 'Eficiência do tratamento do esgoto na remoção de fósforo (em branco, 0%: esgoto bruto)', unidade: '%', opcional: true },
            { chave: 'outras', rotulo: R.outras, dica: 'Outras cargas de fósforo conhecidas, como indústrias ou afluentes medidos', unidade: 'kgP/ano', opcional: true },
        ],
    },
    {
        titulo: 'Dados adicionais',
        campos: [
            { chave: 'pmax', rotulo: R.pmax, dica: 'Concentração máxima de fósforo total desejada na represa, usada na carga admissível', unidade: 'mg/m³' },
        ],
    },
];

const preenchido = (valor) => valor !== null && valor !== undefined && valor !== '';

function valoresFornecidos(dados) {
    return camposEutrofriza
        .map(({ titulo, campos }) => ({
            titulo,
            linhas: campos
                .filter(({ chave }) => preenchido(dados[chave]))
                .map(({ chave, rotulo, dica, unidade = '' }) => ({ rotulo, descricao: dica, valor: Number(dados[chave]), texto: numero(dados[chave]), unidade })),
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

const listaComE = (nomes) => (nomes.length === 1 ? nomes[0] : `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}`);

// com as faixas sobrepostas, o valor pode cair em duas classes vizinhas
export const textoGrau = (graus) => (graus.length === 1
    ? graus[0].toLowerCase()
    : `entre ${listaComE(graus.map((grau) => grau.toLowerCase()))}`);

export function conclusaoEutrofriza(resultado) {
    const { fosforo, graus, meta, carga, cargaAdmissivel, reducao, atende, tempoDias } = resultado;
    return {
        atende,
        titulo: atende ? 'Atende o fósforo máximo desejado' : 'Não atende o fósforo máximo desejado',
        linhas: [
            `Fósforo total na represa: ${numero(fosforo, 1)} mg/m³ (${numero(fosforo / 1000, 4)} mg/L), grau de trofia ${textoGrau(graus)}. Pmáx = ${numero(meta, 1)} mg/m³.`,
            atende
                ? `A carga afluente (${numero(carga, 0)} kgP/ano) está abaixo da máxima admissível (${numero(cargaAdmissivel, 0)} kgP/ano).`
                : `A carga afluente precisa cair de ${numero(carga, 0)} para ${numero(cargaAdmissivel, 0)} kgP/ano, uma redução de ${numero(reducao * 100, 1)}%.`,
            // a CONAMA 357 chama de lótico o ambiente com tempo de residência abaixo de 2 dias
            ...(tempoDias < 2 ? [`Atenção: o tempo de detenção é de ${numero(tempoDias, 2)} dia. Abaixo de 2 dias o ambiente é lótico (CONAMA 357), e o modelo foi feito para lagos e represas.`] : []),
        ],
    };
}

function linhasDasFontes(fontes) {
    const [matas, agricola, urbana, esgoto, outras] = fontes;
    const daArea = (fonte, rotulo, nome) => calculado(rotulo, `Carga de ${nome}: ${numero(fonte.quantidade)} km² × ${numero(fonte.coeficiente)} ${COEF}${fonte.padrao ? ' (valor do livro)' : ''}`, fonte.carga, 'kgP/ano', 1);
    const textoEsgoto = `Carga do esgoto: ${numero(esgoto.quantidade, 0)} hab × ${numero(esgoto.coeficiente)} ${PER_CAPITA}${esgoto.padrao ? ' (valor do livro)' : ''}${esgoto.eficiencia ? `, com ${numero(esgoto.eficiencia)}% removido no tratamento` : ''}`;
    return [
        ...(matas.quantidade > 0 ? [daArea(matas, 'L matas', 'matas e florestas')] : []),
        ...(agricola.quantidade > 0 ? [daArea(agricola, 'L agrícola', 'áreas agrícolas')] : []),
        ...(urbana.quantidade > 0 ? [daArea(urbana, 'L urbana', 'áreas urbanas')] : []),
        ...(esgoto.quantidade > 0 ? [calculado('L esgoto', textoEsgoto, esgoto.carga, 'kgP/ano', 1)] : []),
        ...(outras.carga > 0 ? [calculado('L outras', 'Outras cargas informadas', outras.carga, 'kgP/ano', 1)] : []),
    ];
}

export function relatorioEutrofriza(dados, resultado) {
    const { vazaoAno, tempo, tempoDias, modelo, ks, fontes, carga, fosforo, graus, meta, cargaAdmissivel, reducao, atende } = resultado;
    const { nome, fator } = MODELOS_KS[modelo];

    return {
        titulo: 'EutroFriza',
        descricao: `Fósforo total e grau de trofia de represa pelo modelo com Ks de ${nome}`,
        arquivo: 'eutrofriza',
        conclusao: conclusaoEutrofriza(resultado),
        fornecidos: valoresFornecidos(dados),
        calculados: [
            calculado('Q', 'Vazão média afluente no ano', vazaoAno, 'm³/ano', 0),
            calculado('t', `Tempo de detenção hidráulica, V/Q (${numero(tempoDias, 1)} dias)`, tempo, 'ano', 3),
            // a fonte do PDF é um subconjunto da Inter sem o "√"; t^0,5 sai igual em todos os formatos
            calculado('Ks', `Coeficiente de perda de fósforo por sedimentação, Ks = ${numero(fator)}/t^0,5, de ${nome}`, ks, '1/ano', 3),
            ...linhasDasFontes(fontes),
            calculado('L', 'Carga total de fósforo afluente à represa', carga, 'kgP/ano', 1),
            calculado('P', `Concentração de fósforo total na represa (${numero(fosforo / 1000, 4)} mg/L), grau de trofia ${textoGrau(graus)}`, fosforo, 'mg/m³', 1),
            calculado('Lmáx', `Carga máxima admissível para P = Pmáx (${numero(meta, 1)} mg/m³)`, cargaAdmissivel, 'kgP/ano', 1),
            ...(atende ? [] : [calculado('Redução', 'Redução necessária da carga afluente', reducao * 100, '%', 1)]),
        ],
        perfil: null,
    };
}
