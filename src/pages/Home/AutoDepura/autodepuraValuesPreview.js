import { useContext } from 'react';
import { GrupoResumo, LinhaResumo, Resumo } from '../../../components/Resumo';
import { ApplicationContext } from '../../../core/providers';
import { camposAutodepura } from '../../../utils/relatorio';

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
        </Resumo>
    );
};
