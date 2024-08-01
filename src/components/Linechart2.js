import React from "react";
import Chart from "react-apexcharts";

// Função para formatar um número em notação científica para exibição
function formatScientific(value) {
  const exponentialForm = value.toExponential(2);
  const [coefficient, exponent] = exponentialForm.split('e');
  const formattedCoefficient = parseFloat(coefficient).toFixed(2).replace('.', ',');
  const formattedExponent = parseInt(exponent, 10);
  const sign = formattedExponent >= 0 ? '+' : '';
  const formattedExponentString = Math.abs(formattedExponent).toString().padStart(2, '0');
  return `${formattedCoefficient}E${sign}${formattedExponentString}`;
}
function formatYAxisLabel(value) {
  const exponent = Math.floor(Math.log10(value));
  // Calcula o valor base para que comece com 1.00
  const baseValue = value / (10 ** exponent);
  // Garante que o coeficiente é sempre 1.00
  const formattedCoefficient = '1,00';
  // Formata o expoente para garantir que o formato seja '+X' ou '-X'
  const formattedExponentString = exponent >= 0 ? `+${exponent}` : `${exponent}`;
  return `${formattedCoefficient}E${formattedExponentString}`;
}

function Linechart2({ novet, particoesVet, kmvet }) {
  // Formatar os valores para exibição no eixo y e tooltip
  const formattedNovet = novet.map(formatScientific);

  return (
    <div className="container-fluid mt-3 mb-3">
      <Chart 
        type='line'
        width={1100}
        height={550}
        series={[
          {
            name: "N0",
            data: novet // Aqui é utilizado os valores nao formatados para definir a posição no grafico (tendo em vista que o grafico só funciona com valores "reais")
          }
        ]}
        options={{
          title: {
            text: 'Perfil da concentração de coliformes ao longo da distância - N (org/100 mL)',
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + formatScientific(opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex]);
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return formatScientific(val) + " org / 100ml";
              }
            }
          },
          
          xaxis:{
            title: {text: 'Distância (km)'},
            categories: kmvet
          },

          yaxis: {
            title: { text: "CF (org / 100ml)" },
            labels: {
              formatter: function (val) {
                return formatYAxisLabel(val);
              }
            }
          }
        }}
      />
    </div>
  );
}

export default Linechart2;

// import React from "react"
// import Chart from "react-apexcharts"


// function Linechart2(props)
// {
//     return(<React.Fragment>
//         <div className="container-fluid mt-3 mb-3">
//             {/* <h2>Perfil de OD</h2> */}
            
//     <Chart type = 'line'
//     width = {1100}
//     height = {550}
    
//     series = {[
//       {
//         name:"N0",
//         data: props.novet
//       }
//     ]}
//     options = {{
//         title: {
//             text: 'Perfil de N0 (org / 100 ml)',
//             // align: 'left'
//           },
//           legend: {
//             tooltipHoverFormatter: function(val, opts) {
//               return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
//             }
//           },
//           tooltip: {
//             y: [
//               {
//                 title: {
//                   formatter: function (val) {
//                     return val + " org / 100ml"
//                   }
//                 }
//               }
//               ]
//               },
//           // markers: {
//           //   // size: 0,
//           //   hover: {
//           //     sizeOffset: 6
//           //   }
//           // },

//       xaxis:{
//         title: {text: 'Distância (Km)'},
//         categories: props.kmvet
//     },
//     yaxis:{
//           title:{ text: "CF (org / 100ml)"},
//           categories: props.novetYaxis

//       }
//     }}
//     >

//     </Chart>

//         </div>
//         </ React.Fragment>)
// }

// export default Linechart2;