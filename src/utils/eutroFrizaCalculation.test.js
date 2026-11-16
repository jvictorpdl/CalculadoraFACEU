import { CalculadoraEutrofriza, grausDeTrofia, SEGUNDOS_POR_ANO } from './eutroFrizaCalculation';

// Exemplo 3.5 do Von Sperling (2005): V = 10·10⁶ m³, Q = 50·10⁶ m³/ano, bacia de 60 km² e 16.000 hab com esgoto bruto
const exemploLivro = {
    volume: 10e6, vazao: 50e6 / SEGUNDOS_POR_ANO,
    areaMatas: 40, areaAgricola: 10, areaUrbana: 10,
    coefMatas: null, coefAgricola: null, coefUrbana: null,
    populacao: 16000, percapita: null, e: null, outras: null,
    modeloKs: null, pmax: 50,
};

test('Exemplo 3.5: tempo de detenção, carga, fósforo e carga admissível do livro', () => {
    const r = CalculadoraEutrofriza(exemploLivro);
    expect(r.tempo).toBeCloseTo(0.2, 10);
    expect(r.carga).toBeCloseTo(9900, 6);
    expect(r.fontes.map((fonte) => fonte.carga)).toEqual([400, 500, 1000, 8000, 0]);
    // o livro arredonda para 105 mg/m³
    expect(r.fosforo).toBeCloseTo(104.52, 2);
    expect(r.cargaAdmissivel).toBeCloseTo(4736, 0);
    expect(r.reducao).toBeCloseTo(1 - 4736.07 / 9900, 4);
    expect(r.atende).toBe(false);
    expect(r.graus).toEqual(['Hipereutrófico']);
});

test('Exemplo 3.5 com a vazão digitada em m³/s (5 casas) dá o mesmo resultado do livro', () => {
    const r = CalculadoraEutrofriza({ ...exemploLivro, vazao: 1.58549 });
    expect(Math.round(r.fosforo)).toBe(105);
    expect(Math.round(r.cargaAdmissivel)).toBe(4736);
});

test('a apostila usa 1,0 kgP/hab·ano com 8.000 hab e chega à mesma carga', () => {
    const r = CalculadoraEutrofriza({ ...exemploLivro, populacao: 8000, percapita: 1 });
    expect(r.carga).toBeCloseTo(9900, 6);
    expect(r.fosforo).toBeCloseTo(104.52, 2);
});

test('Ks de Vollenweider e de Castagnino, as outras opções do livro', () => {
    expect(CalculadoraEutrofriza({ ...exemploLivro, modeloKs: 'vollenweider' }).fosforo).toBeCloseTo(136.8, 1);
    expect(CalculadoraEutrofriza({ ...exemploLivro, modeloKs: 'castagnino' }).fosforo).toBeCloseTo(93.5, 1);
    // valor desconhecido (dado salvo antigo) volta ao padrão do livro
    expect(CalculadoraEutrofriza({ ...exemploLivro, modeloKs: 'outro' }).modelo).toBe('salas');
});

test('coeficientes informados substituem os do livro e a eficiência reduz só o esgoto', () => {
    const r = CalculadoraEutrofriza({ ...exemploLivro, coefMatas: 5, e: 50, outras: 100 });
    expect(r.fontes.map((fonte) => fonte.carga)).toEqual([200, 500, 1000, 4000, 100]);
    expect(r.carga).toBe(5800);
    expect(r.fontes[0].padrao).toBe(false);
    expect(r.fontes[1].padrao).toBe(true);
});

test('com a carga abaixo da admissível, a represa atende e não há redução', () => {
    const r = CalculadoraEutrofriza({ ...exemploLivro, populacao: 0 });
    expect(r.carga).toBe(1900);
    expect(r.fosforo).toBeCloseTo(20.06, 2);
    expect(r.atende).toBe(true);
    expect(r.reducao).toBe(0);
});

test('graus de trofia pelo Quadro 3.12, com as faixas sobrepostas', () => {
    expect(grausDeTrofia(3)).toEqual(['Ultraoligotrófico']);
    expect(grausDeTrofia(7)).toEqual(['Oligotrófico']);
    expect(grausDeTrofia(15)).toEqual(['Oligotrófico', 'Mesotrófico']);
    expect(grausDeTrofia(30)).toEqual(['Mesotrófico', 'Eutrófico']);
    expect(grausDeTrofia(50)).toEqual(['Mesotrófico', 'Eutrófico']);
    expect(grausDeTrofia(80)).toEqual(['Eutrófico']);
    expect(grausDeTrofia(100)).toEqual(['Eutrófico']);
    expect(grausDeTrofia(100.1)).toEqual(['Hipereutrófico']);
});
