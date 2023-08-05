import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import Title from "../../../components/Title";

export default function Step8(props) {
  // console.log(props.data);
  function calculalancamentos() {

  }
  return (
    <Content>
      <CardInput>
      <Title title="Dados do rio"/>

        <Form>
          <ItemForm
            title="Qr"
            unity={props.data.qr + " m³/s"}
            disabled={true}
            locale="qr"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="ODr"
            // value="valor"
            unity={props.data.odr + " mg/L"}
            disabled={true}
            locale="odr"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="DBOr"
            // value="valor"
            unity={props.data.dbor + " mg/L"}
            disabled={true}
            locale="dbor"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="ODmin"
            // value="valor"
            unity={props.data.odmin + " mg/L"}
            disabled={true}
            locale="odmin"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="k1"
            sub="T"
            disabled={true}
            unity={props.data.odmin + "  1/d"}
            locale="k1t"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="k2"
            sub="T"
            disabled={true}
            unity={props.data.k2t + "  1/d"}
            locale="k2t"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="t"
            disabled={true}
            unity={props.data.tempo + " d"}
            locale="t"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="Cs'"
            disabled={true}
            unity={props.data.cslinha + " mg/L"}
            locale="cslinha"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="ODmin"
            disabled={true}
            unity={props.data.odmin + " mg/L"}
            locale="odmin"
            setData={props.setData}
            data={props.data}
          />
        </Form>

      </CardInput>
      <CardInput>
      <Title title="Dados do esgoto"/>

        <Form>
          <ItemForm
            title="Qe"
            disabled={true}
            unity={props.data.qe + " m³/L"}
            locale="Qe"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="ODe"
            disabled={true}
            unity={props.data.qe + " mg/L"}
            locale="ODe"
            setData={props.setData}
            data={props.data}
          />
          <ItemForm
            title="DBOe"
            disabled={true}
            unity={props.data.dboe + " mg/L"}
            locale="DBOe"
            setData={props.setData}
            data={props.data}
          />
        </Form>
      </CardInput>
    </Content>
  );
}
