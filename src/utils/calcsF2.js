export const Calculadora2 = (props) => {
  // console.log(props);
  function convertToPercentage(value) {
    // Multiplica o valor por 100 para converter para porcentagem
    const percentage = value * 100;
    // Formata o resultado para duas casas decimais
    const formattedPercentage = percentage.toFixed(3).replace('.', ',');
    // Adiciona o símbolo de porcentagem
    return `${formattedPercentage}%`;
  }
  // const entrada = {
  //   qr: 0.651,
  //   qe: 0.114,
  //   temperatura: 23,
  //   no: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   nop: 1000,
  //   nr: 10,
  //   ne: 50000000,
  //   ntempo: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   nep: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   kb: 1,
  //   kbt: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   teta: 1.07,
  //   eficiencia: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   tempo: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   velocidade: 0.35,
  //   distancia: 50000,
  //   particoes: 10,
  //   classLimit: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   represa: Boolean(String(props.represa)),
  //   tRepresa: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   tDentencao: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   volume: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   qAfluente: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   nRepresa: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  //   nRepresaMax: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
  // };
  // console.log(entrada);
  const entrada = {
    qr: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
    qe: Number(String(props.qe).replaceAll('.', '').replace(',', '.')),
    temperatura: Number(String(props.temperatura).replaceAll('.', '').replace(',', '.')),
    no: Number(String(props.no).replaceAll('.', '').replace(',', '.')),
    nop: Number(String(props.nop).replaceAll('.', '').replace(',', '.')),
    nr: Number(String(props.nr).replaceAll('.', '').replace(',', '.')),
    ne: Number(String(props.ne).replaceAll('.', '').replace(',', '.')),
    ntempo: Number(String(props.ntempo).replaceAll('.', '').replace(',', '.')),
    nep: Number(String(props.nep).replaceAll('.', '').replace(',', '.')),
    kb: Number(String(props.kb).replaceAll('.', '').replace(',', '.')),
    kbt: Number(String(props.kbt).replaceAll('.', '').replace(',', '.')),
    teta: Number(String(props.teta).replaceAll('.', '').replace(',', '.')),
    eficiencia: Number(String(props.eficiencia).replaceAll('.', '').replace(',', '.')),
    tempo: Number(String(props.tempo).replaceAll('.', '').replace(',', '.')),
    velocidade: Number(String(props.velocidade).replaceAll('.', '').replace(',', '.')),
    distancia: Number(String(props.distancia).replaceAll('.', '').replace(',', '.')),
    particoes: Number(String(props.particoes).replaceAll('.', '').replace(',', '.')),
    classLimit: Number(String(props.classLimit).replaceAll('.', '').replace(',', '.')),
    represa: props.represa,
    tRepresa: Number(String(props.tRepresa).replaceAll('.', '').replace(',', '.')),
    tDentencao: Number(String(props.tDentencao).replaceAll('.', '').replace(',', '.')),
    volume: Number(String(props.volume).replaceAll('.', '').replace(',', '.')),
    qAfluente: Number(String(props.qAfluente).replaceAll('.', '').replace(',', '.')),
    nRepresa: Number(String(props.nRepresa).replaceAll('.', '').replace(',', '.')),
    nRepresaMax: Number(String(props.nRepresaMax).replaceAll('.', '').replace(',', '.')),
  };
  console.log(entrada);

  const neperiano = 2.7182818285;
  let particoesVet = [];
  let ntempoVet = [];
  let kmvet = [];
  let novet = [];
  let kmvetTwo = [];
  let novetTwo = [];


  if (entrada.represa === false) {
    // console.log('ENTROU EM RIO');
    // console.log('CALCULO DE N0 QR: ' + entrada.qr + ' Nr: '+entrada.nr + ' qe: '+entrada.qe+ ' ne: '+entrada.ne+ ' / qr+qe: '+ entrada.qr+entrada.qe);
    entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.ne)) / (entrada.qr + entrada.qe);

// console.log('entrada n0 nesse caralho: ' + entrada.no);
    entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20));
