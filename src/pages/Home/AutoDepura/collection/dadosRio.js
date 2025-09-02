import { useContext, useEffect } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";

export function DadosRioStep1({ onValidityChange }) {
    const { state, dispatch } = useContext(ApplicationContext);
    // eslint-disable-next-line no-unused-vars
    useEffect(() => {
        const requiredFields = ['qr', 'odr', 'dbor', 'odmin'];
        const areAllInputsFilled = requiredFields.every(field => state.data[field] && state.data[field].length > 0);
        onValidityChange(areAllInputsFilled);
    }, [state]);


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
                        <TextFieldWithTooltip value={state.data.autodepura.odr} onBlurValue={(val) => updateStateWithAutodepuraData({ odr: val })} label="Odr" tooltip="Oxigênio dissolvido." placeholder="mg/L" />
                        <TextFieldWithTooltip value={state.data.autodepura.dbor} onBlurValue={(val) => updateStateWithAutodepuraData({ dbor: val })} label="DBOr" tooltip="Demanda bioquimíca de oxigênio." placeholder="mg/L" />
                        <TextFieldWithTooltip value={state.data.autodepura.odmin} onBlurValue={(val) => updateStateWithAutodepuraData({ odmin: val })} label="ODmín" tooltip="Oxigênio dissolvido mínimo" placeholder="mg/L " />
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