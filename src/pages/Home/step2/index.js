import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step2() {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm title="k1(20ºC)" />
          <ItemForm title="θ" />
          <ItemForm title="T" />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm title="k1" sub="T" />
      </CardInput>
      <CardHelp>ajuda 2</CardHelp>
    </Content>
  );
}
