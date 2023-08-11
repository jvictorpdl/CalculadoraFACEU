import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Title from "../../../components/Title";
import { Subtitle } from "../../../components/Subtitle/styles";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { useState } from "react";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import HelpModal from "../../../components/HelpModal";

//iria ser usado para um Select
// const options = [
//   { value: "", label: "Selecione" },
//   { value: "1", label: "O'Connor Dobbins" },
//   { value: "2", label: "Churchill et al" },
//   { value: "3", label: "Owens et al" },
// ];

export default function Step3(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  const table = {
    header: [
      {
        rowspan: 2,
        content: "Corpo d'água",
      },
      {
        colspan: 2,
        content: "K2 ",
        mid: "(dia",
        up: "-1",
        final: ")",
      },
      
    ],
    lines: [
      [
        {
          content: "Profundo",
        },
        {
          content: "Raso",
        },
      ],
      [
        {
          content: "Pequenas lagoas",
        },
        {
          content: "0,12",
        },
        {
          content: "0,23",
        },
      ],
      [
        {
          content: "Rios vagarosos, grandes lagos",
        },
        {
          content: "0,23",
        },
        {
          content: "0,37",
        },
      ],
      [
        {
          content: "Grandes rios com baixa velocidade",
        },
        {
          content: "0,37",
        },
        {
          content: "0,46",
        },
      ],
      [
        {
          content: "Grandes rios com velocidade normal",
        },
        {
          content: "0,46",
        },
        {
          content: "0,69",
        },
      ],
      [
        {
          content: "Rios rápidos",
        },
        {
          content: "0,69",
        },
        {
          content: "1,15",
        },
      ],
      [
        {
          content: "Corredeiras e quedas d’água",
        },
        {
          content: "> 1,15",
        },
        {
          content: ">1,61",
        },
      ],
    ],
  };

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
  return (
    <Content>
      <CardInput>
      <Title title="Dados morfométricos e ambientais"/>

        <Form>

          <ItemForm
            title="v"
            unity="m/s"
            locale="velocidade"
            setData={props.setData}
            data={props.data}
            tooltip="Velocidade"


          />
          <ItemForm
            title="θ para K2"
            unity="ad."
            locale="tetak2"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"


          />
          <ItemForm
            title="T"
            unity={props.data.temperatura + " °C"}
            locale="temperatura"
            setData={props.setData}
            data={props.data}
            tooltip="Temperatura do líquido"


          />
          <ItemForm
            title="H"
            unity="m"
            locale="h"
            setData={props.setData}
            data={props.data}
            tooltip="Profundidade"

          />
          {/*<ItemSelect options={options} required />*/}
        </Form>

        <Subtitle>Ou</Subtitle>

        <Form>
          <ItemForm
            title="K2 (20ºC)"
            unity="1/dia"
            locale="k220c"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de reaeração(20ºC)"

          />
          <ItemForm
            title="θ para K2"
            unity="ad."
            locale="tetak2"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"

          />

          <ItemForm
            title="T"
            unity={props.data.temperatura + " °C"}
            locale="temperatura"
            setData={props.setData}
            data={props.data}
            tooltip="Temperatura do líquido"

          />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="K2"
          sub="T"
          unity="1/dia"
          locale="k2t"
          setData={props.setData}
          data={props.data}
          tooltip="Coeficiente de reaeração a temperatura"

        />
      </CardInput>
      <CardHelp>
      <Title title="Informações auxiliares"/>

        <HelpModal title="Clique aqui para auxílio em K2" handle={openModal} />
        <Modal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          title="Auxílio no coeficiente de reaeração (K2)"
        >
          <p>Valores típicos de K2 (base e, 20°C)</p>
          <Table table={table} />
          <h5>Fonte: Fair et al. (1973) e Arceivala (1981) apud Von Sperling (2005)</h5>
        </Modal>
        <HelpModal title="Clique para auxílio em θ para K2" handle={openModal2} />
        <Modal
          modalIsOpen={modalIsOpen2}
          closeModal={closeModal2}
          title="Auxílio em θ para k2"
        >
          <p>
            Valor usual de θ é de 1,024.
          </p>
          <h5>Fonte: Von Sperling (2005)</h5>
        </Modal>
        ajuda 3
      </CardHelp>
    </Content>
  );
}
/*
formula O'Connor e Dobbins:   3.73*(v^0.5)*(H^-1,5)  // USADA CASO  0.6m <= H < 4m  && 0.05m/s <= v < 0,8 m/s
formula Churchill et al: 5*(v^0.97)*(H*1.67)    // usada caso 0.6m <= H < 4m && 0.8m/s <= v < 1.5m/s
formula Owens et al: 5.3*(v^0.67)*(H^-1.85)   // usada caso 0.1m <= H <0.6m && 0.05m/s <= v < 1.5 m/s*/
