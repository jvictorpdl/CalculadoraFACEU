import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, Content } from "../styleSteps";
import Title from "../../../components/Title";
import FormTwo from "../../../components/FormTwo";

export default function Step8(props) {

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
            tooltip="Vazão do rio"

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
            tooltip="Vazão do esgoto"


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
        <Title title="Dados da mistura" />

        <FormTwo>
          <ItemForm
            title="Nop"
            disabled={true}
            unity={props.data.nop + " org/100 mL"}
            locale="nop" 
            setData={props.setData}
            data={props.data}
            tooltip="Concentração máxima permissível de coliformes no ponto de mistura em função da legislação ambiental"


          />
         
          
        </FormTwo>
      </CardInput>
      <CardInput>
        <Title title="Dados morfométricos e ambientais" />

        <Form>
          <ItemForm
            title="T"
            disabled={true}
            unity={props.data.temperatura + " ºC"}
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
              tooltip="Distancia do percurso"
  
            />
          <ItemForm
            title="v"
            unity={props.data.velocidade + " m/s"}
            disabled={true}
            locale="v"
            setData={props.setData}
            data={props.data}
            tooltip="Velocidade do curso d'água"

          />
          
           <ItemForm
            title="Kb"
            disabled={true}
            unity={props.data.kb + " 1/dia"}
            locale="kb"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de decaimento bacteriano"

          />
          <ItemForm
            title="θ para Kb"
            // sub="T"
            disabled={true}
            unity={props.data.teta + "  1/dia"}
            locale="teta"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"
          />
          
        </Form>

      </CardInput>
    </Content>
  );
}
