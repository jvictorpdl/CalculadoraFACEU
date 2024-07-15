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

  const table = {
    header: [
      {
        rowspan: 2,
        content: 'Parâmetro'
      },
      {
        rowspan: 2,
        content: 'Unidade'
      },
      {
        colspan: 4,
        content: "Padrão do corpo d'água(água doce)\nCLasse",
      },
      {
        rowspan: 2,
        content: "Padrão de lançamento",
      }
    ],
    lines: [
      [

        {content: '1'},
        {content: '2'},
        {content: '3'},
        {content: '4'},
      ],
      [
        {content: 'Coliformes termotolerantes'},
        {content: 'NMP/100 mL'},
        {content: '200'},
        {content: '1000'},
        {content: '4000'},
        {content: '-'},
        {content: 'Não há'},
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
        <Title title="Dados da Mistura" />

        <ItemForm
            title="Nop"
            unity="org/100 mL"
            locale="nop" 
            setData={props.setData}
            data={props.data}
            tooltip="Concentração máxima permissível de coliformes no ponto de mistura em função da legislação ambiental"

          />
         
      </CardInput>
      <CardHelp>
        <Title title="Informações auxiliares" />

        <HelpModal title="Clique aqui para auxílio em Nop " handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Concentração de coliformes no esgoto">
         <p>Padrões de coliformes termotolerantes em corpos d'água doces, segundo a RESOLUÇÃO CONAMA 357/05</p>
          <br />

          <Table table={table} />

          <br />
          <h5>Nota: Classe Especial - não são admitidos lançamentos de efluentes, mesmo que tratados.</h5>
        </Modal>
      </CardHelp>
      {/* <CardHelp>
       // adicionar a tabela para ajuda Nop *
        <Title title="Informações auxiliares" />

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
       
      </CardHelp> */}
    </Content>
  );
}
/*
formula O'Connor e Dobbins:   3.73*(v^0.5)*(H^-1,5)  // USADA CASO  0.6m <= H < 4m  && 0.05m/s <= v < 0,8 m/s
formula Churchill et al: 5*(v^0.97)*(H*1.67)    // usada caso 0.6m <= H < 4m && 0.8m/s <= v < 1.5m/s
formula Owens et al: 5.3*(v^0.67)*(H^-1.85)   // usada caso 0.1m <= H <0.6m && 0.05m/s <= v < 1.5 m/s*/
