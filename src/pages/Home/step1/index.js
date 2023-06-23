import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Modal from "../../../components/Modal";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";

export default function Step0(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm
            title="Qr"
            unity="m³/s"
            locale="qr"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="ODr"
            unity="mg/L"
            locale="odr"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="DBOr"
            unity="mg/L"
            locale="dbor"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="ODmin"
            unity="mg/L"
            locale="odmin"
            setData={props.setData}
            data={props.data}
          />
          {props.data.qr}
          {props.data.odr}
          {props.data.dbor}
          {props.data.odmin}
        </Form>
      </CardInput>
      <CardHelp>

        <HelpModal title="Clique aqui para auxilio em ODr" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Oxigênio dissolvido no Rio">
          <p>
            Não sendo possível coletar amostras, pode-se estimar a
            concentração de OD em função do grau de poluição do curso
            d’água:</p>
          <br />
          <li>
            Curso d’água com poucos indicios de poluição
          </li>
          <li>
            ODr pode ser de 80 a 90% do valor de saturação de oxigênio;
          </li>
          <li>
            Curso d’água com poucos indicios de poluição
          </li>
          <br />
          <h5>Fonte: Von Sperling (2014)</h5>
        </Modal>

        {/* <button onClick={openModal}> botao</button>
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="segundo modal">
          as8d4a8s4d8a4s8d4a8s4d8a4sd84as48
        </Modal> */}


        ajuda 1</CardHelp>
    </Content>
  );
}
