import { useContext } from "react";
import styled from "styled-components";
import { PainelAjuda } from "../../../../components/CardHelp/index";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { RadioButton, RadioGroup } from "../../../../components/RadioButton/radioButton";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import { DADOS_EUTROFRIZA, MODELOS_KS, modeloKsDe } from "../../../../utils/eutroFrizaCalculation";
import { camposEutrofriza } from "../../../../utils/relatorioEutrofriza";
import { AjudaCoeficientes, AjudaE, AjudaKs, AjudaPerCapita, AjudaPmax, AjudaVQ } from "./ajudas";

// os rótulos, dicas e unidades são os mesmos do Resumo e do relatório (relatorioEutrofriza.js)
const campoDe = Object.fromEntries(camposEutrofriza.flatMap(({ campos }) => campos).map((campo) => [campo.chave, campo]));

export function useDadosEutrofriza() {
    const { state, dispatch } = useContext(ApplicationContext);
    const dados = state.data.eutrofriza ?? DADOS_EUTROFRIZA;

    function atualizar(valores) {
        dispatch({ ...state, data: { ...state.data, eutrofriza: { ...dados, ...valores } } });
    }
    return [dados, atualizar];
}

function Campo({ chave }) {
    const [dados, atualizar] = useDadosEutrofriza();
    const { rotulo, dica, unidade } = campoDe[chave];
    return (
        <TextFieldWithTooltip value={dados[chave]} onBlurValue={(valor) => atualizar({ [chave]: valor })} label={rotulo} tooltip={dica} placeholder={unidade} />
    );
}

function Passo({ titulo, ajuda, children }) {
    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title={titulo} />
                    {children}
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>{ajuda}</PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}

// três opções lado a lado não cabem no celular com o espaçamento padrão ("Vollenweider" era cortado)
const OpcoesKs = styled.div`
    @media (max-width: 768px) {
        label span {
            padding-left: 4px;
            padding-right: 4px;
            font-size: 13px;
        }
    }
`;

const Subtitulo = ({ children }) => <p style={{ margin: '16px 0 8px', fontSize: 14, fontWeight: 600, color: '#4B5563' }}>{children}</p>;

export function DadosRepresa() {
    return (
        <Passo titulo="Dados da represa" ajuda={<AjudaVQ />}>
            <Grid columns={3}>
                <Campo chave="volume" />
                <Campo chave="vazao" />
            </Grid>
        </Passo>
    );
}

export function DadosBacia() {
    return (
        <Passo titulo="Dados da bacia" ajuda={<AjudaCoeficientes />}>
            <Subtitulo>Áreas da bacia de drenagem (em branco, sem essa ocupação)</Subtitulo>
            <Grid columns={3}>
                <Campo chave="areaMatas" />
                <Campo chave="areaAgricola" />
                <Campo chave="areaUrbana" />
            </Grid>
            <Subtitulo>Contribuição unitária de fósforo (em branco, a do livro)</Subtitulo>
            <Grid columns={3}>
                <Campo chave="coefMatas" />
                <Campo chave="coefAgricola" />
                <Campo chave="coefUrbana" />
            </Grid>
        </Passo>
    );
}

export function DadosEsgoto() {
    return (
        <Passo titulo="Dados do esgoto" ajuda={<><AjudaPerCapita /><AjudaE /></>}>
            <Grid columns={3}>
                <Campo chave="populacao" />
                <Campo chave="percapita" />
                <Campo chave="e" />
            </Grid>
            <Subtitulo>Outras fontes</Subtitulo>
            <Grid columns={3}>
                <Campo chave="outras" />
            </Grid>
        </Passo>
    );
}

export function DadosAdicionais() {
    const [dados, atualizar] = useDadosEutrofriza();
    const atual = modeloKsDe(dados);
    return (
        <Passo titulo="Dados adicionais" ajuda={<><AjudaKs /><AjudaPmax /></>}>
            <OpcoesKs>
                <RadioGroup legenda="Ks (perda por sedimentação) por">
                    {Object.entries(MODELOS_KS).map(([valor, { curto }]) => (
                        <RadioButton key={valor} name="modeloKs" value={valor} label={curto} checked={atual === valor} onChange={() => atualizar({ modeloKs: valor })} />
                    ))}
                </RadioGroup>
            </OpcoesKs>
            <Grid columns={3}>
                <Campo chave="pmax" />
            </Grid>
        </Passo>
    );
}
