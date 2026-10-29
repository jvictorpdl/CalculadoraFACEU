import { CalculadoraColicalc } from './coliCalcCalculation';

const exemplo = {
    qr: 0.651, nr: 10, volume: 5000000, qe: 0.114, ne: 50000000, nop: 1000, temperatura: 23,
    distancia: 50000, velocidade: 0.35, kb: 1, teta: 1.07, particoes: 10, represa: false,
};

beforeAll(() => jest.spyOn(console, 'log').mockImplementation(() => { }));

test('rio: eficiência necessária e perfil após o tratamento', () => {
    const r = CalculadoraColicalc(exemplo);
    expect(r.eficiencia).toBe('99,987%');
    expect(r.semTratamento).toBe(false);
    expect(r.inviavel).toBe(false);
    expect(r.novet.slice(0, 3)).toEqual([1000, 816.64, 666.91]);
});

test('rio: mistura que já atende o padrão não pede tratamento', () => {
    const r = CalculadoraColicalc({ ...exemplo, ne: 1000 });
    expect(r.semTratamento).toBe(true);
    expect(r.novet[0]).toBeCloseTo(157.53, 2);
});

test('rio: Nr alto demais torna o padrão inatingível', () => {
    const r = CalculadoraColicalc({ ...exemplo, nr: 2000 });
    expect(r.inviavel).toBe(true);
});

test('represa: eficiência necessária e caso sem tratamento', () => {
    expect(CalculadoraColicalc({ ...exemplo, represa: true }).eficiencia).toBe('98,743%');
    expect(CalculadoraColicalc({ ...exemplo, represa: true, ne: 1000 }).semTratamento).toBe(true);
});
