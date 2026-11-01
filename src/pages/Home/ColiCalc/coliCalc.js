import { Fragment, lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Flex } from '../../../components/Layout/layout';
import Stepper from '../../../components/Steps/stepper';

import { PageSubtitle } from '../../../components/PageTitles/titles';
import { RadioButton, RadioGroup } from '../../../components/RadioButton/radioButton';
import { HorizontalSplitter } from '../../../components/Splitter/splitter';
import { CamposComErro } from '../../../components/TextFieldWithTooltip/textFieldWithTooltip';
import { ApplicationContext } from '../../../core/providers';
import { defaultState } from '../../../core/state';
import { CalculadoraColicalc } from '../../../utils/coliCalcCalculation';
import { errosColicalc, errosPassoColicalc } from '../../../utils/validacao';
import { Grupos, irParaErro, TituloCalculadora } from '../navegacao';
import { ActionButton, BarraAcoes, CancelButton, MensagemErro } from '../styles';
import ColicalcValuesPreview from './colicalcValuesPreview';
import { DadosAdicionaisStep1 } from './collection/dadosAdicionais';
import { DadosEsgotoStep1 } from './collection/dadosEsgoto';
import { DadosMisturaStep1 } from './collection/dadosMistura';
import { DadosRepresaStep1 } from './collection/dadosRepresa';
import { DadosRioStep1 } from './collection/dadosRio';

// o gráfico (ApexCharts) é a maior parte do JavaScript; só é baixado ao abrir o resultado
const ColicalcChart = lazy(() => import('../../ColiCalcResult'));


