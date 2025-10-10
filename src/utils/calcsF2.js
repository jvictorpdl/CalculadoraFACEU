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
    console.log(props);
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

  const neperiano = 2.7182818285;
  let particoesVet = [];
  let ntempoVet = [];
  let kmvet = [];
  let novet = [];
  // let kmvetTwo = [];
  // let novetTwo = [];


  if (entrada.represa === false) {
    entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.ne)) / (entrada.qr + entrada.qe);

    entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20));
    if (entrada.no > entrada.nop) {
      entrada.nep = (entrada.nop * (entrada.qr + entrada.qe) - entrada.qr * entrada.nr) / entrada.qe;
      entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne;

      for (let i = 0; i <= entrada.particoes; i++) {
        let tempop = ((entrada.distancia / entrada.particoes) * i) / (entrada.velocidade * 86400);
        entrada.noToPush = tempop === 0 ? entrada.nop : entrada.nop * Math.pow(neperiano, (-entrada.kbt * tempop));

        let aux = entrada.distancia / entrada.particoes;
        kmvet.push((aux * i) / 1000);
        novet.push(Number(entrada.noToPush.toFixed(2)));

      }
    } else {

      for (let i = 0; i <= entrada.particoes; i++) {
        let tempop = ((entrada.distancia / entrada.particoes) * i) / (entrada.velocidade * 86400);
        entrada.noToPush = tempop === 0 ? entrada.no : entrada.no * Math.pow(neperiano, (-entrada.kbt * tempop));
        let aux = entrada.distancia / entrada.particoes;
        kmvet.push((aux * i) / 1000);
        novet.push(Number(entrada.noToPush.toFixed(2)));
      }
    }
  } else { //CASO DE REPRESA===true

    entrada.qAfluente = entrada.qr + entrada.qe;

    entrada.kbt = entrada.kb * Math.pow(entrada.teta, (entrada.temperatura - 20));
    entrada.tDentencao = entrada.volume / (entrada.qAfluente * 86400);

    // entrada.no = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);
    entrada.nRepresa = entrada.nop * (1 + (entrada.kbt * entrada.tDentencao));
    console.log('nrepresa: ' + entrada.nRepresa);
    // entrada.nRepresa = entrada.no / (1 + entrada.kbt * entrada.tDentencao);

    if (entrada.nRepresa > entrada.nop) {
      entrada.nRepresaMax = entrada.nop * (1 + entrada.kbt * entrada.tDentencao);
      entrada.nep = (entrada.nRepresaMax * (entrada.qr + entrada.qe) - entrada.qr * entrada.nr) / entrada.qe;
      entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne;
    } else {
      entrada.eficiencia = -1
            console.log('entrou no else e eficiencia é -1' )
    }
  }

  console.log(props);
  console.log('EFICIENCIA: ' + entrada.eficiencia);

  let resultado2 = {};
  // apenas para testar o grafico
  // novet = [50000000, 60000000, 70000000, 80000000, 90000000, 50000000, 80000000, 60000000, 20000000, 70000000];
  // entrada.eficiencia = 85
  // entrada.eficiencia = convertToPercentage(entrada.eficiencia)


  resultado2.eficiencia = convertToPercentage(entrada.eficiencia);
  resultado2.particoesVet = particoesVet;
  resultado2.ntempoVet = ntempoVet;
  resultado2.kmvet = kmvet;
  resultado2.novet = novet;

  console.log('Resultado final: ' + novet);

  // console.log(entrada);
  return resultado2;
};
