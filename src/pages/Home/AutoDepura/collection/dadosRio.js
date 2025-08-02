import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";

export function DadosRioStep1() {
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
                        <TextFieldWithTooltip value={state.data.autodepura.qr} onBlurValue={(val) => updateStateWithAutodepuraData({ qr: val })} label="Qr" tooltip="Vazão do rio." placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.odr} onBlurValue={(val) => updateStateWithAutodepuraData({ odr: val })} label="Odr" tooltip="Oxigênio dissolvido." placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.dbor} onBlurValue={(val) => updateStateWithAutodepuraData({ dbor: val })} label="DBOr" tooltip="Demanda bioquimíca de oxigênio." placeholder="mg/L" />
                        <TextFieldWithTooltip value={state.data.autodepura.odmin} onBlurValue={(val) => updateStateWithAutodepuraData({ odmin: val })} label="ODmín" tooltip="Oxigênio dissolvido mínimo" placeholder="m³/s" />
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