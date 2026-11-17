import { coeficienteK2, conversaoKtDe, lancamentosDe, trechosDe } from "./autoDepuraCalculation";

// Regras de preenchimento de cada passo; cada regra devolve a lista de erros,
// cada um com a mensagem e os rótulos dos campos que devem ser destacados

const preenchido = (v) => v !== null && v !== undefined && v !== '' && !Number.isNaN(Number(v));
const positivo = (v) => preenchido(v) && Number(v) > 0;
const decimal = (v) => String(v).replace('.', ',');
const erro = (mensagem, ...campos) => ({ mensagem, campos });

const faltando = (dados, campos) => campos.filter(([chave]) => !preenchido(dados[chave])).map(([, rotulo]) => rotulo);

function exigir(dados, campos) {
    const rotulos = faltando(dados, campos);
    return rotulos.length ? [erro(`Preencha: ${rotulos.join(', ')}.`, ...rotulos)] : [];
}

function exigirPositivo(dados, campos) {
    return campos
        .filter(([chave]) => preenchido(dados[chave]) && !positivo(dados[chave]))
        .map(([, rotulo]) => erro(`${rotulo} deve ser maior que zero.`, rotulo));
}

// Caminhos alternativos para chegar ao mesmo valor: com um deles preenchido, os outros ficam
// bloqueados na tela. T, θ e v ficam de fora porque também servem a outros cálculos.
export const CAMINHOS = {
    dboEsgoto: [[['e', 'E'], ['dboe', 'DBOe']], [['dboefl', 'DBOefl']]],
    k1: [[['k120c', 'K1 (20 °C)'], ['kd20c', 'Kd (20 °C)']], [['k1t', 'K1T'], ['kdt', 'KdT']]],
    // nos trechos seguintes só o K1 muda; o Kd vale para o rio todo
    k1Trecho: [[['k120c', 'K1 (20 °C)']], [['k1t', 'K1T']]],
    k2: [[['h', 'H']], [['k220c', 'K2 (20 °C)']], [['k2t', 'K2T']]],
    cs: [[['altitude', 'Altitude']], [['cslinha', "Cs'"]]],
    // pontos do perfil: N partes iguais ou um ponto a cada intervalo em km, como na planilha
    divisoes: [[['particoes', 'Nº']], [['intervalo', 'Intervalo']]],
};

const preenchidosNo = (dados, caminho) => caminho.filter(([chave]) => preenchido(dados[chave])).map(([, rotulo]) => rotulo);

// rótulos que bloqueiam o caminho; vazio quando ele está livre ou já foi escolhido
export function bloqueadoPor(dados, caminhos, indice) {
    if (preenchidosNo(dados, caminhos[indice]).length) return [];
    return caminhos.flatMap((caminho, i) => (i === indice ? [] : preenchidosNo(dados, caminho)));
}

// dados salvos antes da trava podem ter dois caminhos preenchidos; o cálculo não escolhe por conta própria
function conflito(dados, caminhos, mensagem, nomeDoCampo = (rotulo) => rotulo) {
    const usados = caminhos.map((caminho) => preenchidosNo(dados, caminho)).filter((rotulos) => rotulos.length);
    return usados.length > 1 ? [erro(mensagem, ...usados.flat().map(nomeDoCampo))] : [];
}

function exigirDivisoes(dados, chave, rotulo, nome) {
    const n = Number(dados[chave]);
    // acima de 1000 divisões o gráfico não ganha nada e valores enormes travam a página
    return preenchido(dados[chave]) && (!Number.isInteger(n) || n < 1 || n > 1000)
        ? [erro(`${nome} deve ser um número inteiro entre 1 e 1000.`, rotulo)]
        : [];
}

// o mesmo limite do Nº: um intervalo pequeno num trecho longo daria milhares de pontos
const intervaloDemais = (intervalo, distancia) => positivo(distancia) && Number(distancia) / (Number(intervalo) * 1000) > 1000;

