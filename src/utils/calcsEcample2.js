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
    concentracaoColiformesMistura = ((qr * nr) + (qe * nr)) / (qr + qe);
      
    // Perfil da concentracao ao longo da distancia 
    kbt = kb20 * Math.pow(teta, (temperatura - 20));
    //resulta em uma variavel 1/d
      
    n = n0 * Math.pow(neperiano, (kbt * t));
      
    d = v * t;
      
    // Concentração máxima permissível de coliformes nos esgotos:
    concentracaoMaxPermitidaEsgotos = (nop * (qr + qe) - (qr*nr)) / qe;
      
    // Eficiencia requerida para a remocao de coliformes fecais no tratamentos de esgotos
    eficiencia = (ne - nep) / ne
    //Ne é a concentração de coliformes fecais no esgoto, onde usamos o esgoto bruto nesse exemplo, descobrir oq significa o p no segundo Ne
      
  }

  // Caso represa
  if (represa === true){

    // Concentração de coliformes na mistura esgoto-rio (equação da mistura):
    concentracaoColiformesMistura = ((qr * nr) + (qe * nr)) / (qr + qe);    

    //vazao total afluente a represa
    q = qr + qe;
    
    //Tempo de detenção na represa
    t = v / q;

    //Concentracao coliformes na represa
    concentracaoColiformesRepresa = n0 / (1 + kb * t);

    //Concentracao maxima permissivel no esgoto para atendimento ao padrão para a represa
    concentracaoMaxPermitidaEsgotos = n * (1 + kb * t)

  }
 
      const resultado = {
      //variaveis resultantes que irão retornar
     };
     return resultado;
  };