import * as calc from "../../utils/calcs";


export default function Result (props) {
  const resultado = calc.Calculadora(props.data);

  console.log(props.data);
  console.log(resultado);
  return(
    <h1>Resultados</h1>
    
  )
}