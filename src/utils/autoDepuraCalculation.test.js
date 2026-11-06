import { CalculadoraAutodepura, coeficienteK2 } from './autoDepuraCalculation';

// Valores esperados de uma implementação independente das equações de Streeter-Phelps
// (Von Sperling, 2007), conferida por integração numérica

const exemplo = {
    qr: 0.651, odr: 7, dbor: 2, odmin: 5, k120c: 0.38, tetak1: 1.047, temperatura: 23, k1t: null,
    tetak2: 1.024, h: null, k220c: 3.08, k2t: null, distancia: 50000, velocidade: 0.35, particoes: 10,
    tempo: null, cs: null, cslinha: 7.8, qe: 0.114, ode: 0, dboe: 341, dboefl: null, e: 0, altitude: null,
};

beforeAll(() => jest.spyOn(console, 'log').mockImplementation(() => { }));

test('perfil de OD e ponto crítico do exemplo', () => {
    const r = CalculadoraAutodepura(exemplo);
    expect(r.ctVet.map(Number)).toEqual([5.96, 3.43, 2.2, 1.71, 1.62, 1.75, 2.0, 2.3, 2.63, 2.95, 3.27]);
    expect(r.critico.tc).toBeCloseTo(0.629, 3);
    expect(r.critico.xcKm).toBeCloseTo(19.03, 2);
    expect(r.critico.odc).toBeCloseTo(1.611, 3);
});

test("K2 por O'Connor-Dobbins, eficiência de 80% e Cs pela altitude", () => {
    const r = CalculadoraAutodepura({ ...exemplo, k220c: null, h: 1, e: 80, cslinha: null, altitude: 1000 });
    expect(r.ctVet.map(Number)).toEqual([5.96, 5.69, 5.56, 5.53, 5.55, 5.62, 5.7, 5.8, 5.9, 6.0, 6.1]);
    expect(r.critico.odc).toBeCloseTo(5.528, 3);
});

test('ponto crítico além da distância simulada', () => {
    const r = CalculadoraAutodepura({ ...exemplo, k220c: null, h: 1.5, velocidade: 1.0 });
    expect(r.critico.xcKm).toBeCloseTo(62.69, 2);
    expect(r.critico.xcKm).toBeGreaterThan(r.critico.distanciaKm);
    expect(r.critico.odc).toBeCloseTo(0.604, 3);
});

test('quando o déficit só diminui, o pior ponto é o lançamento', () => {
    const r = CalculadoraAutodepura({ ...exemplo, dboe: null, e: null, dboefl: 60 });
    expect(r.critico.tc).toBe(0);
    expect(r.critico.odc).toBeCloseTo(r.critico.co, 6);
});

test('Kd igual ao K1 dá o mesmo resultado do modelo clássico', () => {
    const classico = CalculadoraAutodepura(exemplo);
    const comKd = CalculadoraAutodepura({ ...exemplo, kd20c: exemplo.k120c });

    expect(comKd.ctVet).toEqual(classico.ctVet);
    expect(comKd.critico.odc).toBeCloseTo(classico.critico.odc, 10);
    expect(classico.trechos).toHaveLength(1);
});

test('eficiência de 100% zera a DBO lançada', () => {
    const r = CalculadoraAutodepura({ ...exemplo, e: 100 });
    expect(r.calculados.dbo5).toBeCloseTo((exemplo.qr * exemplo.dbor) / (exemplo.qr + exemplo.qe), 10);
});

// Von Sperling, Estudos e modelagem da qualidade da água de rios, Exemplo 8.5: valores da planilha
// Exemplo8_5_StreeterContribuicoesMultiplas.XLS, com os coeficientes já na temperatura do rio
const exemplo85 = {
    qr: 0.76, odr: 7.1, dbor: 2, odmin: 5, qe: 0.114, ode: 0, dboe: 341, e: null, dboefl: null,
    k120c: null, tetak1: null, temperatura: 20, k1t: 0.44, kd20c: null, kdt: 0.77,
    tetak2: null, h: null, k220c: null, k2t: 5.23, cslinha: 7.9, altitude: null,
    distancia: 50000, velocidade: 0.26, particoes: 20,
};
const contribuicaoLimpa = { qe: 0.45, ode: 7.7, dboe: 1, e: null, distancia: 25000, velocidade: 0.33, h: null, k220c: null, k2t: 4.6 };

function conferirTrecho(trecho, esperado) {
    Object.entries(esperado).forEach(([chave, valor]) => expect([chave, trecho[chave]]).toEqual([chave, expect.closeTo(valor, 5)]));
}

test('exemplo 2 da planilha (abas "a"): dois trechos, o segundo após uma contribuição limpa', () => {
    const r = CalculadoraAutodepura({ ...exemplo85, trechos: [contribuicaoLimpa] });
    const [primeiro, segundo] = r.trechos;

    conferirTrecho(primeiro, { qt: 0.874, co: 6.173913, dbo5: 46.217391, lo: 51.976558, tempo: 2.225783, dbo5Fim: 8.326997, odFim: 6.283301 });
    conferirTrecho(segundo, { qr: 0.874, odr: 6.283301, dbor: 8.326997, qt: 1.324, co: 6.764807, dbo5: 5.836703, lo: 6.564017, tempo: 0.876824, dbo5Fim: 2.971336, odFim: 7.231459 });
    expect(segundo.inicioKm).toBe(50);
    expect(r.calculados.kt).toBeCloseTo(1.12461, 5);

    // a planilha procura o mínimo a cada 2,5 km (2,225 mg/L no km 7,5); aqui o ponto crítico é exato
    expect(primeiro.minimo).toMatchObject({ tipo: 'critico', od: expect.closeTo(2.1961, 4), km: expect.closeTo(8.573, 3) });
    expect(primeiro.minimo.od).toBeLessThan(2.225001);
    expect(segundo.minimo).toMatchObject({ tipo: 'inicio', od: expect.closeTo(6.764807, 5), km: 50 });
    expect(r.critico).toMatchObject({ trecho: 1, tipo: 'critico', distanciaKm: 75 });
    expect(r.divisasKm).toEqual([50]);
});

