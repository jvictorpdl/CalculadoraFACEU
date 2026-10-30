import { CalculadoraAutodepura } from './autoDepuraCalculation';
import { CalculadoraColicalc } from './coliCalcCalculation';
import { errosAutodepura, errosColicalc } from './validacao';

// Entradas aleatórias (semente fixa): tudo que a validação aceita precisa gerar números finitos

let semente = 12345;
const aleatorio = () => { semente = (semente * 1103515245 + 12345) % 2147483648; return semente / 2147483648; };
const entre = (a, b) => a + (b - a) * aleatorio();
const escolha = (lista) => lista[Math.floor(aleatorio() * lista.length)];
const talvez = (valor) => (aleatorio() < 0.08 ? escolha([null, 0, 1e9, 1e-9]) : valor);
const casas = (v, n = 3) => Number(v.toFixed(n));

beforeAll(() => jest.spyOn(console, 'log').mockImplementation(() => { }));

test('AutoDepura: entradas aceitas pela validação dão resultado finito', () => {
    let aceitas = 0;
    for (let i = 0; i < 3000; i++) {
        const k1 = escolha(['20', 'T']);
        const k2 = escolha(['hv', '20', 'T']);
        const dbo = escolha(['dboe', 'e', 'efl']);
        const d = {
            qr: talvez(casas(entre(0.01, 50))), odr: talvez(casas(entre(0, 12))), dbor: talvez(casas(entre(0, 15))), odmin: talvez(casas(entre(2, 7))),
            qe: talvez(casas(entre(0.001, 10))), ode: talvez(casas(entre(0, 6))),
            dboe: dbo !== 'efl' ? talvez(casas(entre(20, 600))) : null,
            e: dbo === 'e' ? talvez(casas(entre(0, 99))) : null,
            dboefl: dbo === 'efl' ? talvez(casas(entre(5, 200))) : null,
            k120c: k1 === '20' ? talvez(casas(entre(0.05, 0.6))) : null, tetak1: talvez(casas(entre(1, 1.08))),
            k1t: k1 === 'T' ? talvez(casas(entre(0.05, 0.8))) : null, temperatura: talvez(casas(entre(5, 35), 1)),
            tetak2: talvez(casas(entre(1, 1.04))), h: k2 === 'hv' ? talvez(casas(entre(0.1, 5))) : null,
            velocidade: talvez(casas(entre(0.03, 1.6))), k220c: k2 === '20' ? talvez(casas(entre(0.1, 5))) : null,
            k2t: k2 === 'T' ? talvez(casas(entre(0.1, 5))) : null, distancia: talvez(casas(entre(100, 200000), 0)),
            particoes: talvez(Math.floor(entre(1, 60))), cslinha: escolha([talvez(casas(entre(5, 12))), null]),
            altitude: talvez(casas(entre(0, 3000), 0)),
        };
        if (errosAutodepura(d).length) continue;
        aceitas++;
        const r = CalculadoraAutodepura(d);
        expect(r.ctVet).toHaveLength(d.particoes + 1);
        r.ctVet.forEach((od) => expect(Number.isFinite(Number(od))).toBe(true));
        [r.critico.tc, r.critico.xcKm, r.critico.odc].forEach((v) => expect(Number.isFinite(v)).toBe(true));
        expect(r.critico.tc).toBeGreaterThanOrEqual(0);
    }
    expect(aceitas).toBeGreaterThan(500);
});

test('ColiCalc: entradas aceitas pela validação dão resultado finito', () => {
    let aceitas = 0;
    for (let i = 0; i < 3000; i++) {
        const represa = aleatorio() < 0.5;
        const d = {
            represa, qr: talvez(casas(entre(0.01, 50))), nr: talvez(casas(entre(0, 5000), 0)), volume: talvez(casas(entre(1e4, 1e8), 0)),
            qe: talvez(casas(entre(0.001, 10))), ne: talvez(casas(entre(1e3, 1e8), 0)), nop: talvez(escolha([200, 1000, 4000])),
            temperatura: talvez(casas(entre(5, 35), 1)), kb: talvez(casas(entre(0.1, 3))), teta: talvez(casas(entre(1, 1.1))),
            distancia: represa ? null : talvez(casas(entre(100, 200000), 0)), velocidade: represa ? null : talvez(casas(entre(0.03, 1.6))),
            particoes: represa ? null : talvez(Math.floor(entre(1, 60))),
        };
        if (errosColicalc(d).length) continue;
        aceitas++;
        const r = CalculadoraColicalc(d);
        if (!r.semTratamento && !r.inviavel) {
            expect(r.eficienciaValor).toBeGreaterThan(0);
            expect(r.eficienciaValor).toBeLessThanOrEqual(1);
        }
        r.novet.forEach((n) => expect(Number.isFinite(n)).toBe(true));
    }
    expect(aceitas).toBeGreaterThan(500);
});