function exigirIntervalo(dados) {
    if (!preenchido(dados.intervalo)) return [];
    if (!positivo(dados.intervalo)) return [erro('Intervalo deve ser maior que zero.', 'Intervalo')];
    return intervaloDemais(dados.intervalo, dados.distancia)
        ? [erro(`Com intervalo de ${decimal(dados.intervalo)} km, a distância d teria mais de 1000 divisões. Use um intervalo maior.`, 'Intervalo', 'd')]
        : [];
}

// faixas fisicamente plausíveis; valores fora delas costumam ser erro de digitação ou de unidade
function exigirFaixa(dados, campos) {
    return campos
        .filter(([chave, , minimo, maximo]) => preenchido(dados[chave]) && (Number(dados[chave]) < minimo || Number(dados[chave]) > maximo))
        .map(([, rotulo, minimo, maximo, unidade]) => erro(`${rotulo} deve estar entre ${decimal(minimo)} e ${decimal(maximo)}${unidade ? ' ' + unidade : ''}.`, rotulo));
}

const faixaT = ['temperatura', 'T', 0, 40, '°C'];
const faixaV = ['velocidade', 'v', 0, 5, 'm/s'];
const faixaD = ['distancia', 'd', 0, 1000000, 'm'];

export const MAXIMO_TRECHOS = 20;

// os campos dos trechos seguintes repetem os rótulos; o destaque de erro precisa saber de qual trecho é
export const campoDoTrecho = (rotulo, numero) => `${rotulo} (trecho ${numero})`;

export const MAXIMO_LANCAMENTOS = 10;

// o primeiro lançamento é o dos campos do trecho; os da lista começam no 2
export const campoDoLancamento = (rotulo, numero, trecho) =>
    (trecho ? `${rotulo} (trecho ${trecho}, lançamento ${numero})` : `${rotulo} (lançamento ${numero})`);

function errosDoLancamento(lancamento, numero, trecho) {
    const prefixo = trecho ? `Trecho ${trecho}, lançamento ${numero}` : `Lançamento ${numero}`;
    const erroLancamento = (mensagem, ...rotulos) => erro(`${prefixo}: ${mensagem}`, ...rotulos.map((rotulo) => campoDoLancamento(rotulo, numero, trecho)));

    const vazios = [['qe', 'Qe'], ['ode', 'ODe'], ['dboe', 'DBOe']].filter(([chave]) => !preenchido(lancamento[chave])).map(([, rotulo]) => rotulo);
    if (vazios.length) return [erroLancamento(`preencha ${vazios.join(', ')} ou remova o lançamento.`, ...vazios)];
    return [
        // Qe = 0 vale: o lançamento existe na planilha mas não entra na mistura (por exemplo, o efluente tratado de um trecho sem ETE)
        ...[['qe', 'Qe', 0, 1000000, 'm³/s'], ['ode', 'ODe', 0, 20, 'mg/L'], ['dboe', 'DBOe', 0, 100000, 'mg/L'], ['e', 'E', 0, 100, '%']]
            .filter(([chave, , minimo, maximo]) => preenchido(lancamento[chave]) && (Number(lancamento[chave]) < minimo || Number(lancamento[chave]) > maximo))
            .map(([, rotulo, minimo, maximo, unidade]) => erroLancamento(`${rotulo} deve estar entre ${decimal(minimo)} e ${decimal(maximo)} ${unidade}.`, rotulo)),
    ];
}

function errosLancamentos(dados, trecho) {
    const lancamentos = lancamentosDe(dados);
    return [
        ...(lancamentos.length > MAXIMO_LANCAMENTOS ? [erro(`Use no máximo ${MAXIMO_LANCAMENTOS} lançamentos além do primeiro.`)] : []),
        ...lancamentos.flatMap((lancamento, i) => errosDoLancamento(lancamento, i + 2, trecho)),
    ];
}

