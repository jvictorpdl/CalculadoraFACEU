import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Title from "../../../components/Title"
import Modal from "../../../components/Modal";
import React from "react";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";


export default function Step2(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [modalIsOpen2, setIsOpen2] = useState(false);

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
            title="T"
            unity="ºC"
            locale="temperatura"
            setData={props.setData}
            data={props.data}
            tooltip="Temperatura do líquido"

          />
          <ItemForm
            title="d"
            unity="m"
            locale="distancia"
            setData={props.setData}
            data={props.data}
            tooltip="Distância do percurso"

          />
          <ItemForm
            title="v"
            unity="m/s"
            locale="velocidade"
            setData={props.setData}
            data={props.data}
            tooltip="Velocidade do curso d'água"

          />
          <ItemForm
            title="Kb"
            unity="1/dia"
            locale="kb" //criar
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de decaimento bacteriano"

          />
          <ItemForm
            title="θ para Kb"
            unity="1/dia"
            locale="teta"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"

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
        <br />
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
    </Content>
  );
}
