import { useState } from "react";
import HelpModal from "../../../../components/HelpModal/index";
import Modal from "../../../../components/Modal/index";
import Table from "../../../../components/Table/index";

// Conteúdo de Von Sperling (2005), item 3.4 (eutrofização) e Tabela 4.9, e da Resolução CONAMA 357/2005

const Nota = ({ children }) => <p style={{ fontSize: '0.83em', fontWeight: 'bold' }}>{children}</p>;
const lista = { paddingLeft: 20 };

function Ajuda({ campo, titulo, children }) {
    const [aberta, setAberta] = useState(false);

    return (
        <>
            <HelpModal title={`Ajuda sobre ${campo}`} handle={() => setAberta(true)} />
            <Modal modalIsOpen={aberta} closeModal={() => setAberta(false)} title={titulo}>
                {children}
            </Modal>
        </>
    );
}

export function AjudaVQ() {
    return (
        <Ajuda campo="V e Q" titulo="Volume e vazão afluente da represa">
            <p>
                O tempo de detenção hidráulica é t = V / Q. Q é a vazão média afluente à represa,
                somando os tributários e os esgotos.
            </p>
            <br />
            <p>
                O livro trabalha com Q em m³/ano. Para converter em m³/s, divida por 31.536.000
                (segundos em 365 dias). Por exemplo, 50 × 10⁶ m³/ano = 1,58549 m³/s.
            </p>
            <br />
            <Nota>Fonte: Von Sperling (2005)</Nota>
        </Ajuda>
    );
}

const tabelaContribuicoes = {
    header: [
        { content: "Fonte" },
        { content: "Tipo" },
        { content: "Valor típico" },
        { content: "Unidade" },
    ],
    lines: [
        [{ rowspan: 3, content: "Drenagem" }, { content: "Áreas de matas e florestas" }, { content: "10" }, { content: "kgP/km²·ano" }],
        [{ content: "Áreas agrícolas" }, { content: "50" }, { content: "kgP/km²·ano" }],
        [{ content: "Áreas urbanas" }, { content: "100" }, { content: "kgP/km²·ano" }],
        [{ content: "Esgotos" }, { content: "Domésticos" }, { content: "0,5" }, { content: "kgP/hab·ano" }],
    ],
};

export function AjudaCoeficientes() {
    return (
        <Ajuda campo="as contribuições" titulo="Contribuições unitárias de fósforo">
            <p>
                Com os coeficientes em branco, o EutroFriza usa os valores típicos do quadro abaixo.
                Informe valores próprios se houver dados da bacia.
            </p>
            <br />
            <Table table={tabelaContribuicoes} />
            <br />
            <p>
                Os valores variam muito de local para local: servem só como ordem de grandeza.
                Áreas de matas transportam menos fósforo; a drenagem urbana e, sobretudo, o esgoto
                doméstico são as maiores fontes.
            </p>
            <br />
            <Nota>Fonte: Von Sperling (2005)</Nota>
        </Ajuda>
    );
}

export function AjudaPerCapita() {
    return (
        <Ajuda campo="a carga per capita" titulo="Carga de fósforo por habitante">
            <p>
                Em branco, vale 0,5 kgP/hab·ano, o valor típico do livro para esgoto doméstico.
                A carga do esgoto é a População × carga per capita, descontada a eficiência E do tratamento.
            </p>
            <br />
            <p>
                O fósforo do esgoto vem dos dejetos humanos e dos detergentes, que podem responder por
                até metade do fósforo total.
            </p>
            <br />
            <Nota>Fonte: Von Sperling (2005)</Nota>
        </Ajuda>
    );
}

const tabelaRemocao = {
    header: [
        { content: "Sistema de tratamento" },
        { content: "Remoção de fósforo total (%)" },
    ],
    lines: [
        [{ content: "Esgoto bruto (sem tratamento)" }, { content: "0" }],
        [{ content: "Tratamento primário (tanque séptico ou convencional)" }, { content: "< 35" }],
        [{ content: "Tratamento primário avançado (quimicamente assistido)" }, { content: "75 - 90" }],
        [{ content: "Lagoa facultativa, anaeróbia + facultativa ou aerada" }, { content: "< 35" }],
        [{ content: "Lagoa anaeróbia + facultativa + maturação" }, { content: "> 50" }],
        [{ content: "Lagoa anaeróbia + facultativa + alta taxa" }, { content: "50 - 60" }],
        [{ content: "Lagoa anaeróbia + facultativa + remoção de algas" }, { content: "< 35" }],
        [{ content: "Infiltração lenta no solo" }, { content: "> 85" }],
        [{ content: "Infiltração rápida no solo; tanque séptico + infiltração" }, { content: "> 50" }],
        [{ content: "Escoamento superficial no solo; banhados artificiais (wetlands)" }, { content: "< 35" }],
        [{ content: "Tanque séptico + filtro anaeróbio" }, { content: "< 35" }],
        [{ content: "Reator UASB, sozinho ou com lodos ativados, biofiltro, filtro anaeróbio, filtro percolador, lagoa aerada ou escoamento superficial" }, { content: "< 35" }],
        [{ content: "Reator UASB + flotação por ar dissolvido" }, { content: "75 - 88" }],
        [{ content: "Reator UASB + lagoas de maturação" }, { content: "> 50" }],
        [{ content: "Lodos ativados (convencional, aeração prolongada, batelada ou com remoção biológica de N)" }, { content: "< 35" }],
        [{ content: "Lodos ativados com remoção biológica de N e P" }, { content: "75 - 88" }],
        [{ content: "Lodos ativados + filtração terciária" }, { content: "50 - 60" }],
        [{ content: "Filtro biológico percolador, biofiltro aerado submerso ou biodisco" }, { content: "< 35" }],
    ],
};

