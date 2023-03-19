import Form from "../../../components/Form";
import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";

export default function Step6(props) {
  return (
    <Content>
      <CardInput>
        <FormTwo>
          <ItemForm
            title="Qe"
            unity="m³/s"
            locale="qe"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="ODe"
            unity="mg/L"
            locale="ode"
            setData={props.setData}
            data={props.data}
          />
        </FormTwo>
      </CardInput>

      <CardHelp>ajuda 6</CardHelp>
    </Content>
  );
}
