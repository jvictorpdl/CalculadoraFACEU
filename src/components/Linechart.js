import React from "react"
import Chart from "react-apexcharts"

function Linechart()
{
    return(<React.Fragment>
        <div className="container-fluid mt-3 mb-3">
            {/* <h2>Perfil de OD</h2> */}
            
    <Chart type = 'line'
    width = {1349}
    height = {550}
    
    series = {[
      {
        name:"ODmin",
        data:[5,5,5,5,5]
      }
    ]}
    options = {{
        title: {
            text: 'Perfil de OD',
            // align: 'left'
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },

      xaxis:{
        title: {text: "Distância"},
        categories:['1', '2', '3', '4', '5']
    },
    yaxis:{
          title:{ text: "OD"}

      }
    }}
    >

    </Chart>

        </div>
        </ React.Fragment>)
}

export default Linechart;