// console.log(entrada.no + ' Primeiro alculo de N0');
    if (entrada.no > entrada.nop) {
      console.log('entrou no if no> nop');
      entrada.nep = (entrada.nop * (entrada.qr + entrada.qe) - entrada.qr * entrada.nr) / entrada.qe;
      entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne;

      for (let i = 0; i <= entrada.particoes; i++) {
        let tempop = ((entrada.distancia / entrada.particoes) * i) / (entrada.velocidade * 86400);
        entrada.noToPush = tempop === 0 ? entrada.nop : entrada.nop * Math.pow(neperiano, (-entrada.kbt * tempop));

        let aux = entrada.distancia / entrada.particoes;
        kmvet.push((aux * i) / 1000);
        novet.push(Number(entrada.noToPush.toFixed(2)));
        
        // console.log(Number(entrada.noToPush.toFixed(2)));
      }
    }else{
      // console.log('nao entrou no if no> nop');

      for (let i = 0; i <= entrada.particoes; i++) {
        let tempop = ((entrada.distancia / entrada.particoes) * i) / (entrada.velocidade * 86400);
        entrada.noToPush = tempop === 0 ? entrada.no : entrada.no * Math.pow(neperiano, (-entrada.kbt * tempop));
        let aux = entrada.distancia / entrada.particoes;
        kmvet.push((aux * i) / 1000);
        novet.push(Number(entrada.noToPush.toFixed(2)));
      }
    }
  } else { //CASO DE REPRESA===true
    console.log('ENTROU EM REPRESA');

    console.log('eficiencia ' + entrada.eficiencia);
    console.log('N0: ' + entrada.no);
    
    entrada.qAfluente = entrada.qr + entrada.qe;
    console.log('q afluente: ' + entrada.qAfluente);
    
    entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20));
    console.log('kbt: ' + entrada.kbt);
    entrada.tDentencao = entrada.volume / (entrada.qAfluente * 86400) ;
    console.log('tempo de detencao: ' + entrada.tDentencao);
    
    // entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);
    entrada.nRepresa = entrada.nop * (1 + (entrada.kbt * entrada.tDentencao));
    // entrada.nRepresa = entrada.no / (1 + entrada.kbt * entrada.tDentencao);
    console.log('nrepresa: ' + entrada.nRepresa)

    if (entrada.nRepresa > entrada.nop) {
      entrada.nRepresaMax = entrada.nop * (1 + entrada.kbt * entrada.tDentencao);
      console.log("nrepresamax: " + entrada.nRepresaMax );
      entrada.nep = (entrada.nRepresaMax * (entrada.qr + entrada.qe) - entrada.qr * entrada.nr) / entrada.qe;
      console.log('nep: ' + entrada.nep);
      entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne;
      console.log('EFICIENCIA REPRESA: ' + entrada.eficiencia);
    }else{
      entrada.eficiencia = -1
    }


    // console.log('no ' + entrada.no);
    // console.log('qAfluente ' + entrada.qAfluente);

    // console.log('kbt ' + entrada.kbt);
    // console.log('kb ' + entrada.kb);
    // console.log('tDentencao ' + entrada.tDentencao);
    // console.log('nRepresa ' + entrada.nRepresa);

    // console.log('nRepresaMax ' + entrada.nRepresaMax);
    // console.log('nep ' + entrada.nep);
    // console.log('eficiencia ' + entrada.eficiencia);
  }
  
  let resultado2 = {};
  // apenas para testar o grafico
  // novet = [50000000, 60000000, 70000000, 80000000, 90000000, 50000000, 80000000, 60000000, 20000000, 70000000];
  // entrada.eficiencia = 85
  // entrada.eficiencia = convertToPercentage(entrada.eficiencia)
  console.log('ATENCAO ATENCAO ATENCAO ATENCAO ATENCAO ATENCAO');
  console.log(novet);
  console.log(kmvet);

  
  resultado2.eficiencia = convertToPercentage(entrada.eficiencia);
  resultado2.particoesVet = particoesVet;
  resultado2.ntempoVet = ntempoVet;
  resultado2.kmvet = kmvet;
  resultado2.novet = novet;
  console.log(resultado2);
  
  // console.log(entrada);
  return resultado2;
};

// /* eslint-disable no-lone-blocks */
// export const Calculadora2 = (props) => {
//   console.log(props);
//   //confirmar com fernando onde as variaveis poderiam ficar 

