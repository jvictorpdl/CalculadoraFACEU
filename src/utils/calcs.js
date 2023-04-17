import React from "react";
import { useState} from "react";

// export const Calculadorak1t = (props) => {
//   console.log("teste", props);
  
//   if (entrada.k120c) {
//     entrada.k1t = entrada.k120c * Math.pow(entrada.tetak1, entrada.temperatura - 20);

//     return entrada.k1t;
//   }
// };

export const Calculadora = (props) => {
  console.log("props", props);
  const entrada = {
    qr: Number(props.qr) ,
    odr: Number(props.odr) ,
    dbor: Number(props.dbor) ,
    odmin: Number(props.odmin) ,
    k120c: Number(props.k120c) ,
    tetak1: Number(props.tetak1),
    temperatura: Number(props.temperatura) ,
    k1t: Number(props.k1t) ,
    volume: Number(props.volume) ,
    tetak2: Number(props.tetak2) ,
    h: Number(props.h) , //altitude
    k220c:  Number(props.k220c),
    k2t: Number(props.k2t),
    distancia: Number(props.distancia) ,
    velocidade: Number(props.velocidade) ,
    tempo: Number(props.tempo) ,
    cs: Number(props.cs) ,
    cslinha: Number(props.cslinha) ,
    qe: Number(props.qe) ,
    ode: Number(props.ode),
    dboe: Number(props.dboe) ,
    dboefl: Number(props.dboefl) ,
    e: Number(props.e) ,
    //saída
    co: 0,
    do: 0,
    dbo5: 0,
    kt: 0,
    tc: 0,
    distanciac: 0,
    deficitc: 0,
    odc: 0,
    ct: 0,
  }
  console.log("teste", entrada);
  if (entrada.k120c) {
    entrada.k1t = entrada.k120c * Number(Math.pow(entrada.tetak1, entrada.temperatura - 20).toFixed(2));
    console.log("if k120c // k120c: ", entrada.k120c, "* tetak1: ", entrada.tetak1, "^ temperatura: ", entrada.temperatura,"-20", "potencia: ", Number(Math.pow(entrada.tetak1, entrada.temperatura - 20).toFixed(2)));
    //  k120x:  0.38 * tetak1:  1.047 ^ temperatura:  23 -20 potencia:  1.1477308229999998
    // k120c: 0.38 // tetak1: 1.047 // temperatura: 23 // 
  }

  if (entrada.k2t) {
  } else if (entrada.k220c) {
    entrada.k2t = entrada.k220c * Math.pow(entrada.tetak2, entrada.temperatura - 20);
  } else if (entrada.volume) {
    if (
      entrada.h <= 4 &&
      entrada.h >= 0.6 &&
      0.05 <= entrada.volume &&
      entrada.volume < 0.8
    ) {
      //formula O'Connor e Dobbins
      entrada.k2t = 3.73 * Math.pow(entrada.tetak2, 0.5) * Math.pow(entrada.h, -1.5);
    } else if (
      entrada.h <= 4 &&
      entrada.h >= 0.6 &&
      0.8 <= entrada.volume &&
      entrada.volume < 1.5
    ) {
      //formula Churchill et al
      entrada.k2t = 5 * Math.pow(entrada.volume, 0.97) * Math.pow(entrada.h, 1.67);
    } else if (
      entrada.h >= 0.1 &&
      entrada.h <= 0.6 &&
      0.5 <= entrada.volume &&
      entrada.volume < 1.5
    ) {
      //formula Owens et al
      entrada.k2t = 5.3 * Math.pow(entrada.volume, 0.67) * Math.pow(entrada.h, -1.85);
    }
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
    entrada.cslinha = entrada.cs * (1 - entrada.h / 9450);
  }

  if (entrada.dboefl) {
  } else {
    entrada.dboefl = (1 - entrada.e / 100) * entrada.dboe;
  }

  //DADOS DE SAÍDA

  entrada.co =
    (entrada.qr * entrada.odr + entrada.qe * entrada.ode) / (entrada.qr + entrada.qe); //isto é uma media entao ainda tem que inserir mais valores de qe seguindo a mesma logica caso o usuario queira inserir mais valores

  entrada.do = entrada.csLinha - entrada.co;

  {
    //Concentração de DBO ultima mistura (Lo)
    entrada.dbo5 =
      (entrada.qr * entrada.dbor + entrada.qe * entrada.dboe) / entrada.qr + entrada.qe; //  tem mais de um lançamento de esgoto
   
      entrada.kt = 1 / (1 - Math.pow(2.72, -5 * Number(entrada.k1t.toFixed(2))) );

    entrada.lo = entrada.dbo5 * entrada.kt;
  }

  entrada.tc =
    (1 / (entrada.k2t - entrada.k1t)) *
    Math.log[
      (entrada.k2t / entrada.k1t) *
        [1 - ((entrada.do * (entrada.k2t - entrada.k1t)) / entrada.lo) * entrada.k1t]
    ];

  entrada.tc =
    (1 / (entrada.k2t - entrada.k1t)) *
    Math.log(
      (entrada.k2t / entrada.k1t) *
        (1 - ((entrada.do * (entrada.k2t - entrada.k1t)) / entrada.lo) * entrada.k1t)
    );
  //tc = (1 / (3.31 - 0.44)) * Math.log((3.31 / 0.44) * (1 - ((1.8 * (3.31 - 0.44)) / 59*0.44)))
  //tempo critico entrada.tc = (1/(k2t-k1t))*ln{(k2t/k1t)*[1-(D0*(K2t-k1t))/L0*k1]}

  entrada.dc = entrada.tc * entrada.velocidade * 86400;

  {
    //ODC
    entrada.deficitc =
      (entrada.k1t / entrada.k2t) *
      entrada.lo *
      Math.pow(entrada.e, entrada.k1t * entrada.tc);

    entrada.odc = entrada.csLinha - entrada.dc; //caso o odc der abaixo de 0, mostrar um alerta relatando que o modelo de Streeter-Phelps não seria válido nestas condições e paralisar o caso
  }
  console.log("antes", entrada);

        entrada.ct =
    entrada.csLinha -
    ((entrada.k1t * entrada.lo) / entrada.k2t - entrada.k1t) *
      ((Math.pow(2.72, -entrada.k1t * entrada.tempo) -
        Math.pow(2.72, -entrada.k2t * entrada.tempo) +
        (entrada.csLinha - entrada.co) * 2.72) ^
        (-entrada.k2t * entrada.tempo));

        console.log("saida", entrada);

};
/*
Saída



Concentração de oxigênio da mistura: /////////
Co (mg/L)     Co=(Qr*ODr + Qe*ODe)/(Qr+Qe) FAZER UMA ALTERAÇÃO PARA ADICIONAR MAIS VAZÕES DE DIFERENTES ESFOTOS


Déficit de oxigênio://////////
Do (mg/L)     Do = csLinha - Co


Concentração de DBO ultima mistura (Lo){

Constante de transformação DBO5->DBO ultima

DBO5 = (Qr * DBOr +Qe * DBOe)/Qr+Qe -------------------------------------(CASO TENHA MAIS UM LANÇAMENTO, ACRESCENTAR NA MÉDIA PONDERADA)

KT = 1/(1-e^-5*k1t)

L0 = DBO5o*Kt}
}



Tempo crítico (tc)
tc (d) = (1/(k2t-k1t))*ln{(k2t/k1t)*[1-(D0*(K2t-k1t))/L0*k1]}


Distancia crítica (dc)
dc (km) =  tc * v * 86400   //v(velocidade)

Concentração crítica de oxigênio dissolvido (ODc){

Deficit crítico (Dc)
Dc (mg/L)= (k1t/k2t)*L0*e^-(k1t*tc)

ODc (mg/L) = csLinha-Dc //caso o odc der abaixo de 0, mostrar um alerta relatando que o modelo de Streeter-Phelps não seria válido nestas condições e paralisar o caso
//caso >=0, prosseguir
}

Ct = csLinha - ((k1t*L0)/k2t - k1t) * (e^(-k1t*tempo) - e^(-k2t*t) + (csLinha-co)*e^(-k2t*tempo)
// ADICIONAR UMA TELA ONDE SE PEDE A EXXTENSAO TOTAL DO PERCURSO, E EM QUANTAS SECÇÕES ELE SERÁ REPARTIDO 





//console.log(entrada);
// outros cálculos aqui...
//k2 (1/d)      k2 = 3,73((v^0,5)/H^1,5) // H(m) profundidade do curso d'agua // v(m/s) velocidade do curso d'água
/*formula O'Connor e Dobbins:   3.73*(v^0.5)*(H^-1,5)  // USADA CASO  0.6m <= H < 4m  && 0.05m/s <= v < 0.8 m/s
formula Churchill et al: 5*(v^0.97)*(H*1.67)    // usada caso 0.6m <= H < 4m && 0.8m/s <= v < 1.5m/s
formula Owens et al: 5.3*(v^0.67)*(H^-1.85)   // usada caso 0.1m <= H <0.6m && 0.05m/s <= v < 1.5 m/s
//{ qr, odr, k120c, k1t, tetak1, temperatura }*/

//k1t = k120c * (tetak1^(temperatura-20))

//k2 = 3.73 * (((v ^ 0.5) / h) ^ 1.5); //(O'Connor e Dobbins)
//k2 = 5*(v^0.97)*(H*1.67); //(Churchill et al)
//k2 = (5.3*(v^0.67)*(h^-1.85)); //(Owens et al)

/* 
Qr (m³/s)     (usuario tem de ter)

ODr (mg/L)    ("tabela")

DBOR (mg/L) (tabela)

k1 (1/d)      k1 = k1(20ºC), θ , T(temperatura ºC)




para corrigir a temperatura k2r = k2(20ºC)*θ^(T-20)


t (d)         t = d/(v*86400) // d(m) = distancia de percuso // v(m/s) = velocidade do curso d'agua

Cs (mg/L)      // T(ºC) // Altitude (m)

ODmin(mg/L)    (tabela)

------------------------

Qe (m³/s)     (o usuario tem de ter)

ODe (mg/L)    (tabela)

DBOe (mg/L)   DBOefl = DBOe*(1-(E/100))

--------------------------





*/
