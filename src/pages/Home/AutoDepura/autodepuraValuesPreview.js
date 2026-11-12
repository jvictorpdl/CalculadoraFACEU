import { useContext } from 'react';
import { GrupoResumo, LinhaResumo, Resumo } from '../../../components/Resumo';
import { ApplicationContext } from '../../../core/providers';
import { CONVERSAO_KT, conversaoKtDe } from '../../../utils/autoDepuraCalculation';
import { gruposAutodepura } from '../../../utils/relatorio';
import { campoDoLancamento, campoDoTrecho } from '../../../utils/validacao';

// o destaque de erro casa pelo mesmo nome de campo usado na validação
const nomeDoCampo = ({ trecho, lancamento }, rotulo) => {
    if (lancamento) return campoDoLancamento(rotulo, lancamento, trecho);
    return trecho ? campoDoTrecho(rotulo, trecho) : rotulo;
};

// os outros lançamentos do trecho 1 ficam no 3º passo de Dados do esgoto
const passoDe = (grupo) => (grupo.lancamento && !grupo.trecho ? 2 : 0);

export default function AutodepuraValuesPreview({ onEditar }) {
    const { state } = useContext(ApplicationContext);

    return (
        <Resumo>
            {gruposAutodepura(state.data.autodepura).map((grupo) => (
                <GrupoResumo key={grupo.titulo} titulo={grupo.titulo} onEditar={() => onEditar(grupo.colecao, passoDe(grupo))}>
                    {grupo.campos.map(({ chave, ...campo }) => (
                        <LinhaResumo key={chave} {...campo} campo={nomeDoCampo(grupo, campo.rotulo)} valor={grupo.dados[chave]} />
                    ))}
                    {grupo.colecao === 'Dados adicionais' &&
                        <LinhaResumo rotulo="KT com" dica="K1 usado para converter a DBO5 em DBO última" valor={CONVERSAO_KT[conversaoKtDe(grupo.dados)]} />}
                </GrupoResumo>
            ))}
        </Resumo>
    );
};
