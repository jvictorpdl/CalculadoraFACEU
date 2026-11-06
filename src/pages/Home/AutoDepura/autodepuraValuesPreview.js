import { useContext } from 'react';
import { GrupoResumo, LinhaResumo, Resumo } from '../../../components/Resumo';
import { ApplicationContext } from '../../../core/providers';
import { trechosDe } from '../../../utils/autoDepuraCalculation';
import { camposAutodepura, camposTrecho } from '../../../utils/relatorio';
import { campoDoTrecho } from '../../../utils/validacao';

export default function AutodepuraValuesPreview({ onEditar }) {
    const { state } = useContext(ApplicationContext);
    const dados = state.data.autodepura;

    return (
        <Resumo>
            {camposAutodepura.map(({ titulo, campos }) => (
                <GrupoResumo key={titulo} titulo={titulo} onEditar={() => onEditar(titulo)}>
                    {campos.map(({ chave, ...campo }) => <LinhaResumo key={chave} {...campo} valor={dados[chave]} />)}
                </GrupoResumo>
            ))}
            {trechosDe(dados).map((trecho, i) => (
                <GrupoResumo key={trecho.id ?? i} titulo={`Trecho ${i + 2}`} onEditar={() => onEditar('Trechos seguintes')}>
                    {camposTrecho.map(({ chave, ...campo }) => (
                        <LinhaResumo key={chave} {...campo} campo={campoDoTrecho(campo.rotulo, i + 2)} valor={trecho[chave]} />
                    ))}
                </GrupoResumo>
            ))}
        </Resumo>
    );
};
