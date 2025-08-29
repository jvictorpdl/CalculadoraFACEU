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
                        <TextFieldWithTooltip value={state.data.autodepura.k120c} onBlurValue={(val) => updateStateWithAutodepuraData({ k120c: val })} label="K1(20ºC)" tooltip="Vazão do rio." placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak1} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak1: val })} label="θ para K1" tooltip="Oxigênio dissolvido." placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Demanda bioquimíca de oxigênio." placeholder="ºC" />
                        <TextFieldWithTooltip value={state.data.autodepura.k1t} onBlurValue={(val) => updateStateWithAutodepuraData({ k1t: val })} label="K1T" tooltip="Oxigênio dissolvido mínimo" placeholder="1/dia" />
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
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak2} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak2: val })} label="θ para K2" tooltip="" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="" placeholder="ºC" />
                        <TextFieldWithTooltip value={state.data.autodepura.h} onBlurValue={(val) => updateStateWithAutodepuraData({ h: val })} label="H" tooltip="" placeholder="m" />

                        <TextFieldWithTooltip value={state.data.autodepura.k220c} onBlurValue={(val) => updateStateWithAutodepuraData({ k220c: val })} label="K2 (20ºC)" tooltip="" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak2} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak2: val })} label="θ para K2" tooltip="" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="" placeholder="ºC" />

                        <TextFieldWithTooltip value={state.data.autodepura.k2t} onBlurValue={(val) => updateStateWithAutodepuraData({ k2t: val })} label="K2T" tooltip="" placeholder="1/dia" />
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
                        <TextFieldWithTooltip value={state.data.autodepura.distancia} onBlurValue={(val) => updateStateWithAutodepuraData({ distancia: val })} label="d" tooltip="" placeholder="m" />
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.particoes} onBlurValue={(val) => updateStateWithAutodepuraData({ particoes: val })} label="Nº" tooltip="" placeholder="Quantidade" />
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
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.h} onBlurValue={(val) => updateStateWithAutodepuraData({ h: val })} label="h" tooltip="" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.cslinha} onBlurValue={(val) => updateStateWithAutodepuraData({ cslinha: val })} label="Cs'" tooltip="" placeholder="mg/L" />
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

