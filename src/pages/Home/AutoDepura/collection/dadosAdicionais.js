import { useContext } from "react";
import AvisoTrava from "../../../../components/AvisoTrava";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import Ordivider from "../../../../components/OrDivider";
import { RadioButton, RadioGroup } from "../../../../components/RadioButton/radioButton";
import { conversaoKtDe } from "../../../../utils/autoDepuraCalculation";
import { bloqueadoPor, CAMINHOS } from "../../../../utils/validacao";
import { AjudaDivisoes, AjudaK1, AjudaK2, AjudaKd, AjudaKT, AjudaTetaK1, AjudaTetaK2, PainelAjuda } from "./ajudas";

const Orientacao = ({ children }) => (
    <p style={{ fontSize: 14, lineHeight: 1.5, color: '#4B5563', margin: '0 0 16px' }}>{children}</p>
);

const Subtitulo = ({ children }) => (
    <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: '16px 0 8px' }}>{children}</p>
);

const OPCOES_KT = [['k1t', 'K1T, na temperatura do rio'], ['k120c', 'K1 a 20 °C, do ensaio']];

// qual K1 converte a DBO5 em DBO última; vale para todos os trechos
export function EscolhaConversaoKt() {
    const { state, dispatch } = useContext(ApplicationContext);
    const atual = conversaoKtDe(state.data.autodepura);

    function escolher(conversaoKt) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                autodepura: { ...state.data.autodepura, conversaoKt },
            },
        });
    }

    return (
        <>
            <Subtitulo>Conversão da DBO5 em DBO última (KT)</Subtitulo>
            <RadioGroup legenda="Calcular o KT com o">
                {OPCOES_KT.map(([valor, rotulo]) => (
                    <RadioButton key={valor} name="conversaoKt" value={valor} label={rotulo} checked={atual === valor} onChange={() => escolher(valor)} />
                ))}
            </RadioGroup>
            <Orientacao>
                {atual === 'k1t'
                    ? 'O KT de cada trecho usa o K1 já corrigido para a temperatura do rio (K1T).'
                    : 'O KT de cada trecho usa o K1 a 20 °C, a temperatura do ensaio de DBO; se só o K1T foi informado, ele volta a 20 °C pelo θ e pela T.'}
            </Orientacao>
        </>
    );
}

export function DadosAdicionaisStep1() {
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

    // θ e T ficam livres: também corrigem o K2 e calculam o Cs'
    const bloqueio20 = bloqueadoPor(state.data.autodepura, CAMINHOS.k1, 0);
    const bloqueioT = bloqueadoPor(state.data.autodepura, CAMINHOS.k1, 1);

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Orientacao>
                        Informe K1 a 20 °C com θ e T, ou então K1T já na temperatura do rio. Use só uma das linhas: ao preencher uma, a outra fica bloqueada.
                        O Kd é opcional: em branco, a DBO se decompõe no rio com o próprio K1.
                    </Orientacao>
                    <Grid columns={4}>
                        <TextFieldWithTooltip disabled={bloqueio20.length > 0} value={state.data.autodepura.k120c} onBlurValue={(val) => updateStateWithAutodepuraData({ k120c: val })} label="K1 (20 °C)" tooltip="Coeficiente de desoxigenação a 20 °C" placeholder="1/dia" />
                        <TextFieldWithTooltip disabled={bloqueio20.length > 0} value={state.data.autodepura.kd20c} onBlurValue={(val) => updateStateWithAutodepuraData({ kd20c: val })} label="Kd (20 °C)" tooltip="Coeficiente de decomposição da DBO no rio a 20 °C (opcional)" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.autodepura.tetak1} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak1: val })} label="θ para K1" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do rio" placeholder="°C" />
                    </Grid>
                    <AvisoTrava campos={['K1 (20 °C)', 'Kd (20 °C)']} por={bloqueio20} />
                    <Ordivider />

                    <Grid columns={4}>
                        <TextFieldWithTooltip disabled={bloqueioT.length > 0} value={state.data.autodepura.k1t} onBlurValue={(val) => updateStateWithAutodepuraData({ k1t: val })} label="K1T" tooltip="Coeficiente de desoxigenação na temperatura do rio (T)" placeholder="1/dia" />
                        <TextFieldWithTooltip disabled={bloqueioT.length > 0} value={state.data.autodepura.kdt} onBlurValue={(val) => updateStateWithAutodepuraData({ kdt: val })} label="KdT" tooltip="Coeficiente de decomposição da DBO no rio na temperatura do rio (T), opcional" placeholder="1/dia" />
                    </Grid>
                    <AvisoTrava campos={['K1T', 'KdT']} por={bloqueioT} />
                    <EscolhaConversaoKt />
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaK1 />
                        <AjudaKd />
                        <AjudaKT />
                        <AjudaTetaK1 />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}