function errosDoTrecho(trecho, numero, dados) {
    const erroTrecho = (mensagem, ...rotulos) => erro(`Trecho ${numero}: ${mensagem}`, ...rotulos.map((rotulo) => campoDoTrecho(rotulo, numero)));
    const erros = [];

    const vazios = [['distancia', 'd'], ['velocidade', 'v']].filter(([chave]) => !preenchido(trecho[chave])).map(([, rotulo]) => rotulo);
    if (vazios.length) erros.push(erroTrecho(`preencha ${vazios.join(', ')}.`, ...vazios));
    [['distancia', 'd'], ['velocidade', 'v']]
        .filter(([chave]) => preenchido(trecho[chave]) && !positivo(trecho[chave]))
        .forEach(([, rotulo]) => erros.push(erroTrecho(`${rotulo} deve ser maior que zero.`, rotulo)));
    [faixaD, faixaV, ['ode', 'ODe', 0, 20, 'mg/L'], ['e', 'E', 0, 100, '%']]
        .filter(([chave, , minimo, maximo]) => preenchido(trecho[chave]) && (Number(trecho[chave]) < minimo || Number(trecho[chave]) > maximo))
        .forEach(([, rotulo, minimo, maximo, unidade]) => erros.push(erroTrecho(`${rotulo} deve estar entre ${decimal(minimo)} e ${decimal(maximo)} ${unidade}.`, rotulo)));

    // a contribuição é opcional: sem Qe (em branco ou zero), o trecho só muda de velocidade, profundidade, K1 ou K2.
    // Com Qe = 0 os demais valores não entram na mistura; com Qe em branco, só um valor diferente de zero indica que faltou a vazão
    if (positivo(trecho.qe)) {
        const semValor = [['ode', 'ODe'], ['dboe', 'DBOe']].filter(([chave]) => !preenchido(trecho[chave])).map(([, rotulo]) => rotulo);
        if (semValor.length) erros.push(erroTrecho(`preencha ${semValor.join(', ')} da contribuição.`, ...semValor));
    } else if (!preenchido(trecho.qe) && ['ode', 'dboe', 'e'].some((chave) => preenchido(trecho[chave]) && Number(trecho[chave]) !== 0)) {
        erros.push(erroTrecho('informe a vazão Qe da contribuição ou apague ODe, DBOe e E.', 'Qe'));
    }
    erros.push(...errosLancamentos(trecho, numero));

    // K1 do trecho é opcional: em branco, continua o do trecho anterior
    const k1 = conflito(trecho, CAMINHOS.k1Trecho, `Trecho ${numero}: use K1 (20 °C) ou K1T, não os dois. Apague um deles.`,
        (rotulo) => campoDoTrecho(rotulo, numero));
    erros.push(...k1);
    if (!k1.length) {
        [['k120c', 'K1 (20 °C)'], ['k1t', 'K1T']]
            .filter(([chave]) => preenchido(trecho[chave]) && !positivo(trecho[chave]))
            .forEach(([, rotulo]) => erros.push(erroTrecho(`${rotulo} deve ser maior que zero.`, rotulo)));
        if (positivo(trecho.k120c) && (!positivo(dados.tetak1) || !preenchido(dados.temperatura))) {
            erros.push(erroTrecho('para corrigir o K1 pela temperatura, informe θ para K1 e T em Dados adicionais.'));
        }
    }

    erros.push(...conflito(trecho, CAMINHOS.k2, `Trecho ${numero}: use só uma opção para o K2 (H, K2 (20 °C) ou K2T) e apague as outras.`,
        (rotulo) => campoDoTrecho(rotulo, numero)));

    if (!positivo(trecho.k2t)) {
        if (!positivo(trecho.k220c)) {
            if (!positivo(trecho.h)) {
                erros.push(erroTrecho('informe H, K2 (20 °C) ou K2T.', 'H', 'K2 (20 °C)', 'K2T'));
            } else if (positivo(trecho.velocidade) && coeficienteK2(Number(trecho.h), Number(trecho.velocidade)) === null) {
                erros.push(erroTrecho(`H = ${decimal(trecho.h)} m e v = ${decimal(trecho.velocidade)} m/s estão fora das faixas das fórmulas de K2 (O'Connor-Dobbins, Churchill, Owens). Informe K2 (20 °C) ou K2T.`, 'v', 'H'));
            }
        }
        // só quando o trecho já usa uma das opções a 20 °C; antes disso o aviso só atrapalha
        if ((positivo(trecho.k220c) || positivo(trecho.h)) && (!positivo(dados.tetak2) || !preenchido(dados.temperatura))) {
            erros.push(erroTrecho('para corrigir o K2 pela temperatura, informe θ para K2 e T em Dados adicionais.'));
        }
    }

    // Cs' do trecho é opcional (pronto ou pela altitude): em branco, continua o do trecho anterior
    const cs = conflito(trecho, CAMINHOS.cs, `Trecho ${numero}: use a altitude (para calcular o Cs' com T) ou o Cs' já pronto, não os dois. Apague um deles.`,
        (rotulo) => campoDoTrecho(rotulo, numero));
    erros.push(...cs);
    if (!cs.length) {
        if (preenchido(trecho.cslinha) && !positivo(trecho.cslinha)) erros.push(erroTrecho("Cs' deve ser maior que zero.", "Cs'"));
        [["cslinha", "Cs'", 0, 20, 'mg/L'], ['altitude', 'Altitude', 0, 5000, 'm']]
            .filter(([chave, , minimo, maximo]) => preenchido(trecho[chave]) && (Number(trecho[chave]) < minimo || Number(trecho[chave]) > maximo))
            .forEach(([, rotulo, minimo, maximo, unidade]) => erros.push(erroTrecho(`${rotulo} deve estar entre ${decimal(minimo)} e ${decimal(maximo)} ${unidade}.`, rotulo)));
        if (preenchido(trecho.altitude) && !preenchido(dados.temperatura)) {
            erros.push(erroTrecho("para calcular o Cs' pela altitude, informe T em Dados adicionais."));
        }
    }

    // Nº de divisões do trecho é opcional: em branco, vale o de Dados adicionais (Nº ou intervalo)
    const divisoes = Number(trecho.particoes);
    if (preenchido(trecho.particoes) && (!Number.isInteger(divisoes) || divisoes < 1 || divisoes > 1000)) {
        erros.push(erroTrecho('Nº de divisões deve ser um número inteiro entre 1 e 1000.', 'Nº'));
    } else if (!preenchido(trecho.particoes) && positivo(dados.intervalo) && intervaloDemais(dados.intervalo, trecho.distancia)) {
        erros.push(erro(`Trecho ${numero}: com o intervalo de ${decimal(dados.intervalo)} km, o trecho teria mais de 1000 divisões. Use um intervalo maior ou informe o Nº do trecho.`,
            'Intervalo', campoDoTrecho('Nº', numero)));
    }
    return erros;
}

