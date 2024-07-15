import React from "react";
import Chart from "react-apexcharts";

// Função para formatar um número em notação científica para exibição
function formatScientific(number) {
  const exponentialForm = number.toExponential(1); // 1 casa decimal
  const [mantissa, exponent] = exponentialForm.split('e');
  
  // Formata a mantissa e o expoente conforme necessário
  const formattedMantissa = mantissa.replace('.', ',');
  const formattedExponent = exponent.toUpperCase().replace('+', '');
  
  return `${formattedMantissa}E+${formattedExponent}`;
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
            text: 'Perfil de N0 (org / 100 ml)',
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
            title: {text: 'Distância (Km)'},
            categories: kmvet
          },

          yaxis: {
            title: { text: "CF (org / 100ml)" },
            labels: {
              formatter: function (val) {
                return formatScientific(val);
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