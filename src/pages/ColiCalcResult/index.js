import alertIcon from "../../assets/alertIcon.svg";
import BaixarRelatorio from "../../components/BaixarRelatorio";
import Linechart2, { graficoColiformes } from "../../components/Linechart2";
import * as calc from "../../utils/coliCalcCalculation";
import { relatorioColicalc } from "../../utils/relatorio";
import { CardInput } from "../AutoDepura/styleSteps";

export default function ColicalcChart(props) {
  const result = calc.CalculadoraColicalc(props.data);
  const { novet, particoesVet, kmvet } = result;
  const relatorio = relatorioColicalc(props.data, result);
  const { conclusao, perfil } = relatorio;

  // represa não tem perfil ao longo do percurso; caso inviável também não
  if (!perfil) {
    return (
      <>
        <CardInput>
          {result.inviavel && <img src={alertIcon} alt="Icone de alerta" />}
          <h1>{conclusao.titulo}</h1>
        </CardInput>
        <BaixarRelatorio relatorio={relatorio} />
      </>
    );
  }

  return (
    <div>
      <h2>{conclusao.titulo}</h2>
      {conclusao.linhas.map((linha) => <p key={linha}>{linha}</p>)}
      <br />
      <BaixarRelatorio relatorio={relatorio} grafico={graficoColiformes({ novet, kmvet })} />
      <Linechart2 novet={novet} particoesVet={particoesVet} kmvet={kmvet} />
    </div>
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