function errosTrechos(dados) {
    const trechos = trechosDe(dados);
    return [
        ...(trechos.length > MAXIMO_TRECHOS ? [erro(`Use no máximo ${MAXIMO_TRECHOS} trechos seguintes.`)] : []),
        ...trechos.flatMap((trecho, i) => errosDoTrecho(trecho, i + 2, dados)),
    ];
}

const regrasAutodepura = {
    'Dados do rio': [
        (d) => [
            ...exigir(d, [['qr', 'Qr'], ['odr', 'ODr'], ['dbor', 'DBOr'], ['odmin', 'ODmín']]),
            ...exigirPositivo(d, [['qr', 'Qr']]),
            ...exigirFaixa(d, [['odr', 'ODr', 0, 20, 'mg/L'], ['odmin', 'ODmín', 0, 20, 'mg/L']]),
        ],
    ],
    'Dados do esgoto': [
        (d) => [
            ...exigir(d, [['qe', 'Qe'], ['ode', 'ODe']]),
            ...exigirPositivo(d, [['qe', 'Qe']]),
            ...exigirFaixa(d, [['ode', 'ODe', 0, 20, 'mg/L']]),
        ],
        (d) => {
            if (preenchido(d.dboefl) && (preenchido(d.e) || preenchido(d.dboe))) {
                return [erro('Informe a DBOe (com ou sem E) ou a DBOefl, não os dois.', 'E', 'DBOe', 'DBOefl')];
            }
            if (!preenchido(d.dboefl) && !preenchido(d.dboe)) {
                return [erro('Informe a DBOe ou a DBOefl.', 'DBOe', 'DBOefl')];
            }
            if (preenchido(d.e) && (Number(d.e) < 0 || Number(d.e) > 100)) {
                return [erro('E deve estar entre 0 e 100%.', 'E')];
            }
            return [];
        },
        (d) => errosLancamentos(d),
    ],
    'Dados adicionais': [
        (d) => {
            // o Kd a 20 °C fica na mesma linha do K1 a 20 °C, então a correção por θ e T já é exigida por ele
            const linhas = conflito(d, CAMINHOS.k1, 'Use a linha a 20 °C (K1 e Kd) ou a linha na temperatura do rio (K1T e KdT), não as duas. Apague os valores de uma delas.');
            if (linhas.length) return linhas;
            if (!(positivo(d.k1t) || (positivo(d.k120c) && positivo(d.tetak1) && preenchido(d.temperatura)))) {
                return [erro('Informe K1 (20 °C), θ para K1 e T, ou então K1T.',
                    ...faltando(d, [['k120c', 'K1 (20 °C)'], ['tetak1', 'θ para K1'], ['temperatura', 'T'], ['k1t', 'K1T']]))];
            }
            // converter com o K1 a 20 °C a partir do K1T exige voltar o K1 a 20 °C; nos trechos seguintes vale o mesmo θ e T
            if (conversaoKtDe(d) === 'k120c' && !positivo(d.k120c) && (!positivo(d.tetak1) || !preenchido(d.temperatura))) {
                return [erro('Para converter a DBO5 com o K1 a 20 °C a partir do K1T, informe θ para K1 e T (ou converta com o K1T).',
                    ...faltando(d, [['tetak1', 'θ para K1'], ['temperatura', 'T']]))];
            }
            return [
                ...exigirFaixa(d, [['tetak1', 'θ para K1', 1, 1.2], faixaT]),
                ...exigirPositivo(d, [['kd20c', 'Kd (20 °C)'], ['kdt', 'KdT']]),
            ];
        },
        (d) => {
            const opcoes = conflito(d, CAMINHOS.k2, 'Use só uma opção para o K2 (H, K2 (20 °C) ou K2T) e apague as outras.');
            if (opcoes.length) return opcoes;
            const faixas = exigirFaixa(d, [['tetak2', 'θ para K2', 1, 1.2], faixaT, faixaV]);
            if (positivo(d.k2t)) return faixas;
            const erros = [...faixas];
            if (!positivo(d.k220c)) {
                if (!positivo(d.h) || !positivo(d.velocidade)) {
                    return [...erros, erro('Informe K2 (20 °C), K2T, ou H e v para calcular o K2.',
                        ...faltando(d, [['velocidade', 'v'], ['h', 'H'], ['k220c', 'K2 (20 °C)'], ['k2t', 'K2T']]))];
                }
                if (coeficienteK2(Number(d.h), Number(d.velocidade)) === null) {
                    erros.push(erro(`H = ${decimal(d.h)} m e v = ${decimal(d.velocidade)} m/s estão fora das faixas das fórmulas de K2 (O'Connor-Dobbins, Churchill, Owens). Informe K2 (20 °C) ou K2T.`, 'v', 'H'));
                }
            }
            if (!positivo(d.tetak2) || !preenchido(d.temperatura)) {
                erros.push(erro('Informe θ para K2 e T para corrigir o K2 pela temperatura.',
                    ...faltando(d, [['tetak2', 'θ para K2'], ['temperatura', 'T']])));
            }
            return erros;
        },
        (d) => {
            const distancia = [
                ...exigir(d, [['distancia', 'd'], ['velocidade', 'v']]),
                ...exigirPositivo(d, [['distancia', 'd'], ['velocidade', 'v']]),
                ...exigirFaixa(d, [faixaD, faixaV]),
            ];
            const opcoes = conflito(d, CAMINHOS.divisoes, 'Use o Nº de divisões ou o intervalo em km, não os dois. Apague um deles.');
            if (opcoes.length) return [...distancia, ...opcoes];
            if (!preenchido(d.particoes) && !preenchido(d.intervalo)) {
                return [...distancia, erro('Informe o Nº de divisões ou o intervalo em km.', 'Nº', 'Intervalo')];
            }
            return [...distancia, ...exigirDivisoes(d, 'particoes', 'Nº', 'Nº de divisões'), ...exigirIntervalo(d)];
        },
        (d) => {
            const opcoes = conflito(d, CAMINHOS.cs, "Use a altitude (para calcular o Cs' com T) ou o Cs' já pronto, não os dois. Apague um deles.");
            if (opcoes.length) return opcoes;
            return positivo(d.cslinha) || preenchido(d.temperatura)
                ? exigirFaixa(d, [['cslinha', "Cs'", 0, 20, 'mg/L'], ['altitude', 'Altitude', 0, 5000, 'm'], faixaT])
                : [erro("Informe Cs', ou a temperatura T (e a altitude, se houver) para calculá-lo.", 'T', "Cs'")];
        },
    ],
    'Trechos seguintes': [errosTrechos],
};

