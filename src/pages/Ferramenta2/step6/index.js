import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import Modal from "../../../components/Modal";
import { useState } from "react";
import HelpModal from "../../../components/HelpModal";
import Title from "../../../components/Title";
import Table from "../../../components/Table";
import ItemSelect from "../../../components/ItemSelect"

export default function Step6(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
      mySelectField: ''
    });
    


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

      
    </Content>
  );
}
