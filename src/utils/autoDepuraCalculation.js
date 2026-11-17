const SEGUNDOS_POR_DIA = 86400;

// K2 (20ºC) pelas fórmulas hidráulicas; null quando H e v estão fora das faixas de validade
export const coeficienteK2 = (h, v) => {
  if (h < 4 && h >= 0.6 && 0.05 <= v && v < 0.8) {
    //formula O'Connor e Dobbins
    return 3.73 * Math.pow(v, 0.5) * Math.pow(h, -1.5);
  }
  if (h < 4 && h >= 0.6 && 0.8 <= v && v < 1.5) {
    //formula Churchill et al
    return 5 * Math.pow(v, 0.97) * Math.pow(h, -1.67);
  }
  if (h >= 0.1 && h < 0.6 && 0.05 <= v && v < 1.5) {
    //formula Owens et al
    return 5.3 * Math.pow(v, 0.67) * Math.pow(h, -1.85);
  }
  return null;
};

// trechos depois do primeiro; dados salvos antes desta versão (ou corrompidos) não têm a lista
export const trechosDe = (dados) => (Array.isArray(dados?.trechos) ? dados.trechos : []);

// lançamentos além do primeiro, no mesmo ponto (por exemplo, um efluente tratado e um bruto)
export const lancamentosDe = (dados) => (Array.isArray(dados?.lancamentos) ? dados.lancamentos : []);

// K1 usado para converter a DBO5 em DBO última (KT): o K1T, na temperatura do rio (padrão), ou o K1 a 20 °C do ensaio
export const CONVERSAO_KT = { k1t: 'K1T', k120c: 'K1 a 20 °C' };
export const conversaoKtDe = (dados) => (dados?.conversaoKt === 'k120c' ? 'k120c' : 'k1t');

// déficit de OD de Streeter-Phelps; a DBO se decompõe no rio com Kd (Von Sperling, item 8.8)
function deficit({ kd, k2, lo, d0 }, t) {
  if (Math.abs(k2 - kd) < 1e-9) return (kd * lo * t + d0) * Math.exp(-k2 * t);
  return ((kd * lo) / (k2 - kd)) * (Math.exp(-kd * t) - Math.exp(-k2 * t)) + d0 * Math.exp(-k2 * t);
}

// tempo até o déficit máximo; zero (ou indefinido) quando o déficit só diminui depois da mistura
function tempoCritico({ kd, k2, lo, d0 }) {
  const tc = Math.abs(k2 - kd) < 1e-9
    ? 1 / k2 - d0 / (kd * lo)
    : (1 / (k2 - kd)) * Math.log((k2 / kd) * (1 - (d0 * (k2 - kd)) / (lo * kd)));
  return tc > 0 ? tc : 0;
}

// K2T do trecho: informado, ou o de 20ºC (informado ou pelas fórmulas de H e v) corrigido pela temperatura
function reaeracao(dados, velocidade, corrigir) {
  const k2t = Number(dados.k2t);
  if (k2t) return { k2t, k220c: Number(dados.k220c) };
  const k220c = Number(dados.k220c) || (Number(dados.h) ? coeficienteK2(Number(dados.h), velocidade) ?? 0 : 0);
  return { k2t: corrigir(k220c), k220c };
}

// DBO5 que chega ao rio: com a eficiência E, a DBOe (ou a DBOefl) é reduzida pelo tratamento
function dboLancada({ e, dboe, dboefl }) {
  const bruta = Number(dboefl) || Number(dboe);
  return Number(e) ? (1 - Number(e) / 100) * bruta : bruta;
}

const lancamento = (dados) => ({ qe: Number(dados.qe), ode: Number(dados.ode), dboe: dboLancada(dados) });

// o primeiro lançamento fica nos campos do próprio trecho; os outros, na lista
const lancamentosDoTrecho = (dados) => [lancamento(dados), ...lancamentosDe(dados).map(lancamento)];

const soma = (lista, valor) => lista.reduce((total, item) => total + valor(item), 0);

// distâncias (m) dos pontos do perfil a partir do início do trecho: N partes iguais ou, com o intervalo
// em km, um ponto a cada intervalo e o fim do trecho (6,206 km a cada 1 km: 0, 1, ... 6 e 6,206)
export function pontosDoTrecho(distancia, { particoes, intervalo }) {
  if (!intervalo) return Array.from({ length: particoes + 1 }, (_, i) => (distancia / particoes) * i);
  const passo = intervalo * 1000;
  // o fim que cai sobre um múltiplo do intervalo (5 km a cada 1 km) não vira um ponto repetido
  const antesDoFim = Math.ceil(distancia / passo - 1e-6);
  return [...Array.from({ length: antesDoFim }, (_, i) => passo * i), distancia];
}

