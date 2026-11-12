import { Plus, Trash2 } from "lucide-react";
import { useContext } from "react";
import AvisoTrava from "../../../../components/AvisoTrava";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import { CalculadoraAutodepura, lancamentosDe, trechosDe } from "../../../../utils/autoDepuraCalculation";
import { numero } from "../../../../utils/relatorio";
import { bloqueadoPor, CAMINHOS, campoDoTrecho, errosAutodepura, MAXIMO_TRECHOS } from "../../../../utils/validacao";
import { AjudaE, AjudaK1, AjudaK2, AjudaLancamentos, AjudaTrechosSeguintes, PainelAjuda } from "./ajudas";
import { BotaoAdicionar, BotaoRemover, CabecalhoCartao, Cartao, Montante, novoId, Orientacao, Subtitulo, TituloCartao, TituloLancamento } from "./cartoes";
import { ListaLancamentos } from "./lancamentos";

const trechoVazio = () => ({
    id: novoId(),
    qe: null, ode: null, dboe: null, e: null, lancamentos: [], distancia: null, velocidade: null,
    k120c: null, k1t: null, h: null, k220c: null, k2t: null,
});

// vazão, OD, DBO5 e K1 no fim do trecho anterior, quando os dados até ele estão completos
function rioAMontante(dados, indice) {
    const anteriores = { ...dados, trechos: trechosDe(dados).slice(0, indice) };
    if (errosAutodepura(anteriores).length) return null;
    const { trechos } = CalculadoraAutodepura(anteriores);
    const anterior = trechos[trechos.length - 1];
    return { km: anterior.inicioKm + anterior.distanciaKm, qr: anterior.qt, od: anterior.odFim, dbo: anterior.dbo5Fim, k1t: anterior.k1t };
}

// opções que chegam ao mesmo coeficiente: uma preenchida bloqueia as outras
function travas(trecho, caminhos, rotulos) {
    const opcoes = rotulos.map((rotulo, opcao) => [rotulo, bloqueadoPor(trecho, caminhos, opcao)]);
    return {
        bloqueados: opcoes.filter(([, por]) => por.length).map(([rotulo]) => rotulo),
        motivo: [...new Set(opcoes.flatMap(([, por]) => por))],
    };
}

