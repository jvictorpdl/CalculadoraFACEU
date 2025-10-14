import { useContext } from "react";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import Modal from "../../../../components/Modal/index";
import HelpModal from "../../../../components/HelpModal/index";
import { useState } from "react";
import Table from "../../../../components/Table/index";
import { CardHelp } from "../../../../components/CardHelp/index";
import Title from "../../../../components/Title/index";

export function DadosRioStep1() {
    const { state, dispatch } = useContext(ApplicationContext);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const table = {
        header: [
            {
                rowspan: 2,
                content: 'Parâmetro'
            },
            {
                rowspan: 2,
                content: 'Unidade'
            },
            {
                colspan: 4,
                content: "Padrão do corpo d'água(água doce)\nCLasse",
            },
            {
                rowspan: 2,
                content: "Padrão de lançamento",
            }
        ],
        lines: [
            [

                { content: '1' },
                { content: '2' },
                { content: '3' },
                { content: '4' },
            ],
            [
                { content: 'Coliformes termotolerantes' },
                { content: 'NMP/100 mL' },
                { content: '200' },
                { content: '1000' },
                { content: '4000' },
                { content: '-' },
                { content: 'Não há' },
            ],


        ]
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
                    <FormTitle title="Dados do Rio" />
                    <Grid columns={4}>
                        <TextFieldWithTooltip value={state.data.colicalc.qr} onBlurValue={(val) => updateStateWithColiCalcData({ qr: val })} label="Qr" tooltip="Vazão do rio." placeholder="m³/s" />
                        <TextFieldWithTooltip value={state.data.colicalc.nr} onBlurValue={(val) => updateStateWithColiCalcData({ nr: val })} label="Nr" tooltip="Concentração de coliformes no rio, a montante do lançamento" placeholder="NPM/100ml" />
                    </Grid>
                </Column>
                <VerticalSplitter />
                <Column>
                    <CardHelp>
                        <Title title="Informações auxiliares" />

                        <HelpModal title="Clique aqui para auxílio em Ne " handle={openModal} />
                        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Concentração de coliformes no esgoto">
                            <p>Padrões de coliformes termotolerantes em corpos d'água doces, segundo a RESOLUÇÃO CONAMA 357/05</p>
                            <br />

                            <Table table={table} />

                            <br />
                            <h5>Nota: Classe Especial - não são admitidos lançamentos de efluentes, mesmo que tratados.</h5>
                        </Modal>
                    </CardHelp>

                </Column>
            </Row>
        </div>
    );
}