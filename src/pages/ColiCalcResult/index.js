import alertIcon from "../../assets/alertIcon.svg";
import Linechart2 from "../../components/Linechart2";
import * as calc from "../../utils/coliCalcCalculation";
import { CardInput } from "../AutoDepura/styleSteps";

const inteiro = (valor) => Math.round(valor).toLocaleString('pt-BR');

export default function ColicalcChart(props) {
  const result = calc.CalculadoraColicalc(props.data);

  const novet = result.novet || [];
  const particoesVet = result.particoesVet || [];
  const kmvet = result.kmvet || [];
  const eficiencia = result.eficiencia;

  if (result.inviavel) {
    return (
      <CardInput>
        <img src={alertIcon} alt="Icone de alerta" />
        <h1>Mesmo removendo 100% dos coliformes do esgoto, o padrão não é atendido: a concentração do rio a montante (Nr) já é alta demais.</h1>
      </CardInput>
    );
  }

  return (
    <>
      {props.data.represa === false ? (
        novet.length > 1 ? (
          result.semTratamento ? (
            <div>
              <h2>Não é necessário tratamento: a mistura (N0 = {inteiro(result.n0)} org/100 mL) já atende o padrão (Nop = {inteiro(result.nop)} org/100 mL).</h2>
              <br />
              <Linechart2 novet={novet} particoesVet={particoesVet} kmvet={kmvet} />
            </div>
          ) : (
            <div>
              <h2>Valor resultante de eficiência: {eficiencia}</h2>
              <p>O gráfico mostra o perfil após o tratamento, com a mistura saindo com Nop = {inteiro(result.nop)} org/100 mL.</p>
              <br />
              <Linechart2 novet={novet} particoesVet={particoesVet} kmvet={kmvet} />
            </div>
          )
        ) : (
          <CardInput>
            <img src={alertIcon} alt="Icone de alerta" />
            <h1>Nenhum dado disponível para exibir o gráfico.</h1>
          </CardInput>
        )
      ) : (
        result.semTratamento ? (
          <CardInput>
            <h1>Não será necessário nenhum tratamento</h1>
          </CardInput>
        ) : (
          <CardInput>
            <h1>Valor resultante de eficiência: {eficiencia}</h1>
          </CardInput>
        )
      )
      }
    </>
  );
}



//========================================================================================
//========================================================================================
//========================================================================================
// import React from "react";
// import * as calc from "../../utils/calcsF2";
// import Linechart2 from "../../components/Linechart2";
// import { CardInput } from "../Home/styleSteps";
// import alertIcon from "../../assets/alertIcon.svg";

// export default function Result2(props) {
//   const {
//     novet = [],
//     particoesVet = [],
//     kmvet = [],
//     eficiencia = null
//   } = calc.Calculadora2(props.data);

//   return (
//     <>
//       {eficiencia === null? (
//         novet.length > 0 ? (
//           !novet.find(e => e < 0) ? (
//             <Linechart2 novet={novet} particoesVet={particoesVet} kmvet={kmvet} />
//           ) : (
//             <CardInput>
//               <img src={alertIcon} alt="Icone de alerta" />
//               <h1>Concentração negativa de oxigênio dissolvido!!! O modelo de Streeter-Phelps não tem validade para este caso.</h1>
//             </CardInput>
//           )
//         ) : (
//           <CardInput>
//             <img src={alertIcon} alt="Icone de alerta" />
//             <h1>Nenhum dado disponível para exibir o gráfico.</h1>
//           </CardInput>
//         )
//       ) : (
//             <CardInput>
//               {/* <img src={alertIcon} alt="Icone de alerta" /> */}
//               <h1>Valor de eficiência: {eficiencia}</h1>
//             </CardInput>
//       )
//       }
//     </>
//   );
// }