export function DadosAdicionaisStep2() {
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

    // a velocidade fica livre: também dá o tempo de percurso
    const [bloqueioH, bloqueio20, bloqueioT] = [0, 1, 2].map((opcao) => bloqueadoPor(state.data.autodepura, CAMINHOS.k2, opcao));

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Orientacao>
                        O K2 pode vir de uma das três opções abaixo. Ao preencher uma, as outras ficam bloqueadas.
                    </Orientacao>

                    <Subtitulo>Correção pela temperatura (para as opções 1 e 2)</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.tetak2} onBlurValue={(val) => updateStateWithAutodepuraData({ tetak2: val })} label="θ para K2" tooltip="Coeficiente de temperatura" placeholder="ad." />
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do rio" placeholder="°C" />
                    </Grid>

                    <Subtitulo>Opção 1: calcular o K2 pela profundidade e velocidade</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="Velocidade do rio" placeholder="m/s" />
                        <TextFieldWithTooltip disabled={bloqueioH.length > 0} value={state.data.autodepura.h} onBlurValue={(val) => updateStateWithAutodepuraData({ h: val })} label="H" tooltip="Profundidade do rio" placeholder="m" />
                    </Grid>
                    <AvisoTrava campos={['H']} por={bloqueioH} />

                    <Ordivider />

                    <Subtitulo>Opção 2: informar o K2 a 20 °C</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip disabled={bloqueio20.length > 0} value={state.data.autodepura.k220c} onBlurValue={(val) => updateStateWithAutodepuraData({ k220c: val })} label="K2 (20 °C)" tooltip="Coeficiente de reaeração a 20 °C" placeholder="1/dia" />
                    </Grid>
                    <AvisoTrava campos={['K2 (20 °C)']} por={bloqueio20} />

                    <Ordivider />

                    <Subtitulo>Opção 3: informar o K2 já na temperatura do rio</Subtitulo>
                    <Grid columns={4}>
                        <TextFieldWithTooltip disabled={bloqueioT.length > 0} value={state.data.autodepura.k2t} onBlurValue={(val) => updateStateWithAutodepuraData({ k2t: val })} label="K2T" tooltip="Coeficiente de reaeração na temperatura do rio (T)" placeholder="1/dia" />
                    </Grid>
                    <AvisoTrava campos={['K2T']} por={bloqueioT} />
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaK2 />
                        <AjudaTetaK2 />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}


export function DadosAdicionaisStep3() {
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
                    <Orientacao>
                        Distância e velocidade do trecho 1. Se o rio tiver outros trechos, eles entram no grupo Trechos seguintes. O Nº de divisões vale para todos os trechos que não tiverem o próprio.
                    </Orientacao>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.distancia} onBlurValue={(val) => updateStateWithAutodepuraData({ distancia: val })} label="d" tooltip="Distância percorrida a partir do lançamento" placeholder="m" />
                        <TextFieldWithTooltip value={state.data.autodepura.velocidade} onBlurValue={(val) => updateStateWithAutodepuraData({ velocidade: val })} label="v" tooltip="Velocidade do rio" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.autodepura.particoes} onBlurValue={(val) => updateStateWithAutodepuraData({ particoes: val })} label="Nº" tooltip="Número de divisões de cada trecho no cálculo do perfil" placeholder="Quantidade" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaDivisoes />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}


export function DadosAdicionaisStep4() {
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

    // T fica livre: mesmo com o Cs' informado, ela corrige o K1 e o K2
    const bloqueioAltitude = bloqueadoPor(state.data.autodepura, CAMINHOS.cs, 0);
    const bloqueioCs = bloqueadoPor(state.data.autodepura, CAMINHOS.cs, 1);

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Orientacao>
                        Cs' do trecho 1: calcule pela temperatura e altitude, ou informe o Cs' já pronto. Ao preencher a altitude ou o Cs', o outro fica bloqueado. Os trechos seguintes podem ter o próprio Cs'.
                    </Orientacao>
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.autodepura.temperatura} onBlurValue={(val) => updateStateWithAutodepuraData({ temperatura: val })} label="T" tooltip="Temperatura do rio" placeholder=" °C" />
                        <TextFieldWithTooltip disabled={bloqueioAltitude.length > 0} value={state.data.autodepura.altitude} onBlurValue={(val) => updateStateWithAutodepuraData({ altitude: val })} label="Altitude" tooltip="Altitude do local" placeholder="m" />
                    </Grid>
                    <AvisoTrava campos={['Altitude']} por={bloqueioAltitude} />
                    <Ordivider />
                    <Grid columns={4}>
                        <TextFieldWithTooltip disabled={bloqueioCs.length > 0} value={state.data.autodepura.cslinha} onBlurValue={(val) => updateStateWithAutodepuraData({ cslinha: val })} label="Cs'" tooltip="Concentração de saturação de oxigênio dissolvido no rio" placeholder="mg/L" />
                    </Grid>
                    <AvisoTrava campos={["Cs'"]} por={bloqueioCs} />
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda />
                </Column>
            </Row>
        </div>
    );
}

