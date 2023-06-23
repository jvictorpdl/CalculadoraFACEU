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

{/* <CardHelp>
        <HelpModal title="Clique aqui para auxílio em ODe " handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Demanda bioquímica de oxigênio do esgoto">
          <h3>Caso nao possua o valor, sugere-se: </h3>
          <br />



          <li>Esgoto doméstico bruto: DBOe = 300 mg/L</li>
           
        
        

        
        
              Esgoto tratado:
          h3>
        </dt>

        <li>Tratamento primário: OD = 0 mg/L;</li>
        <li>Tratamento anaeróbio: OD = 0 mg/L;</li>
        <li>Lodos ativados, filtros biológicos percoladores e outros sistemas aeróbios similares: OD = 2 mg/L ou mais;</li>
        <li>Lagoas facultativas: OD = 4 a 6 mg/L.</li>
        
        
        <h5>Fonte: Von Sperling (2014)</h5>
        </Modal>
      ajuda 7
      </CardHelp >
      < /Content> 
  ); 
} */}
