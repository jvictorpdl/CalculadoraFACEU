import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";


export function AutodepuraRecalculate() {
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
                        <TextFieldWithTooltip value={state.data.autodepura.e} onBlurValue={(val) => updateStateWithAutodepuraData({ e: val })} label="E" tooltip="Eficiência do tratamento de esgoto na remoção de DBO" placeholder="%" />
                        <TextFieldWithTooltip value={state.data.autodepura.k120c} onBlurValue={(val) => updateStateWithAutodepuraData({ k120c: val })} label="K1(20ºC)" tooltip="Coeficiente de desoxigenação(20ºC)." placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak1} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak1: val })} label="θ para K1" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do Rio." placeholder="ºC" />
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