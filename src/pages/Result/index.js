import * as calc from "../../utils/calcs";
import Linechart from "../../components/Linechart";

export default function Result (props) {
  const resultado = calc.Calculadora(props.data);

  console.log(props.data);
  console.log(resultado);
  return(
   
    <Linechart />
    
  )
}