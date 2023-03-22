import React from "react";

export const Calculadora = (data) => {
  console.log("teste", data);
  if (data.k120c) {
    const k1t = data.k120c * Math.pow(data.tetak1, data.temperatura - 20);
  }

  console.log(data);
  // outros cálculos aqui...
};
//{ qr, odr, k120c, k1t, tetak1, temperatura }

/*function Home() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
      qr: "",
      odr: "",
      dbor: "",
      odmin: "",
      k120c: "",
      tetak1: "",
      temperatura: "",
      k1t: "",
      volume: "",
      tetak2: "",
      h: "",
      formula: "",
      k2t: "",
      distancia: "",
      velocidade: "",
      tempo: "", 
      cs: "",
      qe: "",
      ode: "",
      dboe: "",
      dboefl: "",
      e: "",
    });*/

//k1t = k120c * (tetak1^(temperatura-20))

//k2 = 3.73 * (((v ^ 0.5) / h) ^ 1.5); //(O'Connor e Dobbins)
//k2 = 5*(v^0.97)*(H*1.67); //(Churchill et al)
//k2 = (5.3*(v^0.67)*(h^-1.85)); //(Owens et al)

/* 
Qr (m³/s)     (usuario tem de ter)

ODr (mg/L)    ("tabela")

DBOR (mg/L) (tabela)

k1 (1/d)      k1 = k1(20ºC), θ , T(temperatura ºC)

k2 (1/d)      k2 = 3,73((v^0,5)/H^1,5) // H(m) profundidade do curso d'agua // v(m/s) velocidade do curso d'água
formula O'Connor e Dobbins:   3.73*(v^0.5)*(H^-1,5)  // USADA CASO  0.6m <= H < 4m  && 0.05m/s <= v < 0.8 m/s
formula Churchill et al: 5*(v^0.97)*(H*1.67)    // usada caso 0.6m <= H < 4m && 0.8m/s <= v < 1.5m/s
formula Owens et al: 5.3*(v^0.67)*(H^-1.85)   // usada caso 0.1m <= H <0.6m && 0.05m/s <= v < 1.5 m/s

ADICIONAR TELA PARA CORRIGIR A TEMPERATURA DE K2 EM VALORES TIPICOS

para corrigir a temperatura k2r = k2(20ºC)*θ^(T-20)


t (d)         t = d/v*86400 // d(m) = distancia de percuso // v(m/s) = velocidade do curso d'agua

Cs (mg/L)      // T(ºC) // Altitude (m)

ODmin(mg/L)    (tabela)

------------------------

Qe (m³/s)     (o usuario tem de ter)

ODe (mg/L)    (tabela)

DBOe (mg/L)   DBOefl = DBOe*(1-(E/100))

--------------------------
                                  Saída

Concentração de oxigênio da mistura: 
Co (mg/L)     Co=(Qr*ODr + Qe*ODe)/(Qr+Qe) FAZER UMA ALTERAÇÃO PARA ADICIONAR MAIS VAZÕES DE DIFERENTES ESFOTOS


Déficit de oxigênio:
Do (mg/L)     Do = csLinha - Co


Concentração de DBO ultima mistura (Lo){
  
Constante de transformação DBO5->DBO ultima

DBO5 = (Qr * DBOr +Qe * DBOe)/Qr+Qe (CASO TENHA MAIS UM LANÇAMENTO, ACRESCENTAR NA MÉDIA PONDERADA)

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





*/
