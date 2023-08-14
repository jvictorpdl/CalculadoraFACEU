import * as calc from "../../utils/calcs";
import Linechart from "../../components/Linechart";
import { CardInput } from "../Home/styleSteps";
import alertIcon from "../../assets/alertIcon.svg"

export default function Result (props) {
  const {ctVet, odminVet, particoesVet, kmvet} = calc.Calculadora(props.data);
  

  // // console.log(props.data);
  // console.log("resultado");
  // console.log(ctVet);
  // console.log(odminVet);
  // console.log(kmvet);
  return(
   
    <> 
    {
      !ctVet.find(e => e<0) && 
      <Linechart ctVet={ctVet} odminVet={odminVet} particoesVet={particoesVet} kmvet={kmvet} />
      ||
      <CardInput>
          <img src={ alertIcon } />

        <h1>Alerta, o modelo de .... nao pode ser utilizado para o calculo deste caso.</h1>
      </CardInput>
    }
    </>
    
  )
}