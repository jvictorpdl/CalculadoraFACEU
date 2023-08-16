import Form from "../../../components/Form";
import FormTwo from "../../../components/FormTwo";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";
import { useState } from "react";
import Title from "../../../components/Title";
import Modal from "../../../components/Modal";
import HelpModal from "../../../components/HelpModal";
import Table from "../../../components/Table";

export default function Step10(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }



  function closeModal() {
    setIsOpen(false);
  }
  const table = {
    header: [

      {
        // rowspan: 2,
        content: "Tipo de tratamento",
      },
      {
        content: "Sistema de tratamento",
        // colspan: 2,
        // content: "K2 ",
        // mid: "(dia",
        // up: "-1",
        // final: ")",
      },
      {
        // rowspan: 2,
        content: "Eficiência na remoção de DBO (%)",
      },



    ],
    lines: [
      [
        {
          content: "Primário",
        },
        {
          content: "Tratamento primário",
        },
        {
          content: "25 - 40",
        },
      ],
      [
        {
          rowspan: 7,
          content: "Lagoas de estabilização",

        },
        {
          content: "Lagoa facultativa",
        },
        {
          content: "75 - 85",
        },

      ],
      [
        {
          content: "Lagoa anaeróbica-lagoa facultativa",
        },

        {
          content: "75 - 85",
        },

      ],
      [
        {
          content: "Lagoa aerada facultativa",
        },
        {
          content: "75 - 85",
        },
      ],
      [
        {
          content: "Lagoa aerada de mistura completa-lagoa de decantação",
        },
        {
          content: "75 - 85",
        },
      ],
      [
        {
          content: "Lagoa + lagoa de maturação",
        },
        {
          content: "75 - 85",
        },
      ],
      [
        {
          content: "Lagoa + lagoa de alta taxa",
        },
        {
          content: "75 - 85",
        },
      ],
      [
        {
          content: "Lagoa + remoção de algas",
        },
        {
          content: "80 - 90",
        },
      ],
      [
        {
          rowspan: 5,
          content: "Lodos ativados",

        },
        {
          content: "Lodos ativados convencional",
        },
        {
          content: "85 - 93",
        },
      ],
      [
        {
          content: "Aeração prolongada",
        },
        {
          content: "93 - 97",
        },

      ],
      [
        {
          content: "Lodos ativados convencional com remoção biológica de N",
        },
        {
          content: "85 - 93",
        },

      ],
      [
        {
          content: "Lodos ativados convencional com remoção biológica de N/P",
        },
        {
          content: "85 - 93",
        },
      ],
      [
        {
          content: "Lodos ativados + filtração terciária",
        },
        {
          content: "95 - 98",
        },
      ],
      [
        {
          rowspan: 6,
          content: "Reatores aeróbios com biofilmes",

        },
        {
          content: "Filtro biológico percolador (baixa carga)",
        },
        {
          content: "85 - 93",
        },
      ],
      [
        {
          content: "Filtro biológico percolador (alta carga)",
        },
        {
          content: "80 - 90",
        },
      ],
      [
        {
          content: "Biodisco",
        },
        {
          content: "85 - 93",
        },
      ],
      [
        {
          content: "Biofiltro aerado submerso",
        },
        {
          content: "85 - 93",
        },
      ],
      [
        {
          content: "Biofiltro aerado submerso com remoção biológica de N",
        },
        {
          content: "85 - 93",
        },
      ],
      [
        {
          content: "Reator com biofilme + filtração terciária",
        },
        {
          content: "95 - 98",
        },
      ],

      [
        {
          rowspan: 3,
          content: "Reatores anaeróbios",

        },
        {
          content: "Reator anaeróbio de manta de lodo (reator UASB)",
        },
        {
          content: "60 - 80",
        },
      ],
      [
        {
          content: "Fossa séptica-filtro anaeróbio",
        },
        {
          content: "70 - 90",
        },
      ],
      [
        {
          content: "Reator anaeróbio de manta ded lodo + pós tratamento",
        },
        {
          content: "variável (*)",
        },
      ],

      [
        {
          rowspan: 5,
          content: "Disposição controlada no solo",

        },
        {
          content: "Infiltração lenta no solo",
        },
        {
          content: "(**)",
        },
      ],
      [
        {
          content: "Infiltração rápida no solo",
        },
        {
          content: "(**)",
        },
      ],
      [
        {
          content: "Infiltração subsuperficial no solo",
        },
        {
          content: "(**)",
        },
      ],
      [
        {
          content: "Escoamento superficial no solo",
        },
        {
          content: "80 - 90",
        },
      ],
      [
        {
          content: "Banhados artificiais (wetlands)",
        },
        {
          content: "80 - 90",
        },
      ],
    ],
  };

  return (
    <Content>
      <CardInput>
        <Title title="Alternativas de tratamento do esgoto" />

        <Form>
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
          <ItemForm
            title="θ para K1"
            unity="ad."
            locale="tetak1"
            setData={props.setData}
            data={props.data}
            tooltip="Coeficiente de temperatura"

          />
          <ItemForm
            title="T"
            unity="ºC"
            locale="temperatura"
            setData={props.setData}
            data={props.data}
            tooltip="Temperatura do líquido"

          />
        </Form>
      </CardInput>

      <CardHelp>
        <Title title="Informações auxiliares" />

        <HelpModal title="Clique para auxílio em E" handle={openModal} />
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title="Auxílio na definição da eficiência de tratamento do esgoto">
          <h3>Caso não possua o valor, sugere-se: </h3>
          <br />
          <Table table={table} />
          <br />

          <h5>(*) Reator UASB + pós-tratamento: praticamente todos os processos listados acima podem ser utilizados como pós-tratamento. A eficiência global (reator UASB + pós tratamento) é similar à do processo selecionado para o pós tratamento, caso este estivesse tratando esgotos brutos. Por exemplo, a eficiência do sistema de lodos ativados tratando esgotos brutos é similar à do sistema UASB + lodos ativados.</h5>
          <br />
          <h5>
          (**) Os processos de infiltração no solo não geram efluentes superficiais, já que o mesmo infiltra-se no terreno. Medilções no subsolo, próximas ao local de infiltração, usualmente indicam eficiências superiores a 90%. Das variantes de infiltração, a mais eficiente é a infiltração lenta.
          </h5>
          <br />
          <h5>Fonte: Von Sperling (2005)</h5>

        </Modal>
        </CardHelp>
    </Content>
  );
}