// mistura no início do trecho (rio e todos os lançamentos) e perfil de OD e DBO5 ao longo dele
function simularTrecho({ qr, odr, dbor, lancamentos, kt, kd, k2, cs, distancia, velocidade, divisao }) {
  const qe = soma(lancamentos, (l) => l.qe);
  const qt = qr + qe;
  const co = (qr * odr + soma(lancamentos, (l) => l.qe * l.ode)) / qt;
  const dbo5 = (qr * dbor + soma(lancamentos, (l) => l.qe * l.dboe)) / qt;
  const coeficientes = { kd, k2, lo: dbo5 * kt, d0: cs - co };
  const tempo = distancia / (velocidade * SEGUNDOS_POR_DIA);
  const tc = tempoCritico(coeficientes);
  const od = (t) => (t === 0 ? co : cs - deficit(coeficientes, t));
  const dbo = (t) => dbo5 * Math.exp(-kd * t);

  const pontos = pontosDoTrecho(distancia, divisao);
  const kmvet = pontos.map((x) => x / 1000);
  const odVet = pontos.map((x) => od(x / (velocidade * SEGUNDOS_POR_DIA)));
  const dboVet = pontos.map((x) => dbo(x / (velocidade * SEGUNDOS_POR_DIA)));

  return {
    qr, odr, dbor, qe, qt, co, dbo5, cs, ...divisao,
    lo: coeficientes.lo,
    deficit: coeficientes.d0,
    kd,
    kt,
    k2t: k2,
    distanciaKm: distancia / 1000,
    tempo,
    tc,
    xcKm: (tc * velocidade * SEGUNDOS_POR_DIA) / 1000,
    odc: od(tc),
    odFim: od(tempo),
    dbo5Fim: dbo(tempo),
    kmvet, odVet, dboVet,
  };
}

// menor OD de cada trecho; o ponto crítico depois do fim de um trecho intermediário nunca chega a
// acontecer, porque a próxima contribuição muda o rio. No último trecho ele vale, como no trecho único.
function minimoDoTrecho(trecho, ultimo) {
  const { tc, co, odc, odFim, xcKm, distanciaKm, inicioKm } = trecho;
  if (tc === 0) return { tipo: 'inicio', od: co, km: inicioKm };
  if (xcKm <= distanciaKm) return { tipo: 'critico', od: odc, km: inicioKm + xcKm };
  return ultimo
    ? { tipo: 'alem', od: odc, km: inicioKm + xcKm }
    : { tipo: 'fim', od: odFim, km: inicioKm + distanciaKm };
}

