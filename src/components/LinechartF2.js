import React from "react"
import Chart from "react-apexcharts"


function Linechart(props)
{
    return(<React.Fragment>
        <div className="container-fluid mt-3 mb-3">
            {/* <h2>Perfil de OD</h2> */}
            
    <Chart type = 'line'
    width = {1100}
    height = {550}
    
    series = {[
      // {
      //   name:"ODmin",
      //   data: props.odminVet
      // },
      {
        name: "OD",
        data: props.ctVet
      }
    ]}
    options = {{
        title: {
            text: 'PERRFIL DE COLIFORMES FECAIS (mg/L)',
            // align: 'left'
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          },
          tooltip: {
            y: [
              {
                title: {
                  formatter: function (valor) {
                    return valor + " mg/L"
                  }
                }
              },
              // {
              //   title: {
              //     formatter: function (val) {
              //       return valor + " mg/L"
              //     }
              //   }}
              ]
              },
          // markers: {
          //   // size: 0,
          //   hover: {
          //     sizeOffset: 6
          //   }
          // },

      xaxis:{
        title: {text: 'Distância (Km)'},
        categories: props.kmvet
    },
    yaxis:{
          title:{ text: "CF (org / 100ml)"}

      }
    }}
    >

    </Chart>

        </div>
        </ React.Fragment>)
}

export default Linechart;