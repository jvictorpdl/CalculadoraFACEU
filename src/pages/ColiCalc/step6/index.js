import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, Content } from "../styleSteps";
import Title from "../../../components/Title";

export default function Step6(props) {



  return (
    <Content>
      <CardInput>
        <Title title="Dados do esgoto" />

        <FormTwo>
          <ItemForm
            title="Qe"
            unity="m³/s"
            locale="qe"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão do esgoto"

          />
          <ItemForm
            title="Ne"
            unity="org/100mL"
            locale="ne"
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de coliformes no esgoto"

          />
        </FormTwo>
      </CardInput>


    </Content>
  );
}
