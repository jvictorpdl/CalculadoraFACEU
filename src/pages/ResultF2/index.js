import * as calc from "../../utils/calcsF2";
import Linechart2 from "../../components/Linechart2";
import { CardInput } from "../Home/styleSteps";
import alertIcon from "../../assets/alertIcon.svg"

export default function Result2 (props) {

  const {
    eficienciaTemp = null,  // Valor padrão se não existir
    ntempoVet = [],
    kmvet = [],
    particoesVet = [],
    novet = []
  } = calc.Calculadora2(props.data);


  // const {ctVet, odminVet, particoesVet, kmvet} = calc.Calculadora(props.data);
  

  return(
   
    <> 
    {
      (!novet.find(e => e<0) && //LEMBRAR DE PERGUNTAR A JOSICLEIDE A CONDICAO PARA CALCULAR NOVAMENTE
      <Linechart2 novet={novet}  particoesVet={particoesVet} kmvet={kmvet} />)
      ||
      <CardInput>
          <img src={ alertIcon } alt="Icone de alerta"/>

        <h1>Concentração negativa de oxigênio dissolvido!!! O modelo de Streeter-Phelps não tem validade para este caso.</h1>
      </CardInput>
    }
    </>
    
  )
}