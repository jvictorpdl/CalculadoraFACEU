import Chart from "react-apexcharts";
import styled from "styled-components";
import BaixarRelatorio from "../../components/BaixarRelatorio";
import { CalculadoraEutrofriza, GRAUS_TROFIA } from "../../utils/eutroFrizaCalculation";
import { numero } from "../../utils/relatorio";
import { relatorioEutrofriza } from "../../utils/relatorioEutrofriza";

const Conclusao = styled.div`
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$atende ? '#6EE7B7' : '#FCA5A5')};
  background: ${(props) => (props.$atende ? '#ECFDF5' : '#FEF2F2')};
  color: #374151;
  font-size: 14px;
  line-height: 1.5;

  strong {
    display: block;
    font-size: 16px;
    color: ${(props) => (props.$atende ? '#047857' : '#B91C1C')};
  }
`;

const CaixaTabela = styled.div`
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
`;

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #374151;

  caption {
    padding: 12px 16px 8px;
    text-align: left;
    font-size: 16px;
    font-weight: 600;
  }

  th, td {
    padding: 8px 12px;
    border-bottom: 1px solid #F3F4F6;
    text-align: left;
    vertical-align: top;
  }

  thead th {
    background: #17737A;
    color: #FFF;
    white-space: nowrap;
  }

  td.valor {
    text-align: right;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  tbody tr:nth-child(even) th, tbody tr:nth-child(even) td {
    background: #F9FAFB;
  }

  tr.atual th, tr.atual td {
    background: #FEF3C7;
    font-weight: 600;
  }

  .descricao {
    display: block;
    font-size: 12px;
    color: #6B7280;
  }
`;

// cores das fontes fixas por fonte, na ordem da paleta categórica; a carga admissível fica em cinza
const CORES = { areaMatas: '#2a78d6', areaAgricola: '#eb6834', areaUrbana: '#1baf7a', esgoto: '#eda100', outras: '#e87ba4' };
const COR_ADMISSIVEL = '#52514e';

export function graficoCargas({ fontes, cargaAdmissivel }) {
  const usadas = fontes.filter((fonte) => fonte.carga > 0);
  const kg = (valor) => `${numero(valor, 0)} kgP/ano`;

  return {
    series: [
      ...usadas.map((fonte) => ({ name: fonte.nome, data: [Number(fonte.carga.toFixed(1)), 0] })),
      { name: 'Carga máxima admissível', data: [0, Number(cargaAdmissivel.toFixed(1))] },
    ],
    options: {
      chart: { type: 'bar', stacked: true, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
      colors: [...usadas.map((fonte) => CORES[fonte.chave]), COR_ADMISSIVEL],
      title: { text: 'Carga de fósforo afluente à represa (kgP/ano)', style: { fontSize: '13px' } },
      plotOptions: { bar: { horizontal: true, barHeight: '55%' } },
      // o espaço branco entre os segmentos separa as fontes sem depender só da cor
      stroke: { width: 2, colors: ['#FFF'] },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Carga atual', 'Carga admissível'],
        title: { text: 'kgP/ano' },
        labels: { formatter: (valor) => numero(valor, 0) },
      },
      yaxis: { labels: { style: { fontSize: '13px' } } },
      grid: { borderColor: '#E5E7EB' },
      legend: { position: 'bottom', horizontalAlign: 'left' },
      tooltip: { shared: false, intersect: true, y: { formatter: kg } },
      states: { hover: { filter: { type: 'darken', value: 0.9 } } },
      // no celular os rótulos do eixo (2.000, 4.000…) se encostavam
      responsive: [{ breakpoint: 600, options: { xaxis: { tickAmount: 3 } } }],
    },
  };
}

function ValoresCalculados({ calculados }) {
  return (
    <CaixaTabela>
      <Tabela>
        <caption>Valores calculados</caption>
        <thead>
          <tr>
            <th scope="col">Parâmetro</th>
            <th scope="col" style={{ textAlign: 'right' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {calculados.map(({ rotulo, descricao, texto, unidade }) => (
            <tr key={rotulo}>
              <th scope="row">{rotulo}<span className="descricao">{descricao}</span></th>
              <td className="valor">{texto} {unidade}</td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </CaixaTabela>
  );
}

// as mesmas faixas da ajuda de Pmáx, com a(s) classe(s) da represa destacada(s)
function GrausDeTrofia({ graus, fosforo }) {
  return (
    <CaixaTabela>
      <Tabela>
        <caption>Grau de trofia (P = {numero(fosforo, 1)} mg/m³)</caption>
        <thead>
          <tr>
            <th scope="col">Grau de trofia</th>
            <th scope="col" style={{ textAlign: 'right' }}>Fósforo total (mg/m³)</th>
          </tr>
        </thead>
        <tbody>
          {GRAUS_TROFIA.map(({ nome, faixa }) => {
            const atual = graus.includes(nome);
            return (
              <tr key={nome} className={atual ? 'atual' : undefined}>
                <th scope="row">{nome}{atual && <span className="descricao">faixa da represa</span>}</th>
                <td className="valor">{faixa}</td>
              </tr>
            );
          })}
        </tbody>
      </Tabela>
    </CaixaTabela>
  );
}

export default function EutrofrizaResultado({ data }) {
  const resultado = CalculadoraEutrofriza(data);
  const relatorio = relatorioEutrofriza(data, resultado);
  const { conclusao, calculados } = relatorio;
  const grafico = graficoCargas(resultado);

  return (
    <>
      <Conclusao $atende={conclusao.atende} role="status">
        <strong>{conclusao.titulo}</strong>
        {conclusao.linhas.map((linha) => <div key={linha}>{linha}</div>)}
      </Conclusao>
      <BaixarRelatorio relatorio={relatorio} grafico={grafico} />
      <Chart type="bar" width="100%" height={300} series={grafico.series} options={grafico.options} />
      <GrausDeTrofia graus={resultado.graus} fosforo={resultado.fosforo} />
      <ValoresCalculados calculados={calculados} />
    </>
  );
}
