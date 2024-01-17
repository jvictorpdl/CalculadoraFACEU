/* eslint-disable no-lone-blocks */
export const Calculadora = (props) => {
    console.log(props);
    const entrada = {
        qr: Number(String(props.qr).replaceAll('.', '').replace(',', '.')),
        qe: Number(String(props.qe).replaceAll('.', '').replace(',', '.')),
        temperatura: Number(String(props.temperatura).replaceAll('.', '').replace(',', '.')),
        distanciac: 0,
        velocidade: Number(String(props.velocidade).replaceAll('.', '').replace(',', '.')),
        concentracaoColiformesFecais: 0,
        concentracaoColiformesMistura: 0,
        contagemColiformes: 0,
        
        
      odr: Number(String(props.odr).replaceAll('.', '').replace(',', '.')),
      dbor: Number(String(props.dbor).replaceAll('.', '').replace(',', '.')),
      odmin: Number(String(props.odmin).replaceAll('.', '').replace(',', '.')),
      k120c: Number(String(props.k120c).replaceAll('.', '').replace(',', '.')),
      tetak1: Number(String(props.tetak1).replaceAll('.', '').replace(',', '.')),
      k1t: Number(String(props.k1t).replaceAll('.', '').replace(',', '.')),
      tetak2: Number(String(props.tetak2).replaceAll('.', '').replace(',', '.')),
      h: Number(String(props.h).replaceAll('.', '').replace(',', '.')),
      k220c: Number(String(props.k220c).replaceAll('.', '').replace(',', '.')),
      k2t: Number(String(props.k2t).replaceAll('.', '').replace(',', '.')),
      distancia: Number(String(props.distancia).replaceAll('.', '').replace(',', '.')),
      particoes: Number(String(props.particoes).replaceAll('.', '').replace(',', '.')),
      tempo: Number(String(props.tempo).replaceAll('.', '').replace(',', '.')),
      cs: Number(String(props.cs).replaceAll('.', '').replace(',', '.')),
      cslinha: Number(String(props.cslinha).replaceAll('.', '').replace(',', '.')),
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
      deficitc: 0,
      odc: 0,
      ct: 0,
      lancamentos: props.lancamentos,
    };
    console.log(entrada);
  
    const resultado = {
      //variaveis resultantes que irão retornar
    };
    return resultado;
  };