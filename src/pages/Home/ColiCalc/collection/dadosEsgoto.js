import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import { PainelAjuda } from "../../../../components/CardHelp/index";

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
                    <FormTitle title="Dados do esgoto" />
                    <Grid columns={3}>
                        <TextFieldWithTooltip value={state.data.colicalc.qe} onBlurValue={(val) => updateStateWithColiCalcData({ qe: val })} label="Qe" tooltip="Vazão do esgoto" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.colicalc.ne} onBlurValue={(val) => updateStateWithColiCalcData({ ne: val })} label="Ne" tooltip="Concentração de coliformes no esgoto" placeholder="org/100 mL" />
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