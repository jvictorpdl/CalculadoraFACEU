import { Plus, Trash2 } from "lucide-react";
import { useContext } from "react";
import styled from "styled-components";
import FormTitle from "../../../../components/FormTitle/formTitle";
import { Column, Grid, Row } from "../../../../components/Layout/layout";
import { VerticalSplitter } from "../../../../components/Splitter/splitter";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { ApplicationContext } from "../../../../core/providers";
import { CalculadoraAutodepura, trechosDe } from "../../../../utils/autoDepuraCalculation";
import { numero } from "../../../../utils/relatorio";
import { campoDoTrecho, errosAutodepura, MAXIMO_TRECHOS } from "../../../../utils/validacao";
import { AjudaE, AjudaK2, AjudaTrechosSeguintes, PainelAjuda } from "./ajudas";

const Orientacao = styled.p`
    margin: 0 0 16px;
    font-size: 14px;
    line-height: 1.5;
    color: #4B5563;
`;

const Cartao = styled.section`
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    background: #FFF;

    @media (max-width: 768px) {
        padding: 12px;
    }
`;

const CabecalhoCartao = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

const TituloCartao = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #374151;
`;

const BotaoRemover = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #B91C1C;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #FEF2F2;
    }

    @media (max-width: 768px) {
        min-height: 44px;
        margin-right: -8px;
    }
`;

const Montante = styled.p`
    margin: 4px 0 0;
    font-size: 14px;
    line-height: 1.5;
    color: #4B5563;
`;

const Subtitulo = styled.p`
    margin: 16px 0 8px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
`;

const BotaoAdicionar = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1px dashed #17737A;
    border-radius: 8px;
    background: #F0F9FA;
    color: #17737A;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: #E0F2F3;
    }

    &:disabled {
        border-color: #D1D5DB;
        background: #F3F4F6;
        color: #9CA3AF;
        cursor: auto;
    }

    @media (max-width: 768px) {
        width: 100%;
        min-height: 44px;
    }
`;

// o id mantém cada campo ligado ao seu trecho quando um trecho do meio é removido
const trechoVazio = () => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    qe: null, ode: null, dboe: null, e: null, distancia: null, velocidade: null, h: null, k220c: null, k2t: null,
});

// vazão, OD e DBO5 no fim do trecho anterior, quando os dados até ele estão completos
function rioAMontante(dados, indice) {
    const anteriores = { ...dados, trechos: trechosDe(dados).slice(0, indice) };
    if (errosAutodepura(anteriores).length) return null;
    const { trechos } = CalculadoraAutodepura(anteriores);
    const anterior = trechos[trechos.length - 1];
    return { km: anterior.inicioKm + anterior.distanciaKm, qr: anterior.qt, od: anterior.odFim, dbo: anterior.dbo5Fim };
}

function CartaoTrecho({ trecho, numeroTrecho, montante, onAlterar, onRemover }) {
    const campo = (chave, label, tooltip, placeholder) => (
        <TextFieldWithTooltip
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

            <Subtitulo>Contribuição no início do trecho (opcional)</Subtitulo>
            <Grid columns={4}>
                {campo('qe', 'Qe', 'Vazão da contribuição: esgoto ou afluente', 'm³/s')}
                {campo('ode', 'ODe', 'Oxigênio dissolvido da contribuição', 'mg/L')}
                {campo('dboe', 'DBOe', 'DBO5 da contribuição', 'mg/L')}
                {campo('e', 'E', 'Eficiência do tratamento na remoção de DBO (opcional)', '%')}
            </Grid>

            <Subtitulo>Percurso</Subtitulo>
            <Grid columns={4}>
                {campo('distancia', 'd', 'Extensão do trecho', 'm')}
                {campo('velocidade', 'v', 'Velocidade do rio no trecho', 'm/s')}
            </Grid>

            <Subtitulo>Reaeração: informe H, K2 (20 °C) ou K2T</Subtitulo>
            <Grid columns={4}>
                {campo('h', 'H', 'Profundidade do rio no trecho, para calcular o K2 com a velocidade', 'm')}
                {campo('k220c', 'K2 (20 °C)', 'Coeficiente de reaeração do trecho a 20 °C', '1/dia')}
                {campo('k2t', 'K2T', 'Coeficiente de reaeração do trecho na temperatura do rio (T)', '1/dia')}
            </Grid>
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
                        profundidade ou K2. O trecho 1 é o descrito nos grupos anteriores; sem trechos seguintes, o cálculo considera só ele.
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
                        <AjudaE />
                        <AjudaK2 />
                    </PainelAjuda>
                </Column>
            </Row>
        </div>
    );
}
