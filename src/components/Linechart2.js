import React from "react"
import Chart from "react-apexcharts"


function Linechart2(props)
{
    return(<React.Fragment>
        <div className="container-fluid mt-3 mb-3">
            {/* <h2>Perfil de OD</h2> */}
            
    <Chart type = 'line'
    width = {1100}
    height = {550}
    
    series = {[
      {
        name:"N0",
        data: props.novet
      }
    ]}
    options = {{
        title: {
            text: 'Perfil de N0 (org / 100 ml)',
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
                  formatter: function (val) {
                    return val + " org / 100ml"
                  }
                }
              }
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
          title:{ text: "CF (org / 100ml)"},
          categories: props.novet

      }
    }}
    >

    </Chart>

        </div>
        </ React.Fragment>)
}

export default Linechart2;