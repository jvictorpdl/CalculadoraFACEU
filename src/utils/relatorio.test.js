import { CalculadoraAutodepura } from './autoDepuraCalculation';
import { CalculadoraColicalc } from './coliCalcCalculation';
import { conclusaoAutodepura, nomeArquivo, relatorioAutodepura, relatorioColicalc, relatorioCsv } from './relatorio';

// exemplo do Von Sperling, o mesmo dos demais testes
const rio = {
    qr: 0.651, odr: 7, dbor: 2, odmin: 5, qe: 0.114, ode: 0, dboe: 341, e: null, dboefl: null,
    k120c: 0.38, tetak1: 1.047, temperatura: 23, k1t: null, tetak2: 1.024, h: null, k220c: 3.08, k2t: null,
    distancia: 50000, velocidade: 0.35, particoes: 10, altitude: null, cslinha: 7.8,
};
const coliformes = {
    qr: 0.651, nr: 10, volume: 5000000, qe: 0.114, ne: 50000000, nop: 1000, temperatura: 23,
    distancia: 50000, velocidade: 0.35, kb: 1, teta: 1.07, particoes: 10,
};
const gerado = new Date(2026, 9, 31, 14, 30);

const montarAutodepura = (dados = rio) => relatorioAutodepura(dados, CalculadoraAutodepura(dados));
const montarColicalc = (dados) => relatorioColicalc(dados, CalculadoraColicalc(dados));
const linhasDe = (relatorio) => relatorio.fornecidos.flatMap((grupo) => grupo.linhas);

beforeAll(() => jest.spyOn(console, 'log').mockImplementation(() => { }));

test('o relatório traz os valores fornecidos e deixa de fora o que ficou em branco', () => {
    const relatorio = montarAutodepura();
    const rotulos = linhasDe(relatorio).map((linha) => linha.rotulo);

    expect(rotulos).toEqual(expect.arrayContaining(['Qr', 'ODr', 'DBOe', 'K1 (20 °C)', 'θ para K2', "Cs'", 'Nº']));
    expect(rotulos).not.toContain('E');
    expect(rotulos).not.toContain('Altitude');
    expect(linhasDe(relatorio).find((linha) => linha.rotulo === 'Qr')).toMatchObject({ valor: 0.651, texto: '0,651', unidade: 'm³/s' });
});

test('o zero digitado é um valor fornecido, não um campo em branco', () => {
    expect(linhasDe(montarAutodepura()).find((linha) => linha.rotulo === 'ODe')).toMatchObject({ valor: 0, texto: '0' });
});

test('os valores calculados e a conclusão do relatório são os mesmos da tela', () => {
    const resultado = CalculadoraAutodepura(rio);
    const relatorio = relatorioAutodepura(rio, resultado);
    const calculado = (rotulo) => relatorio.calculados.find((linha) => linha.rotulo === rotulo);

    expect(relatorio.conclusao).toEqual(conclusaoAutodepura(resultado));
    expect(calculado('ODc').valor).toBeCloseTo(resultado.critico.odc, 2);
    expect(calculado('xc').valor).toBeCloseTo(resultado.critico.xcKm, 2);
    expect(calculado('K2 (20 °C)')).toBeUndefined();
    expect(relatorio.perfil.linhas).toHaveLength(rio.particoes + 1);
    expect(relatorio.perfil.linhas[0]).toEqual([0, Number(resultado.ctVet[0])]);
});

test('K2 calculado por H e v aparece nos valores calculados', () => {
    const relatorio = montarAutodepura({ ...rio, k220c: null, h: 1, velocidade: 0.35, e: 80 });

    expect(relatorio.calculados.find((linha) => linha.rotulo === 'K2 (20 °C)').valor).toBeCloseTo(3.73 * Math.sqrt(0.35), 3);
});

test('com OD negativo o relatório avisa e não traz perfil', () => {
    const relatorio = montarAutodepura({ ...rio, qr: 0.02, dbor: 50, velocidade: 0.1 });

    expect(relatorio.conclusao.titulo).toBe('Concentração negativa de oxigênio dissolvido');
    expect(relatorio.perfil).toBeNull();
    expect(relatorio.calculados).toEqual([]);
    expect(linhasDe(relatorio).length).toBeGreaterThan(0);
});

test('ColiCalc em rio traz eficiência e perfil; em represa, só a eficiência', () => {
    const noRio = montarColicalc({ ...coliformes, represa: false });
    const naRepresa = montarColicalc({ ...coliformes, represa: true });
    const eficiencia = (relatorio) => relatorio.calculados.find((linha) => linha.rotulo === 'E').valor;

    expect(noRio.arquivo).toBe('colicalc-rio');
    expect(eficiencia(noRio)).toBeCloseTo(CalculadoraColicalc({ ...coliformes, represa: false }).eficienciaValor * 100, 3);
    expect(noRio.perfil.linhas).toHaveLength(coliformes.particoes + 1);
    expect(linhasDe(noRio).map((linha) => linha.rotulo)).not.toContain('V');

    expect(naRepresa.arquivo).toBe('colicalc-represa');
    expect(naRepresa.perfil).toBeNull();
    expect(linhasDe(naRepresa).map((linha) => linha.rotulo)).toContain('V');
    expect(linhasDe(naRepresa).map((linha) => linha.rotulo)).not.toContain('d');
});

test('ColiCalc sem necessidade de tratamento não mostra eficiência', () => {
    const relatorio = montarColicalc({ ...coliformes, represa: false, ne: 100, nop: 100000 });

    expect(relatorio.conclusao.atende).toBe(true);
    expect(relatorio.calculados.map((linha) => linha.rotulo)).not.toContain('E');
});

test('ColiCalc inviável não traz perfil nem eficiência acima de 100%', () => {
    const relatorio = montarColicalc({ ...coliformes, represa: false, nr: 5000 });

    expect(relatorio.conclusao.atende).toBe(false);
    expect(relatorio.perfil).toBeNull();
    expect(relatorio.calculados.map((linha) => linha.rotulo)).not.toContain('E');
});

test('o CSV abre no Excel em português e separa cada parte', () => {
    const csv = relatorioCsv(montarAutodepura(), gerado);
    const linhas = csv.split('\r\n');

    expect(csv.startsWith('﻿')).toBe(true);
    expect(csv).toContain('Dados do rio;Qr;Vazão do rio;0,651;m³/s');
    expect(csv).toContain('Valores calculados');
    expect(csv).toContain('Distância (km);OD (mg/L)');
    expect(linhas.at(-2).split(';')).toHaveLength(2);
});

test('o CSV escapa o separador dentro do texto', () => {
    const relatorio = { ...montarAutodepura(), descricao: 'rio; "trecho" 2' };

    expect(relatorioCsv(relatorio, gerado)).toContain('"rio; ""trecho"" 2"');
});

test('o nome do arquivo identifica a calculadora e a data', () => {
    expect(nomeArquivo({ arquivo: 'colicalc-rio' }, gerado, 'pdf')).toBe('colicalc-rio-2026-10-31.pdf');
    expect(nomeArquivo({ arquivo: 'autodepura' }, gerado, 'png', '-grafico')).toBe('autodepura-grafico-2026-10-31.png');
});
