import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step4(props) {
  return (
    <Content>
      <CardInput>
        <FormTwo>
          <ItemForm
            title="d"
            unity="mg/L"
            locale="distancia"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="v"
            unity="m/s"
            locale="velocidade"
            setData={props.setData}
            data={props.data}
          />
        </FormTwo>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="t"
          unity="d"
          locale="tempo"
          setData={props.setData}
          data={props.data}
        />
      </CardInput>
      <CardHelp>ajuda 4</CardHelp>
    </Content>
  );
}
