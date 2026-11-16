// Fósforo em lagos e represas pelo balanço de massa empírico com perda por sedimentação
// (Von Sperling, 2005, item 3.4: Exemplo 3.5 e Quadros 3.12 e 3.14)

export const SEGUNDOS_POR_ANO = 365 * 24 * 3600;

// valores da tela; em branco (null) os coeficientes e a carga per capita usam os do livro.
// modeloKs null = Salas e Martino, o padrão do livro
export const DADOS_EUTROFRIZA = {
    volume: null, vazao: null,
    areaMatas: null, areaAgricola: null, areaUrbana: null,
    coefMatas: null, coefAgricola: null, coefUrbana: null,
    populacao: null, percapita: null, e: null, outras: null,
    modeloKs: null, pmax: null,
};

// contribuições unitárias típicas do livro, usadas quando o campo fica em branco
export const COEFICIENTES_PADRAO = { coefMatas: 10, coefAgricola: 50, coefUrbana: 100 };
export const CARGA_PER_CAPITA_PADRAO = 0.5;

// Ks = fator / √t (1/ano); Salas e Martino foi ajustado com 40 lagos e represas da América Latina e Caribe
export const MODELOS_KS = {
    salas: { nome: 'Salas e Martino (1991)', curto: 'Salas e Martino', fator: 2 },
    castagnino: { nome: 'Castagnino (1982)', curto: 'Castagnino', fator: 2.5 },
    vollenweider: { nome: 'Vollenweider (1976)', curto: 'Vollenweider', fator: 1 },
};
export const modeloKsDe = (dados) => (MODELOS_KS[dados.modeloKs] ? dados.modeloKs : 'salas');

// faixas de fósforo total (mg/m³) do Quadro 3.12; elas se sobrepõem de propósito, então o valor
// pode cair em duas classes vizinhas. O oligotrófico começa onde o ultraoligotrófico termina
export const GRAUS_TROFIA = [
    { nome: 'Ultraoligotrófico', faixa: '< 5', dentro: (p) => p < 5 },
    { nome: 'Oligotrófico', faixa: '< 10 – 20', dentro: (p) => p >= 5 && p < 20 },
    { nome: 'Mesotrófico', faixa: '10 – 50', dentro: (p) => p >= 10 && p <= 50 },
    { nome: 'Eutrófico', faixa: '25 – 100', dentro: (p) => p >= 25 && p <= 100 },
    { nome: 'Hipereutrófico', faixa: '> 100', dentro: (p) => p > 100 },
];

export const grausDeTrofia = (fosforo) => GRAUS_TROFIA.filter((grau) => grau.dentro(fosforo)).map((grau) => grau.nome);

const preenchido = (v) => v !== null && v !== undefined && v !== '' && !Number.isNaN(Number(v));
const valor = (v, padrao = 0) => (preenchido(v) ? Number(v) : padrao);

export function fontesDeFosforo(dados) {
    const area = (chaveArea, chaveCoef, nome) => {
        const coeficiente = valor(dados[chaveCoef], COEFICIENTES_PADRAO[chaveCoef]);
        const quantidade = valor(dados[chaveArea]);
        return { chave: chaveArea, nome, quantidade, coeficiente, padrao: !preenchido(dados[chaveCoef]), carga: quantidade * coeficiente };
    };
    const populacao = valor(dados.populacao);
    const perCapita = valor(dados.percapita, CARGA_PER_CAPITA_PADRAO);
    const eficiencia = valor(dados.e);

    return [
        area('areaMatas', 'coefMatas', 'Matas e florestas'),
        area('areaAgricola', 'coefAgricola', 'Áreas agrícolas'),
        area('areaUrbana', 'coefUrbana', 'Áreas urbanas'),
        {
            chave: 'esgoto',
            nome: 'Esgoto doméstico',
            quantidade: populacao,
            coeficiente: perCapita,
            padrao: !preenchido(dados.percapita),
            eficiencia,
            carga: populacao * perCapita * (1 - eficiencia / 100),
        },
        { chave: 'outras', nome: 'Outras cargas', carga: valor(dados.outras) },
    ];
}

export function CalculadoraEutrofriza(dados) {
    const volume = Number(dados.volume);
    const vazaoAno = Number(dados.vazao) * SEGUNDOS_POR_ANO;
    const tempo = volume / vazaoAno;
    const modelo = modeloKsDe(dados);
    const ks = MODELOS_KS[modelo].fator / Math.sqrt(tempo);

    const fontes = fontesDeFosforo(dados);
    const carga = fontes.reduce((soma, fonte) => soma + fonte.carga, 0);

    // P = L·10³ / [V·(1/t + Ks)], em gP/m³; aqui em mg/m³ (×1000), como no Quadro 3.12
    const perdas = volume * (1 / tempo + ks);
    const fosforo = (carga * 1e3 / perdas) * 1000;

    // L = P·V·(1/t + Ks) / 10³, com a meta em gP/m³
    const meta = Number(dados.pmax);
    const cargaAdmissivel = (meta / 1000) * perdas / 1e3;

    return {
        volume,
        vazaoAno,
        tempo,
        tempoDias: tempo * 365,
        modelo,
        ks,
        fontes,
        carga,
        fosforo,
        graus: grausDeTrofia(fosforo),
        meta,
        cargaAdmissivel,
        reducao: carga > cargaAdmissivel ? (carga - cargaAdmissivel) / carga : 0,
        atende: fosforo <= meta,
    };
}
