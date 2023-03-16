import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import ItemSelect from "../../../components/ItemSelect";
import { Select } from "../../../components/Select";
import { Subtitle } from "../../../components/Subtitle/styles";
import { CardInput, CardHelp, Content } from "../styleSteps";

const options = [
  { value: "", label: "Selecione" },
  { value: "1", label: "O'Connor Dobbins" },
  { value: "2", label: "Churchill et al" },
  { value: "3", label: "Owens et al" },
];

export default function Step9() {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm title="V" unity="m/s" />
          <ItemForm title="θ" unity="M/A" />
          <ItemForm title="T" value="valor" disabled={true} />
          <ItemForm title="H" unity="m" />
          <ItemSelect options={options} required />
        </Form>
        <Form></Form>

        <Subtitle>Ou</Subtitle>
        <ItemForm title="K2" sub="T" unity="1/d" />
      </CardInput>
      <CardHelp>ajuda 3</CardHelp>
    </Content>
  );
}
/*
formula O'Connor e Dobbins:   3.73*(v^0.5)*(H^-1,5)  // USADA CASO  0.6m <= H < 4m  && 0.05m/s <= v < 0,8 m/s
formula Churchill et al: 5*(v^0.97)*(H*1.67)    // usada caso 0.6m <= H < 4m && 0.8m/s <= v < 1.5m/s
formula Owens et al: 5.3*(v^0.67)*(H^-1.85)   // usada caso 0.1m <= H <0.6m && 0.05m/s <= v < 1.5 m/s*/
