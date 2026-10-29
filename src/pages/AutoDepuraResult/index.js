import styled from "styled-components";
import alertIcon from "../../assets/alertIcon.svg";
import Linechart from "../../components/Linechart";
import * as calc from "../../utils/autoDepuraCalculation";
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

const numero = (valor, casas = 2) => valor.toFixed(casas).replace('.', ',');

function ConclusaoAutodepura({ critico }) {
  const { tc, xcKm, odc, co, odmin, distanciaKm } = critico;
  const atende = odc >= odmin;

  return (
    <Conclusao atende={atende} role="status">
      <strong>{atende ? 'Atende o OD mínimo' : 'Não atende o OD mínimo'}</strong>
      {tc > 0
        ? <div>Ponto crítico: OD de {numero(odc)} mg/L a {numero(xcKm, 1)} km do lançamento (tc = {numero(tc)} dia). ODmín = {numero(odmin)} mg/L.</div>
        : <div>O OD não cai depois do lançamento: o menor valor é o da mistura, {numero(co)} mg/L. ODmín = {numero(odmin)} mg/L.</div>}
      {xcKm > distanciaKm &&
        <div>O ponto crítico fica além da distância simulada ({numero(distanciaKm, 1)} km). Aumente d para ver o trecho mais crítico no gráfico.</div>}
      {odc < 0 &&
        <div>Abaixo de zero o modelo de Streeter-Phelps deixa de valer nesse trecho.</div>}
    </Conclusao>
  );
}

export default function AutodepuraChart(props) {
  const { ctVet, odminVet, particoesVet, kmvet, critico } = calc.CalculadoraAutodepura(props.data);
  // OD negativo dentro do trecho simulado, mesmo entre os pontos amostrados
  const odNegativo = ctVet.find(e => e < 0) || (critico.odc < 0 && critico.xcKm <= critico.distanciaKm);


  return (

    <>
      {
        (!odNegativo &&
          <>
            <ConclusaoAutodepura critico={critico} />
            <Linechart ctVet={ctVet} odminVet={odminVet} particoesVet={particoesVet} kmvet={kmvet} />
          </>)
        ||
        <CardInput>
          <img src={alertIcon} alt="Icone de Alerta" />

          <h1>Concentração negativa de oxigênio dissolvido!!! O modelo de Streeter-Phelps não tem validade para este caso.</h1>
        </CardInput>
      }
    </>

  )
}
