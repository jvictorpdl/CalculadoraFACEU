import { useContext } from 'react';
import { GrupoResumo, LinhaResumo, Resumo } from '../../../components/Resumo';
import { ApplicationContext } from '../../../core/providers';

export default function ColicalcValuesPreview({ isRio, onEditar }) {
    const { state } = useContext(ApplicationContext);
    const dados = state.data.colicalc;
    const grupoDoTipo = isRio ? 'Dados do rio' : 'Dados da represa';

    return (
        <Resumo>
            <GrupoResumo titulo={grupoDoTipo} onEditar={() => onEditar(grupoDoTipo)}>
                <LinhaResumo rotulo="Qr" dica="Vazão do rio" valor={dados.qr} unidade="m³/s" />
                <LinhaResumo rotulo="Nr" dica="Concentração de coliformes no rio, a montante do lançamento" valor={dados.nr} unidade={isRio ? 'NMP/100 mL' : 'org/100 mL'} />
                {!isRio && <LinhaResumo rotulo="V" dica="Volume da represa" valor={dados.volume} unidade="m³" />}
            </GrupoResumo>

            <GrupoResumo titulo="Dados do esgoto" onEditar={() => onEditar('Dados do esgoto')}>
                <LinhaResumo rotulo="Qe" dica="Vazão do esgoto" valor={dados.qe} unidade="m³/s" />
                <LinhaResumo rotulo="Ne" dica="Concentração de coliformes no esgoto" valor={dados.ne} unidade="org/100 mL" />
            </GrupoResumo>

            <GrupoResumo titulo="Dados da mistura" onEditar={() => onEditar('Dados da mistura')}>
                <LinhaResumo rotulo="Nop" dica="Concentração máxima permissível de coliformes no ponto de mistura em função da legislação ambiental" valor={dados.nop} unidade="org/100 mL" />
            </GrupoResumo>

            <GrupoResumo titulo="Dados adicionais" onEditar={() => onEditar('Dados adicionais')}>
                <LinhaResumo rotulo="T" dica="Temperatura da água" valor={dados.temperatura} unidade="°C" />
                <LinhaResumo rotulo="Kb" dica="Coeficiente de decaimento bacteriano" valor={dados.kb} unidade="1/dia" />
                <LinhaResumo rotulo="θ para Kb" dica="Coeficiente de temperatura" valor={dados.teta} />
                {isRio && <LinhaResumo rotulo="d" dica="Distância percorrida a partir do lançamento" valor={dados.distancia} unidade="m" />}
                {isRio && <LinhaResumo rotulo="v" dica="Velocidade do rio" valor={dados.velocidade} unidade="m/s" />}
                {isRio && <LinhaResumo rotulo="Nº trechos" dica="Número de trechos em que o percurso é dividido no cálculo" valor={dados.particoes} />}
            </GrupoResumo>
        </Resumo>
    );
};
