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
 
  const [formData, setFormData] = useState({
    mySelectField: ''
  });

  const optionsTwo = [
    {value: 200, label:"Classe 1"},
    {value: 1000, label:"Classe 2"},
    {value: 4000, label:"Classe 3"}
  ]
  const options = [
    {value: false , label:"Rio"},
    {value: true, label:"Represa"}
  ]
  //funções open Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
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

          <ItemSelect
            title="Nr"
            options={optionsTwo}
            tooltip="Concentração de coliformes no rio, a montante do lançamento"
            locale="nr"
            setData={setFormData}
            data={formData}
          />
          <ItemSelect
            options={options}
            tooltip="Rio ou represa"
            title="Tipo"
            locale="represa"
            data={formData}
            setData={setFormData}

          />
          
        </Form>
      </CardInput>
      <CardHelp>
        <Title title="Informações auxiliares" />

        <HelpModal title="Clique aqui para auxílio em Ne " handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Concentração de coliformes no esgoto">
         <p>Padrões de coliformes termotolerantes em corpos d'água doces, segundo a RESOLUÇÃO CONAMA 357/05</p>
          <br />

          <Table table={table} />

          <br />
          <h5>Nota: Classe Especial - não são admitidos lançamentos de efluentes, mesmo que tratados.</h5>
        </Modal>
      </CardHelp>
      
    </Content>
  );
}
