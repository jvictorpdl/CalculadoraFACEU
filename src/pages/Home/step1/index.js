import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";

export default function Step0(props) {
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
      <CardHelp>ajuda 1</CardHelp>
    </Content>
  );
}
