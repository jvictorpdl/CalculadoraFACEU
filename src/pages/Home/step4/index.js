import FormTwo from "../../../components/FormTwo";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Title from "../../../components/Title";
import { CardInput, Content, CardHelp } from "../styleSteps";
import Modal from "../../../components/Modal";
import HelpModal from "../../../components/HelpModal";

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


  return (
    <Content>
      <CardInput>
        <Title title="Dados morfométricos e ambientais" />

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
          <ItemForm
            title="Nº trechos"
            unity="Quantidade"
            locale="particoes"
            setData={props.setData}
            data={props.data}
            tooltip="Quantidade de segmentos"

          />

        </Form>




      </CardInput>
      <CardHelp>
        <Title title="Informações auxiliares" />
        <HelpModal title="Clique aqui para auxílio em Nº de trechos" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Número de trechos no rio">
          <p>Número de trechos ao longo da distância para o cálculo do oxigênio dissolvido.</p>
        
        </Modal>

      </CardHelp>
    </Content>
  );
}
