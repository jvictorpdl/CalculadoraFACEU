import { useState } from "react";
import Modal from "../../../../components/Modal/index";
import HelpModal from "../../../../components/HelpModal/index";
import Table from "../../../../components/Table/index";
import { CardHelp } from "../../../../components/CardHelp/index";
import Title from "../../../../components/Title/index";

// Conteúdo das ajudas trazido da versão anterior do AutoDepura (src/pages/AutoDepura/stepN)

const tableDBOr = {
    header: [
        { content: "Condição do rio" },
        { content: "DBO5 do rio (mg/L)" },
    ],
    lines: [
        [{ content: "Bastante limpo" }, { content: "1" }],
        [{ content: "Limpo" }, { content: "2" }],
        [{ content: "Razoavelmente limpo" }, { content: "3" }],
        [{ content: "Duvidoso" }, { content: "5" }],
        [{ content: "Ruim" }, { content: ">10" }],
    ]
}

const tableODmin = {
    header: [
        { content: "Classe" },
        { content: "OD mínimo (mg/L)" },
    ],
    lines: [
        [{ content: "Especial" }, { content: "Não são permitidos lançamentos, mesmo tratados." }],
        [{ content: "1" }, { content: "6,0" }],
        [{ content: "2" }, { content: "5,0" }],
        [{ content: "3" }, { content: "4,0" }],
        [{ content: "4" }, { content: "2,0" }],
    ]
}

const tableK1 = {
    header: [
        { content: "Origem" },
        { content: "K1 ", mid: "(dia", up: "-1", final: ")" },
    ],
    lines: [
        [{ content: "Esgoto bruto concentrado" }, { content: "0,35 - 0,45" }],
        [{ content: "Esgoto bruto de baixa concentração" }, { content: "0,30 - 0,40" }],
        [{ content: "Efluente primário" }, { content: "0,30 - 0,40" }],
        [{ content: "Efluente secundário" }, { content: "0,12 - 0,24" }],
        [{ content: "Curso d’água com águas limpas" }, { content: "0,08 - 0,20" }],
    ]
}

const tableK2 = {
    header: [
        { rowspan: 2, content: "Corpo d'água" },
        { colspan: 2, content: "K2 ", mid: "(dia", up: "-1", final: ")" },
    ],
    lines: [
        [{ content: "Profundo" }, { content: "Raso" }],
        [{ content: "Pequenas lagoas" }, { content: "0,12" }, { content: "0,23" }],
        [{ content: "Rios vagarosos, grandes lagos" }, { content: "0,23" }, { content: "0,37" }],
        [{ content: "Grandes rios com baixa velocidade" }, { content: "0,37" }, { content: "0,46" }],
        [{ content: "Grandes rios com velocidade normal" }, { content: "0,46" }, { content: "0,69" }],
        [{ content: "Rios rápidos" }, { content: "0,69" }, { content: "1,15" }],
        [{ content: "Corredeiras e quedas d’água" }, { content: "> 1,15" }, { content: ">1,61" }],
    ]
}

