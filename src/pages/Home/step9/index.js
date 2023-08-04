import Form from "../../../components/Form";
import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";
import Title from "../../../components/Title";

export default function Step10(props) {
  return (
    <Content>
      <CardInput>
      <Title title="Alternativas de tratamento do esgoto"/>

        <FormTwo>
          <ItemForm
            title="E"
            unity="%"
            locale="e"
            setData={props.setData}
            data={props.data}
            tooltip="Eficiência do tratamento na remoção de DBO"
          />
          <ItemForm
            title="k1(20ºC)"
            unity="1/d"
            locale="k120c"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de desoxigenação(20ºC)"

          />
        </FormTwo>
      </CardInput>

      <CardHelp>ajuda simulação</CardHelp>
    </Content>
  );
}
