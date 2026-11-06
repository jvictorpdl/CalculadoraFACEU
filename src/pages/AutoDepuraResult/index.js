import styled from "styled-components";
import alertIcon from "../../assets/alertIcon.svg";
import BaixarRelatorio from "../../components/BaixarRelatorio";
import Linechart, { graficoDBO, graficoOD } from "../../components/Linechart";
import * as calc from "../../utils/autoDepuraCalculation";
import { numero, relatorioAutodepura } from "../../utils/relatorio";
import { CardInput } from "../AutoDepura/styleSteps";

const Conclusao = styled.div`
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.atende ? '#6EE7B7' : '#FCA5A5')};
  background: ${(props) => (props.atende ? '#ECFDF5' : '#FEF2F2')};
  color: #374151;
  font-size: 14px;
  line-height: 1.5;

  strong {
    display: block;
    font-size: 16px;
    color: ${(props) => (props.atende ? '#047857' : '#B91C1C')};
  }
`;

// no celular a tabela rola de lado e a coluna dos parâmetros fica parada
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
  }

  thead th {
    background: #17737A;
    color: #FFF;
    text-align: right;
    white-space: nowrap;
  }

  thead th:first-child {
    text-align: left;
  }

  tbody th {
    position: sticky;
    left: 0;
    min-width: 180px;
    background: #FFF;
    text-align: left;
    font-weight: 600;
  }

  td {
    text-align: right;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  tbody tr:nth-child(even) th, tbody tr:nth-child(even) td {
    background: #F9FAFB;
  }

  @media (max-width: 768px) {
    tbody th {
      min-width: 0;
      white-space: nowrap;
    }
  }
`;

const Unidade = styled.span`
  font-weight: 400;
  color: #6B7280;
`;

const Descricao = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: #6B7280;

  @media (max-width: 768px) {
    display: none;
  }
`;

function TabelaTrechos({ porTrecho }) {
  return (
    <CaixaTabela>
      <Tabela>
        <caption>Resultados por trecho</caption>
        <thead>
          <tr>
            <th scope="col">Parâmetro</th>
            {porTrecho.colunas.map((coluna) => <th key={coluna} scope="col">{coluna}</th>)}
          </tr>
        </thead>
        <tbody>
          {porTrecho.linhas.map(({ rotulo, descricao, unidade, valores }) => (
            <tr key={rotulo}>
              <th scope="row">
                {rotulo} <Unidade>({unidade})</Unidade>
                <Descricao>{descricao}</Descricao>
              </th>
              {valores.map(({ texto }, i) => <td key={porTrecho.colunas[i]}>{texto}</td>)}
            </tr>
          ))}
        </tbody>
      </Tabela>
    </CaixaTabela>
  );
}

// longa demais para ficar aberta, sobretudo no celular; quem precisa dos números abre
const Recolhivel = styled.details`
  margin: 16px 0;
  border: 1px solid #E5E7EB;
  border-radius: 8px;

  summary {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
  }

  summary span {
    font-size: 14px;
    font-weight: 400;
    color: #6B7280;
  }

  @media (max-width: 768px) {
    summary {
      min-height: 44px;
    }
  }
`;

const Legenda = styled.p`
  margin: 0;
  padding: 0 16px 8px;
  font-size: 13px;
  color: #4B5563;
`;

const RolagemValores = styled.div`
  max-height: 480px;
  overflow: auto;
  border-top: 1px solid #E5E7EB;
`;

const TabelaValores = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #374151;
  font-variant-numeric: tabular-nums;

  th, td {
    padding: 6px 12px;
    border-bottom: 1px solid #F3F4F6;
    text-align: right;
  }

  thead th {
    position: sticky;
    top: 0;
    background: #17737A;
    color: #FFF;
  }

  tbody tr:nth-child(even) td {
    background: #F9FAFB;
  }

  /* primeira linha de cada trecho seguinte: a mistura com a contribuição */
  tr.divisa td {
    border-top: 2px solid #9CA3AF;
  }

  td.abaixo {
    color: #B91C1C;
    font-weight: 600;
  }

  /* cinco colunas cabem em 320 px com o título quebrado em linhas */
  @media (max-width: 768px) {
    font-size: 13px;

    th, td {
      padding: 6px 4px;
    }

    thead th {
      font-size: 12px;
      font-weight: 600;
      line-height: 1.3;
    }
  }
`;

// os mesmos pontos do perfil dos relatórios, como a aba Resumo do Exemplo 8.5
function ValoresAoLongoDoRio({ perfil, odmin }) {
  const colunaOd = perfil.colunas.findIndex((coluna) => coluna.chave === 'od');
  const porTrecho = perfil.colunas[0].titulo === 'Trecho';

  return (
    <Recolhivel>
      <summary>Valores ao longo do rio <span>({perfil.linhas.length} pontos)</span></summary>
      <Legenda>Em vermelho e com *, o OD abaixo do ODmín ({numero(odmin, 2)} mg/L).</Legenda>
      <RolagemValores>
        <TabelaValores>
          <thead>
            <tr>{perfil.colunas.map((coluna) => <th key={coluna.titulo} scope="col">{coluna.titulo}</th>)}</tr>
          </thead>
          <tbody>
            {perfil.linhas.map((linha, i) => (
              <tr key={i} className={porTrecho && i > 0 && linha[0] !== perfil.linhas[i - 1][0] ? 'divisa' : undefined}>
                {linha.map((valor, j) => (
                  j === colunaOd && valor < odmin
                    ? <td key={j} className="abaixo">{numero(valor, perfil.colunas[j].casas)} *</td>
                    : <td key={j}>{numero(valor, perfil.colunas[j].casas)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </TabelaValores>
      </RolagemValores>
    </Recolhivel>
  );
}

export default function AutodepuraChart(props) {
  const resultado = calc.CalculadoraAutodepura(props.data);
  const { ctVet, dboVet, odminVet, kmvet, critico, divisasKm } = resultado;
  const relatorio = relatorioAutodepura(props.data, resultado);
  const { conclusao, perfil, porTrecho } = relatorio;

  if (!perfil) {
    return (
      <>
        <CardInput>
          <img src={alertIcon} alt="Icone de Alerta" />

          <h1>{conclusao.titulo}. {conclusao.linhas[0]}</h1>
        </CardInput>
        <BaixarRelatorio relatorio={relatorio} />
      </>
    )
  }

  const graficos = [
    graficoOD({ ctVet, odminVet, kmvet, critico, divisasKm }),
    graficoDBO({ kmvet, dboVet, divisasKm }),
  ];

  return (
    <>
      <Conclusao atende={conclusao.atende} role="status">
        <strong>{conclusao.titulo}</strong>
        {conclusao.linhas.map((linha) => <div key={linha}>{linha}</div>)}
      </Conclusao>
      <BaixarRelatorio relatorio={relatorio} graficos={graficos} />
      <Linechart grafico={graficos[0]} />
      <Linechart grafico={graficos[1]} altura={400} />
      {porTrecho && <TabelaTrechos porTrecho={porTrecho} />}
      <ValoresAoLongoDoRio perfil={perfil} odmin={critico.odmin} />
    </>
  )
}
