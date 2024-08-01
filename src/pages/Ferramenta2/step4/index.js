import FormTwo from "../../../components/FormTwo";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import Title from "../../../components/Title";
import { CardInput, Content, CardHelp } from "../styleSteps";
import Modal from "../../../components/Modal";
import HelpModal from "../../../components/HelpModal";
import Table from "../../../components/Table";
import { useState } from "react";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step4(props) {

  return (
    <Content>
      <CardInput>
        <Title title="Dados da Represa" />

        <Form>
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
