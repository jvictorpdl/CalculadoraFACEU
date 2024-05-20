import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import Modal from "../../../components/Modal";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";
import Title from "../../../components/Title";
import Table from "../../../components/Table";

export default function Step6(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

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
        content: "Padrão do corpo d'água(água doce)/n CLasse",
      },
      {
        rowspan: 2,
        content: "Padrão de lançamento",
      }
    ],
    lines: [
      [

        {content: '1'},
        {content: '2'},
        {content: '3'},
        {content: '4'},
      ],
      [
        {content: 'Coliformes termotolerantes'},
        {content: 'NMP/100 mL'},
        {content: '200'},
        {content: '1000'},
        {content: '4000'},
        {content: '-'},
        {content: 'Não há'},
      ],


    ]
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }


  return (
    <Content>
      <CardInput>
        <Title title="Dados do esgoto" />

        <FormTwo>
          <ItemForm
            title="Qe"
            unity="m³/s"
            locale="qe"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão"

          />
          <ItemForm
            title="Ne"
            unity="org/100mL"
            locale="ne" //criar
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de coliformes no esgoto"

          />
        </FormTwo>
      </CardInput>

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
    </Content>
  );
}
