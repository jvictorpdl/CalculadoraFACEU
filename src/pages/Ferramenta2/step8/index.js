import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import Title from "../../../components/Title";
import FormTwo from "../../../components/FormTwo";

export default function Step8(props) {
  function calculalancamentos() {

  }
  return (
    <Content>
      <CardInput>
        <Title title="Dados do rio" />

        <FormTwo>
          <ItemForm
            title="Qr"
            unity={props.data.qr + " m³/s"}
            disabled={true}
            locale="qr"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão"

          />
          <ItemForm
            title="Nr"
            unity={props.data.nr + " org/100mL"}
            disabled={true}
            locale="nr"
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de coliformes no rio, a montante do lançamento"

          />
          
        </FormTwo>

      </CardInput>
      <CardInput>
        <Title title="Dados do esgoto" />

        <FormTwo>
          <ItemForm
            title="Qe"
            disabled={true}
            unity={props.data.qe + " m³/s"}
            locale="Qe"
            setData={props.setData}
            data={props.data}
            tooltip="Vazão"


          />
          <ItemForm
            title="Ne"
            disabled={true}
            unity={props.data.ne + " org/100mL"}
            locale="ne"
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de coliformes no esgoto"

          />
          
        </FormTwo>
      </CardInput>
      <CardInput>
        <Title title="Dados morfométricos e ambientais" />

        <Form>
          <ItemForm
            title="T"
            disabled={true}
            unity={props.data.cslinha + " ºC"}
            locale="temperratura"
            setData={props.setData}
            data={props.data}
            tooltip="Temperatura do líquido"

          />
            <ItemForm
              title="d"
              unity={props.data.distancia + " m"}
              disabled={true}
              locale="distancia"
              setData={props.setData}
              data={props.data}
              tooltip="Distancia do percursso"
  
            />
          <ItemForm
            title="v"
            unity={props.data.h + " m/s"}
            disabled={true}
            locale="v"
            setData={props.setData}
            data={props.data}
            tooltip="Velocidade do curso d'água"

          />
          
           <ItemForm
            title="Kb"
            disabled={true}
            unity={props.data.tempo + " 1/dia"}
            locale="kb"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de decaimento bacteriano"

          />
          <ItemForm
            title="θ para Kb"
            // sub="T"
            disabled={true}
            unity={props.data.odmin + "  1/dia"}
            locale="tetakb"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"
          />
          
        </Form>

      </CardInput>
    </Content>
  );
}
