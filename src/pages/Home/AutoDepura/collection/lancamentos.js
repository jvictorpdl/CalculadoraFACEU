import { Plus, Trash2 } from "lucide-react";
import { Grid } from "../../../../components/Layout/layout";
import TextFieldWithTooltip from "../../../../components/TextFieldWithTooltip/textFieldWithTooltip";
import { campoDoLancamento, MAXIMO_LANCAMENTOS } from "../../../../utils/validacao";
import { BotaoAdicionar, BotaoRemover, CabecalhoCartao, Cartao, novoId, Orientacao, TituloLancamento } from "./cartoes";

const lancamentoVazio = () => ({ id: novoId(), qe: null, ode: null, dboe: null, e: null });

// lançamentos além do primeiro, no mesmo ponto do rio; `trecho` é o número do trecho seguinte (vazio no trecho 1)
export function ListaLancamentos({ lancamentos, trecho, onAlterar }) {
    const nome = (numero) => (trecho ? `lançamento ${numero} do trecho ${trecho}` : `lançamento ${numero}`);

    return (
        <>
            {lancamentos.map((lancamento, i) => {
                const numero = i + 2;
                const campo = (chave, label, tooltip, placeholder) => (
                    <TextFieldWithTooltip
                        value={lancamento[chave]}
                        onBlurValue={(val) => onAlterar(lancamentos.map((outro) => (outro === lancamento ? { ...outro, [chave]: val } : outro)))}
                        label={label}
                        campo={campoDoLancamento(label, numero, trecho)}
                        tooltip={tooltip}
                        placeholder={placeholder}
                    />
                );
                return (
                    <Cartao $interno key={lancamento.id ?? i} aria-label={`Lançamento ${numero}`}>
                        <CabecalhoCartao>
                            <TituloLancamento>Lançamento {numero}</TituloLancamento>
                            <BotaoRemover type="button" aria-label={`Remover ${nome(numero)}`} onClick={() => onAlterar(lancamentos.filter((outro) => outro !== lancamento))}>
                                <Trash2 size={16} aria-hidden="true" />
                                Remover
                            </BotaoRemover>
                        </CabecalhoCartao>
                        <Grid columns={4}>
                            {campo('qe', 'Qe', 'Vazão do lançamento', 'm³/s')}
                            {campo('ode', 'ODe', 'Oxigênio dissolvido do lançamento', 'mg/L')}
                            {campo('dboe', 'DBOe', 'DBO5 do lançamento: bruta (com E, se houver tratamento) ou já a do efluente tratado (sem E)', 'mg/L')}
                            {campo('e', 'E', 'Eficiência do tratamento na remoção de DBO (opcional)', '%')}
                        </Grid>
                    </Cartao>
                );
            })}

            <div>
                <BotaoAdicionar type="button" disabled={lancamentos.length >= MAXIMO_LANCAMENTOS} onClick={() => onAlterar([...lancamentos, lancamentoVazio()])}>
                    <Plus size={16} aria-hidden="true" />
                    Adicionar lançamento {lancamentos.length + 2}{trecho ? ' neste ponto' : ''}
                </BotaoAdicionar>
            </div>
            {lancamentos.length >= MAXIMO_LANCAMENTOS &&
                <Orientacao style={{ marginTop: 8 }}>O limite é de {MAXIMO_LANCAMENTOS} lançamentos além do primeiro.</Orientacao>}
        </>
    );
}
