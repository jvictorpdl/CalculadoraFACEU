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

// mistura no início do trecho e perfil de OD e DBO5 ao longo dele
function simularTrecho({ qr, odr, dbor, qe, ode, dboe, kt, kd, k2, cs, distancia, velocidade, particoes }) {
  const qt = qr + qe;
  const co = (qr * odr + qe * ode) / qt;
  const dbo5 = (qr * dbor + qe * dboe) / qt;
  const coeficientes = { kd, k2, lo: dbo5 * kt, d0: cs - co };
  const tempo = distancia / (velocidade * SEGUNDOS_POR_DIA);
  const tc = tempoCritico(coeficientes);
  const od = (t) => (t === 0 ? co : cs - deficit(coeficientes, t));
  const dbo = (t) => dbo5 * Math.exp(-kd * t);

  const kmvet = [];
  const odVet = [];
  const dboVet = [];
  for (let i = 0; i <= particoes; i++) {
    const t = ((distancia / particoes) * i) / (velocidade * SEGUNDOS_POR_DIA);
    kmvet.push(((distancia / particoes) * i) / 1000);
    odVet.push(od(t));
    dboVet.push(dbo(t));
  }

  return {
    qr, odr, dbor, qe, ode, dboe, qt, co, dbo5,
    lo: coeficientes.lo,
    deficit: coeficientes.d0,
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
  const particoes = Number(props.particoes);

  const k120c = Number(props.k120c);
  const k1t = k120c ? k120c * Math.pow(tetak1, temperatura - 20) : Number(props.k1t);
  // sem Kd, a DBO se decompõe no rio com o próprio K1 (modelo clássico)
  const kd20c = Number(props.kd20c);
  const kdt = kd20c ? kd20c * Math.pow(tetak1, temperatura - 20) : Number(props.kdt) || k1t;
  // KT converte a DBO5 (ensaio a 20ºC) em DBO última, por isso usa K1 a 20ºC (Von Sperling)
  const kt = 1 / (1 - Math.exp(-5 * (k120c || k1t)));
  const corrigirK2 = (k220c) => k220c * Math.pow(tetak2, temperatura - 20);

  let cs = Number(props.cslinha);
  if (!cs) {
    const saturacao =
      14.652 -
      4.1022 * Math.pow(10, -1) * temperatura +
      7.991 * Math.pow(10, -3) * Math.pow(temperatura, 2) -
      7.7774 * Math.pow(10, -5) * Math.pow(temperatura, 3);
    cs = saturacao * (1 - Number(props.altitude) / 9450);
  }

  const comum = { kt, kd: kdt, cs, particoes };
  const velocidade = Number(props.velocidade);
  const k2Primeiro = reaeracao(props, velocidade, corrigirK2);
  const trechos = [{
    ...simularTrecho({
      ...comum,
      qr: Number(props.qr),
      odr: Number(props.odr),
      dbor: Number(props.dbor),
      qe: Number(props.qe),
      ode: Number(props.ode),
      dboe: dboLancada(props),
      k2: k2Primeiro.k2t,
      distancia: Number(props.distancia),
      velocidade,
    }),
    k220c: k2Primeiro.k220c,
    inicioKm: 0,
  }];

  // cada trecho começa com a vazão total, o OD e a DBO5 do fim do anterior (Von Sperling, item 8.8)
  trechosDe(props).forEach((dados) => {
    const anterior = trechos[trechos.length - 1];
    const velocidadeTrecho = Number(dados.velocidade);
    const { k2t, k220c } = reaeracao(dados, velocidadeTrecho, corrigirK2);
    trechos.push({
      ...simularTrecho({
        ...comum,
        qr: anterior.qt,
        odr: anterior.odFim,
        dbor: anterior.dbo5Fim,
        qe: Number(dados.qe),
        ode: Number(dados.ode),
        dboe: dboLancada({ e: dados.e, dboe: dados.dboe }),
        k2: k2t,
        distancia: Number(dados.distancia),
        velocidade: velocidadeTrecho,
      }),
      k220c,
      inicioKm: anterior.inicioKm + anterior.distanciaKm,
    });
  });

  const resumos = trechos.map(({ kmvet, odVet, dboVet, ...resumo }, i) => ({
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
      k1t,
      kdt,
      kt,
      k2t: trechos[0].k2t,
      k220c: trechos[0].k220c,
      dbo5: trechos[0].dbo5,
      lo: trechos[0].lo,
      deficit: trechos[0].deficit,
    },
    trechos: resumos,
  };
};
