import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";

export function DadosAdicionaisStep1() {
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
                    <FormTitle title="Dados Adicionais" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.colicalc.temperatura} onBlurValue={(val) => updateStateWithColiCalcData({ temperatura: val })} label="T" tooltip="Vazão do esgoto" placeholder="ºC" />
                        <TextFieldWithTooltip value={state.data.colicalc.distancia} onBlurValue={(val) => updateStateWithColiCalcData({ distancia: val })} label="d" tooltip="Vazão do esgoto" placeholder="m" />
                        <TextFieldWithTooltip value={state.data.colicalc.velocidade} onBlurValue={(val) => updateStateWithColiCalcData({ velocidade: val })} label="v" tooltip="Vazão do esgoto" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.colicalc.kb} onBlurValue={(val) => updateStateWithColiCalcData({ kb: val })} label="Kb" tooltip="Vazão do esgoto" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.colicalc.teta} onBlurValue={(val) => updateStateWithColiCalcData({ teta: val })} label="θ para Kb" tooltip="Vazão do esgoto" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.colicalc.particoes} onBlurValue={(val) => updateStateWithColiCalcData({ particoes: val })} label="Nº trechos" tooltip="Concentração de coliformes no esgoto" placeholder="Quantidade" />
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