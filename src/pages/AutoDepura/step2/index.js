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
  const [modalIsOpen2, setIsOpen2] = useState(false);
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
  function openModal2() {
    setIsOpen2(true);
  }



  function closeModal() {
    setIsOpen(false);
  }
  function closeModal2() {
    setIsOpen2(false);
  }
  return (
    <Content>
      <CardInput>
        <Title title="Dados morfométricos e ambientais" />
        <Form>
          <ItemForm
            title="K1(20ºC)"
            unity="1/dia"
            locale="k120c"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de desoxigenação(20ºC)"

          />
          <ItemForm
            title="θ para K1"
            unity="ad."
            locale="tetak1"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"

          />
          <ItemForm
            title="T"
            unity="ºC"
            locale="temperatura"
            setData={props.setData}
            data={props.data}
            tooltip="Temperatura do líquido"

          />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="K1"
          sub="T"
          unity="1/dia"
          locale="k1t"
          setData={props.setData}
          data={props.data}
          tooltip="Coeficiente de desoxigenação a uma temperatura(T)"


        />
      </CardInput>
      <CardHelp>
        <Title title="Informações auxiliares" />
        <br />
        <HelpModal title="Clique para auxílio em K1" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio na definição do coeficiente de desoxigenação (K1)">
          <div>

            <p>Valores típicos de K1 (base e, 20°C)</p>
            <Table table={table} />


            <h5>Fonte: Adaptado de Fair et al. (1973) e Arceivala (1981) apud Von Sperling (2005)</h5>
          </div>

        </Modal>

        <HelpModal title="Clique para auxílio em θ para K1" handle={openModal2} />
        <Modal modalIsOpen={modalIsOpen2} closeModal={closeModal2} title="Auxílio em θ para K1">
          <p>
            Valor usual de θ é de 1,047 (acréscimo de 4,7% em K1 para cada aumento de 1 °C na temperatura da água).
          </p>
          <h5>Fonte: Von Sperling (2005)</h5>

        </Modal>
      </CardHelp>
    </Content>
  );
}
