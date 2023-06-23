import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Modal from "../../../components/Modal";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";
import Table from "../../../components/Table";

export default function Step0(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const tableDBOr = {
    header: [
      {
        content: "Condição do rio"
      },
      {
        content: 'DBO5 do rio (mg/L)',

      }
    ],
    lines: [
      [
        {
          content: 'Bastante limpo'
        },
        {
          content: '1'
        },
      ],
      [
        {
          content: 'Limpo'
        },
        {
          content: '2'
        },
      ],
      [
        {
          content: 'Razoalmente limpo'
        },
        {
          content: '3'
        },
      ],
      [
        {
          content: 'Duvidoso'
        },
        {
          content: '5'
        },
      ],
      [
        {
          content: 'Ruim'
        },
        {
          content: '>10'
        },

      ],

    ]
  }
  const tableOdmin = {
    header: [
      {
        content: "Classe"
      },
      {
        content: 'OD mínimo (mg/L)',

      }
    ],
    lines: [
      [
        {
          content: 'Especial'
        },
        {
          content: 'Não são permitidos lançamentos, mesmo tratados.'
        },
      ],
      [
        {
          content: '1'
        },
        {
          content: '6,0'
        },
      ],
      [
        {
          content: '2'
        },
        {
          content: '5,0'
        },
      ],
      [
        {
          content: '3'
        },
        {
          content: '4,0'
        },
      ],
      [
        {
          content: '4'
        },
        {
          content: '2,0'
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
  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  function openModal3() {
    setIsOpen3(true);
  }

  function closeModal3() {
    setIsOpen3(false);
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

        <HelpModal title="Clique aqui para auxílio em ODr" handle={openModal} />
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
        <HelpModal title="Clique aqui para auxílio em DBOr" handle={openModal2} />
        <Modal modalIsOpen={modalIsOpen2} closeModal={closeModal2} title="Auxílio em DBOr">
          <h3>Caso nao possua, sugere-se o quadro abaixo.</h3>
          <br />
          <Table table={tableDBOr} />
          <h5>Fonte: Von Sperling (2014)</h5>

        </Modal>
        <HelpModal title="Clique aqui para auxílio em ODmin" handle={openModal3} />
        <Modal modalIsOpen={modalIsOpen3} closeModal={closeModal3} title="Auxílio em ODmin">
          <h3>Caso nao possua, sugere-se o quadro abaixo.</h3>
          <br />
          <Table table={tableOdmin} />
          <h5>Fonte: Von Sperling (2014)</h5>

        </Modal>




        ajuda 1</CardHelp>
    </Content>
  );
}
