import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Title from "../../../components/Title"
import { Subtitle } from "../../../components/Subtitle/styles";
import Modal from "../../../components/Modal";
import React from "react";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";
import Table from "../../../components/Table";


export default function Step2(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [modalIsOpen2, setIsOpen2] = useState(false);
  const table = {
    header: [
      {
        content: "Origem"
      },
      {
        content: 'K1 ',
        mid: '(dia',
        up: '-1',
        final: ')',

      }
    ],
    lines: [
      [
        {
          content: 'Esgoto bruto concentrado'
        },
        {
          content: '0,35 - 0,45'
        },
      ],
      [
        {
          content: 'Esgoto bruto de baixa concentração'
        },
        {
          content: '0,30 - 0,40'
        },
      ],
      [
        {
          content: 'Efluente primário'
        },
        {
          content: '0,30 - 0,40'
        },
      ],
      [
        {
          content: 'Efluente secundário'
        },
        {
          content: '0,12 - 0,24'
        },
      ],
      [
        {
          content: 'Curso d’água com águas limpas'
        },
        {
          content: '0,08 - 0,20'
        },

      ],

    ]
  }

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
            unity="km"
            locale="k120c"
            setData={props.setData}
            data={props.data}
            tooltip="Distância do percurso"

          />
          <ItemForm
            title="v"
            unity="m/s"
            locale="v"
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
            locale="tetakb"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"

          />
        </Form>
      </CardInput>

      <CardHelp>
        <Title title="Informações auxiliares" />
        <br />
        {/* <HelpModal title="Clique para auxílio em K1" handle={openModal} /> */}
        {/* <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio na definição do coeficiente de desoxigenação (K1)">
          <div>

            <p>Valores típicos de K1 (base e, 20°C)</p>
            <Table table={table} />


            <h5>Fonte: Adaptado de Fair et al. (1973) e Arceivala (1981) apud Von Sperling (2005)</h5>
          </div>

        </Modal> */}

        <HelpModal title="Clique para auxílio em θ para b1" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio em θ para K1">
          <p>
            Valor usual de θ é de 1,07.
          </p>
          <br />
          <h5>Fonte: Castignino (1977); Thomann e Mueller (1987) apud Von Sperling (2005)</h5>

        </Modal>
      </CardHelp>
    </Content>
  );
}
