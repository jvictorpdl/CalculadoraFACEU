import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";

export function DadosMisturaStep1() {
    const { state, dispatch } = useContext(ApplicationContext);

    function updateStateWithColiCalcData(inputs) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                colicalc: {
                    ...state.data.colicalc,
                    ...inputs
                },
            }
        })
    }


    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados da Mistura" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.colicalc.nop} onBlurValue={(val) => updateStateWithColiCalcData({ nop: val })} label="Nop" tooltip="Concentração máxima permissível de coliformes no ponto de mistura em função da legislação ambiental" placeholder="org/100ml" />
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