export function AjudaE() {
    return (
        <Ajuda campo="E" titulo="Eficiência do tratamento na remoção de fósforo">
            <p>Em branco, vale 0% (esgoto bruto). Caso não possua o valor, sugere-se:</p>
            <br />
            <Table table={tabelaRemocao} />
            <br />
            <Nota>
                Sem uma etapa específica para o fósforo, a maioria dos sistemas remove menos de 35%.
                Com precipitação química do fósforo, qualquer uma dessas tecnologias pode chegar a
                efluente com menos de 1 mg/L de fósforo.
            </Nota>
            <br />
            <Nota>Fonte: Von Sperling (2005)</Nota>
        </Ajuda>
    );
}

export function AjudaKs() {
    return (
        <Ajuda campo="Ks" titulo="Coeficiente de perda de fósforo por sedimentação (Ks)">
            <p>A concentração de fósforo na represa vem do balanço de massa:</p>
            <br />
            <p><strong>P = L · 10³ / [V · (1/t + Ks)]</strong></p>
            <br />
            <p>com P em gP/m³, L em kgP/ano, V em m³ e t em anos. Para o Ks (1/ano), o livro traz:</p>
            <br />
            <ul style={lista}>
                <li><strong>Salas e Martino (1991): Ks = 2 / √t.</strong> Ajustado com dados de 40 lagos e represas
                    da América Latina e do Caribe; é o recomendado pelo livro para regiões de clima quente.</li>
                <li>Castagnino (1982): Ks = 2,5 / √t. Corrige o de Vollenweider para lagos tropicais
                    (sedimentação e crescimento do fitoplâncton mais rápidos).</li>
                <li>Vollenweider (1976): Ks = 1 / √t. Desenvolvido para lagos de clima temperado.</li>
            </ul>
            <br />
            <Nota>Fonte: Von Sperling (2005)</Nota>
        </Ajuda>
    );
}

const tabelaTrofia = {
    header: [
        { content: "Grau de trofia" },
        { content: "Fósforo total na represa (mg/m³)" },
    ],
    lines: [
        [{ content: "Ultraoligotrófico" }, { content: "< 5" }],
        [{ content: "Oligotrófico" }, { content: "< 10 - 20" }],
        [{ content: "Mesotrófico" }, { content: "10 - 50" }],
        [{ content: "Eutrófico" }, { content: "25 - 100" }],
        [{ content: "Hipereutrófico" }, { content: "> 100" }],
    ],
};

// em mg/m³, a unidade do Pmáx; na resolução estão em mg/L (0,020 mg/L = 20 mg/m³)
const tabelaConama = {
    header: [
        { content: "Classe" },
        { content: "Lêntico (mg/m³)" },
        { content: "Intermediário (*) (mg/m³)" },
    ],
    lines: [
        [{ content: "1" }, { content: "20" }, { content: "25" }],
        [{ content: "2" }, { content: "30" }, { content: "50" }],
        [{ content: "3" }, { content: "50" }, { content: "75" }],
    ],
};

export function AjudaPmax() {
    return (
        <Ajuda campo="Pmáx" titulo="Fósforo máximo desejado na represa (Pmáx)">
            <p>
                Pmáx é a concentração de fósforo total que não deve ser ultrapassada; com ela o EutroFriza
                calcula a carga máxima admissível. Digite em mg/m³ (1 mg/L = 1.000 mg/m³).
            </p>
            <br />
            <p><strong>Pelo grau de trofia:</strong></p>
            <br />
            <Table table={tabelaTrofia} />
            <br />
            <Nota>
                A superposição dos valores entre duas faixas indica a dificuldade de estabelecer faixas
                rígidas. No exemplo do livro, 50 mg/m³ é adotado como limite entre mesotrofia e eutrofia
                (um valor não muito conservador). A escolha deve considerar os usos da represa.
            </Nota>
            <br />
            <Nota>Fonte: Von Sperling (1994) apud Von Sperling (2005)</Nota>
            <br />
            <p><strong>Pela legislação (fósforo total em águas doces):</strong></p>
            <br />
            <Table table={tabelaConama} />
            <br />
            <Nota>(*) Tempo de residência entre 2 e 40 dias, e tributários diretos de ambiente lêntico.</Nota>
            <br />
            <Nota>Na resolução os limites estão em mg/L: 0,020 mg/L = 20 mg/m³.</Nota>
            <br />
            <Nota>Fonte: Resolução CONAMA 357 (BRASIL, 2005)</Nota>
        </Ajuda>
    );
}