//   const entrada = {
//     // qr: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
//     // qe: Number(String(props.qe).replaceAll('.', '').replace(',', '.')),
//     // temperatura: Number(String(props.temperatura).replaceAll('.', '').replace(',', '.')),
//     qr: 0.651,
//     qe: 0.114,
//     temperatura: 23,
//     no: 0, // n0. Concentracao de Coliformes na Mistura
//     nop: 0, // Concentracao Max permitida de Coliformes no ponto de mistura
//     nr: 0, // Concentração de coliformes no Rio a montante do lançamento 
//     ne: 0, //Concentração de coliformes no esgoto
//     ntempo: 0, // Concentração de coliformes ao longo do tempo ou da distancia
//     nep: 0, //Concentração máxima permissivel de coliformes no esgoto
//     kb: 0, //Coeficiente de decaimento bacteriano
//     kbt: 1.23, //Coeficiente de decaimento bacteriano a uma temperatura T
//     teta: 1, //Coeficiente de temperatura 
//     eficiencia: 0, //eficiencia de remoção de coliformes requerida no tratamento
//     tempo: 0, //tempo de percurso
//     velocidade: 0.35, //velocidade de percurso
//     distancia: 50000, //distancia de percurso
//     particoes: 10, // Quantidade de partições no qual o calculo sera feito
//     classLimit: 0,
//     // classLimit1: 200,
//     // classLimit2: 1000,
//     // classLimit3: 4000,
//     represa: false,


//     //REPRESA
//     tRepresa: 0,
//     tDentencao: 0, //falta declarar
//     volume: 0, //falta declarar
//     qAfluente: 0, //falta declarar
//     nRepresa: 0, //n0 represa
//     nRepresaMax: 0,




//   };
//   const neperiano = 2.7182818285;
//   const particoesVet = [];
//   const ntempoVet = [];
//   const kmvet = [];
//   const novet = [50000000, 60000000, 70000000, 80000000, 90000000, 100000000];
//   let noToPush;



//   console.log(entrada);

//   // function formatarCientifico(number) {
//   //   const exponentialForm = number.toExponential(1); // 1 casa decimal
//   //   const [mantissa, exponent] = exponentialForm.split('e');
    
//   //   // Formata a mantissa e o expoente conforme necessário
//   //   const formattedMantissa = mantissa.replace('.', ',');
//   //   const formattedExponent = exponent.toUpperCase().replace('+', '');
    
//   //   return `${formattedMantissa}E+${formattedExponent}`;
//   // }






//   if (entrada.represa === false) {
//     entrada.no = (entrada.qr * entrada.nr + entrada.qe * entrada.ne) / (entrada.qr + entrada.qe)

//     entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20))


//     for (let i = 0; i <= entrada.particoes; i++) {
//       particoesVet.push(i);


//       let tempop =
//         ((entrada.distancia / entrada.particoes) * i) /
//         (entrada.velocidade * 86400);
//       if (tempop === 0) {
//         entrada.noToPush = entrada.no;

//       } else {

//         entrada.noToPush =
//           entrada.no * Math.pow(neperiano, (-entrada.kbt * tempop))
//       }

//       let aux = entrada.distancia / entrada.particoes;
//       kmvet.push((aux * i) / 1000);
//       novet.push(entrada.noToPush.toFixed(2));
//     }

//     if (entrada.no > entrada.nop) {
//       entrada.nep = (entrada.nop * (entrada.qr + entrada.qe) - entrada.qr * entrada.nr) / entrada.qe
//       entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne

//       for (let i = 0; i <= entrada.particoes; i++) {
//         particoesVet.push(i);


//         let tempop =
//           ((entrada.distancia / entrada.particoes) * i) /
//           (entrada.velocidade * 86400);
//         if (tempop === 0) {
//           entrada.noToPush = entrada.nop;

//         } else {

//           entrada.noToPush =
//             entrada.nop * Math.pow(neperiano, (-entrada.kbt * tempop))
//         }

//         let aux = entrada.distancia / entrada.particoes;
//         kmvet.push((aux * i) / 1000);
//         novet.push(entrada.noToPush.toFixed(2));
//       }
//     }//isto deve vir antes do for, pois o for deve ser o caso else deste condição




//   } else {
//     // Caso represa === true

//     // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
//     entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);

//     //vazao total afluente a represa
//     entrada.qAfluente = entrada.qr + entrada.qe;
//     //depois deve ser adicionado uma opção para mais vazões (qAfluente)
//     //tal qual será aceito quantos o usuario definir

