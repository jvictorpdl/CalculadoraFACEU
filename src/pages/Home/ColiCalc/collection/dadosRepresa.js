import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";

export function DadosRepresaStep1() {
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
                    <FormTitle title="Dados da Represa" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.colicalc.qr} onBlurValue={(val) => updateStateWithColiCalcData({ qr: val })} label="Qr" tooltip="Vazão do rio." placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.colicalc.nr} onBlurValue={(val) => updateStateWithColiCalcData({ nr: val })} label="Nr" tooltip="Concentração de coliformes no rio, a montante do lançamento" placeholder="org/100ml" />
                        <TextFieldWithTooltip value={state.data.colicalc.volume} onBlurValue={(val) => updateStateWithColiCalcData({ volume: val })} label="V" tooltip="Volume da represa" placeholder="m³" />
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