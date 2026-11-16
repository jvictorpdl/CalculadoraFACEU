import { CalculadoraEutrofriza, SEGUNDOS_POR_ANO } from './eutroFrizaCalculation';
import { relatorioCsv } from './relatorio';
import { relatorioEutrofriza, textoGrau } from './relatorioEutrofriza';
import { errosEutrofriza, errosPassoEutrofriza } from './validacaoEutrofriza';

// Exemplo 3.5 do Von Sperling (2005)
const exemplo = {
    volume: 10e6, vazao: 50e6 / SEGUNDOS_POR_ANO,
    areaMatas: 40, areaAgricola: 10, areaUrbana: 10,
    coefMatas: null, coefAgricola: null, coefUrbana: null,
    populacao: 16000, percapita: null, e: null, outras: null,
    modeloKs: null, pmax: 50,
};
const vazio = Object.fromEntries(Object.keys(exemplo).map((chave) => [chave, null]));
const montar = (dados) => relatorioEutrofriza(dados, CalculadoraEutrofriza(dados));
const mensagens = (erros) => erros.map((erro) => erro.mensagem);

test('o exemplo do livro passa em todas as regras', () => {
    expect(errosEutrofriza(exemplo)).toEqual([]);
});

test('V, Q e Pmáx são obrigatórios e maiores que zero', () => {
    expect(errosPassoEutrofriza('Dados da represa', vazio)).toEqual([{ mensagem: 'Preencha: V, Q.', campos: ['V', 'Q'] }]);
    expect(mensagens(errosPassoEutrofriza('Dados da represa', { ...exemplo, vazao: 0 }))).toEqual(['Q deve ser maior que zero.']);
    expect(mensagens(errosPassoEutrofriza('Dados adicionais', { ...exemplo, pmax: null }))).toEqual(['Preencha: Pmáx.']);
});

test('a bacia aceita áreas em branco ou zero, mas não fora da faixa', () => {
    expect(errosPassoEutrofriza('Dados da bacia', vazio)).toEqual([]);
    expect(errosPassoEutrofriza('Dados da bacia', { ...exemplo, areaUrbana: 0 })).toEqual([]);
    expect(errosPassoEutrofriza('Dados da bacia', { ...exemplo, coefUrbana: 20000 })[0].campos).toEqual(['Coef. urbana']);
});

test('sem nenhuma fonte de fósforo o cálculo não segue', () => {
    const semFonte = { ...exemplo, areaMatas: null, areaAgricola: 0, areaUrbana: null, populacao: null };
    expect(errosPassoEutrofriza('Dados do esgoto', semFonte)).toEqual([{
        mensagem: 'Informe ao menos uma fonte de fósforo: áreas da bacia, População ou Outras cargas.',
        campos: ['População', 'Outras cargas'],
    }]);
    expect(errosPassoEutrofriza('Dados do esgoto', { ...semFonte, outras: 100 })).toEqual([]);
});

test('carga per capita e E pedem a população; população é um número inteiro', () => {
    expect(errosPassoEutrofriza('Dados do esgoto', { ...exemplo, populacao: null, e: 80 })[0].campos).toEqual(['População']);
    expect(mensagens(errosPassoEutrofriza('Dados do esgoto', { ...exemplo, populacao: 1000.5 })))
        .toEqual(['População deve ser um número inteiro de habitantes.']);
    expect(mensagens(errosPassoEutrofriza('Dados do esgoto', { ...exemplo, e: 120 }))).toEqual(['E deve estar entre 0 e 100 %.']);
});

