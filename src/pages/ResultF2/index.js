import React from "react";
import * as calc from "../../utils/calcsF2";
import Linechart2 from "../../components/Linechart2";
import { CardInput } from "../Home/styleSteps";
import alertIcon from "../../assets/alertIcon.svg";

export default function Result2(props) {
  const result = calc.Calculadora2(props.data);

  const novet = result.novet || [];
  const particoesVet = result.particoesVet || [];
  const kmvet = result.kmvet || [];
  const eficiencia = result.eficiencia !== null ? result.eficiencia : null;


  return (
    <>
      {props.data.represa === false ? (
        novet.length > 1 ? (
          eficiencia === null ? (
            <Linechart2 novet={novet} particoesVet={particoesVet} kmvet={kmvet} />
          ) : (
            <div>
              <h2>Valor resultante de eficiência: {eficiencia}</h2>
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
        eficiencia != '0,000%' ? (
          <CardInput>
            <h1>Valor resultante de eficiência: {eficiencia}</h1>
          </CardInput>
        ) : (
          <CardInput>
            <img src={alertIcon} alt="Icone de alerta" />
            <h1>Nenhum dado disponível para exibir o gráfico.</h1>
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

