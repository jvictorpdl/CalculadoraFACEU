import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
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
        content: 'k',
        sub: 1,
        mid: 'd',
        up: '-1',
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
        <HelpModal title="Auxílio em K1" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio em K1">
          <div>

            <p>Valores típicos de k1 (base e, 20°C)</p>
            <Table table={table} />


            <h5>Fonte: Von Sperling (2014)</h5>
          </div>

        </Modal>
        <HelpModal title="Auxílio em θ" handle={openModal2} />

        <Modal modalIsOpen={modalIsOpen2} closeModal={closeModal2} title="Auxílio em θ">
          <p>
            Valor usual de θ é de 1,047 (acréscimo de 4,7% em k₁ para cada aumento de 1 °C na temperatura da água).
          </p>
          <h5>Fonte: Von Sperling (2014)</h5>

        </Modal>
        ajuda 2</CardHelp>
    </Content>
  );
}
