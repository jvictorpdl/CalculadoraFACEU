import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
export default function Step0() {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm title="Qr" />
          <ItemForm title="ODr" />
          <ItemForm title="DBOr" />
          <ItemForm title="ODmin" />
        </Form>
      </CardInput>
      <CardHelp>ajuda 1</CardHelp>
    </Content>
  );
}
