import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";
import Modal from "../../../components/Modal";
import HelpModal from "../../../components/HelpModal";
import { useState } from "react";
import Title from "../../../components/Title";

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
        <Title title="Dados do esgoto" />

        <FormTwo>
          <ItemForm
            title="E"
            unity="%"
            locale="e"
            setData={props.setData}
            data={props.data}
            tooltip="Eficiência do tratamento na remoção de DBO"
          />
          <ItemForm
            title="DBOe"
            unity="mg/L"
            locale="dboe"
            setData={props.setData}
            data={props.data}
            tooltip="Demanda bioquímica de oxigênio"


          />
        </FormTwo>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="DBOefl"
          unity="mg/L"
          locale="dboefl"
          setData={props.setData}
          data={props.data}
          tooltip="DBO do efluente tratado"

        />
      </CardInput>
      <CardHelp>
        <Title title="Informações auxiliares" />

        <HelpModal title="Clique para auxílio em DBOe" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio na definição da demando bioquímica do esgoto (DBOe)">
          <h3>Caso não possua o valor, sugere-se: </h3>
          <br />

          <li>Esgoto doméstico bruto: DBOe = 300 mg/L</li>
          <br />
          <h5>Fonte: Von Sperling (2005)</h5>

        </Modal>
      </CardHelp>
    </Content>
  );
}
