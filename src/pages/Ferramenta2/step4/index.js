import FormTwo from "../../../components/FormTwo";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Title from "../../../components/Title";
import { CardInput, Content, CardHelp } from "../styleSteps";
import Modal from "../../../components/Modal";
import HelpModal from "../../../components/HelpModal";
import Table from "../../../components/Table";
import { useState } from "react";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step4(props) {
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



  return (
    <Content>
      <CardInput>
        <Title title="Dados da Represa" />

          {/* volume e qAfleuten */}
        <Form>
          <ItemForm
            title="d"
            unity="m"
            locale="distancia"
            setData={props.setData}
            data={props.data}
            tooltip="Distância"

          />
          <ItemForm
            title="v"
            unity="m/s"
            locale="velocidade"
            setData={props.setData}
            data={props.data}
            tooltip="Velocidade"

          />
  

        </Form>




      </CardInput>
      {/* <CardHelp>
        <Title title="Informações auxiliares" />

        <HelpModal title="Clique aqui para auxílio em Ne " handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Concentração de coliformes no esgoto">
         <p>Padrões de coliformes termotolerantes em corpos d'água doces, segundo a RESOLUÇÃO CONAMA 357/05</p>
          <br />

          <Table table={table} />

          <br />
          <h5>Nota: Classe Especial - não são admitidos lançamentos de efluentes, mesmo que tratados.</h5>
        </Modal>
      </CardHelp> */}
    </Content>
  );
}
