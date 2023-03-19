import { CardInput, CardHelp, Content } from "../styleSteps";
import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { Subtitle } from "../../../components/Subtitle/styles";

export default function Step2(props) {
  return (
    <Content>
      <CardInput>
        <Form>
          <ItemForm
            title="k1(20ºC)"
            unity="1/d"
            locale="k120c"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="θ"
            unity="M/A"
            locale="tetak1"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="T"
            unity="ºC"
            locale="temperatura"
            setData={props.setData}
            data={props.data}
          />
        </Form>

        <Subtitle>Ou</Subtitle>

        <ItemForm
          title="k1"
          sub="T"
          locale="k1t"
          setData={props.setData}
          data={props.data}
        />
      </CardInput>
      <CardHelp>ajuda 2</CardHelp>
    </Content>
  );
}
