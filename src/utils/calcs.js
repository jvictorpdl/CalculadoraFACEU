/* eslint-disable no-lone-blocks */
export const Calculadora = (props) => {
  console.log(props);
  const entrada = {
    qr: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
    odr: Number(String(props.odr).replaceAll('.', '').replace(',', '.')),
    dbor: Number(String(props.dbor).replaceAll('.', '').replace(',', '.')),
    odmin: Number(String(props.odmin).replaceAll('.', '').replace(',', '.')),
    k120c: Number(String(props.k120c).replaceAll('.', '').replace(',', '.')),
    tetak1: Number(String(props.tetak1).replaceAll('.', '').replace(',', '.')),
    temperatura: Number(String(props.temperatura).replaceAll('.', '').replace(',', '.')),
    k1t: Number(String(props.k1t).replaceAll('.', '').replace(',', '.')),
    tetak2: Number(String(props.tetak2).replaceAll('.', '').replace(',', '.')),
    h: Number(String(props.h).replaceAll('.', '').replace(',', '.')),
    k220c: Number(String(props.k220c).replaceAll('.', '').replace(',', '.')),
    k2t: Number(String(props.k2t).replaceAll('.', '').replace(',', '.')),
    distancia: Number(String(props.distancia).replaceAll('.', '').replace(',', '.')),
    velocidade: Number(String(props.velocidade).replaceAll('.', '').replace(',', '.')),
    particoes: Number(String(props.particoes).replaceAll('.', '').replace(',', '.')),
    tempo: Number(String(props.tempo).replaceAll('.', '').replace(',', '.')),
    cs: Number(String(props.cs).replaceAll('.', '').replace(',', '.')),
    cslinha: Number(String(props.cslinha).replaceAll('.', '').replace(',', '.')),
    qe: Number(String(props.qe).replaceAll('.', '').replace(',', '.')),
    ode: Number(String(props.ode).replaceAll('.', '').replace(',', '.')),
    dboe: Number(String(props.dboe).replaceAll('.', '').replace(',', '.')),
    dboefl: Number(String(props.dboefl).replaceAll('.', '').replace(',', '.')),
    e: Number(String(props.e).replaceAll('.', '').replace(',', '.')),
    altitude: Number(String(props.altitude).replaceAll('.', '').replace(',', '.')),
    //saída//
    co: 0,
    do: 0,
    dbo5: 0,
    kt: 0,
    tc: 0,
    distanciac: 0,
    deficitc: 0,
    odc: 0,
    ct: 0,
    lancamentos: props.lancamentos,
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
    if (
      entrada.h < 4 &&
      entrada.h >= 0.6 &&
      0.05 <= entrada.velocidade &&
      entrada.velocidade < 0.8
    ) {
      //formula O'Connor e Dobbins
      entrada.k220c =
        3.73 * Math.pow(entrada.velocidade, 0.5) * Math.pow(entrada.h, -1.5);
    } else if (
      entrada.h < 4 &&
      entrada.h >= 0.6 &&
      0.8 <= entrada.velocidade &&
      entrada.velocidade < 1.5
    ) {
      //formula Churchill et al
      entrada.k220c =
        5 * Math.pow(entrada.velocidade, 0.97) * Math.pow(entrada.h, -1.67);
    } else if (
      entrada.h >= 0.1 &&
      entrada.h < 0.6 &&
      0.05 <= entrada.velocidade &&
      entrada.velocidade < 1.5
    ) {
      //formula Owens et al
      entrada.k220c =
        5.3 * Math.pow(entrada.velocidade, 0.67) * Math.pow(entrada.h, -1.85);
    }

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
  } else


    //DADOS DE SAÍDA
    //adicionar comentario
    entrada.co =
      (entrada.qr * entrada.odr + entrada.qe * entrada.ode) /
      (entrada.qr + entrada.qe);
  if (entrada.lancamentos.length) {
    let qeXode = 0, qe_qe = 0;

    entrada.lancamentos.map(lancamento => {
      qeXode += lancamento.qe * lancamento.ode;
      qe_qe += lancamento.qe;

    })
    console.log("variaveis para o co------------------------------: ", entrada.co, entrada.qr, entrada.odr, entrada.qe, entrada.ode);

    entrada.co =
      (entrada.qr * entrada.odr + entrada.qe * entrada.ode + qeXode) /
      (entrada.qr + entrada.qe + qe_qe);
  } else {
    entrada.co =
      (entrada.qr * entrada.odr + entrada.qe * entrada.ode) /
      (entrada.qr + entrada.qe); //isto é uma media entao ainda tem que inserir mais valores de qe seguindo a mesma logica caso o usuario queira inserir mais valores
    console.log("co: ", entrada.co);
    console.log("variaveis para o co/////////////////////////////: ", entrada.co, entrada.qr, entrada.odr, entrada.qe, entrada.ode);
    console.log("co: ", entrada.co);

  }


  entrada.do = entrada.cslinha - entrada.co;

  {
    //Concentração de DBO ultima mistura (Lo)
    if (entrada.dboefl) {
      entrada.dbo5 =
        (entrada.qr * entrada.dbor + entrada.qe * entrada.dboefl) /
        (entrada.qr + entrada.qe); //  tem mais de um lançamento de esgoto
      entrada.kt =
        1 / (1 - Math.pow(2.72, -5 * Number(entrada.k1t.toFixed(2))));



      entrada.lo = entrada.dbo5 * entrada.kt;

    
    } else {
      entrada.dbo5 =
        (entrada.qr * entrada.dbor + entrada.qe * entrada.dboe) /
        (entrada.qr + entrada.qe); //  tem mais de um lançamento de esgoto

      entrada.kt =
        1 / (1 - Math.pow(2.72, -5 * Number(entrada.k1t.toFixed(2))));

      entrada.lo = entrada.dbo5 * entrada.kt;

    }
  }


  entrada.tc =
    (1 / (entrada.k2t - entrada.k1t)) *
    Math.log(
      (entrada.k2t / entrada.k1t) *
      (1 -
        ((entrada.do * (entrada.k2t - entrada.k1t)) / entrada.lo) *
        entrada.k1t)
    );

  entrada.dc = entrada.tc * entrada.velocidade * 86400;
  // entrada.dc = Number(entrada.dc).toFixed(2)

  // eslint-disable-next-line no-lone-blocks
  {
    //ODC
    //deficitc = defice crítico
    entrada.deficitc =
      (entrada.k1t / entrada.k2t) *
      entrada.lo *
      Math.pow(2.7182818285, -entrada.k1t * entrada.tc);
    // entrada.deficitc = Number(entrada.deficitc).toFixed(2)


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
  };
  return resultado;
};