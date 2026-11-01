import { useContext } from 'react';
import { GrupoResumo, LinhaResumo, Resumo } from '../../../components/Resumo';
import { ApplicationContext } from '../../../core/providers';
import { camposColicalc } from '../../../utils/relatorio';

export default function ColicalcValuesPreview({ isRio, onEditar }) {
    const { state } = useContext(ApplicationContext);
    const dados = state.data.colicalc;

    return (
        <Resumo>
            {camposColicalc(isRio).map(({ titulo, campos }) => (
                <GrupoResumo key={titulo} titulo={titulo} onEditar={() => onEditar(titulo)}>
                    {campos.map(({ chave, ...campo }) => <LinhaResumo key={chave} {...campo} valor={dados[chave]} />)}
                </GrupoResumo>
            ))}
        </Resumo>
    );
};
