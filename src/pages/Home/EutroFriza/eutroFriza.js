import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Flex } from '../../../components/Layout/layout';
import { PageSubtitle } from '../../../components/PageTitles/titles';
import { GrupoResumo, LinhaResumo, Resumo } from '../../../components/Resumo';
import { HorizontalSplitter } from '../../../components/Splitter/splitter';
import { CamposComErro } from '../../../components/TextFieldWithTooltip/textFieldWithTooltip';
import { DADOS_EUTROFRIZA, MODELOS_KS, modeloKsDe } from '../../../utils/eutroFrizaCalculation';
import { numero } from '../../../utils/relatorio';
import { camposEutrofriza } from '../../../utils/relatorioEutrofriza';
import { errosEutrofriza, errosPassoEutrofriza } from '../../../utils/validacaoEutrofriza';
import { Grupos, irParaErro, TituloCalculadora } from '../navegacao';
import { ActionButton, BarraAcoes, CancelButton, MensagemErro } from '../styles';
import { DadosAdicionais, DadosBacia, DadosEsgoto, DadosRepresa, useDadosEutrofriza } from './collection/passos';

// o gráfico (ApexCharts) só é baixado ao abrir o resultado
const EutrofrizaResultado = lazy(() => import('../../EutroFrizaResult'));

const PASSOS = {
    'Dados da represa': <DadosRepresa />,
    'Dados da bacia': <DadosBacia />,
    'Dados do esgoto': <DadosEsgoto />,
    'Dados adicionais': <DadosAdicionais />,
    'Resumo': null,
    'Gráfico': null,
};
const GRUPOS = Object.keys(PASSOS);

// coeficientes em branco aparecem com o valor do livro que entra no cálculo
function ValoresPreview({ dados, onEditar }) {
    return (
        <Resumo>
            {camposEutrofriza.map(({ titulo, campos }) => (
                <GrupoResumo key={titulo} titulo={titulo} onEditar={() => onEditar(titulo)}>
                    {campos.map(({ chave, padrao, unidade, ...campo }) => {
                        const vazio = dados[chave] === null || dados[chave] === undefined || dados[chave] === '';
                        return vazio && padrao !== undefined
                            ? <LinhaResumo key={chave} {...campo} valor={`${numero(padrao)} ${unidade} (livro)`} />
                            : <LinhaResumo key={chave} {...campo} unidade={unidade} valor={dados[chave]} />;
                    })}
                    {titulo === 'Dados adicionais' &&
                        <LinhaResumo rotulo="Ks" dica="Modelo do coeficiente de perda de fósforo por sedimentação" valor={MODELOS_KS[modeloKsDe(dados)].nome} />}
                </GrupoResumo>
            ))}
        </Resumo>
    );
}

export function EutroFriza() {
    const [dados, atualizar] = useDadosEutrofriza();
    const [grupo, setGrupo] = useState(GRUPOS[0]);
    const [erros, setErros] = useState([]);
    const [limpezas, setLimpezas] = useState(0);

    useEffect(() => { setErros([]) }, [grupo]);

    // ao trocar de passo, se o topo da calculadora saiu da tela, volta até ele
    const topo = useRef(null);
    useEffect(() => {
        if (topo.current && topo.current.getBoundingClientRect().top < 0) {
            topo.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [grupo]);

    const indice = GRUPOS.indexOf(grupo);
    const ehResumo = grupo === 'Resumo';
    const ehResultado = grupo === 'Gráfico';

    function limparDados() {
        atualizar(DADOS_EUTROFRIZA);
        setErros([]);
        setLimpezas(limpezas + 1);
        setGrupo(GRUPOS[0]);
    }

    // antes de calcular confere tudo; nos demais passos, só os campos do passo atual
    const errosDaTela = () => (ehResumo ? errosEutrofriza(dados) : errosPassoEutrofriza(grupo, dados));

    // o destaque some assim que o campo é corrigido; a mensagem fica até a próxima tentativa
    const camposComErro = new Set(erros.length ? errosDaTela().flatMap((erro) => erro.campos) : []);

    function avancar() {
        const encontrados = errosDaTela();
        if (encontrados.length) {
            flushSync(() => setErros(encontrados));
            irParaErro(topo.current);
            return;
        }
        setGrupo(GRUPOS[indice + 1]);
    }

    const conteudo = ehResultado
        ? <Suspense fallback={<p>Carregando o gráfico…</p>}><EutrofrizaResultado data={dados} /></Suspense>
        : ehResumo
            ? <ValoresPreview dados={dados} onEditar={setGrupo} />
            : PASSOS[grupo];

    return (
        <div ref={topo} style={{ height: 'inherit' }}>
            <TituloCalculadora titulo="EutroFriza" dados={dados} onLimpar={limparDados} />
            <PageSubtitle $soNaPrimeiraTela={indice !== 0} style={{ marginBottom: '8px' }}>
                Estima a concentração de fósforo em uma represa, o grau de trofia e a carga máxima de fósforo admissível para não ultrapassar a concentração desejada
            </PageSubtitle>

            <Grupos nomes={GRUPOS} selecionado={grupo} bloqueados={['Gráfico']} onSelecionar={setGrupo} />
            <HorizontalSplitter />

            {erros.length > 0 &&
                <MensagemErro role="alert">
                    {erros.map((erro) => <div key={erro.mensagem}>{erro.mensagem}</div>)}
                </MensagemErro>
            }

            <CamposComErro.Provider value={camposComErro}>
                {/* cada campo guarda o próprio texto; a key os recria vazios depois da limpeza */}
                <Fragment key={limpezas}>{conteudo}</Fragment>
            </CamposComErro.Provider>

            <Flex />

            <BarraAcoes>
                {indice === 0 ? <span /> : <CancelButton onClick={() => setGrupo(GRUPOS[indice - 1])}>Voltar</CancelButton>}
                {!ehResultado && <ActionButton onClick={avancar}>{ehResumo ? 'Calcular' : 'Próximo'}</ActionButton>}
            </BarraAcoes>
        </div>
    );
}
