import { errosAutodepura, errosColicalc, errosPassoAutodepura } from './validacao';

const autodepura = {
    qr: 0.651, odr: 7, dbor: 2, odmin: 5, k120c: 0.38, tetak1: 1.047, temperatura: 23, k1t: null,
    tetak2: 1.024, h: null, k220c: 3.08, k2t: null, distancia: 50000, velocidade: 0.35, particoes: 10,
    cslinha: 7.8, qe: 0.114, ode: 0, dboe: 341, dboefl: null, e: null, altitude: null,
};

test('dados completos não geram erro', () => {
    expect(errosAutodepura(autodepura)).toEqual([]);
});

test('campos vazios são apontados no passo', () => {
    expect(errosPassoAutodepura('Dados do rio', 0, { ...autodepura, qr: null, odmin: null }))
        .toEqual(['Preencha: Qr, ODmín.']);
});

test('ODe igual a zero é um valor válido', () => {
    expect(errosPassoAutodepura('Dados do esgoto', 0, autodepura)).toEqual([]);
});

test('θ em branco é barrado', () => {
    expect(errosPassoAutodepura('Dados adicionais', 0, { ...autodepura, tetak1: null }))
        .toEqual(['Informe K1(20ºC), θ para K1 e T, ou então K1T.']);
});

test('H fora das faixas pede K2', () => {
    const erros = errosPassoAutodepura('Dados adicionais', 1, { ...autodepura, k220c: null, h: 5 });
    expect(erros[0]).toMatch(/fora das faixas/);
});

test('DBOefl junto com E é barrado', () => {
    expect(errosPassoAutodepura('Dados do esgoto', 1, { ...autodepura, dboe: null, e: 80, dboefl: 60 }))
        .toEqual(['Informe a DBOe (com ou sem E) ou a DBOefl, não os dois.']);
});

test('represa não exige distância, velocidade nem trechos', () => {
    const represa = { qr: 0.651, nr: 10, volume: 5000000, qe: 0.114, ne: 5e7, nop: 1000, temperatura: 23, kb: 1, teta: 1.07, represa: true };
    expect(errosColicalc(represa)).toEqual([]);
    expect(errosColicalc({ ...represa, represa: false })).toEqual(['Preencha: d, v, Nº trechos.']);
});
