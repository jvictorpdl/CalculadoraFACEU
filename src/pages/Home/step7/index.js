import Form from "../../../components/Form";
import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step7(props) {
  return (
    <Content>
      <CardInput>
        <FormTwo>
          <ItemForm
            title="E"
            unity="%"
            locale="e"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="DBOe"
            unity="mg/L"
            locale="dboe"
            setData={props.setData}
            data={props.data}
          />
        </FormTwo>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="DBOefl"
          unity="mg/L"
          locale="dboefl"
          setData={props.setData}
          data={props.data}
        />
      </CardInput>
      <CardHelp>ajuda 7</CardHelp>
    </Content>
  );
}
