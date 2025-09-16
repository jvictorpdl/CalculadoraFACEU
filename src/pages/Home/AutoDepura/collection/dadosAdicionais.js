import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import Ordivider from "../../../../components/OrDivider";
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
                    <Grid columns={3}>
                        {/* deixar mais claro k1t como opção */}
                        <TextFieldWithTooltip value={state.data.autodepura.k120c} onBlurValue={(val) => updateStateWithAutodepuraData({ k120c: val })} label="K1(20ºC)" tooltip="Coeficiente de desoxigenação(20ºC)." placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak1} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak1: val })} label="θ para K1" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do Rio." placeholder="ºC" />
                        {/* Ou k1T */}
                    <br/>
                    </Grid>
                        <Ordivider/>

                    <Grid columns={3}>
                        {/* <br/>Ou */}
                        <TextFieldWithTooltip value={state.data.autodepura.k1t} onBlurValue={(val) => updateStateWithAutodepuraData({ k1t: val })} label="K1T" tooltip="Coeficiente de desoxigenação a uma temperatura(T)" placeholder="1/dia" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <span>Informações adicionais</span>
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
                    <Grid columns={4}>
                        {/* k2 tbm é pra separar e deixar claro as opções */}
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="Velocidade" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak2} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak2: val })} label="θ para K2" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do Rio" placeholder="ºC" />
                        <TextFieldWithTooltip value={state.data.autodepura.h} onBlurValue={(val) => updateStateWithAutodepuraData({ h: val })} label="H" tooltip="Profundidade do Rio" placeholder="m" />
                    </Grid>
                    <Ordivider/>
                    <Grid columns={4}>
                    {/* Ou */}
                        <TextFieldWithTooltip value={state.data.autodepura.k220c} onBlurValue={(val) => updateStateWithAutodepuraData({ k220c: val })} label="K2 (20ºC)" tooltip="Coeficiente de reaeração(20ºC)" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak2} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak2: val })} label="θ para K2" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do Rio" placeholder="ºC" />
                        {/* Ou */}
                        </Grid>
                    <Ordivider/>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.k2t} onBlurValue={(val) => updateStateWithAutodepuraData({ k2t: val })} label="K2T" tooltip="Coeficiente de reaeração a temperatura(T)" placeholder="1/dia" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <span>Informações adicionais</span>
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
                        <TextFieldWithTooltip value={state.data.autodepura.distancia} onBlurValue={(val) => updateStateWithAutodepuraData({ distancia: val })} label="d" tooltip="Distância do rio" placeholder="m" />
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="Velocidade do rio" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.particoes} onBlurValue={(val) => updateStateWithAutodepuraData({ particoes: val })} label="Nº" tooltip="Número de partições do rio" placeholder="Quantidade" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <span>Informações adicionais</span>
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
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura da água do rio" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.h} onBlurValue={(val) => updateStateWithAutodepuraData({ h: val })} label="h" tooltip="Altitude" placeholder="m" />
                        {/* Ou Cs' */}
                        <TextFieldWithTooltip value={state.data.autodepura.cslinha} onBlurValue={(val) => updateStateWithAutodepuraData({ cslinha: val })} label="Cs'" tooltip="Concentração de saturação de oxigênio dissolvido no rio" placeholder="mg/L" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <span>Informações adicionais</span>
                </Column>
            </Row>
        </div>
    );
}

