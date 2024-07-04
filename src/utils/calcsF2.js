/* eslint-disable no-lone-blocks */
export const Calculadora2 = (props) => {
  console.log(props);
  //confirmar com fernando onde as variaveis poderiam ficar 

  const entrada = {
    // qr: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
    // qe: Number(String(props.qe).replaceAll('.', '').replace(',', '.')),
    // temperatura: Number(String(props.temperatura).replaceAll('.', '').replace(',', '.')),
    qr: 0.651,
    qe: 0.114,
    temperatura: 23,
    no: 0, // n0. Concentracao de Coliformes na Mistura
    nop: 0, // Concentracao Max permitida de Coliformes no ponto de mistura
    nr: 0, // Concentração de coliformes no Rio a montante do lançamento 
    ne: 0, //Concentração de coliformes no esgoto
    ntempo: 0, // Concentração de coliformes ao longo do tempo ou da distancia
    nep: 0, //Concentração máxima permissivel de coliformes no esgoto
    kb: 0, //Coeficiente de decaimento bacteriano
    kbt: 1.23, //Coeficiente de decaimento bacteriano a uma temperatura T
    teta: 1, //Coeficiente de temperatura 
    eficiencia: 0, //eficiencia de remoção de coliformes requerida no tratamento
    tempo: 0, //tempo de percurso
    velocidade: 0.35, //velocidade de percurso
    distancia: 50000, //distancia de percurso
    particoes: 10, // Quantidade de partições no qual o calculo sera feito
    classLimit: 0,
    // classLimit1: 200,
    // classLimit2: 1000,
    // classLimit3: 4000,
    represa: false,


    //REPRESA
    tRepresa: 0,
    tDentencao: 0, //falta declarar
    volume: 0, //falta declarar
    qAfluente: 0, //falta declarar
    nRepresa: 0, //n0 represa
    nRepresaMax: 0,




  };
  const neperiano = 2.7182818285;
  const particoesVet = [];
  const ntempoVet = [];
  const kmvet = [];
  const novet = [];
  let noToPush;



  console.log(entrada);






  if (entrada.represa === false) {
    entrada.no = (entrada.qr * entrada.nr + entrada.qe * entrada.ne) / (entrada.qr + entrada.qe)

    entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20))


    for (let i = 0; i <= entrada.particoes; i++) {
      particoesVet.push(i);


      let tempop =
        ((entrada.distancia / entrada.particoes) * i) /
        (entrada.velocidade * 86400);
      if (tempop === 0) {
        entrada.noToPush = entrada.no;

      } else {

        entrada.noToPush =
          entrada.no * Math.pow(neperiano, (-entrada.kbt * tempop))
      }

      let aux = entrada.distancia / entrada.particoes;
      kmvet.push((aux * i) / 1000);
      novet.push(entrada.noToPush.toFixed(2));
    }

    if (entrada.no > entrada.nop) {
      entrada.nep = (entrada.nop * (entrada.qr + entrada.qe) - entrada.qr * entrada.nr) / entrada.qe
      entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne

      for (let i = 0; i <= entrada.particoes; i++) {
        particoesVet.push(i);


        let tempop =
          ((entrada.distancia / entrada.particoes) * i) /
          (entrada.velocidade * 86400);
        if (tempop === 0) {
          entrada.noToPush = entrada.nop;

        } else {

          entrada.noToPush =
            entrada.nop * Math.pow(neperiano, (-entrada.kbt * tempop))
        }

        let aux = entrada.distancia / entrada.particoes;
        kmvet.push((aux * i) / 1000);
        novet.push(entrada.noToPush.toFixed(2));
      }
    }//isto deve vir antes do for, pois o for deve ser o caso else deste condição




  } else {
    // Caso represa === true

    // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
    entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);

    //vazao total afluente a represa
    entrada.qAfluente = entrada.qr + entrada.qe;
    //depois deve ser adicionado uma opção para mais vazões (qAfluente)
    //tal qual será aceito quantos o usuario definir

    entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20))


    //Tempo de detenção na represa
    entrada.tDentencao = entrada.volume / entrada.qAfluente;
    // nomes das variaveis deve ser trocado para
    // volume e qAfluente

    //Concentracao coliformes na represa
    entrada.nRepresa = entrada.no / (1 + entrada.kbt * entrada.tDentencao);

    if(entrada.nRepresa > entrada.nop ) {

      entrada.nRepresaMax = entrada.nop * (1 + entrada.kbt * entrada.tDentencao)
      
      entrada.nep = (entrada.nRepresaMax*(entrada.qr+entrada.qe)-entrada.qr*entrada.nr)/entrada.qr

      entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne


    }
    //Concentracao maxima permissivel no esgoto para atendimento ao padrão para a represa
    



  }

  // if (entrada.represa === false) {

  //   // b) Concentração de coliformes na mistura esgoto-rio (equação da mistura):
  // entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.ne)) / (entrada.qr + entrada.qe);

  // c) Perfil da concentracao ao longo da distancia 
  // entrada.kbt = entrada.kb20 * Math.pow(entrada.teta, (entrada.temperatura - 20));
  //resulta em uma variavel 1/d



  // tempo = (distancia / velocidade)/86400;








  //   for (let i = 0; i <= entrada.particoes; i++) {
  //     particoesVet.push(i);

  //     let tempop =
  //       ((entrada.distancia / entrada.particoes) * i) /
  //       (entrada.velocidade * 86400);
  //     if (tempop === 0) {
  //       entrada.ntempo = entrada.no;

  //     } else {

  //       entrada.ntempo = entrada.no * Math.pow(neperiano, (entrada.kbt * entrada.t));
  //       // para calcular pela segunda vez, o no irá se tornar o limite da classe (valores nas variaveis)


  //     }

  //     let aux = entrada.distancia / entrada.particoes;
  //     kmvet.push((aux * i) / 1000);
  //     ntempoVet.push(entrada.ntempo.toFixed(2));

  //   }
  //   //fazer isso como uma função recursiva para refazer o grafico de ntempo
  //   if( entrada.no > entrada.classLimit){
  //     // Concentração máxima permissível de coliformes nos esgotos:
  //     entrada.nep = (entrada.nop * (entrada.qr + entrada.qe) - (entrada.qr * entrada.nr)) / entrada.qe;

  //     // Eficiencia requerida para a remocao de coliformes fecais no tratamentos de esgotos
  //     entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne
  //     //Ne é a concentração de coliformes fecais no esgoto, onde usamos o esgoto bruto nesse exemplo, p é o maximo permissivel
  //   }
  //   //a eficiencia deve ser mostrada para o usuario


  // }else{ // Caso represa

  //   // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
  //   entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);

  //   //vazao total afluente a represa
  //   entrada.q = entrada.qr + entrada.qe;

  //   //Tempo de detenção na represa
  //   entrada.t = entrada.v / entrada.q;

  //   //Concentracao coliformes na represa
  //   entrada.concentracaoColiformesRepresa = entrada.no / (1 + entrada.kb * entrada.t);

  //   //Concentracao maxima permissivel no esgoto para atendimento ao padrão para a represa
  //   entrada.concentracaoMaxPermitidaEsgotos = entrada.n * (1 + entrada.kb * entrada.t)

  // }


// const eficienciaAux = entrada.eficiencia

let resultado2 = {}; 

if (entrada.represa === true) {
  resultado2.eficiencia = entrada.eficiencia;
} else {
  // resultado2.particoesVet = particoesVet;
  resultado2.ntempoVet = ntempoVet;
  resultado2.kmvet = kmvet;
  resultado2.particoesVet = particoesVet;
  resultado2.novet = novet;
}

console.log(entrada);
return resultado2;
};