test('exemplo 2: perfil igual ao da aba Resumo-a nos pontos a cada 2,5 km', () => {
    const resumo = [
        [0, 6.1739, 46.2174], [2.5, 3.713, 42.4218], [5, 2.6025, 38.938], [7.5, 2.225, 35.7403], [10, 2.237, 32.8051],
        [12.5, 2.4484, 30.1111], [15, 2.7543, 27.6382], [17.5, 3.0977, 25.3685], [20, 3.4478, 23.2851], [22.5, 3.7887, 21.3729],
        [25, 4.1126, 19.6176], [27.5, 4.4159, 18.0066], [30, 4.6977, 16.5278], [32.5, 4.9583, 15.1705], [35, 5.1985, 13.9246],
        [37.5, 5.4196, 12.7811], [40, 5.6229, 11.7315], [42.5, 5.8097, 10.768], [45, 5.9812, 9.8837], [47.5, 6.1387, 9.072],
        [50, 6.2833, 8.327], [50, 6.7648, 5.8367], [52.5, 6.7897, 5.4556], [55, 6.8294, 5.0995], [57.5, 6.8773, 4.7665],
        [60, 6.9294, 4.4553], [62.5, 6.983, 4.1645], [65, 7.0363, 3.8926], [67.5, 7.0883, 3.6385], [70, 7.1384, 3.4009],
        [72.5, 7.1862, 3.1789], [75, 7.2315, 2.9713],
    ];
    const r = CalculadoraAutodepura({ ...exemplo85, trechos: [contribuicaoLimpa] });
    const pontos = r.kmvet
        .map((km, i) => [km, Number(r.ctVet[i]), r.dboVet[i]])
        .filter(([km]) => Math.abs(km / 2.5 - Math.round(km / 2.5)) < 1e-9);

    expect(pontos).toHaveLength(resumo.length);
    pontos.forEach(([km, od, dbo], i) => {
        expect(km).toBeCloseTo(resumo[i][0], 9);
        expect(od).toBeCloseTo(resumo[i][1], 2);
        expect(dbo).toBeCloseTo(resumo[i][2], 2);
    });
});

test('exemplo 1 encadeado, com o resultado do tributário digitado como contribuição', () => {
    const tributario = { qe: 0.29, ode: 0.648601, dboe: 29.419525, e: null, distancia: 20000, velocidade: 0.3, h: null, k220c: null, k2t: 4.8 };
    const r = CalculadoraAutodepura({ ...exemplo85, trechos: [tributario, contribuicaoLimpa] });
    const [, segundo, terceiro] = r.trechos;

    conferirTrecho(segundo, { qt: 1.164, co: 4.879467, dbo5: 13.582008, lo: 15.274467, tempo: 0.771605, dbo5Fim: 7.497804, odFim: 6.286388 });
    conferirTrecho(terceiro, { qt: 1.614, co: 6.680518, dbo5: 5.686149, lo: 6.394702, tempo: 0.876824, dbo5Fim: 2.894692, odFim: 7.246691 });
    expect(terceiro.inicioKm).toBe(70);
});

test('trecho sem contribuição só continua o rio, com outra velocidade', () => {
    const inteiro = CalculadoraAutodepura({ ...exemplo85, distancia: 50000 });
    const dividido = CalculadoraAutodepura({
        ...exemplo85, distancia: 25000,
        trechos: [{ qe: null, ode: null, dboe: null, e: null, distancia: 25000, velocidade: 0.26, h: null, k220c: null, k2t: 5.23 }],
    });

    expect(dividido.trechos[1].odFim).toBeCloseTo(inteiro.trechos[0].odFim, 10);
    expect(dividido.trechos[1].dbo5Fim).toBeCloseTo(inteiro.trechos[0].dbo5Fim, 10);
});

test('o ponto crítico depois do fim de um trecho intermediário não conta', () => {
    const r = CalculadoraAutodepura({ ...exemplo85, distancia: 5000, trechos: [contribuicaoLimpa] });

    expect(r.trechos[0].xcKm).toBeGreaterThan(5);
    expect(r.trechos[0].minimo).toMatchObject({ tipo: 'fim', od: r.trechos[0].odFim, km: 5 });
});

test('faixas das fórmulas de K2', () => {
    expect(coeficienteK2(1, 0.35)).toBeCloseTo(3.73 * Math.sqrt(0.35), 6);
    expect(coeficienteK2(1.5, 1.0)).toBeCloseTo(5 * Math.pow(1.5, -1.67), 6);
    expect(coeficienteK2(0.4, 0.3)).toBeCloseTo(5.3 * Math.pow(0.3, 0.67) * Math.pow(0.4, -1.85), 6);
    expect(coeficienteK2(5, 0.35)).toBeNull();
});