function CartaoTrecho({ trecho, numeroTrecho, montante, onAlterar, onRemover }) {
    const k1 = travas(trecho, CAMINHOS.k1Trecho, ['K1 (20 °C)', 'K1T']);
    const k2 = travas(trecho, CAMINHOS.k2, ['H', 'K2 (20 °C)', 'K2T']);
    const bloqueados = new Set([...k1.bloqueados, ...k2.bloqueados]);
    const extras = lancamentosDe(trecho);

    const campo = (chave, label, tooltip, placeholder) => (
        <TextFieldWithTooltip
            disabled={bloqueados.has(label)}
            value={trecho[chave]}
            onBlurValue={(val) => onAlterar({ [chave]: val })}
            label={label}
            campo={campoDoTrecho(label, numeroTrecho)}
            tooltip={tooltip}
            placeholder={placeholder}
        />
    );

    return (
        <Cartao aria-labelledby={`trecho-${trecho.id}`}>
            <CabecalhoCartao>
                <TituloCartao id={`trecho-${trecho.id}`}>Trecho {numeroTrecho}</TituloCartao>
                <BotaoRemover type="button" aria-label={`Remover trecho ${numeroTrecho}`} onClick={onRemover}>
                    <Trash2 size={16} aria-hidden="true" />
                    Remover
                </BotaoRemover>
            </CabecalhoCartao>
            <Montante>
                {montante
                    ? `Começa a ${numero(montante.km, 1)} km do primeiro lançamento. Rio a montante, no fim do trecho ${numeroTrecho - 1}: Qr = ${numero(montante.qr, 3)} m³/s, OD = ${numero(montante.od, 2)} mg/L e DBO5 = ${numero(montante.dbo, 2)} mg/L.`
                    : `O rio a montante tem a vazão, o OD e a DBO5 do fim do trecho ${numeroTrecho - 1}; os valores aparecem quando os dados até ele estiverem completos.`}
            </Montante>

            <Subtitulo>Contribuições no início do trecho (opcional)</Subtitulo>
            {extras.length > 0 && <TituloLancamento style={{ marginBottom: 8 }}>Lançamento 1</TituloLancamento>}
            <Grid columns={4}>
                {campo('qe', 'Qe', 'Vazão da contribuição: esgoto ou afluente', 'm³/s')}
                {campo('ode', 'ODe', 'Oxigênio dissolvido da contribuição', 'mg/L')}
                {campo('dboe', 'DBOe', 'DBO5 da contribuição: bruta (com E, se houver tratamento) ou já a do efluente tratado (sem E)', 'mg/L')}
                {campo('e', 'E', 'Eficiência do tratamento na remoção de DBO (opcional)', '%')}
            </Grid>
            <ListaLancamentos lancamentos={extras} trecho={numeroTrecho} onAlterar={(lista) => onAlterar({ lancamentos: lista })} />

            <Subtitulo>Percurso</Subtitulo>
            <Grid columns={4}>
                {campo('distancia', 'd', 'Extensão do trecho', 'm')}
                {campo('velocidade', 'v', 'Velocidade do rio no trecho', 'm/s')}
            </Grid>

            <Subtitulo>Desoxigenação (opcional): K1 (20 °C) ou K1T</Subtitulo>
            <Montante style={{ marginBottom: 8 }}>
                Em branco, o trecho usa o K1 do trecho {numeroTrecho - 1}
                {montante ? ` (K1T = ${numero(montante.k1t, 3)} 1/dia)` : ''}. O K1 (20 °C) é corrigido pelo θ e pela T de Dados adicionais.
            </Montante>
            <Grid columns={4}>
                {campo('k120c', 'K1 (20 °C)', 'Coeficiente de desoxigenação do trecho a 20 °C', '1/dia')}
                {campo('k1t', 'K1T', 'Coeficiente de desoxigenação do trecho na temperatura do rio (T)', '1/dia')}
            </Grid>
            <AvisoTrava campos={k1.bloqueados} por={k1.motivo} />

            <Subtitulo>Reaeração: informe só uma das opções, H, K2 (20 °C) ou K2T</Subtitulo>
            <Grid columns={4}>
                {campo('h', 'H', 'Profundidade do rio no trecho, para calcular o K2 com a velocidade', 'm')}
                {campo('k220c', 'K2 (20 °C)', 'Coeficiente de reaeração do trecho a 20 °C', '1/dia')}
                {campo('k2t', 'K2T', 'Coeficiente de reaeração do trecho na temperatura do rio (T)', '1/dia')}
            </Grid>
            <AvisoTrava campos={k2.bloqueados} por={k2.motivo} />
        </Cartao>
    );
}

export function TrechosSeguintes() {
    const { state, dispatch } = useContext(ApplicationContext);
    const dados = state.data.autodepura;
    const trechos = trechosDe(dados);

    function salvar(novos) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                autodepura: { ...dados, trechos: novos },
            },
        });
    }

    return (
        <div>
            <Row>
                <Column>
                    <FormTitle title="Trechos seguintes" />
                    <Orientacao>
                        Opcional. Acrescente um trecho para cada nova contribuição (esgoto ou afluente) ou mudança de velocidade,
                        profundidade, K1 ou K2. O trecho 1 é o descrito nos grupos anteriores; sem trechos seguintes, o cálculo considera só ele.
                    </Orientacao>

                    {trechos.map((trecho, i) => (
                        <CartaoTrecho
                            key={trecho.id ?? i}
                            trecho={trecho}
                            numeroTrecho={i + 2}
                            montante={rioAMontante(dados, i)}
                            onAlterar={(campos) => salvar(trechos.map((outro) => (outro === trecho ? { ...outro, ...campos } : outro)))}
                            onRemover={() => salvar(trechos.filter((outro) => outro !== trecho))}
                        />
                    ))}

                    <div>
                        <BotaoAdicionar type="button" disabled={trechos.length >= MAXIMO_TRECHOS} onClick={() => salvar([...trechos, trechoVazio()])}>
                            <Plus size={16} aria-hidden="true" />
                            Adicionar trecho {trechos.length + 2}
                        </BotaoAdicionar>
                    </div>
                    {trechos.length >= MAXIMO_TRECHOS &&
                        <Orientacao style={{ marginTop: 8 }}>O limite é de {MAXIMO_TRECHOS} trechos seguintes.</Orientacao>}
                </Column>
                <VerticalSplitter />
                <Column>
                    <PainelAjuda>
                        <AjudaTrechosSeguintes />
                        <AjudaLancamentos />
                        <AjudaE />
                        <AjudaK1 />
                        <AjudaK2 />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}
