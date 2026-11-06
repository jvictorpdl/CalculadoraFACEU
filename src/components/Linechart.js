import React from "react"
import Chart from "react-apexcharts"

const numero = (valor, casas = 2) => Number(valor).toFixed(casas).replace('.', ',');

// linha tracejada no início de cada trecho seguinte, onde entra a contribuição
const divisas = (divisasKm) => divisasKm.map((km, i) => ({
  x: km,
  borderColor: '#9CA3AF',
  strokeDashArray: 4,
  label: {
    text: `Trecho ${i + 2}`,
    orientation: 'horizontal',
    borderColor: '#9CA3AF',
    style: { color: '#374151', background: '#F3F4F6' },
  },
}));

// muitos pontos com marcador viram uma faixa grossa; acima disso, só a linha
const marcadores = (pontos) => ({ size: pontos.length > 60 ? 0 : 4 });

const eixoDistancia = {
  type: 'numeric',
  title: { text: 'Distância (km)' },
  labels: { formatter: (km) => numero(km, 1) },
};

export function graficoOD({ ctVet, odminVet, kmvet, critico, divisasKm = [] }) {
  const odmin = Number(odminVet[0]);

  // eixo x numérico para o ponto crítico entrar na curva na posição exata, entre os trechos amostrados
  const pontos = kmvet.map((km, i) => [km, Number(ctVet[i])]);
  const criticoNoTrecho = critico && critico.tc > 0 && critico.xcKm < critico.distanciaKm;
  if (criticoNoTrecho && !pontos.some(([km]) => km === critico.xcKm)) {
    pontos.push([critico.xcKm, Number(critico.odc.toFixed(2))]);
    // a ordenação é estável: na divisa entre trechos o fim de um continua antes da mistura do seguinte
    pontos.sort((a, b) => a[0] - b[0]);
  }
  const maximo = Math.ceil(Math.max(odmin, ...pontos.map(([, od]) => od)) + 0.5);
  // num trecho intermediário o menor OD pode ser o fim dele, antes da contribuição seguinte
  const rotuloCritico = critico?.tipo === 'fim' ? 'Menor OD' : 'Ponto crítico';

  return {
    series: [
      {
        name: "OD",
        data: pontos
      }
    ],
    options: {
      // o download fica nos botões da página, em português e com o relatório completo
      chart: { toolbar: { tools: { download: false } } },
      title: {
        text: 'Perfil de OD (mg/L)',
      },
      colors: ['#17737A'],
      stroke: { width: 3 },
      markers: marcadores(pontos),
      annotations: {
        xaxis: divisas(divisasKm),
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
            text: `${rotuloCritico}: ${numero(critico.odc)} mg/L a ${numero(critico.xcKm, 1)} km`,
            borderColor: '#B91C1C',
            style: { color: '#FFFFFF', background: '#B91C1C' },
          },
        }] : [],
      },
      tooltip: {
        x: { formatter: (km) => `${numero(km, 1)} km` },
        y: { formatter: (od) => `${numero(od)} mg/L` },
      },
      xaxis: eixoDistancia,
      yaxis: {
        min: 0,
        max: maximo,
        tickAmount: maximo,
        title: { text: "OD (mg/L)" },
        labels: { formatter: (od) => numero(od, 1) },
      }
    }
  };
}

// topo do eixo em número redondo (50, 8, 3...) com pelo menos quatro divisões
function escala(maior) {
  let passo = Math.pow(10, Math.floor(Math.log10(maior)));
  while (Math.ceil(maior / passo) < 4) passo /= 2;
  return { maximo: Math.ceil(maior / passo) * passo, divisoes: Math.ceil(maior / passo) };
}

export function graficoDBO({ kmvet, dboVet, divisasKm = [] }) {
  const pontos = kmvet.map((km, i) => [km, dboVet[i]]);
  const { maximo, divisoes } = escala(Math.max(0.1, ...dboVet));

  return {
    series: [
      {
        name: "DBO5",
        data: pontos
      }
    ],
    options: {
      chart: { toolbar: { tools: { download: false } } },
      title: {
        text: 'Perfil de DBO5 (mg/L)',
      },
      colors: ['#B45309'],
      stroke: { width: 3 },
      markers: marcadores(pontos),
      annotations: { xaxis: divisas(divisasKm) },
      tooltip: {
        x: { formatter: (km) => `${numero(km, 1)} km` },
        y: { formatter: (dbo) => `${numero(dbo)} mg/L` },
      },
      xaxis: eixoDistancia,
      yaxis: {
        min: 0,
        max: maximo,
        tickAmount: divisoes,
        title: { text: "DBO5 (mg/L)" },
        labels: { formatter: (dbo) => numero(dbo, 1) },
      }
    }
  };
}

function Linechart({ grafico, altura = 550 }) {
  return (<React.Fragment>
    <div className="container-fluid mt-3 mb-3">

      <Chart type='line'
        width="100%"
        height={altura}
        {...grafico}
      />

    </div>
  </ React.Fragment>)
}

export default Linechart;
