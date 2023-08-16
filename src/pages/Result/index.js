import * as calc from "../../utils/calcs";
import Linechart from "../../components/Linechart";
import { CardInput } from "../Home/styleSteps";
import alertIcon from "../../assets/alertIcon.svg"

export default function Result (props) {
  const {ctVet, odminVet, particoesVet, kmvet} = calc.Calculadora(props.data);
  

  return(
   
    <> 
    {
      !ctVet.find(e => e<0) && 
      <Linechart ctVet={ctVet} odminVet={odminVet} particoesVet={particoesVet} kmvet={kmvet} />
      ||
      <CardInput>
          <img src={ alertIcon } />

        <h1>Concentração negativa de oxigênio dissolvido!!! O modelo de Streeter-Phelps não tem validade para este caso.</h1>
      </CardInput>
    }
    </>
    
  )
}