//     entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20))


//     //Tempo de detenção na represa
//     entrada.tDentencao = entrada.volume / entrada.qAfluente;
//     // nomes das variaveis deve ser trocado para
//     // volume e qAfluente

//     //Concentracao coliformes na represa
//     entrada.nRepresa = entrada.no / (1 + entrada.kbt * entrada.tDentencao);

//     if(entrada.nRepresa > entrada.nop ) {

//       entrada.nRepresaMax = entrada.nop * (1 + entrada.kbt * entrada.tDentencao)
      
//       entrada.nep = (entrada.nRepresaMax*(entrada.qr+entrada.qe)-entrada.qr*entrada.nr)/entrada.qr

//       entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne


//     }
//     //Concentracao maxima permissivel no esgoto para atendimento ao padrão para a represa
    



//   }

//   // if (entrada.represa === false) {

//   //   // b) Concentração de coliformes na mistura esgoto-rio (equação da mistura):
//   // entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.ne)) / (entrada.qr + entrada.qe);

//   // c) Perfil da concentracao ao longo da distancia 
//   // entrada.kbt = entrada.kb20 * Math.pow(entrada.teta, (entrada.temperatura - 20));
//   //resulta em uma variavel 1/d



//   // tempo = (distancia / velocidade)/86400;








//   //   for (let i = 0; i <= entrada.particoes; i++) {
//   //     particoesVet.push(i);

//   //     let tempop =
//   //       ((entrada.distancia / entrada.particoes) * i) /
//   //       (entrada.velocidade * 86400);
//   //     if (tempop === 0) {
//   //       entrada.ntempo = entrada.no;

//   //     } else {

//   //       entrada.ntempo = entrada.no * Math.pow(neperiano, (entrada.kbt * entrada.t));
//   //       // para calcular pela segunda vez, o no irá se tornar o limite da classe (valores nas variaveis)


//   //     }

//   //     let aux = entrada.distancia / entrada.particoes;
//   //     kmvet.push((aux * i) / 1000);
//   //     ntempoVet.push(entrada.ntempo.toFixed(2));

//   //   }
//   //   //fazer isso como uma função recursiva para refazer o grafico de ntempo
//   //   if( entrada.no > entrada.classLimit){
//   //     // Concentração máxima permissível de coliformes nos esgotos:
//   //     entrada.nep = (entrada.nop * (entrada.qr + entrada.qe) - (entrada.qr * entrada.nr)) / entrada.qe;

//   //     // Eficiencia requerida para a remocao de coliformes fecais no tratamentos de esgotos
//   //     entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne
//   //     //Ne é a concentração de coliformes fecais no esgoto, onde usamos o esgoto bruto nesse exemplo, p é o maximo permissivel
//   //   }
//   //   //a eficiencia deve ser mostrada para o usuario


//   // }else{ // Caso represa

//   //   // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
//   //   entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);

//   //   //vazao total afluente a represa
//   //   entrada.q = entrada.qr + entrada.qe;

//   //   //Tempo de detenção na represa
//   //   entrada.t = entrada.v / entrada.q;

//   //   //Concentracao coliformes na represa
//   //   entrada.concentracaoColiformesRepresa = entrada.no / (1 + entrada.kb * entrada.t);

//   //   //Concentracao maxima permissivel no esgoto para atendimento ao padrão para a represa
//   //   entrada.concentracaoMaxPermitidaEsgotos = entrada.n * (1 + entrada.kb * entrada.t)

//   // }


// // const eficienciaAux = entrada.eficiencia

// let resultado2 = {}; 
// // const novetYaxis = [...novet].sort((a, b) => a - b);

// // novetYaxis.forEach((value, index, array) => {
// //   array[index] = formatarCientifico(value);
// // });

// if (entrada.represa === true) {
//   resultado2.eficiencia = entrada.eficiencia;
// } else {
//   // resultado2.particoesVet = particoesVet;
//   resultado2.ntempoVet = ntempoVet;
//   resultado2.kmvet = kmvet;
//   resultado2.particoesVet = particoesVet;
//   resultado2.novet = novet;
//   // resultado2.novetYaxis = novetYaxis;
// }

// console.log(entrada);
// return resultado2;
// };