import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import Ordivider from "../../../../components/OrDivider";
import { AjudaK1, AjudaK2, AjudaTetaK1, AjudaTetaK2, AjudaTrechos, PainelAjuda } from "./ajudas";

const Orientacao = ({ children }) => (
    <p style={{ fontSize: 14, lineHeight: 1.5, color: '#4B5563', margin: '0 0 16px' }}>{children}</p>
);

const Subtitulo = ({ children }) => (
    <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '16px 0 8px' }}>{children}</p>
);

export function DadosAdicionaisStep1() {
    const { state, dispatch } = useContext(ApplicationContext);

    function updateStateWithAutodepuraData(inputs) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                autodepura: {
                    ...state.data.autodepura,
                    ...inputs
                },
            }
        })
    }


    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Orientacao>
                        Informe K1 a 20 °C com θ e T, ou então K1T já na temperatura do rio. Se os dois forem preenchidos, vale o K1 (20 °C).
                    </Orientacao>
                    <Grid columns={3}>
                        <TextFieldWithTooltip value={state.data.autodepura.k120c} onBlurValue={(val) => updateStateWithAutodepuraData({ k120c: val })} label="K1 (20 °C)" tooltip="Coeficiente de desoxigenação a 20 °C" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak1} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak1: val })} label="θ para K1" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do rio" placeholder="°C" />
                        {/* Ou k1T */}
                        <br />
                    </Grid>
                    <Ordivider />

                    <Grid columns={3}>
                        {/* <br/>Ou */}
                        <TextFieldWithTooltip value={state.data.autodepura.k1t} onBlurValue={(val) => updateStateWithAutodepuraData({ k1t: val })} label="K1T" tooltip="Coeficiente de desoxigenação na temperatura do rio (T)" placeholder="1/dia" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaK1 />
                        <AjudaTetaK1 />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}


export function DadosAdicionaisStep2() {
    const { state, dispatch } = useContext(ApplicationContext);

    function updateStateWithAutodepuraData(inputs) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                autodepura: {
                    ...state.data.autodepura,
                    ...inputs
                },
            }
        })
    }


    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Orientacao>
                        O K2 pode vir de uma das três opções abaixo. Se mais de uma for preenchida, vale o K2T, depois o K2 (20 °C) e por último o cálculo por H e v.
                    </Orientacao>

                    <Subtitulo>Correção pela temperatura (para as opções 1 e 2)</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.tetak2} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak2: val })} label="θ para K2" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do rio" placeholder="°C" />
                    </Grid>

                    <Subtitulo>Opção 1: calcular o K2 pela profundidade e velocidade</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="Velocidade do rio" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.h} onBlurValue={(val) => updateStateWithAutodepuraData({ h: val })} label="H" tooltip="Profundidade do rio" placeholder="m" />
                    </Grid>

                    <Ordivider />

                    <Subtitulo>Opção 2: informar o K2 a 20 °C</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.k220c} onBlurValue={(val) => updateStateWithAutodepuraData({ k220c: val })} label="K2 (20 °C)" tooltip="Coeficiente de reaeração a 20 °C" placeholder="1/dia" />
                    </Grid>

                    <Ordivider />

                    <Subtitulo>Opção 3: informar o K2 já na temperatura do rio</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.k2t} onBlurValue={(val) => updateStateWithAutodepuraData({ k2t: val })} label="K2T" tooltip="Coeficiente de reaeração na temperatura do rio (T)" placeholder="1/dia" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaK2 />
                        <AjudaTetaK2 />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}


export function DadosAdicionaisStep3() {
    const { state, dispatch } = useContext(ApplicationContext);

    function updateStateWithAutodepuraData(inputs) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                autodepura: {
                    ...state.data.autodepura,
                    ...inputs
                },
            }
        })
    }


    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.distancia} onBlurValue={(val) => updateStateWithAutodepuraData({ distancia: val })} label="d" tooltip="Distância percorrida a partir do lançamento" placeholder="m" />
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="Velocidade do rio" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.particoes} onBlurValue={(val) => updateStateWithAutodepuraData({ particoes: val })} label="Nº" tooltip="Número de trechos em que o percurso é dividido no cálculo" placeholder="Quantidade" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaTrechos />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}


export function DadosAdicionaisStep4() {
    const { state, dispatch } = useContext(ApplicationContext);

    function updateStateWithAutodepuraData(inputs) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                autodepura: {
                    ...state.data.autodepura,
                    ...inputs
                },
            }
        })
    }


    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do rio" placeholder=" °C" />
                        <TextFieldWithTooltip value={state.data.autodepura.altitude} onBlurValue={(val) => updateStateWithAutodepuraData({ altitude: val })} label="Altitude" tooltip="Altitude do local" placeholder="m" />
                    </Grid>
                    <Ordivider />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.cslinha} onBlurValue={(val) => updateStateWithAutodepuraData({ cslinha: val })} label="Cs'" tooltip="Concentração de saturação de oxigênio dissolvido no rio" placeholder="mg/L" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda />
                </Column>
            </Row>
        </div>
    );
}

