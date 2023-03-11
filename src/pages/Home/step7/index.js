import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step7() {
  return (
    <Content>
      <CardInput>
      <Form>
        <ItemForm title="E" />
          <ItemForm title="DBOe" />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm title="DBOefl" />
      </CardInput>
      <CardHelp>ajuda 7</CardHelp>
    </Content>
  );
}