const tableE = {
    header: [
        { content: "Tipo de tratamento" },
        { content: "Sistema de tratamento" },
        { content: "Eficiência na remoção de DBO (%)" },
    ],
    lines: [
        [{ content: "Primário" }, { content: "Tratamento primário" }, { content: "25 - 40" }],

        [{ rowspan: 7, content: "Lagoas de estabilização" }, { content: "Lagoa facultativa" }, { content: "75 - 85" }],
        [{ content: "Lagoa anaeróbica-lagoa facultativa" }, { content: "75 - 85" }],
        [{ content: "Lagoa aerada facultativa" }, { content: "75 - 85" }],
        [{ content: "Lagoa aerada de mistura completa-lagoa de decantação" }, { content: "75 - 85" }],
        [{ content: "Lagoa + lagoa de maturação" }, { content: "75 - 85" }],
        [{ content: "Lagoa + lagoa de alta taxa" }, { content: "75 - 85" }],
        [{ content: "Lagoa + remoção de algas" }, { content: "80 - 90" }],

        [{ rowspan: 5, content: "Lodos ativados" }, { content: "Lodos ativados convencional" }, { content: "85 - 93" }],
        [{ content: "Aeração prolongada" }, { content: "93 - 97" }],
        [{ content: "Lodos ativados convencional com remoção biológica de N" }, { content: "85 - 93" }],
        [{ content: "Lodos ativados convencional com remoção biológica de N/P" }, { content: "85 - 93" }],
        [{ content: "Lodos ativados + filtração terciária" }, { content: "95 - 98" }],

        [{ rowspan: 6, content: "Reatores aeróbios com biofilmes" }, { content: "Filtro biológico percolador (baixa carga)" }, { content: "85 - 93" }],
        [{ content: "Filtro biológico percolador (alta carga)" }, { content: "80 - 90" }],
        [{ content: "Biodisco" }, { content: "85 - 93" }],
        [{ content: "Biofiltro aerado submerso" }, { content: "85 - 93" }],
        [{ content: "Biofiltro aerado submerso com remoção biológica de N" }, { content: "85 - 93" }],
        [{ content: "Reator com biofilme + filtração terciária" }, { content: "95 - 98" }],

        [{ rowspan: 3, content: "Reatores anaeróbios" }, { content: "Reator anaeróbio de manta de lodo (reator UASB)" }, { content: "60 - 80" }],
        [{ content: "Fossa séptica-filtro anaeróbio" }, { content: "70 - 90" }],
        [{ content: "Reator anaeróbio de manta de lodo + pós tratamento" }, { content: "variável (*)" }],

        [{ rowspan: 5, content: "Disposição controlada no solo" }, { content: "Infiltração lenta no solo" }, { content: "(**)" }],
        [{ content: "Infiltração rápida no solo" }, { content: "(**)" }],
        [{ content: "Infiltração subsuperficial no solo" }, { content: "(**)" }],
        [{ content: "Escoamento superficial no solo" }, { content: "80 - 90" }],
        [{ content: "Banhados artificiais (wetlands)" }, { content: "80 - 90" }],
    ]
}

function Ajuda({ campo, titulo, children }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <>
            <HelpModal title={`Clique aqui para auxílio em ${campo}`} handle={() => setIsOpen(true)} />
            <Modal modalIsOpen={modalIsOpen} closeModal={() => setIsOpen(false)} title={titulo}>
                {children}
            </Modal>
        </>
    );
}

export function PainelAjuda({ children }) {
    return (
        <CardHelp>
            <Title title="Informações auxiliares" />
            {children || (
                <p style={{ opacity: 0.7, fontSize: 14 }}>
                    Sem informações auxiliares para esta tela.
                </p>
            )}
        </CardHelp>
    );
}

