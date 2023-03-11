import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step5() {
  return (
    <Content>
      <CardInput>
      <Form>
        <ItemForm title="T" />
          <ItemForm title="H" />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm title="Cs" />
      </CardInput>
{/*esta pagina nao possui o card help*/}
    </Content>
  );
}
