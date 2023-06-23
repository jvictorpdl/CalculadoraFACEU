import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";
import Modal from "../../../components/Modal";
import HelpModal from "../../../components/HelpModal";
import { useState } from "react";

export default function Step7(props) {
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
        <FormTwo>
          <ItemForm
            title="E"
            unity="%"
            locale="e"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="DBOe"
            unity="mg/L"
            locale="dboe"
            setData={props.setData}
            data={props.data}
          />
        </FormTwo>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="DBOefl"
          unity="mg/L"
          locale="dboefl"
          setData={props.setData}
          data={props.data}
        />
      </CardInput>
      <CardHelp>
        <HelpModal title="Clique para auxílio em θ" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio em θ">
          <h3>Caso nao possua o valor, sugere-se: </h3>
          <br />

          <li>Esgoto doméstico bruto: DBOe = 300 mg/L</li>
          <br />
          <h5>Fonte: Von Sperling (2014)</h5>

        </Modal>
        ajuda 2</CardHelp>
    </Content>
  );
}
