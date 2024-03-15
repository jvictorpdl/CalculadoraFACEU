import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import Modal from "../../../components/Modal";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";
import Title from "../../../components/Title";

export default function Step6(props) {
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
            title="Qe"
            unity="m³/s"
            locale="qe"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão"

          />
          <ItemForm
            title="Ne"
            unity="org/100mL"
            locale="ne" //criar
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de coliformes no esgoto"

          />
        </FormTwo>
      </CardInput>

      <CardHelp>
        <Title title="Informações auxiliares" />

        <HelpModal title="Clique aqui para auxílio em ODe " handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Oxigênio dissolvido no esgoto">
          <h3>Não sendo possível coletar amostras, sugere-se para esgoto doméstico:</h3>
          <br />


          <dl>
            <dt><h3>
              Esgoto bruto:
            </h3>
            </dt>
            <dd><li>
              ODe = 0 mg/L

            </li>
            </dd>
            {/* <br /> */}


            <dt><h3>

              Esgoto tratado:
            </h3>
            </dt>
            <dd>
              <li>Tratamento primário: ODe = 0 mg/L;</li>
              <li>Tratamento anaeróbio: ODe = 0 mg/L;</li>
              <li>Lodos ativados, filtros biológicos percoladores e outros sistemas aeróbios similares: ODe = 2 mg/L ou mais;</li>
              <li>Lagoas facultativas: ODe = 4 a 6 mg/L.</li>
            </dd>
          </dl>
          <br />
          <h5>Fonte: Von Sperling (2005)</h5>
        </Modal>
      </CardHelp>
    </Content>
  );
}
