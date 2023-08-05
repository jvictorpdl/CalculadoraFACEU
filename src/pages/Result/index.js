import * as calc from "../../utils/calcs";
import Linechart from "../../components/Linechart";

export default function Result (props) {
  const {ctVet, odminVet, particoesVet, kmvet} = calc.Calculadora(props.data);
  
  // // console.log(props.data);
  // console.log("resultado");
  // console.log(ctVet);
  // console.log(odminVet);
  // console.log(kmvet);
  return(
   
    <Linechart ctVet={ctVet} odminVet={odminVet} particoesVet={particoesVet} kmvet={kmvet} />
    
  )
}