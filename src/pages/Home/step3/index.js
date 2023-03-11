import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { Subtitle } from "../../../components/Subtitle/styles";
import { CardInput, CardHelp, Content } from "../styleSteps";

export default function Step9() {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm title="V" />
          <ItemForm title="θ" />
          <ItemForm title="T" value="valor" disabled={true} />
          <ItemForm title="H" />

          <select name="select">
            <option value="Equacao1">Equacao1</option>
            <option value="Equacao2">Valor 2</option>
            <option value="Equacao3">Valor 3</option>
          </select>
        </Form>
        <Subtitle>Ou</Subtitle>
        <ItemForm title="K2" sub="T" />
      </CardInput>
      <CardHelp>ajuda 3</CardHelp>
    </Content>
  );
}
