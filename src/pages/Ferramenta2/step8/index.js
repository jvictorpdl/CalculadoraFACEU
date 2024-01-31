import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import Title from "../../../components/Title";

export default function Step8(props) {
  function calculalancamentos() {

  }
  return (
    <Content>
      <CardInput>
        <Title title="Dados do rio" />

        <Form>
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
            title="ODr"
            unity={props.data.odr + " mg/L"}
            disabled={true}
            locale="odr"
            setData={props.setData}
            data={props.data}
            tooltip="Oxigênio dissolvido"

          />
          <ItemForm
            title="DBOr"
            disabled={true}
            unity={props.data.dbor + " mg/L"}
            locale="dbor"
            setData={props.setData}
            data={props.data}
            tooltip="Demanda bioquímica de oxigênio"

          />



        </Form>

      </CardInput>
      <CardInput>
        <Title title="Dados do esgoto" />

        <Form>
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
            title="ODe"
            disabled={true}
            unity={props.data.ode + " mg/L"}
            locale="ODe"
            setData={props.setData}
            data={props.data}
            tooltip="Oxigênio dissolvido"

          />
          <ItemForm
            title="DBOe"
            disabled={true}
            unity={props.data.dboe + " mg/L"}
            locale="DBOe"
            setData={props.setData}
            data={props.data}
            tooltip="Demanda bioquímica de oxigênio"

          />
        </Form>
      </CardInput>
      <CardInput>
        <Title title="Dados morfométricos e ambientais" />

        <Form>
          <ItemForm
            title="v"
            disabled={true}
            unity={props.data.cslinha + "m/s"}
            locale="velocidade"
            setData={props.setData}
            data={props.data}
            tooltip="Velocidade"

          />
          <ItemForm
            title="H"
            unity={props.data.h + " m"}
            disabled={true}
            locale="h"
            setData={props.setData}
            data={props.data}
            tooltip="Profundidade"

          />
          
          <ItemForm
            title="d"
            unity={props.data.distancia + " m"}
            disabled={true}
            locale="distancia"
            setData={props.setData}
            data={props.data}
            tooltip="Distancia"

          />
           <ItemForm
            title="t"
            disabled={true}
            unity={props.data.tempo + " dia"}
            locale="t"
            setData={props.setData}
            data={props.data}
            tooltip="Tempo de percurso"

          />
          <ItemForm
            title="k1"
            sub="T"
            disabled={true}
            unity={props.data.odmin + "  1/dia"}
            locale="k1t"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de desoxigenação a uma temperatura (T)"
          />
          <ItemForm
            title="k2"
            sub="T"
            disabled={true}
            unity={props.data.k2t + "  1/dia"}
            locale="k2t"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de reaeração a uma temperatura (T)"

          />

         
          <ItemForm
            title="Cs'"
            disabled={true}
            unity={props.data.cslinha + " mg/L"}
            locale="cslinha"
            setData={props.setData}
            data={props.data}
            tooltip="Concentração de saturação na altitude (h)"

          />
          <ItemForm
            title="ODmín"
            unity={props.data.odmin + " mg/L"}
            disabled={true}
            locale="odmin"
            setData={props.setData}
            data={props.data}
            tooltip="Oxigênio dissolvido mínimo"

          />



        </Form>

      </CardInput>
    </Content>
  );
}
