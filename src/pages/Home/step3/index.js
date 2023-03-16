import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { Subtitle } from "../../../components/Subtitle/styles";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Container } from "./styles";

export default function Step9() {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm title="V" />
          <ItemForm title="θ" />
          <ItemForm title="T" value="valor" disabled={true} />
        </Form>
        <Form>
          <ItemForm title="H" />
          <ItemSelect title="H" />

          <Container>
            <label>Equação</label>
            <select name="Equacao">
              <option value="">Selecione</option>
              <option value="Equacao1">O'Connor Dobbins</option>
              <option value="Equacao2">Churchill et al</option>
              <option value="Equacao3">Owens et al</option>
            </select>
          </Container>
        </Form>

        <Subtitle>Ou</Subtitle>
        <ItemForm title="K2" sub="T" />
      </CardInput>
      <CardHelp>ajuda 3</CardHelp>
    </Content>
  );
}
/*
formula O'Connor e Dobbins:   3.73*(v^0.5)*(H^-1,5)  // USADA CASO  0.6m <= H < 4m  && 0.05m/s <= v < 0,8 m/s
formula Churchill et al: 5*(v^0.97)*(H*1.67)    // usada caso 0.6m <= H < 4m && 0.8m/s <= v < 1.5m/s
formula Owens et al: 5.3*(v^0.67)*(H^-1.85)   // usada caso 0.1m <= H <0.6m && 0.05m/s <= v < 1.5 m/s*/
