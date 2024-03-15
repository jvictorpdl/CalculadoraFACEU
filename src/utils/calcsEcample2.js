/* eslint-disable no-lone-blocks */
export const Calculadora = (props) => {
  console.log(props);
  //confirmar com fernando onde as variaveis poderiam ficar 
  let represa = new Boolean(false);

  const entrada = {
    qr: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
    qe: Number(String(props.qe).replaceAll('.', '').replace(',', '.')),
    temperatura: Number(String(props.temperatura).replaceAll('.', '').replace(',', '.')),
    n0: 0, // Concentracao de Coliformes na Mistura
    n0p: 0, // Concentracao Max permitida de Coliformes no ponto de mistura
    nr: 0, // Concentração de coliformes no Rio a montante do lançamento 
    ne: 0, //Concentração de coliformes no esgoto
    ntempo: 0, // Concentração de coliformes ao longo do tempo ou da distancia
    ntempoVet: [],
    nep: 0, //Concentração máxima permissivel de coliformes no esgoto
    kb: 0, //Coeficiente de decaimento bacteriano
    kbt: 0, //Coeficiente de decaimento bacteriano a uma temperatura T
    teta: 0, //Coeficiente de temperatura 
    eficiencia: 0, //eficiencia de remoção de coliformes requerida no tratamento
    tempo: 0, //tempo de percurso
    velocidade: 0, //velocidade de percurso
    distancia: 0, //distancia de percurso
    particoes: 0, // Quantidade de partições no qual o calculo sera feito
    classLimit: 0,
    classLimit1: 200,
    classLimit2: 1000,
    classLimit3: 4000,

    //REPRESA
    tRepresa: 0,



    neperiano: 2.7182818285,
  };

  console.log(entrada);

  if (represa === false) {

    // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
    n0 = ((qr * nr) + (qe * ne)) / (qr + qe);

    // Perfil da concentracao ao longo da distancia 
    entrada.kbt = entrada.kb20 * Math.pow(entrada.teta, (entrada.temperatura - 20));
    //resulta em uma variavel 1/d



    // tempo = (distancia / velocidade)/86400;



    for (let i = 0; i <= entrada.particoes; i++) {
      particoesVet.push(i);

      let tempop =
        ((entrada.distancia / entrada.particoes) * i) /
        (entrada.velocidade * 86400);
      if (tempop === 0) {
        entrada.ntempo = entrada.n0;

      } else {

        ntempo = n0 * Math.pow(neperiano, (kbt * t));
        // para calcular pela segunda vez, o n0 irá se tornar o limite da classe (valores nas variaveis)


      }

      let aux = entrada.distancia / entrada.particoes;
      kmvet.push((aux * i) / 1000);
      ntempoVet.push(entrada.ntempo.toFixed(2));

    }
    //fazer isso como uma função recursiva para refazer o grafico de ntempo
    if( n0 > classLimit){
      // Concentração máxima permissível de coliformes nos esgotos:
      nep = (n0p * (qr + qe) - (qr * nr)) / qe;
  
      // Eficiencia requerida para a remocao de coliformes fecais no tratamentos de esgotos
      eficiencia = (ne - nep) / ne
      //Ne é a concentração de coliformes fecais no esgoto, onde usamos o esgoto bruto nesse exemplo, p é o maximo permissivel
    }
    //a eficiencia deve ser mostrada para o usuario


  }

  // Caso represa
  if (represa === true) {

    // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
    n0 = ((qr * nr) + (qe * nr)) / (qr + qe);

    //vazao total afluente a represa
    q = qr + qe;

    //Tempo de detenção na represa
    entrada.t = entrada.v / entrada.q;

    //Concentracao coliformes na represa
    entrada.concentracaoColiformesRepresa = entrada.n0 / (1 + entrada.kb * entrada.t);

    //Concentracao maxima permissivel no esgoto para atendimento ao padrão para a represa
    entrada.concentracaoMaxPermitidaEsgotos = entrada.n * (1 + entrada.kb * entrada.t)

  }

  const resultado = {
    //variaveis resultantes que irão retornar
  };
  return resultado;
};