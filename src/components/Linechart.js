import React from "react"
import Chart from "react-apexcharts"

const numero = (valor, casas = 2) => Number(valor).toFixed(casas).replace('.', ',');

function Linechart(props) {
  const { critico } = props;
  const odmin = Number(props.odminVet[0]);

  // eixo x numérico para o ponto crítico entrar na curva na posição exata, entre os trechos amostrados
  const pontos = props.kmvet.map((km, i) => [km, Number(props.ctVet[i])]);
  const criticoNoTrecho = critico && critico.tc > 0 && critico.xcKm < critico.distanciaKm;
  if (criticoNoTrecho) {
    pontos.push([critico.xcKm, Number(critico.odc.toFixed(2))]);
    pontos.sort((a, b) => a[0] - b[0]);
  }
  const maximo = Math.ceil(Math.max(odmin, ...pontos.map(([, od]) => od)) + 0.5);

  return (<React.Fragment>
    <div className="container-fluid mt-3 mb-3">

      <Chart type='line'
        width="100%"
        height={550}

        series={[
          {
            name: "OD",
            data: pontos
          }
        ]}
        options={{
          title: {
            text: 'Perfil de OD (mg/L)',
          },
          colors: ['#17737A'],
          stroke: { width: 3 },
          markers: { size: 4 },
          annotations: {
            yaxis: [{
              y: odmin,
              borderColor: '#B91C1C',
              strokeDashArray: 6,
              label: {
                text: `ODmín = ${numero(odmin)} mg/L`,
                borderColor: '#B91C1C',
                style: { color: '#FFFFFF', background: '#B91C1C' },
              },
            }],
            points: criticoNoTrecho ? [{
              x: critico.xcKm,
              y: critico.odc,
              marker: { size: 7, fillColor: '#B91C1C', strokeColor: '#FFFFFF' },
              label: {
                text: `Ponto crítico: ${numero(critico.odc)} mg/L a ${numero(critico.xcKm, 1)} km`,
                borderColor: '#B91C1C',
                style: { color: '#FFFFFF', background: '#B91C1C' },
              },
            }] : [],
          },
          tooltip: {
            x: { formatter: (km) => `${numero(km, 1)} km` },
            y: { formatter: (od) => `${numero(od)} mg/L` },
          },
          xaxis: {
            type: 'numeric',
            title: { text: 'Distância (km)' },
            labels: { formatter: (km) => numero(km, 1) },
          },
          yaxis: {
            min: 0,
            max: maximo,
            tickAmount: maximo,
            title: { text: "OD (mg/L)" },
            labels: { formatter: (od) => numero(od, 1) },
          }
        }}
      >

      </Chart>

    </div>
  </ React.Fragment>)
}

export default Linechart;
