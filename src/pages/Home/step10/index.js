import Form from "../../../components/Form";
import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step10(props) {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm
            title="E"
            unity="%"
            locale="e"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="k1"
            unity="1/d"
            locale="k120c"
            setData={props.setData}
            data={props.data}
          />
        </Form>
      </CardInput>

      <CardHelp>ajuda simulação</CardHelp>
    </Content>
  );
}
