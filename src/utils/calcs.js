import React from "react";

export const Calculadorak1t = (props) => {
  console.log("teste", props);
  if (props.k120c) {
    props.k1t = props.k120c * Math.pow(props.tetak1, props.temperatura - 20);

    return props.k1t;
  }
};

export const Calculadora = (props) => {
  console.log("teste", props);
  if (props.k120c) {
    props.k1t = props.k120c * Math.pow(props.tetak1, props.temperatura - 20);
  }

  if (props.k2t) {
  } else if (props.k220c) {
    props.k2t = props.k220c * Math.pow(props.tetak2, props.temperatura - 20);
  } else if (props.volume) {
    if (
      props.h <= 4 &&
      props.h >= 0.6 &&
      0.05 <= props.volume &&
      props.volume < 0.8
    ) {
      //formula O'Connor e Dobbins
      props.k2t = 3.73 * Math.pow(props.tetak2, 0.5) * Math.pow(props.h, -1.5);
    } else if (
      props.h <= 4 &&
      props.h >= 0.6 &&
      0.8 <= props.volume &&
      props.volume < 1.5
    ) {
      //formula Churchill et al
      props.k2t = 5 * Math.pow(props.volume, 0.97) * Math.pow(props.h, 1.67);
    } else if (
      props.h >= 0.1 &&
      props.h <= 0.6 &&
      0.5 <= props.volume &&
      props.volume < 1.5
    ) {
      //formula Owens et al
      props.k2t = 5.3 * Math.pow(props.volume, 0.67) * Math.pow(props.h, -1.85);
    }
  }

  if (props.t) {
  } else {
    props.tempo = props.distancia / (props.velocidade * 86400); // ------------------------------
  }

  if (props.cslinha) {
  } else {
    props.cs =
      14.652 -
      4.1022 * Math.pow(10, -1) * props.temperatura +
      7.991 * Math.pow(10, -3) * Math.pow(props.temperatura, 2) -
      7.7774 * Math.pow(10, -5) * Math.pow(props.temperatura, 3);
    props.cslinha = props.cs * (1 - props.h / 9450);
  }

  if (props.dboefl) {
  } else {
    props.dboefl = (1 - props.e / 100) * props.dboe;
  }

  //DADOS DE SAÍDA

  props.co =
    (props.qr * props.odr + props.qe * props.ode) / (props.qr + props.qe); //isto é uma media entao ainda tem que inserir mais valores de qe seguindo a mesma logica caso o usuario queira inserir mais valores

  props.do = props.csLinha - props.co;

  {
    //Concentração de DBO ultima mistura (Lo)
    props.dbo5 =
      (props.qr * props.dbor + props.qe * props.dboe) / props.qr + props.qe; //  tem mais de um lançamento de esgoto

    props.kt = 1 / (1 - Math.pow(props.e, -5) * props.k1t);

    props.lo = props.dbo5 * props.kt;
  }

  props.tc =
    (1 / (props.k2t - props.k1t)) *
    Math.log[
      (props.k2t / props.k1t) *
        [1 - ((props.do * (props.k2t - props.k1t)) / props.lo) * props.k1t]
    ];

  props.tc =
    (1 / (props.k2t - props.k1t)) *
    Math.log(
      (props.k2t / props.k1t) *
        (1 - ((props.do * (props.k2t - props.k1t)) / props.lo) * props.k1t)
    );
  //tc = (1 / (3.31 - 0.44)) * Math.log((3.31 / 0.44) * (1 - ((1.8 * (3.31 - 0.44)) / 59*0.44)))
  //tempo critico props.tc = (1/(k2t-k1t))*ln{(k2t/k1t)*[1-(D0*(K2t-k1t))/L0*k1]}

  props.dc = props.tc * props.velocidade * 86400;

  {
    //ODC
    props.deficitc =
      (props.k1t / props.k2t) *
      props.lo *
      Math.pow(props.e, props.k1t * props.tc);

    props.odc = props.csLinha - props.dc; //caso o odc der abaixo de 0, mostrar um alerta relatando que o modelo de Streeter-Phelps não seria válido nestas condições e paralisar o caso
  }

  props.ct =
    props.csLinha -
    ((props.k1t * props.lo) / props.k2t - props.k1t) *
      ((Math.pow(props.e, -props.k1t * props.tempo) -
        Math.pow(props.e, -props.k2t * props.tempo) +
        (props.csLinha - props.co) * props.e) ^
        (-props.k2t * props.tempo));
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





//console.log(props);
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
