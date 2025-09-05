import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";

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
                    <Grid columns={4}>
                        {/* deixar mais claro k1t como opção */}
                        <TextFieldWithTooltip value={state.data.autodepura.k120c} onBlurValue={(val) => updateStateWithAutodepuraData({ k120c: val })} label="K1(20ºC)" tooltip="Coeficiente de desoxigenação(20ºC)." placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak1} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak1: val })} label="θ para K1" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do líquido." placeholder="ºC" />
                        {/* Ou k1T */}
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
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do líquido" placeholder="ºC" />
                        <TextFieldWithTooltip value={state.data.autodepura.h} onBlurValue={(val) => updateStateWithAutodepuraData({ h: val })} label="H" tooltip="Profundidade" placeholder="m" />
                        {/* Ou */}
                        <TextFieldWithTooltip value={state.data.autodepura.k220c} onBlurValue={(val) => updateStateWithAutodepuraData({ k220c: val })} label="K2 (20ºC)" tooltip="Coeficiente de reaeração(20ºC)" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak2} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak2: val })} label="θ para K2" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do líquido" placeholder="ºC" />
                        {/* Ou */}
                        <TextFieldWithTooltip value={state.data.autodepura.k2t} onBlurValue={(val) => updateStateWithAutodepuraData({ k2t: val })} label="K2T" tooltip="Coeficiente de reaeração a temperatura" placeholder="1/dia" />
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
                        <TextFieldWithTooltip value={state.data.autodepura.distancia} onBlurValue={(val) => updateStateWithAutodepuraData({ distancia: val })} label="d" tooltip="Distância" placeholder="m" />
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="Velocidade" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.particoes} onBlurValue={(val) => updateStateWithAutodepuraData({ particoes: val })} label="Nº" tooltip="Quantidade de segmentos" placeholder="Quantidade" />
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
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.altitude} onBlurValue={(val) => {
                            console.log('altitude val', val)
                            updateStateWithAutodepuraData({ altitude: val })
                        }} label="h" tooltip="Altitude" placeholder="m" />
                        {/* Ou Cs' */}
                        <TextFieldWithTooltip value={state.data.autodepura.cslinha} onBlurValue={(val) => updateStateWithAutodepuraData({ cslinha: val })} label="Cs'" tooltip="Concentração de saturação na altitude(h)" placeholder="mg/L" />
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

