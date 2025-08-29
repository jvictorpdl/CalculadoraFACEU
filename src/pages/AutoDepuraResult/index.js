import alertIcon from "../../assets/alertIcon.svg";
import Linechart from "../../components/Linechart";
import * as calc from "../../utils/autoDepuraCalculation";
import { CardInput } from "../AutoDepura/styleSteps";

export default function AutodepuraChart(props) {
  const { ctVet, odminVet, particoesVet, kmvet } = calc.CalculadoraAutodepura(props.data);


  return (

    <>
      {
        (!ctVet.find(e => e < 0) &&
          <Linechart ctVet={ctVet} odminVet={odminVet} particoesVet={particoesVet} kmvet={kmvet} />)
        ||
        <CardInput>
          <img src={alertIcon} alt="Icone de Alerta" />

          <h1>Concentração negativa de oxigênio dissolvido!!! O modelo de Streeter-Phelps não tem validade para este caso.</h1>
        </CardInput>
      }
    </>

  )
}