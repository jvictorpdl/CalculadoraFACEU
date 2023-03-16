import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import FormTwo from "../../../components/FormTwo";
export default function Step0() {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm title="Qr" unity="m³/s" />
          <ItemForm title="ODr" unity="mg/L" />
          <ItemForm title="DBOr" unity="mg/L" />
          <ItemForm title="ODmin" unity="mg/L" />
        </Form>
      </CardInput>
      <CardHelp>ajuda 1</CardHelp>
    </Content>
  );
}
