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

test('faixas das fórmulas de K2', () => {
    expect(coeficienteK2(1, 0.35)).toBeCloseTo(3.73 * Math.sqrt(0.35), 6);
    expect(coeficienteK2(1.5, 1.0)).toBeCloseTo(5 * Math.pow(1.5, -1.67), 6);
    expect(coeficienteK2(0.4, 0.3)).toBeCloseTo(5.3 * Math.pow(0.3, 0.67) * Math.pow(0.4, -1.85), 6);
    expect(coeficienteK2(5, 0.35)).toBeNull();
});
