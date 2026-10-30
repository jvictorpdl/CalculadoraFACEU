import { useContext, useEffect, useRef, useState } from 'react';
import { Flex, Row } from '../../../components/Layout/layout';
import Stepper from '../../../components/Steps/stepper';

import { PageDescription, PageSubtitle, PageTitle } from '../../../components/PageTitles/titles';
import { RadioButton } from '../../../components/RadioButton/radioButton';
import { HorizontalSplitter } from '../../../components/Splitter/splitter';
import { ApplicationContext } from '../../../core/providers';
import { CalculadoraColicalc } from '../../../utils/coliCalcCalculation';
import { errosColicalc, errosPassoColicalc } from '../../../utils/validacao';
import ColicalcChart from '../../ColiCalcResult';
import { ActionButton, CancelButton, MensagemErro, ToolsButton } from '../styles';
import ColicalcValuesPreview from './colicalcValuesPreview';
import { DadosAdicionaisStep1 } from './collection/dadosAdicionais';
import { DadosEsgotoStep1 } from './collection/dadosEsgoto';
import { DadosMisturaStep1 } from './collection/dadosMistura';
import { DadosRepresaStep1 } from './collection/dadosRepresa';
import { DadosRioStep1 } from './collection/dadosRio';


export function ColiCalc() {
    const { state, dispatch } = useContext(ApplicationContext);
    const [step, setStep] = useState(0);
    const [selectedCollection, setSelectedCollection] = useState('Dados do rio');
    const [radioState, setRadioState] = useState('Dados do rio');
    const [erros, setErros] = useState([]);


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
            <ColicalcValuesPreview isRio={radioState === 'Dados do rio'} />
            // <ColicalcValuesPreview />
        ],
        'Gráfico': [],
    }

    const disableClicksForCollections = [
        'Dados do rio',
        'Dados da represa',
        'Gráfico',
    ]


    const renderStep = (step) => {
        if (selectedCollection === null || selectedCollection.length === 0) return collection[selectedCollection][0];
        if (selectedCollection === 'Gráfico') {
            return <ColicalcChart data={state.data.colicalc} />
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


    // Handles moving to the next step or collection, or finalizing
    const handleNext = () => {
        // antes de calcular confere tudo; nos demais passos, só os campos do passo atual
        const errosEncontrados = selectedCollection === 'Resumo'
            ? errosColicalc(state.data.colicalc)
            : errosPassoColicalc(selectedCollection, state.data.colicalc);
        setErros(errosEncontrados);
        if (errosEncontrados.length) return;

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
            <PageTitle style={{ marginBottom: '8px' }}>ColiCalc</PageTitle>
            <PageSubtitle style={{ marginBottom: '8px' }}>Calculadora de Coliformes</PageSubtitle>
            <Row style={{ marginBottom: '8px' }}>
                <PageDescription>Esse cálculo será feito para um </PageDescription>
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
            </Row>

            <Row>
                {Object.entries(collection).map(([collectionName, steps],) => {
                    return <ToolsButton
                        key={collectionName}
                        selected={selectedCollection === collectionName}
                        disabled={selectedCollection === collectionName || disableClicksForCollections.includes(collectionName)}
                        onClick={() => setSelectedCollection(collectionName)}>
                        {collectionName}
                    </ToolsButton>
                })}

            </Row>
            <HorizontalSplitter />
            {
                collection[selectedCollection]?.length > 1 &&
                <Stepper
                    totalSteps={collection[selectedCollection]?.length}
                    currentStep={step}
                    onTap={(i) => setStep(i)}
                />
            }

            {renderStep(step)}

            <Flex />

            {erros.length > 0 &&
                <MensagemErro role="alert">
                    {erros.map((erro) => <div key={erro}>{erro}</div>)}
                </MensagemErro>
            }

            <Row style={{ justifyContent: 'space-between', paddingTop: '16px' }}>
                {/* na primeira tela não há para onde voltar */}
                {isPrimeiraTela
                    ? <span />
                    : <CancelButton onClick={handleBack}>Voltar</CancelButton>}


                {selectedCollection !== "Gráfico" && <ActionButton onClick={handleNext}>
                    {isLastStep && isLastCollection ? 'Calcular' : 'Próximo'}
                </ActionButton>}
            </Row>
        </div >
    );
}
