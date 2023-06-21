import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { Subtitle } from "../../../components/Subtitle/styles";
import Modal from "../../../components/Modal";
import { useState } from "react";
import { useTable } from "react-table";


export default function Step2(props) {
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
        <Form>
          <ItemForm
            title="k1(20ºC)"
            unity="1/d"
            locale="k120c"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="θ"
            unity="M/A"
            locale="tetak1"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="T"
            unity="ºC"
            locale="temperatura"
            setData={props.setData}
            data={props.data}
          />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="k1"
          sub="T"
          locale="k1t"
          setData={props.setData}
          data={props.data}
        />
      </CardInput>
      <CardHelp>
        <button onClick={openModal}> botao</button>
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Oxigênio dissolvido no esgoto">

          <h5>Fonte: Von Sperling (2014)</h5>
        </Modal>
        ajuda 2</CardHelp>
    </Content>
  );
}
