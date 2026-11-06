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
    expect(relatorio.perfil.linhas[0]).toEqual([0, Number(resultado.ctVet[0]), resultado.dboVet[0]]);
    expect(relatorio.porTrecho).toBeNull();
});

// Exemplo 8.5 (Von Sperling), segundo exemplo da planilha: dois trechos
const exemplo85 = {
    qr: 0.76, odr: 7.1, dbor: 2, odmin: 5, qe: 0.114, ode: 0, dboe: 341, e: null, dboefl: null,
    k120c: null, tetak1: null, temperatura: 20, k1t: 0.44, kd20c: null, kdt: 0.77,
    tetak2: null, h: null, k220c: null, k2t: 5.23, cslinha: 7.9, altitude: null,
    distancia: 50000, velocidade: 0.26, particoes: 20,
    trechos: [{ qe: 0.45, ode: 7.7, dboe: 1, e: null, distancia: 25000, velocidade: 0.33, h: null, k220c: null, k2t: 4.6 }],
};

test('com vários trechos o relatório traz os dados e os resultados de cada um', () => {
    const relatorio = montarAutodepura(exemplo85);
    const linhaTrecho = (rotulo) => relatorio.porTrecho.linhas.find((linha) => linha.rotulo === rotulo).valores.map(({ valor }) => valor);

    expect(relatorio.descricao).toBe('Autodepuração de rio em 2 trechos pelo modelo de Streeter-Phelps');
    expect(relatorio.fornecidos.map((grupo) => grupo.titulo)).toEqual(['Dados do rio', 'Dados do esgoto', 'Dados adicionais', 'Trecho 2']);
    expect(relatorio.fornecidos[3].linhas.map((linha) => linha.rotulo)).toEqual(['Qe', 'ODe', 'DBOe', 'd', 'v', 'K2T']);
    expect(relatorio.calculados.map((linha) => linha.rotulo)).toEqual(['K1T', 'KdT', "Cs'"]);
    expect(relatorio.porTrecho.colunas).toEqual(['Trecho 1', 'Trecho 2']);
    expect(linhaTrecho('Qt')).toEqual([0.874, 1.324]);
    expect(linhaTrecho('OD final')).toEqual([6.28, 7.23]);
    expect(linhaTrecho('Menor OD')).toEqual([2.2, 6.76]);
    expect(relatorio.perfil.colunas.map((coluna) => coluna.titulo)).toEqual(['Trecho', 'Distância (km)', 'OD (mg/L)', 'DBO5 (mg/L)']);
    expect(relatorio.perfil.linhas[0][0]).toBe(1);
    expect(relatorio.perfil.linhas.at(-1)).toEqual([2, 75, 7.23, 2.97]);
});

test('a conclusão com vários trechos aponta onde fica o menor OD do rio', () => {
    const conclusao = montarAutodepura(exemplo85).conclusao;

    expect(conclusao.atende).toBe(false);
    expect(conclusao.linhas[0]).toBe('Menor OD do rio: 2,20 mg/L, no ponto crítico do trecho 1, a 8,6 km do primeiro lançamento (tc = 0,38 dia após a mistura). ODmín = 5,00 mg/L.');
    expect(conclusao.linhas).toContain('Abaixo do ODmín: trecho 1.');
    expect(montarAutodepura({ ...exemplo85, odmin: 2 }).conclusao.atende).toBe(true);
});

test('o CSV com vários trechos tem uma coluna por trecho', () => {
    const csv = relatorioCsv(montarAutodepura(exemplo85), gerado);

    expect(csv).toContain('Resultados por trecho\r\nParâmetro;Descrição;Unidade;Trecho 1;Trecho 2');
    expect(csv).toContain('Qt;Vazão total após a mistura;m³/s;0,874;1,324');
    expect(csv).toContain('Trecho 2;Qe;Vazão da contribuição no início do trecho (esgoto ou afluente);0,45;m³/s');
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
    expect(csv).toContain('Distância (km);OD (mg/L);DBO5 (mg/L)');
    expect(linhas.at(-2).split(';')).toHaveLength(3);
});

test('o CSV escapa o separador dentro do texto', () => {
    const relatorio = { ...montarAutodepura(), descricao: 'rio; "trecho" 2' };

    expect(relatorioCsv(relatorio, gerado)).toContain('"rio; ""trecho"" 2"');
});

test('o nome do arquivo identifica a calculadora e a data', () => {
    expect(nomeArquivo({ arquivo: 'colicalc-rio' }, gerado, 'pdf')).toBe('colicalc-rio-2026-10-31.pdf');
    expect(nomeArquivo({ arquivo: 'autodepura' }, gerado, 'png', '-grafico')).toBe('autodepura-grafico-2026-10-31.png');
});
