import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";


export default function Step4() {
  return (
    <Content>
      <CardInput>
        <Form>
        <ItemForm title="d" />
          <ItemForm title="v" />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm title="t" />
      </CardInput>
      <CardHelp>ajuda 4</CardHelp>
    </Content>
  );
}