export function ColiCalc() {
    const { state, dispatch } = useContext(ApplicationContext);
    const [step, setStep] = useState(0);
    // volta no tipo que estava em uso, ao recarregar a página ou trocar de calculadora
    const tipoInicial = state.data.colicalc.represa ? 'Dados da represa' : 'Dados do rio';
    const [selectedCollection, setSelectedCollection] = useState(tipoInicial);
    const [radioState, setRadioState] = useState(tipoInicial);
    const [erros, setErros] = useState([]);
    const [limpezas, setLimpezas] = useState(0);


    useEffect(() => { setStep(0) }, [selectedCollection]);
    useEffect(() => { setErros([]) }, [selectedCollection, step]);

    // ao trocar de passo, se o topo da calculadora saiu da tela, volta até ele
    const topo = useRef(null);
    useEffect(() => {
        if (topo.current && topo.current.getBoundingClientRect().top < 0) {
            topo.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [selectedCollection, step]);
    useEffect(() => {
        if (radioState === 'Dados do rio' && state.data.colicalc.v !== null) {
            state.data.colicalc.v = null
        }
        updateStateWithColiCalcData({represa: radioState === 'Dados da represa' });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [radioState]);

    function saveResult(result) {
        
        dispatch({
            ...state,
            output: {
                ...state.output,
                colicalc: {
                    ...state.output.colicalc,
                    ...result
                }
            }
        });
    }
    
    function updateStateWithColiCalcData(inputs) {
        dispatch({
            ...state,
            data: {
                ...state.data,
                colicalc: {
                    ...state.data.colicalc,
                    ...inputs
                },
            }
        })
    }

    function abrirGrupo(nome) {
        setStep(0);
        setSelectedCollection(nome);
    }

    function limparDados() {
        dispatch({
            ...state,
            data: { ...state.data, colicalc: { ...defaultState.data.colicalc, represa: radioState === 'Dados da represa' } },
            output: { ...state.output, colicalc: defaultState.output.colicalc },
        });
        setErros([]);
        setLimpezas(limpezas + 1);
        abrirGrupo(radioState);
    }

    const collection = {
        'Dados do rio': [
            <DadosRioStep1 />
        ],
        'Dados da represa': [
            <DadosRepresaStep1 />
        ],
        'Dados do esgoto': [
            <DadosEsgotoStep1 />
        ],
        'Dados da mistura': [
            <DadosMisturaStep1 />
        ],
        'Dados adicionais': [
            <DadosAdicionaisStep1 />
        ],
        'Resumo': [
            <ColicalcValuesPreview isRio={radioState === 'Dados do rio'} onEditar={abrirGrupo} />
        ],
        'Gráfico': [],
    }

    // o gráfico abre ao calcular; e o cálculo é para rio OU represa, então o grupo do outro tipo nem aparece
    const disableClicksForCollections = ['Gráfico']
    const grupoNaoUsado = radioState === 'Dados do rio' ? 'Dados da represa' : 'Dados do rio';


    const renderStep = (step) => {
        if (selectedCollection === null || selectedCollection.length === 0) return collection[selectedCollection][0];
        if (selectedCollection === 'Gráfico') {
            return <Suspense fallback={<p>Carregando o gráfico…</p>}><ColicalcChart data={state.data.colicalc} /></Suspense>
        }
        return collection[selectedCollection][step]
    }

    var collectionKeys = Object.keys(collection)
    // remove grafico
    // collectionKeys.pop()
    const currentCollectionIndex = collectionKeys.indexOf(selectedCollection);
    const isFirstCollection = currentCollectionIndex === 0;
    const isLastCollection = currentCollectionIndex === collectionKeys.length - 2;
    const isFirstStep = step === 0;
    const isLastStep = step === collection[selectedCollection]?.length - 1;

    const handleBack = () => {
        if (radioState === 'Dados do rio' && collectionKeys[currentCollectionIndex - 1] === 'Dados da represa') {
            setSelectedCollection('Dados do rio');
        } else if (radioState === 'Dados da represa' && collectionKeys[currentCollectionIndex - 1] === 'Dados do rio') {
            setSelectedCollection('Dados da represa');
        } else if (isFirstStep) {
            if (!isFirstCollection) {
                setSelectedCollection(collectionKeys[currentCollectionIndex - 1]);
                setStep(collection[collectionKeys[currentCollectionIndex - 1]]?.length - 1);
            }
        } else {
            setStep(step - 1);
        }
    };

    // a primeira tela é "Dados do rio" ou, no caso de represa, "Dados da represa"
    const isPrimeiraTela = isFirstStep &&
        (isFirstCollection || (radioState === 'Dados da represa' && selectedCollection === 'Dados da represa'));

    // antes de calcular confere tudo; nos demais passos, só os campos do passo atual
    const errosDaTela = () => selectedCollection === 'Resumo'
        ? errosColicalc(state.data.colicalc)
        : errosPassoColicalc(selectedCollection, state.data.colicalc);

    // o destaque some assim que o campo é corrigido; a mensagem fica até a próxima tentativa
    const camposComErro = new Set(erros.length ? errosDaTela().flatMap((erro) => erro.campos) : []);

    // Handles moving to the next step or collection, or finalizing
    const handleNext = () => {
        const errosEncontrados = errosDaTela();
        if (errosEncontrados.length) {
            flushSync(() => setErros(errosEncontrados));
            irParaErro(topo.current);
            return;
        }

        if (selectedCollection === 'Dados do rio' && radioState === 'Dados do rio') {
            // skip "represa"
            setSelectedCollection(collectionKeys[currentCollectionIndex + 2]);
        } else if (selectedCollection === 'Dados da represa' && radioState === 'Dados da represa') {
            // skip "rio"
            setSelectedCollection(collectionKeys[currentCollectionIndex + 1]);
        } else if (isLastStep) {
            if (isLastCollection) {
                setSelectedCollection(collectionKeys[currentCollectionIndex + 1]);
                saveResult(CalculadoraColicalc(state.data.colicalc));
            } else {
                setSelectedCollection(collectionKeys[currentCollectionIndex + 1]);
                setStep(0);
            }
        } else {
            setStep(step + 1);
        }
    };


    return (
        <div ref={topo} style={{ height: 'inherit' }}>
            <TituloCalculadora titulo="ColiCalc" dados={state.data.colicalc} onLimpar={limparDados} />
            <PageSubtitle $soNaPrimeiraTela={!isPrimeiraTela} style={{ marginBottom: '8px' }}>Calcula a concentração de coliformes após o lançamento de esgoto em um rio ou represa e a eficiência de tratamento necessária para atender ao padrão da legislação</PageSubtitle>
            <RadioGroup legenda="Esse cálculo será feito para um">
                <RadioButton
                    name="colecao"
                    value="dadosDoRio"
                    label="Rio"
                    checked={radioState === 'Dados do rio'}
                    onChange={() => {
                        setRadioState('Dados do rio');
                        setSelectedCollection('Dados do rio');
                    }}
                />

                <RadioButton
                    name="colecao"
                    value="dadosDoEsgoto"
                    label="Represa"
                    checked={radioState === 'Dados da represa'}
                    onChange={() => {
                        setRadioState('Dados da represa');
                        setSelectedCollection('Dados da represa');
                    }}
                />
            </RadioGroup>

            <Grupos
                nomes={collectionKeys.filter((nome) => nome !== grupoNaoUsado)}
                selecionado={selectedCollection}
                bloqueados={disableClicksForCollections}
                onSelecionar={abrirGrupo}
            />
            <HorizontalSplitter />
            {
                collection[selectedCollection]?.length > 1 &&
                <Stepper
                    totalSteps={collection[selectedCollection]?.length}
                    currentStep={step}
                    onTap={(i) => setStep(i)}
                />
            }

            {erros.length > 0 &&
                <MensagemErro role="alert">
                    {erros.map((erro) => <div key={erro.mensagem}>{erro.mensagem}</div>)}
                </MensagemErro>
            }

            <CamposComErro.Provider value={camposComErro}>
                {/* cada campo guarda o próprio texto; a key os recria vazios depois da limpeza */}
                <Fragment key={limpezas}>{renderStep(step)}</Fragment>
            </CamposComErro.Provider>

            <Flex />

            <BarraAcoes>
                {/* na primeira tela não há para onde voltar */}
                {isPrimeiraTela
                    ? <span />
                    : <CancelButton onClick={handleBack}>Voltar</CancelButton>}


                {selectedCollection !== "Gráfico" && <ActionButton onClick={handleNext}>
                    {isLastStep && isLastCollection ? 'Calcular' : 'Próximo'}
                </ActionButton>}
            </BarraAcoes>
        </div >
    );
}
