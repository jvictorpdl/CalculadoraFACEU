import { CardInput, CardHelp, Content } from "../styleSteps";
import Title from "../../../components/Title"
import ItemForm from "../../../components/ItemForm";
import Modal from "../../../components/Modal";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";
import Table from "../../../components/Table";
import FormTwo from "../../../components/FormTwo";
import ItemSelect from "../../../components/ItemSelect";
import Form from "../../../components/Form";

export default function Step1(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
 


  const options = [
    {value: 'Classe 1', label:"Classe 1"},
    {value: 'Classe 2', label:"Classe 2"},
    {value: 'Classe 3', label:"Classe 3"}
  ]
  //funções open Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  

  return (
    <Content>
      <CardInput>
        <Title title="Dados do rio" />
        <Form>
          <ItemForm
            title="Qr"
            unity="m³/s"
            locale="qr"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão"
          />
          <ItemForm //mudar para select com 3 opções (classes 1,2 e 3)
            title="Nr"
            unity="org/100mL"
            locale="nr" //criar
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de coliformes no rio, a montante do lançamento"


          />
          <ItemSelect options={options}/>
          
        </Form>
      </CardInput>
      {/* <CardHelp>
        <Title title="Informações auxiliares" />
        <br />
        <HelpModal title="Clique aqui para auxílio em ODr" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Oxigênio dissolvido no rio" ariaHideApp={false}>
          <p>
            Não sendo possível coletar amostras, pode-se estimar a
            concentração de ODr em função do grau de poluição do curso
            d’água:</p>
          <br />
          <li>
            curso d’água com poucos indícios de poluição: <br />
            ODr pode ser de 80 a 90% do valor de saturação de oxigênio do rio;
          </li>
          <li>curso d'água bem poluído: <br />
            incluir os principais focos poluidores (ODr será bem inferior ao teor de saturação).</li>

          <br />
          <h5>Fonte: Von Sperling (2005)</h5>
        </Modal>
        <HelpModal title="Clique aqui para auxílio em DBOr" handle={openModal2} />
        <Modal modalIsOpen={modalIsOpen2} closeModal={closeModal2} title="Auxílio na definição da demanda bioquímica de oxigênio (DBO5)">
          <h3>Caso não possua, sugere-se o quadro abaixo:</h3>
          <br />
          <Table table={tableDBOr} />
          <h5>Fonte: Klein (1962) apud Von Sperling (2005)</h5>

        </Modal>
        <HelpModal title="Clique aqui para auxílio em ODmín" handle={openModal3} />
        <Modal modalIsOpen={modalIsOpen3} closeModal={closeModal3} title="Auxílio na definição do oxigênio dissolvido mínimo (ODmín)">
          <h3>Caso não possua, sugere-se o quadro abaixo:</h3>
          <br />
          <Table table={tableOdmin} />
          <h5>Fonte: Resolução CONAMA 357 (BRASIL, 2005)</h5>

        </Modal>


      </CardHelp> */}
    </Content>
  );
}