test('relatório do exemplo: conclusão, cargas por fonte e carga admissível', () => {
    const relatorio = montar(exemplo);
    const valor = (rotulo) => relatorio.calculados.find((linha) => linha.rotulo === rotulo);

    expect(relatorio.conclusao).toEqual({
        atende: false,
        titulo: 'Não atende o fósforo máximo desejado',
        linhas: [
            'Fósforo total na represa: 104,5 mg/m³ (0,1045 mg/L), grau de trofia hipereutrófico. Pmáx = 50,0 mg/m³.',
            'A carga afluente precisa cair de 9.900 para 4.736 kgP/ano, uma redução de 52,2%.',
        ],
    });
    expect(valor('t')).toMatchObject({ valor: 0.2, unidade: 'ano' });
    expect(valor('L matas')).toMatchObject({ valor: 400, descricao: 'Carga de matas e florestas: 40 km² × 10 kgP/km²·ano (valor do livro)' });
    expect(valor('L esgoto')).toMatchObject({ valor: 8000 });
    expect(valor('L')).toMatchObject({ valor: 9900 });
    expect(valor('Lmáx')).toMatchObject({ texto: '4.736,1' });
    expect(valor('Redução')).toMatchObject({ valor: 52.2, unidade: '%' });
    // coeficientes em branco não são valores fornecidos; o valor do livro aparece na carga
    expect(relatorio.fornecidos.flatMap((grupo) => grupo.linhas).map((linha) => linha.rotulo))
        .toEqual(['V', 'Q', 'Matas', 'Agrícola', 'Urbana', 'População', 'Pmáx']);
});

test('represa que atende: sem linha de redução e com aviso de tempo de detenção curto', () => {
    const relatorio = montar({ ...exemplo, populacao: 0, vazao: 100 });
    expect(relatorio.conclusao.atende).toBe(true);
    expect(relatorio.calculados.find((linha) => linha.rotulo === 'Redução')).toBeUndefined();
    expect(relatorio.calculados.find((linha) => linha.rotulo === 'L esgoto')).toBeUndefined();
    expect(relatorio.conclusao.linhas[2]).toMatch(/^Atenção: o tempo de detenção é de 1,16 dia\./);
});

test('grau de trofia entre duas classes quando as faixas se sobrepõem', () => {
    expect(textoGrau(['Mesotrófico', 'Eutrófico'])).toBe('entre mesotrófico e eutrófico');
    expect(montar({ ...exemplo, populacao: 2000 }).conclusao.linhas[0]).toMatch(/grau de trofia entre mesotrófico e eutrófico\./);
});

test('o CSV do EutroFriza sai com os valores calculados', () => {
    const csv = relatorioCsv(montar(exemplo), new Date(2026, 10, 15, 10, 0));
    expect(csv).toContain('Relatório EutroFriza');
    expect(csv).toContain('Calculado;P;Concentração de fósforo total na represa (0,1045 mg/L), grau de trofia hipereutrófico;104,5;mg/m³');
});

test('entradas aceitas pela validação dão resultado finito', () => {
    let semente = 7;
    const aleatorio = () => { semente = (semente * 1103515245 + 12345) % 2147483648; return semente / 2147483648; };
    const talvez = (valor) => (aleatorio() < 0.15 ? [null, 0, 1e9, 1e-9][Math.floor(aleatorio() * 4)] : valor);
    let aceitas = 0;
    for (let i = 0; i < 3000; i++) {
        const d = {
            volume: talvez(Math.round(1e4 + aleatorio() * 1e10)), vazao: talvez(Number((0.001 + aleatorio() * 500).toFixed(5))),
            areaMatas: talvez(Math.round(aleatorio() * 5000)), areaAgricola: talvez(Math.round(aleatorio() * 5000)), areaUrbana: talvez(Math.round(aleatorio() * 500)),
            coefMatas: talvez(null), coefAgricola: talvez(null), coefUrbana: talvez(Number((aleatorio() * 300).toFixed(2))),
            populacao: talvez(Math.round(aleatorio() * 1e6)), percapita: talvez(Number((aleatorio() * 2).toFixed(2))), e: talvez(Math.round(aleatorio() * 100)),
            outras: talvez(Math.round(aleatorio() * 1e4)), modeloKs: [null, 'salas', 'castagnino', 'vollenweider'][Math.floor(aleatorio() * 4)],
            pmax: talvez(Math.round(1 + aleatorio() * 200)),
        };
        if (errosEutrofriza(d).length) continue;
        aceitas++;
        const r = CalculadoraEutrofriza(d);
        [r.tempo, r.ks, r.carga, r.fosforo, r.cargaAdmissivel, r.reducao].forEach((v) => expect(Number.isFinite(v)).toBe(true));
        expect(r.fosforo).toBeGreaterThanOrEqual(0);
        expect(r.graus.length).toBeGreaterThan(0);
        expect(() => montar(d)).not.toThrow();
    }
    expect(aceitas).toBeGreaterThan(500);
});
