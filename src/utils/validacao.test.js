import { errosAutodepura, errosColicalc, errosPassoAutodepura } from './validacao';

const autodepura = {
    qr: 0.651, odr: 7, dbor: 2, odmin: 5, k120c: 0.38, tetak1: 1.047, temperatura: 23, k1t: null,
    tetak2: 1.024, h: null, k220c: 3.08, k2t: null, distancia: 50000, velocidade: 0.35, particoes: 10,
    cslinha: 7.8, qe: 0.114, ode: 0, dboe: 341, dboefl: null, e: null, altitude: null,
};

const mensagens = (erros) => erros.map((erro) => erro.mensagem);

test('dados completos não geram erro', () => {
    expect(errosAutodepura(autodepura)).toEqual([]);
});

test('campos vazios são apontados no passo', () => {
    expect(mensagens(errosPassoAutodepura('Dados do rio', 0, { ...autodepura, qr: null, odmin: null })))
        .toEqual(['Preencha: Qr, ODmín.']);
});

test('ODe igual a zero é um valor válido', () => {
    expect(errosPassoAutodepura('Dados do esgoto', 0, autodepura)).toEqual([]);
});

test('θ em branco é barrado', () => {
    expect(mensagens(errosPassoAutodepura('Dados adicionais', 0, { ...autodepura, tetak1: null })))
        .toEqual(['Informe K1 (20 °C), θ para K1 e T, ou então K1T.']);
});

test('H fora das faixas pede K2', () => {
    const erros = errosPassoAutodepura('Dados adicionais', 1, { ...autodepura, k220c: null, h: 5 });
    expect(erros[0].mensagem).toMatch(/fora das faixas/);
});

test('DBOefl junto com E é barrado', () => {
    expect(mensagens(errosPassoAutodepura('Dados do esgoto', 1, { ...autodepura, dboe: null, e: 80, dboefl: 60 })))
        .toEqual(['Informe a DBOe (com ou sem E) ou a DBOefl, não os dois.']);
});

test('represa não exige distância, velocidade nem trechos', () => {
    const represa = { qr: 0.651, nr: 10, volume: 5000000, qe: 0.114, ne: 5e7, nop: 1000, temperatura: 23, kb: 1, teta: 1.07, represa: true };
    expect(errosColicalc(represa)).toEqual([]);
    expect(mensagens(errosColicalc({ ...represa, represa: false }))).toEqual(['Preencha: d, v, Nº trechos.']);
});

test('Nº de divisões enorme é barrado (travaria a página)', () => {
    expect(mensagens(errosPassoAutodepura('Dados adicionais', 2, { ...autodepura, particoes: 1000000000 })))
        .toEqual(['Nº de divisões deve ser um número inteiro entre 1 e 1000.']);
    expect(mensagens(errosColicalc({ qr: 1, nr: 10, qe: 1, ne: 1e7, nop: 1000, temperatura: 20, kb: 1, teta: 1.07, distancia: 1000, velocidade: 0.3, particoes: 0.5, represa: false })))
        .toEqual(['Nº de trechos deve ser um número inteiro entre 1 e 1000.']);
});

test('Kd é opcional; a 20 °C ele precisa de θ e T para a correção', () => {
    expect(errosAutodepura({ ...autodepura, kd20c: 0.5 })).toEqual([]);
    expect(errosAutodepura({ ...autodepura, k120c: null, k1t: 0.44, kdt: 0.77 })).toEqual([]);
    expect(mensagens(errosPassoAutodepura('Dados adicionais', 0, { ...autodepura, k120c: null, tetak1: null, k1t: 0.44, kd20c: 0.5 })))
        .toEqual(['Para corrigir o Kd (20 °C) pela temperatura, informe θ para K1 e T.']);
});

const trecho = { qe: 0.45, ode: 7.7, dboe: 1, e: null, distancia: 25000, velocidade: 0.33, h: null, k220c: null, k2t: 4.6 };
const errosDosTrechos = (trechos) => errosPassoAutodepura('Trechos seguintes', 0, { ...autodepura, trechos });

test('trechos seguintes completos, ou sem nenhum, não geram erro', () => {
    expect(errosDosTrechos([])).toEqual([]);
    expect(errosAutodepura({ ...autodepura, trechos: [trecho, { ...trecho, qe: null, ode: null, dboe: null, k2t: null, h: 1 }] })).toEqual([]);
    // dados salvos antes da versão com trechos
    expect(errosAutodepura({ ...autodepura, trechos: undefined })).toEqual([]);
});

test('cada erro de trecho diz qual é o trecho e destaca só os campos dele', () => {
    const erros = errosDosTrechos([trecho, { ...trecho, distancia: null, velocidade: null }]);

    expect(mensagens(erros)).toEqual(['Trecho 3: preencha d, v.']);
    expect(erros[0].campos).toEqual(['d (trecho 3)', 'v (trecho 3)']);
});

test('contribuição pela metade é barrada; sem Qe, ODe e DBOe ficam em branco', () => {
    expect(mensagens(errosDosTrechos([{ ...trecho, dboe: null }]))).toEqual(['Trecho 2: preencha DBOe da contribuição.']);
    expect(mensagens(errosDosTrechos([{ ...trecho, qe: null }]))).toEqual(['Trecho 2: informe a vazão Qe da contribuição ou apague ODe, DBOe e E.']);
});

test('trecho sem K2 pede uma das opções; K2 pela temperatura exige θ e T', () => {
    expect(mensagens(errosDosTrechos([{ ...trecho, k2t: null }]))).toEqual(['Trecho 2: informe H, K2 (20 °C) ou K2T.']);
    expect(mensagens(errosDosTrechos([{ ...trecho, k2t: null, h: 5 }]))[0]).toMatch(/^Trecho 2: H = 5 m e v = 0,33 m\/s estão fora das faixas/);
    expect(mensagens(errosPassoAutodepura('Trechos seguintes', 0, { ...autodepura, tetak2: null, trechos: [{ ...trecho, k2t: null, k220c: 3 }] })))
        .toEqual(['Trecho 2: para corrigir o K2 pela temperatura, informe θ para K2 e T em Dados adicionais.']);
});

test('valores fora das faixas plausíveis são barrados', () => {
    expect(mensagens(errosPassoAutodepura('Dados adicionais', 0, { ...autodepura, temperatura: 1000 })))
        .toEqual(['T deve estar entre 0 e 40 °C.']);
    expect(mensagens(errosPassoAutodepura('Dados adicionais', 1, { ...autodepura, tetak2: 3 })))
        .toEqual(['θ para K2 deve estar entre 1 e 1,2.']);
    expect(mensagens(errosPassoAutodepura('Dados do rio', 0, { ...autodepura, odr: 70 })))
        .toEqual(['ODr deve estar entre 0 e 20 mg/L.']);
});

test('cada erro aponta os campos a destacar', () => {
    expect(errosPassoAutodepura('Dados do rio', 0, { ...autodepura, qr: null, odmin: null })[0].campos)
        .toEqual(['Qr', 'ODmín']);
    expect(errosPassoAutodepura('Dados adicionais', 0, { ...autodepura, k120c: null })[0].campos)
        .toEqual(['K1 (20 °C)', 'K1T']);
    expect(errosPassoAutodepura('Dados adicionais', 2, { ...autodepura, particoes: 0 })[0].campos)
        .toEqual(['Nº']);
});
