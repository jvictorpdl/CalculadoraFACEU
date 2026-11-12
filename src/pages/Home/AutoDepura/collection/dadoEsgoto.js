import { useContext } from "react";
import AvisoTrava from "../../../../components/AvisoTrava";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import Ordivider from "../../../../components/OrDivider";
import { lancamentosDe } from "../../../../utils/autoDepuraCalculation";
import { bloqueadoPor, CAMINHOS } from "../../../../utils/validacao";
import { AjudaDBOe, AjudaE, AjudaLancamentos, AjudaODe, PainelAjuda } from "./ajudas";
import { Orientacao } from "./cartoes";
import { ListaLancamentos } from "./lancamentos";

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
                    <FormTitle title="Vazão e oxigênio do esgoto" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.qe} onBlurValue={(val) => updateStateWithAutodepuraData({ qe: val })} label="Qe" tooltip="Vazão do esgoto" placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.ode} onBlurValue={(val) => updateStateWithAutodepuraData({ ode: val })} label="ODe" tooltip="Oxigênio dissolvido no esgoto" placeholder="mg/L" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaODe />
                    </PainelAjuda>
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


    // DBOe (com ou sem E) ou DBOefl: o caminho preenchido bloqueia o outro
    const bloqueioDBOe = bloqueadoPor(state.data.autodepura, CAMINHOS.dboEsgoto, 0);
    const bloqueioDBOefl = bloqueadoPor(state.data.autodepura, CAMINHOS.dboEsgoto, 1);

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Carga orgânica do esgoto" />
                    <Grid columns={2}>
                        <TextFieldWithTooltip disabled={bloqueioDBOe.length > 0} value={state.data.autodepura.e} onBlurValue={(val) => updateStateWithAutodepuraData({ e: val })} label="E" tooltip="Eficiência do tratamento de esgoto na remoção de DBO" placeholder="%" />
                        <TextFieldWithTooltip disabled={bloqueioDBOe.length > 0} value={state.data.autodepura.dboe} onBlurValue={(val) => updateStateWithAutodepuraData({ dboe: val })} label="DBOe" tooltip="Demanda bioquímica de oxigênio do esgoto" placeholder="mg/L" />
                    </Grid>
                    <AvisoTrava campos={['E', 'DBOe']} por={bloqueioDBOe} />
                    <Ordivider />
                    <Grid columns={2}>
                        <TextFieldWithTooltip disabled={bloqueioDBOefl.length > 0} value={state.data.autodepura.dboefl} onBlurValue={(val) => updateStateWithAutodepuraData({ dboefl: val })} label="DBOefl" tooltip="DBO do efluente tratado" placeholder="mg/L" />
                    </Grid>
                    <AvisoTrava campos={['DBOefl']} por={bloqueioDBOefl} />
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaE />
                        <AjudaDBOe />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}


// outros efluentes que chegam no mesmo ponto do primeiro (por exemplo, um tratado e um bruto)
export function DadoEsgotoStep3() {
    const { state, dispatch } = useContext(ApplicationContext);

    function salvar(lancamentos) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                autodepura: { ...state.data.autodepura, lancamentos },
            },
        });
    }

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Outros lançamentos no mesmo ponto" />
                    <Orientacao>
                        Opcional. Use quando chega ao rio, no mesmo ponto, mais de um efluente (por exemplo, um tratado e um bruto).
                        O lançamento 1 é o dos passos anteriores; a mistura soma todos eles. Lançamentos em pontos diferentes do rio
                        entram como trechos seguintes.
                    </Orientacao>
                    <ListaLancamentos lancamentos={lancamentosDe(state.data.autodepura)} onAlterar={salvar} />
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaLancamentos />
                        <AjudaE />
                        <AjudaDBOe />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}
