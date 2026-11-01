import styled from "styled-components";
import alertIcon from "../../assets/alertIcon.svg";
import BaixarRelatorio from "../../components/BaixarRelatorio";
import Linechart, { graficoOD } from "../../components/Linechart";
import * as calc from "../../utils/autoDepuraCalculation";
import { relatorioAutodepura } from "../../utils/relatorio";
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

export default function AutodepuraChart(props) {
  const resultado = calc.CalculadoraAutodepura(props.data);
  const { ctVet, odminVet, particoesVet, kmvet, critico } = resultado;
  const relatorio = relatorioAutodepura(props.data, resultado);
  const { conclusao, perfil } = relatorio;

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

  return (
    <>
      <Conclusao atende={conclusao.atende} role="status">
        <strong>{conclusao.titulo}</strong>
        {conclusao.linhas.map((linha) => <div key={linha}>{linha}</div>)}
      </Conclusao>
      <BaixarRelatorio relatorio={relatorio} grafico={graficoOD({ ctVet, odminVet, kmvet, critico })} />
      <Linechart ctVet={ctVet} odminVet={odminVet} particoesVet={particoesVet} kmvet={kmvet} critico={critico} />
    </>
  )
}
