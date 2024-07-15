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
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step1(props) {

  return (
    <Content>
      <CardInput>
        <Title title="Dados da represa" />
        <Form>

          {/* <ItemForm
            title="Q afluente"
            unity="m³/s"
            locale="qAfluente"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão afluente à represa"
          /> */}
          <ItemForm
            title="Qr"
            unity="m³/s"
            locale="qr"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão do rio"
            />
           <ItemForm
            title="Nr"
            unity="org/100 mL"
            locale="nr"
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de coliformes no rio, a montante do lançamento"
          />
           <ItemForm
            title="V"
            unity="m³"
            locale="volume"
            setData={props.setData}
            data={props.data}
            tooltip="Volume da represa"
          />
        </Form>
      </CardInput>
    </Content>
  );
}
