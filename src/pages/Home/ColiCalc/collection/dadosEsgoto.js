import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";

export function DadosEsgotoStep1() {
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
                    <FormTitle title="Dados da Esgoto" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.colicalc.qe} onBlurValue={(val) => updateStateWithColiCalcData({ qe: val })} label="Qe" tooltip="Vazão do esgoto" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.colicalc.ne} onBlurValue={(val) => updateStateWithColiCalcData({ ne: val })} label="Ne" tooltip="Concentração de coliformes no esgoto" placeholder="org/100ml" />
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