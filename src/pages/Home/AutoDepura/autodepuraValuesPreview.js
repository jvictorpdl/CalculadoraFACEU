import { useContext } from 'react';
import { GrupoResumo, LinhaResumo, Resumo } from '../../../components/Resumo';
import { ApplicationContext } from '../../../core/providers';

export default function AutodepuraValuesPreview({ onEditar }) {
    const { state } = useContext(ApplicationContext);
    const dados = state.data.autodepura;

    return (
        <Resumo>
            <GrupoResumo titulo="Dados do rio" onEditar={() => onEditar('Dados do rio')}>
                <LinhaResumo rotulo="Qr" dica="Vazão do rio" valor={dados.qr} unidade="m³/s" />
                <LinhaResumo rotulo="ODr" dica="Oxigênio dissolvido no rio" valor={dados.odr} unidade="mg/L" />
                <LinhaResumo rotulo="DBOr" dica="Demanda bioquímica de oxigênio do rio" valor={dados.dbor} unidade="mg/L" />
                <LinhaResumo rotulo="ODmín" dica="Oxigênio dissolvido mínimo exigido para o rio" valor={dados.odmin} unidade="mg/L" />
            </GrupoResumo>

            <GrupoResumo titulo="Dados do esgoto" onEditar={() => onEditar('Dados do esgoto')}>
                <LinhaResumo rotulo="Qe" dica="Vazão do esgoto" valor={dados.qe} unidade="m³/s" />
                <LinhaResumo rotulo="ODe" dica="Oxigênio dissolvido no esgoto" valor={dados.ode} unidade="mg/L" />
                <LinhaResumo opcional rotulo="E" dica="Eficiência do tratamento de esgoto na remoção de DBO" valor={dados.e} unidade="%" />
                <LinhaResumo opcional rotulo="DBOe" dica="Demanda bioquímica de oxigênio do esgoto" valor={dados.dboe} unidade="mg/L" />
                <LinhaResumo opcional rotulo="DBOefl" dica="DBO do efluente tratado" valor={dados.dboefl} unidade="mg/L" />
            </GrupoResumo>

            <GrupoResumo titulo="Dados adicionais" onEditar={() => onEditar('Dados adicionais')}>
                <LinhaResumo opcional rotulo="K1 (20 °C)" dica="Coeficiente de desoxigenação a 20 °C" valor={dados.k120c} unidade="1/dia" />
                <LinhaResumo opcional rotulo="θ para K1" dica="Coeficiente de temperatura" valor={dados.tetak1} />
                <LinhaResumo opcional rotulo="K1T" dica="Coeficiente de desoxigenação na temperatura do rio (T)" valor={dados.k1t} unidade="1/dia" />
                <LinhaResumo rotulo="T" dica="Temperatura do rio" valor={dados.temperatura} unidade="°C" />
                <LinhaResumo rotulo="v" dica="Velocidade do rio" valor={dados.velocidade} unidade="m/s" />
                <LinhaResumo opcional rotulo="θ para K2" dica="Coeficiente de temperatura" valor={dados.tetak2} />
                <LinhaResumo opcional rotulo="H" dica="Profundidade do rio" valor={dados.h} unidade="m" />
                <LinhaResumo opcional rotulo="K2 (20 °C)" dica="Coeficiente de reaeração a 20 °C" valor={dados.k220c} unidade="1/dia" />
                <LinhaResumo opcional rotulo="K2T" dica="Coeficiente de reaeração na temperatura do rio (T)" valor={dados.k2t} unidade="1/dia" />
                <LinhaResumo rotulo="d" dica="Distância percorrida a partir do lançamento" valor={dados.distancia} unidade="m" />
                <LinhaResumo rotulo="Nº" dica="Número de trechos em que o percurso é dividido no cálculo" valor={dados.particoes} />
                <LinhaResumo opcional rotulo="Altitude" dica="Altitude do local" valor={dados.altitude} unidade="m" />
                <LinhaResumo opcional rotulo="Cs'" dica="Concentração de saturação de oxigênio dissolvido no rio" valor={dados.cslinha} unidade="mg/L" />
            </GrupoResumo>
        </Resumo>
    );
};
