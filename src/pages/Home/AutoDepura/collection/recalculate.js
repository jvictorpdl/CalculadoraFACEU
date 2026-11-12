import { useContext } from "react";
import AvisoTrava from "../../../../components/AvisoTrava";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import { bloqueadoPor, CAMINHOS } from "../../../../utils/validacao";
import { AjudaE, AjudaK1, AjudaKT, AjudaTetaK1, PainelAjuda } from "./ajudas";
import { EscolhaConversaoKt } from "./dadosAdicionais";


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


    // as mesmas travas dos passos de origem: E não vale com DBOefl, nem K1 (20 °C) com K1T ou KdT
    const bloqueioE = bloqueadoPor(state.data.autodepura, CAMINHOS.dboEsgoto, 0);
    const bloqueioK1 = bloqueadoPor(state.data.autodepura, CAMINHOS.k1, 0);

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Grid columns={3}>
                        <TextFieldWithTooltip disabled={bloqueioE.length > 0} value={state.data.autodepura.e} onBlurValue={(val) => updateStateWithAutodepuraData({ e: val })} label="E" tooltip="Eficiência do tratamento de esgoto na remoção de DBO" placeholder="%" />
                        <TextFieldWithTooltip disabled={bloqueioK1.length > 0} value={state.data.autodepura.k120c} onBlurValue={(val) => updateStateWithAutodepuraData({ k120c: val })} label="K1 (20 °C)" tooltip="Coeficiente de desoxigenação a 20 °C" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak1} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak1: val })} label="θ para K1" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do rio" placeholder="°C" />
                    </Grid>
                    <AvisoTrava campos={['E']} por={bloqueioE} />
                    <AvisoTrava campos={['K1 (20 °C)']} por={bloqueioK1} />
                    <EscolhaConversaoKt />
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaE />
                        <AjudaK1 />
                        <AjudaKT />
                        <AjudaTetaK1 />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}