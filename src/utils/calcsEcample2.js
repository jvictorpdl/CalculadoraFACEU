/* eslint-disable no-lone-blocks */
export const Calculadora = (props) => {
  console.log(props);
  //confirmar com fernando onde as variaveis poderiam ficar 
  let represa = new Boolean(false);

  const entrada = {
    qr: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
    qe: Number(String(props.qe).replaceAll('.', '').replace(',', '.')),
    temperatura: Number(String(props.temperatura).replaceAll('.', '').replace(',', '.')),
    concentracaoColiformesFecaisEsgoto: 0,
    concentracaoColiformesFecaisEsgotoBruto: 0,
    concentracaoColiformesMistura: 0,
    concentracaoMaxPermitidaEsgotos: 0,
    concentracaoColiformesRepresa: 0,
    contagemColiformes: 0,
    eficiencia: 0,
    nr: 0,
    n0: 0,
    nop: 0,
    kb: 0,
    t: 0,
    v: 0,
    kbt: 0,
    teta: 0,
    neperiano: 2.7182818285,
    };
  
  console.log(entrada);

  if(represa === false){

    // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
    entrada.concentracaoColiformesMistura = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);
      
    // Perfil da concentracao ao longo da distancia 
    entrada.kbt = entrada.kb20 * Math.pow(entrada.teta, (entrada.temperatura - 20));
    //resulta em uma variavel 1/d
      
    entrada.n = entrada.n0 * Math.pow(entrada.neperiano, (entrada.kbt * entrada.t));
      
    entrada.d = entrada.v * entrada.t;
      
    // Concentração máxima permissível de coliformes nos esgotos:
    entrada.concentracaoMaxPermitidaEsgotos = (entrada.nop * (entrada.qr + entrada.qe) - (entrada.qr*entrada.nr)) / entrada.qe;
      
    // Eficiencia requerida para a remocao de coliformes fecais no tratamentos de esgotos
    entrada.eficiencia = (entrada.ne - entrada.nep) / entrada.ne
    //Ne é a concentração de coliformes fecais no esgoto, onde usamos o esgoto bruto nesse exemplo, descobrir oq significa o p no segundo Ne
      
  }

  // Caso represa
  if (represa === true){

    // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
    entrada.concentracaoColiformesMistura = ((entrada.qr * entrada.nr) + (entrada.qe * entrada.nr)) / (entrada.qr + entrada.qe);    

    //vazao total afluente a represa
    entrada.q = entrada.qr + entrada.qe;
    
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