export const CalculadoraAutodepura = (props) => {
  const temperatura = Number(props.temperatura);
  const tetak1 = Number(props.tetak1);
  const tetak2 = Number(props.tetak2);
  const odmin = Number(props.odmin);
  // com o intervalo em km preenchido, ele substitui o Nº de divisões geral
  const geral = Number(props.intervalo) ? { intervalo: Number(props.intervalo) } : { particoes: Number(props.particoes) };

  const corrigirK1 = (k20c) => k20c * Math.pow(tetak1, temperatura - 20);
  const corrigirK2 = (k220c) => k220c * Math.pow(tetak2, temperatura - 20);

  // K1 informado a 20ºC (corrigido por θ e T) ou já na temperatura do rio; os trechos seguintes
  // podem ter o próprio K1 e, em branco, continuam com o do trecho anterior
  const desoxigenacao = (dados, anterior) => {
    const k120c = Number(dados.k120c);
    if (k120c) return { k120c, k1t: corrigirK1(k120c) };
    const k1t = Number(dados.k1t);
    return k1t || !anterior ? { k120c: 0, k1t } : anterior;
  };
  // o Kd informado vale para o rio todo; sem ele, a DBO se decompõe com o K1 de cada trecho (modelo clássico)
  const kd20c = Number(props.kd20c);
  const kdRio = kd20c ? corrigirK1(kd20c) : Number(props.kdt);
  // com o K1 a 20 °C escolhido e só o K1T informado, ele volta a 20 °C pelo mesmo θ
  const conversao = conversaoKtDe(props);
  const k1DaConversao = ({ k120c, k1t }) => (conversao === 'k1t' ? k1t : k120c || k1t / Math.pow(tetak1, temperatura - 20));
  const coeficientesK1 = (k1) => ({
    kd: kdRio || k1.k1t,
    kt: 1 / (1 - Math.exp(-5 * k1DaConversao(k1))),
  });

  // Cs' informado, ou calculado pela temperatura e pela altitude; nos trechos seguintes é opcional e,
  // em branco, continua o do trecho anterior (a altitude zero, ao nível do mar, também conta)
  const saturacao =
    14.652 -
    4.1022 * Math.pow(10, -1) * temperatura +
    7.991 * Math.pow(10, -3) * Math.pow(temperatura, 2) -
    7.7774 * Math.pow(10, -5) * Math.pow(temperatura, 3);
  const informada = (valor) => valor !== null && valor !== undefined && valor !== '';
  const saturacaoDe = (dados, anterior) => {
    const cslinha = Number(dados.cslinha);
    if (cslinha) return cslinha;
    if (informada(dados.altitude) || anterior === undefined) return saturacao * (1 - Number(dados.altitude) / 9450);
    return anterior;
  };
  const cs = saturacaoDe(props);
  // Nº de divisões de cada trecho; em branco, o geral (Nº ou intervalo)
  const divisaoDe = (dados) => (Number(dados.particoes) ? { particoes: Number(dados.particoes) } : geral);

  const velocidade = Number(props.velocidade);
  const k1Primeiro = desoxigenacao(props);
  const k2Primeiro = reaeracao(props, velocidade, corrigirK2);
  const trechos = [{
    ...simularTrecho({
      ...coeficientesK1(k1Primeiro),
      cs,
      divisao: geral,
      qr: Number(props.qr),
      odr: Number(props.odr),
      dbor: Number(props.dbor),
      lancamentos: lancamentosDoTrecho(props),
      k2: k2Primeiro.k2t,
      distancia: Number(props.distancia),
      velocidade,
    }),
    k1: k1Primeiro,
    k1t: k1Primeiro.k1t,
    k220c: k2Primeiro.k220c,
    inicioKm: 0,
  }];

  // cada trecho começa com a vazão total, o OD e a DBO5 do fim do anterior (Von Sperling, item 8.8)
  trechosDe(props).forEach((dados) => {
    const anterior = trechos[trechos.length - 1];
    const velocidadeTrecho = Number(dados.velocidade);
    const k1 = desoxigenacao(dados, anterior.k1);
    const { k2t, k220c } = reaeracao(dados, velocidadeTrecho, corrigirK2);
    trechos.push({
      ...simularTrecho({
        ...coeficientesK1(k1),
        cs: saturacaoDe(dados, anterior.cs),
        divisao: divisaoDe(dados),
        qr: anterior.qt,
        odr: anterior.odFim,
        dbor: anterior.dbo5Fim,
        // nos trechos seguintes a DBO da contribuição é a DBOe, com ou sem E
        lancamentos: lancamentosDoTrecho({ ...dados, dboefl: null }),
        k2: k2t,
        distancia: Number(dados.distancia),
        velocidade: velocidadeTrecho,
      }),
      k1,
      k1t: k1.k1t,
      k220c,
      inicioKm: anterior.inicioKm + anterior.distanciaKm,
    });
  });

  const resumos = trechos.map(({ kmvet, odVet, dboVet, k1, ...resumo }, i) => ({
    ...resumo,
    numero: i + 1,
    minimo: minimoDoTrecho(resumo, i === trechos.length - 1),
  }));
  const pior = resumos.reduce((menor, trecho) => (trecho.minimo.od < menor.minimo.od ? trecho : menor));
  const ultimo = resumos[resumos.length - 1];

  // perfil do rio inteiro; na divisa entre trechos entram o fim de um e a mistura do seguinte
  const kmvet = trechos.flatMap((trecho) => trecho.kmvet.map((km) => trecho.inicioKm + km));
  const ctVet = trechos.flatMap((trecho) => trecho.odVet.map((od) => od.toFixed(2)));

  return {
    ctVet,
    // número do trecho de cada ponto do perfil; cada trecho pode ter o próprio Nº de divisões
    trechoVet: trechos.flatMap((trecho, i) => trecho.kmvet.map(() => i + 1)),
    dboVet: trechos.flatMap((trecho) => trecho.dboVet.map((dbo) => Number(dbo.toFixed(2)))),
    odminVet: kmvet.map(() => odmin),
    particoesVet: kmvet.map((_, i) => i),
    kmvet,
    divisasKm: resumos.slice(1).map((trecho) => trecho.inicioKm),
    critico: {
      tc: pior.tc,
      xcKm: pior.minimo.km,
      odc: pior.minimo.od,
      co: pior.co,
      odmin,
      distanciaKm: ultimo.inicioKm + ultimo.distanciaKm,
      cs,
      odr: Number(props.odr),
      trecho: pior.numero,
      tipo: pior.minimo.tipo,
    },
    calculados: {
      conversao,
      k1t: trechos[0].k1t,
      kdt: trechos[0].kd,
      kt: trechos[0].kt,
      k2t: trechos[0].k2t,
      k220c: trechos[0].k220c,
      dbo5: trechos[0].dbo5,
      lo: trechos[0].lo,
      deficit: trechos[0].deficit,
    },
    trechos: resumos,
  };
};