const regrasColicalc = {
    'Dados do rio': (d) => [
        ...exigir(d, [['qr', 'Qr'], ['nr', 'Nr']]),
        ...exigirPositivo(d, [['qr', 'Qr']]),
    ],
    'Dados da represa': (d) => [
        ...exigir(d, [['qr', 'Qr'], ['nr', 'Nr'], ['volume', 'V']]),
        ...exigirPositivo(d, [['qr', 'Qr'], ['volume', 'V']]),
    ],
    'Dados do esgoto': (d) => [
        ...exigir(d, [['qe', 'Qe'], ['ne', 'Ne']]),
        ...exigirPositivo(d, [['qe', 'Qe'], ['ne', 'Ne']]),
    ],
    'Dados da mistura': (d) => [
        ...exigir(d, [['nop', 'Nop']]),
        ...exigirPositivo(d, [['nop', 'Nop']]),
    ],
    'Dados adicionais': (d) => d.represa
        ? [
            ...exigir(d, [['temperatura', 'T'], ['kb', 'Kb'], ['teta', 'θ para Kb']]),
            ...exigirPositivo(d, [['kb', 'Kb'], ['teta', 'θ para Kb']]),
            ...exigirFaixa(d, [faixaT, ['teta', 'θ para Kb', 1, 1.2]]),
        ]
        : [
            ...exigir(d, [['temperatura', 'T'], ['distancia', 'd'], ['velocidade', 'v'], ['kb', 'Kb'], ['teta', 'θ para Kb'], ['particoes', 'Nº trechos']]),
            ...exigirPositivo(d, [['distancia', 'd'], ['velocidade', 'v'], ['kb', 'Kb'], ['teta', 'θ para Kb']]),
            ...exigirFaixa(d, [faixaT, ['teta', 'θ para Kb', 1, 1.2], faixaD, faixaV]),
            ...exigirDivisoes(d, 'particoes', 'Nº trechos', 'Nº de trechos'),
        ],
};

const semRepetidos = (erros) => erros.filter((e, i) => erros.findIndex((outro) => outro.mensagem === e.mensagem) === i);

export function errosPassoAutodepura(colecao, passo, dados) {
    const regra = regrasAutodepura[colecao]?.[passo];
    return regra ? regra(dados) : [];
}

export function errosAutodepura(dados) {
    return semRepetidos(Object.values(regrasAutodepura).flat().flatMap((regra) => regra(dados)));
}

export function errosPassoColicalc(colecao, dados) {
    const regra = regrasColicalc[colecao];
    return regra ? regra(dados) : [];
}

export function errosColicalc(dados) {
    const colecoes = [dados.represa ? 'Dados da represa' : 'Dados do rio', 'Dados do esgoto', 'Dados da mistura', 'Dados adicionais'];
    return semRepetidos(colecoes.flatMap((colecao) => regrasColicalc[colecao](dados)));
}