export function AjudaODr() {
    return (
        <Ajuda campo="ODr" titulo="Oxigênio dissolvido no rio">
            <p>
                Não sendo possível coletar amostras, pode-se estimar a concentração de ODr
                em função do grau de poluição do curso d’água:
            </p>
            <br />
            <li>curso d’água com poucos indícios de poluição: <br />
                ODr pode ser de 80 a 90% do valor de saturação de oxigênio do rio;</li>
            <li>curso d'água bem poluído: <br />
                incluir os principais focos poluidores (ODr será bem inferior ao teor de saturação).</li>
            <br />
            <h5>Fonte: Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaDBOr() {
    return (
        <Ajuda campo="DBOr" titulo="Auxílio na definição da demanda bioquímica de oxigênio (DBO5)">
            <p>Caso não possua, sugere-se o quadro abaixo:</p>
            <br />
            <Table table={tableDBOr} />
            <br />
            <h5>Fonte: Klein (1962) apud Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaODmin() {
    return (
        <Ajuda campo="ODmín" titulo="Auxílio na definição do oxigênio dissolvido mínimo (ODmín)">
            <p>Caso não possua, sugere-se o quadro abaixo:</p>
            <br />
            <Table table={tableODmin} />
            <br />
            <h5>Fonte: Resolução CONAMA 357 (BRASIL, 2005)</h5>
        </Ajuda>
    );
}

export function AjudaODe() {
    return (
        <Ajuda campo="ODe" titulo="Oxigênio dissolvido no esgoto">
            <p>Não sendo possível coletar amostras, sugere-se para esgoto doméstico:</p>
            <br />
            <h4>Esgoto bruto:</h4>
            <li>ODe = 0 mg/L</li>
            <br />
            <h4>Esgoto tratado:</h4>
            <li>Tratamento primário: ODe = 0 mg/L;</li>
            <li>Tratamento anaeróbio: ODe = 0 mg/L;</li>
            <li>Lodos ativados, filtros biológicos percoladores e outros sistemas aeróbios similares: ODe = 2 mg/L ou mais;</li>
            <li>Lagoas facultativas: ODe = 4 a 6 mg/L.</li>
            <br />
            <h5>Fonte: Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaE() {
    return (
        <Ajuda campo="E" titulo="Auxílio na definição da eficiência de tratamento do esgoto">
            <p>Caso não possua o valor, sugere-se:</p>
            <br />
            <Table table={tableE} />
            <br />
            <h5>(*) Reator UASB + pós-tratamento: praticamente todos os processos listados acima podem ser utilizados como pós-tratamento. A eficiência global (reator UASB + pós tratamento) é similar à do processo selecionado para o pós tratamento, caso este estivesse tratando esgotos brutos. Por exemplo, a eficiência do sistema de lodos ativados tratando esgotos brutos é similar à do sistema UASB + lodos ativados.</h5>
            <br />
            <h5>(**) Os processos de infiltração no solo não geram efluentes superficiais, já que o mesmo infiltra-se no terreno. Medições no subsolo, próximas ao local de infiltração, usualmente indicam eficiências superiores a 90%. Das variantes de infiltração, a mais eficiente é a infiltração lenta.</h5>
            <br />
            <h5>Fonte: Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaDBOe() {
    return (
        <Ajuda campo="DBOe" titulo="Auxílio na definição da demanda bioquímica do esgoto (DBOe)">
            <p>Caso não possua o valor, sugere-se:</p>
            <br />
            <li>Esgoto doméstico bruto: DBOe = 300 mg/L</li>
            <br />
            <h5>Fonte: Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaK1() {
    return (
        <Ajuda campo="K1" titulo="Auxílio na definição do coeficiente de desoxigenação (K1)">
            <p>Valores típicos de K1 (base e, 20°C)</p>
            <br />
            <Table table={tableK1} />
            <br />
            <h5>Fonte: Adaptado de Fair et al. (1973) e Arceivala (1981) apud Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaTetaK1() {
    return (
        <Ajuda campo="θ para K1" titulo="Auxílio em θ para K1">
            <p>Valor usual de θ é de 1,047 (acréscimo de 4,7% em K1 para cada aumento de 1 °C na temperatura da água).</p>
            <br />
            <h5>Fonte: Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaK2() {
    return (
        <Ajuda campo="K2" titulo="Auxílio no coeficiente de reaeração (K2)">
            <p>Valores típicos de K2 (base e, 20°C)</p>
            <br />
            <Table table={tableK2} />
            <br />
            <h5>Fonte: Fair et al. (1973) e Arceivala (1981) apud Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaTetaK2() {
    return (
        <Ajuda campo="θ para K2" titulo="Auxílio em θ para K2">
            <p>Valor usual de θ é de 1,024.</p>
            <br />
            <h5>Fonte: Von Sperling (2005)</h5>
        </Ajuda>
    );
}

export function AjudaTrechos() {
    return (
        <Ajuda campo="Nº de trechos" titulo="Número de trechos no rio">
            <p>Número de trechos ao longo da distância para o cálculo do oxigênio dissolvido.</p>
        </Ajuda>
    );
}
