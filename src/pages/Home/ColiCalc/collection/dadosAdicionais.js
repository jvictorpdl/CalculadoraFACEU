import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import Modal from "../../../../components/Modal/index";
import HelpModal from "../../../../components/HelpModal/index";
import { useState } from "react";
import { CardHelp } from "../../../../components/CardHelp/index";
import Title from "../../../../components/Title/index";

export function DadosAdicionaisStep1() {
    const { state, dispatch } = useContext(ApplicationContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    // const [modalIsOpen2, setIsOpen2] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
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
                    <FormTitle title="Dados morfométricos e ambientais" />
                    <Grid columns={3}>
                        <TextFieldWithTooltip value={state.data.colicalc.temperatura} onBlurValue={(val) => updateStateWithColiCalcData({ temperatura: val })} label="T" tooltip="Temperatura do líquido" placeholder="ºC" />
                        <TextFieldWithTooltip value={state.data.colicalc.distancia} onBlurValue={(val) => updateStateWithColiCalcData({ distancia: val })} label="d" tooltip="Distância do percurso" placeholder="m" />
                        <TextFieldWithTooltip value={state.data.colicalc.velocidade} onBlurValue={(val) => updateStateWithColiCalcData({ velocidade: val })} label="v" tooltip="Velocidade do curso d'água" placeholder="m/s" />
                        <TextFieldWithTooltip value={state.data.colicalc.kb} onBlurValue={(val) => updateStateWithColiCalcData({ kb: val })} label="Kb" tooltip="Coeficiente de decaimento bacteriano" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.colicalc.teta} onBlurValue={(val) => updateStateWithColiCalcData({ teta: val })} label="θ para Kb" tooltip="Coeficiente de temperatura" placeholder="1/dia" />
                        <TextFieldWithTooltip value={state.data.colicalc.particoes} onBlurValue={(val) => updateStateWithColiCalcData({ particoes: val })} label="Nº trechos" tooltip="Quantidade de segmentos" placeholder="Quantidade" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <CardHelp>
                        <Title title="Informações auxiliares" />
                        <HelpModal title="Clique para auxílio em θ para Kb" handle={openModal} />
                        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio em θ para Kb">
                            <p>
                                Valor usual de θ é de 1,07 1/dia para a temperatura de 20º C.
                            </p>
                            {/* editar para dia elevado a menos 1 dps */}
                            <br />
                            <h5>Arceivala, 1981; EPA, 1985; Thomann e Mueller, 1987 apud Von Sperling, 2005</h5>

                        </Modal>
                    </CardHelp>
                </Column>
            </Row>
        </div>
    );
}