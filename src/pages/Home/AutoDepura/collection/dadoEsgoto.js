import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import Ordivider from "../../../../components/OrDivider";

export function DadoEsgotoStep1() {
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
                    <FormTitle title="Passo 1" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.qe} onBlurValue={(val) => updateStateWithAutodepuraData({ qe: val })} label="Qe" tooltip="Vazão do esgoto" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.ode} onBlurValue={(val) => updateStateWithAutodepuraData({ ode: val })} label="ODe" tooltip="Oxigênio dissolvido no esgoto." placeholder="mg/L" />
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


export function DadoEsgotoStep2() {
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


    const disableDBOe = state.data.autodepura.dboe?.length || state.data.autodepura.e?.length;

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Passo 2" />
                    <Grid columns={2}>
                        <TextFieldWithTooltip value={state.data.autodepura.e} onBlurValue={(val) => updateStateWithAutodepuraData({ e: val })} label="E" tooltip="Eficiência do tratamento de esgoto na remoção de DBO" placeholder="%" />
                        <TextFieldWithTooltip value={state.data.autodepura.dboe} onBlurValue={(val) => updateStateWithAutodepuraData({ dboe: val })} label="DBOe" tooltip="Demanda bioquímica de oxigênio" placeholder="mg/L" />
                    </Grid>
                    <Ordivider />
                    <Grid columns={2}>
                        <TextFieldWithTooltip disabled={disableDBOe} value={state.data.autodepura.dboefl} onBlurValue={(val) => updateStateWithAutodepuraData({ dboefl: val })} label="DBOefl" tooltip="DBO do efluente tratado" placeholder="mg/L" />
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
