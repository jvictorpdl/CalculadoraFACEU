import { useContext, useState } from 'react';
import BotaoDica from '../Dica';
import { CamposComErro } from '../TextFieldWithTooltip/textFieldWithTooltip';
import { BotaoEditar, Cabecalho, Grade, Linha, Lista, TituloGrupo } from './style';

export const Resumo = Grade;

export function GrupoResumo({ titulo, onEditar, children }) {
    return (
        <section>
            <Cabecalho>
                <TituloGrupo>{titulo}</TituloGrupo>
                <BotaoEditar type="button" aria-label={`Editar ${titulo.toLowerCase()}`} onClick={onEditar}>
                    Editar
                </BotaoEditar>
            </Cabecalho>
            <Lista>{children}</Lista>
        </section>
    );
}

// campo opcional em branco não ocupa linha; o restante aparece como "rótulo: valor unidade"
export function LinhaResumo({ rotulo, dica, valor, unidade, opcional = false }) {
    const [dicaAberta, setDicaAberta] = useState(false);
    const comErro = useContext(CamposComErro).has(rotulo);
    const vazio = valor === null || valor === undefined || valor === '';

    if (vazio && opcional && !comErro) return null;

    return (
        <Linha $erro={comErro}>
            <dt>
                {rotulo}
                <BotaoDica rotulo={rotulo} texto={dica} onToque={() => setDicaAberta(!dicaAberta)} />
            </dt>
            <dd>{vazio ? '—' : `${String(valor).replace('.', ',')}${unidade ? ` ${unidade}` : ''}`}</dd>
            {dicaAberta && <dd>{dica}</dd>}
        </Linha>
    );
}
