import { Fragment, lazy, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Flex } from '../../../components/Layout/layout';
import Stepper from '../../../components/Steps/stepper';

import { PageSubtitle } from '../../../components/PageTitles/titles';
import { HorizontalSplitter } from '../../../components/Splitter/splitter';
import { CamposComErro } from '../../../components/TextFieldWithTooltip/textFieldWithTooltip';
import { ApplicationContext } from '../../../core/providers';
import { defaultState } from '../../../core/state';
import { CalculadoraAutodepura } from '../../../utils/autoDepuraCalculation';
import { errosAutodepura, errosPassoAutodepura } from '../../../utils/validacao';
import { Grupos, irParaErro, TituloCalculadora } from '../navegacao';
import { ActionButton, BarraAcoes, CancelButton, MensagemErro } from '../styles';
import AutodepuraValuesPreview from './autodepuraValuesPreview';
import { DadoEsgotoStep1, DadoEsgotoStep2 } from './collection/dadoEsgoto';
import { DadosAdicionaisStep1, DadosAdicionaisStep2, DadosAdicionaisStep3, DadosAdicionaisStep4 } from './collection/dadosAdicionais';
import { DadosRioStep1 } from './collection/dadosRio';
import { AutodepuraRecalculate } from './collection/recalculate';
import { TrechosSeguintes } from './collection/trechos';

// o gráfico (ApexCharts) é a maior parte do JavaScript; só é baixado ao abrir o resultado
const AutodepuraChart = lazy(() => import('../../AutoDepuraResult'));


export function AutoDepura() {
    const { state, dispatch } = useContext(ApplicationContext);
    const [step, setStep] = useState(0);
    const [selectedCollection, setSelectedCollection] = useState('Dados do rio');
    const [validStepStates, setValidStepStates] = useState({
        'Dados do rio': [
            false
        ],
        'Dados do esgoto': [
            false,
            false,
        ],
        'Dados adicionais': [
            false,
            false,
            false,
            false
        ],
        'Trechos seguintes': [
            false
        ]
    })

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

    function saveResult(result) {
        dispatch({
            ...state,
            output: {
                ...state.output,
                autodepura: {
                    ...state.output.autodepura,
                    ...result
                }
            }
        });
    }

    // Function to handle the validity change from a child component
    const handleStepValidityChange = (isValid) => {
        var collec = collection[selectedCollection]
        collec[step] = isValid
        setValidStepStates({
            ...validStepStates,
            selectedCollection: collec
        });
    };

    function abrirGrupo(nome) {
        setStep(0);
        setSelectedCollection(nome);
    }

    function limparDados() {
        dispatch({
            ...state,
            data: { ...state.data, autodepura: defaultState.data.autodepura },
            output: { ...state.output, autodepura: defaultState.output.autodepura },
        });
        setErros([]);
        setLimpezas(limpezas + 1);
        abrirGrupo('Dados do rio');
    }

    const collection = {
        'Dados do rio': [
            <DadosRioStep1 onValidityChange={handleStepValidityChange} />
        ],
        'Dados do esgoto': [
            <DadoEsgotoStep1 />,
            <DadoEsgotoStep2 />,
        ],
        'Dados adicionais': [
            <DadosAdicionaisStep1 />,
            <DadosAdicionaisStep2 />,
            <DadosAdicionaisStep3 />,
            <DadosAdicionaisStep4 />,
        ],
        'Trechos seguintes': [
            <TrechosSeguintes />
        ],
        'Resumo': [
            <AutodepuraValuesPreview onEditar={abrirGrupo} />
        ],
        'Gráfico': [],
        'Simular novamente': [
            <AutodepuraRecalculate />
        ]
    }

    // gráfico e nova simulação dependem do cálculo; abrem pelo botão principal
    const disableClicksForCollections = [
        'Gráfico',
        'Simular novamente',
    ]

    const renderStep = (step) => {
        if (selectedCollection === null || selectedCollection.length === 0) return collection[selectedCollection][0];
        if (selectedCollection === 'Gráfico') {
            return <Suspense fallback={<p>Carregando o gráfico…</p>}><AutodepuraChart data={state.data.autodepura} /></Suspense>
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
    const isPrimeiraTela = isFirstStep && isFirstCollection;

    // antes de calcular confere tudo; nos demais passos, só os campos do passo atual
    const errosDaTela = () => ['Resumo', 'Simular novamente'].includes(selectedCollection)
        ? errosAutodepura(state.data.autodepura)
        : errosPassoAutodepura(selectedCollection, step, state.data.autodepura);

    // o destaque some assim que o campo é corrigido; a mensagem fica até a próxima tentativa
    const camposComErro = new Set(erros.length ? errosDaTela().flatMap((erro) => erro.campos) : []);

    const handleBack = () => {
        if (isFirstStep) {
            if (!isFirstCollection) {
                setSelectedCollection(collectionKeys[currentCollectionIndex - 1]);
                setStep(collection[collectionKeys[currentCollectionIndex - 1]]?.length - 1); // Go to last step of previous collection
            }
        } else {
            setStep(step - 1);
        }
    };


    // Handles moving to the next step or collection, or finalizing
    const handleNext = () => {
        const errosEncontrados = errosDaTela();
        if (errosEncontrados.length) {
            flushSync(() => setErros(errosEncontrados));
            irParaErro(topo.current);
            return;
        }

        if (selectedCollection === 'Simular novamente') {
            saveResult(CalculadoraAutodepura(state.data.autodepura));
            setSelectedCollection('Gráfico');
            setStep(0);
        }
        else if (selectedCollection === 'Gráfico') {
            setSelectedCollection('Simular novamente');
            setStep(0);
        }
        else if (isLastStep) {
            if (isLastCollection) {
                saveResult(CalculadoraAutodepura(state.data.autodepura));
                setSelectedCollection(collectionKeys[currentCollectionIndex + 1]);
            } else {
                setSelectedCollection(collectionKeys[currentCollectionIndex + 1]);
                setStep(0);
            }
        } else {
            setStep(step + 1);
        }
    };

    function renderText() {
        if (selectedCollection === 'Gráfico') {
            return 'Simular novamente';
        }
        else if (selectedCollection === 'Resumo' || selectedCollection === 'Simular novamente') {
            return 'Calcular';
        }
        else {
            return 'Próximo';
        }

    }

    return (
        <div ref={topo} style={{ height: 'inherit' }}>
            <TituloCalculadora titulo="AutoDepura" dados={state.data.autodepura} onLimpar={limparDados} />
            <PageSubtitle $soNaPrimeiraTela={!isPrimeiraTela} style={{ marginBottom: '8px' }}>Simula a autodepuração de um rio após o lançamento de esgoto, estimando o oxigênio dissolvido ao longo do percurso pelo modelo de Streeter-Phelps</PageSubtitle>
            <Grupos
                nomes={collectionKeys}
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


                <ActionButton onClick={handleNext}>
                    {renderText()}
                </ActionButton>
            </BarraAcoes>
        </div >
    );
}
