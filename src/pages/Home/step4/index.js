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
          />
          <ItemForm
            title="v"
            unity="m/s"
            locale="velocidade"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="Partições"
            unity="Quantidade"
            locale="particoes"
            setData={props.setData}
            data={props.data}
          />

        </Form>




      </CardInput>
      <CardHelp>
        <Title title="Informações Auxiliares" />
        <HelpModal title="Clique aqui para auxílio em p" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Quantidade de partições do rio ">
          <p>Variável criada apenas para o usuario definir em quantas partições deve ser repartido o curso d'água.</p>
        
        </Modal>

      </CardHelp>
    </Content>
  );
}
