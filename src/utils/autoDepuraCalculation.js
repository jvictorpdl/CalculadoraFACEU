/* eslint-disable no-lone-blocks */


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

export const CalculadoraAutodepura = (props) => {
  // console.log(props);
  const entrada = {
    qr: Number(props.qr),
    odr: Number(props.odr),
    dbor: Number(props.dbor),
    odmin: Number(props.odmin),
    k120c: Number(props.k120c),
    tetak1: Number(props.tetak1),
    temperatura: Number(props.temperatura),
    k1t: Number(props.k1t),
    tetak2: Number(props.tetak2),
    h: Number(props.h),
    k220c: Number(props.k220c),
    k2t: Number(props.k2t),
    distancia: Number(props.distancia),
    velocidade: Number(props.velocidade),
    particoes: Number(props.particoes),
    tempo: Number(props.tempo),
    cs: Number(props.cs),
    cslinha: Number(props.cslinha),
    qe: Number(props.qe),
    ode: Number(props.ode),
    dboe: Number(props.dboe),
    dboefl: Number(props.dboefl),
    e: Number(props.e),
    altitude: Number(props.altitude),
    //saída//
    lancamentos: props.lancamentos,
    co: 0,
    do: 0,
    dbo5: 0,
    kt: 0,
    tc: 0,
    distanciac: 0,
    deficitc: 0,
    odc: 0,
    ct: 0,
  };
  console.log(entrada);


  const particoesVet = [];
  const ctVet = [];
  const odminVet = [];
  const kmvet = [];
  console.log("props", entrada);

  if (entrada.k120c) {
    entrada.k1t =
      entrada.k120c * Math.pow(entrada.tetak1, entrada.temperatura - 20);

  }

  if (entrada.k2t) {
  } else if (entrada.k220c) {
    entrada.k2t =
      entrada.k220c * Math.pow(entrada.tetak2, entrada.temperatura - 20);


  } else if (entrada.h) {
    entrada.k220c = coeficienteK2(entrada.h, entrada.velocidade) ?? entrada.k220c;

    entrada.k2t = entrada.k220c * Math.pow(entrada.tetak2, entrada.temperatura - 20);

  }

  if (entrada.t) {
  } else {
    entrada.tempo = entrada.distancia / (entrada.velocidade * 86400); // ------------------------------
  }

  if (entrada.cslinha) {
  } else {
    entrada.cs =
      14.652 -
      4.1022 * Math.pow(10, -1) * entrada.temperatura +
      7.991 * Math.pow(10, -3) * Math.pow(entrada.temperatura, 2) -
      7.7774 * Math.pow(10, -5) * Math.pow(entrada.temperatura, 3);
    entrada.cslinha = entrada.cs * (1 - entrada.altitude / 9450);
  }

  if (entrada.e) {
    if (entrada.dboefl) {
      entrada.dboe = entrada.dboefl;
    }
    entrada.dboefl = (1 - entrada.e / 100) * entrada.dboe;
    // entrada.co =
    //   (entrada.qr * entrada.odr + entrada.qe * entrada.ode) /
    //   (entrada.qr + entrada.qe);
    //   console.log("variaveis para o co------------------------------: ", entrada.co, entrada.qr, entrada.odr, entrada.qe, entrada.ode);

  } 


    //DADOS DE SAÍDA
    //adicionar comentario
    entrada.co =
      (entrada.qr * entrada.odr + entrada.qe * entrada.ode) /
      (entrada.qr + entrada.qe);
      console.log("variaveis para o co ELSE------------------------------: ", entrada.co, entrada.qr, entrada.odr, entrada.qe, entrada.ode);


  // if (entrada.lancamentos.length) {
  //   let qeXode = 0, qe_qe = 0;

  //   entrada.lancamentos.map(lancamento => {
  //     qeXode += lancamento.qe * lancamento.ode;
  //     qe_qe += lancamento.qe;

  //   })

  //   entrada.co =
  //     (entrada.qr * entrada.odr + entrada.qe * entrada.ode + qeXode) /
  //     (entrada.qr + entrada.qe + qe_qe);
  // } else {
  //   entrada.co =
  //     (entrada.qr * entrada.odr + entrada.qe * entrada.ode) /
  //     (entrada.qr + entrada.qe); //isto é uma media entao ainda tem que inserir mais valores de qe seguindo a mesma logica caso o usuario queira inserir mais valores
  //   console.log("co: ", entrada.co);
  //   console.log("variaveis para o co/////////////////////////////: ", entrada.co, entrada.qr, entrada.odr, entrada.qe, entrada.ode);
  //   console.log("co: ", entrada.co);

  // }


  entrada.do = entrada.cslinha - entrada.co;
console.log("variaveis para o do------------------------------: ", entrada.do, entrada.cslinha , entrada.co);

  {
    //Concentração de DBO ultima mistura (Lo)
    // KT converte a DBO5 (ensaio a 20ºC) em DBO última, por isso usa K1 a 20ºC (Von Sperling)
    const k1Ensaio = entrada.k120c || entrada.k1t;
    entrada.kt = 1 / (1 - Math.exp(-5 * k1Ensaio));

    if (entrada.dboefl) {
      entrada.dbo5 =
        (entrada.qr * entrada.dbor + entrada.qe * entrada.dboefl) /
        (entrada.qr + entrada.qe); //  tem mais de um lançamento de esgoto
    } else {
      entrada.dbo5 =
        (entrada.qr * entrada.dbor + entrada.qe * entrada.dboe) /
        (entrada.qr + entrada.qe); //  tem mais de um lançamento de esgoto
    }

    entrada.lo = entrada.dbo5 * entrada.kt;
  }


  entrada.tc =
    (1 / (entrada.k2t - entrada.k1t)) *
    Math.log(
      (entrada.k2t / entrada.k1t) *
      (1 -
        (entrada.do * (entrada.k2t - entrada.k1t)) / (entrada.lo * entrada.k1t))
    );

  // eslint-disable-next-line no-lone-blocks
  {
    //ODC
    //deficitc = defice crítico
    if (entrada.tc > 0) {
      entrada.deficitc =
        (entrada.k1t / entrada.k2t) *
        entrada.lo *
        Math.pow(2.7182818285, -entrada.k1t * entrada.tc);
    } else {
      // tc negativo ou indefinido: o déficit só diminui, o pior ponto é o próprio lançamento
      entrada.tc = 0;
      entrada.deficitc = entrada.do;
    }

    entrada.dc = entrada.tc * entrada.velocidade * 86400;
    entrada.odc = entrada.cslinha - entrada.deficitc; //caso o odc der abaixo de 0, mostrar um alerta relatando que o modelo de Streeter-Phelps não seria válido nestas condições e paralisar o caso
  }


  for (let i = 0; i <= entrada.particoes; i++) {
    particoesVet.push(i);
    odminVet.push(entrada.odmin);

    let tempop =
      ((entrada.distancia / entrada.particoes) * i) /
      (entrada.velocidade * 86400);
    if (tempop === 0) {
      entrada.ct = entrada.co;

    } else {

      entrada.ct =
        entrada.cslinha -
        (((entrada.k1t * entrada.lo) / (entrada.k2t - entrada.k1t)) *
          (Math.pow(2.7182818285, -entrada.k1t * tempop) -
            Math.pow(2.7182818285, -entrada.k2t * tempop)) +
          (entrada.cslinha - entrada.co) *
          Math.pow(2.7182818285, -entrada.k2t * tempop));


    }

    let aux = entrada.distancia / entrada.particoes;
    kmvet.push((aux * i) / 1000);
    ctVet.push(entrada.ct.toFixed(2));

  }
  const resultado = {
    ctVet,
    odminVet,
    particoesVet,
    kmvet,
    critico: {
      tc: entrada.tc,
      xcKm: entrada.dc / 1000,
      odc: entrada.odc,
      co: entrada.co,
      odmin: entrada.odmin,
      distanciaKm: entrada.distancia / 1000,
    },
  };
  return resultado;
};