import Form from "../../../components/Form";
import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import Title from "../../../components/Title";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step5(props) {
  return (
    <Content>
      <CardInput>
      <Title title="Dados morfométricos e ambientais"/>

        <FormTwo>
          <ItemForm
            title="T"
            unity="ºC"
            locale="temperatura"
            setData={props.setData}
            data={props.data}
            tooltip="Temperatura"

          />
          <ItemForm
            title="h"
            unity="m"
            locale="h"
            setData={props.setData}
            data={props.data}
            tooltip="Altitude"
          />
        </FormTwo>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="Cs'"
          unity="mg/L"
          locale="cs"
          setData={props.setData}
          data={props.data}
          tooltip="Concentração de saturação na altitude(h)"
        />
      </CardInput>
      {/*esta pagina nao possui o card help*/}
    </Content>
  );
}
