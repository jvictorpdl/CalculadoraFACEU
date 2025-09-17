import { useContext, useEffect, useState } from 'react';
import { Flex, Row } from '../../../components/Layout/layout';
import Stepper from '../../../components/Steps/stepper';

import { PageSubtitle, PageTitle } from '../../../components/PageTitles/titles';
import { HorizontalSplitter } from '../../../components/Splitter/splitter';
import { ApplicationContext } from '../../../core/providers';
import { CalculadoraAutodepura } from '../../../utils/autoDepuraCalculation';
import AutodepuraChart from '../../AutoDepuraResult';
import { ActionButton, CancelButton, ToolsButton } from '../styles';
import AutodepuraValuesPreview from './autodepuraValuesPreview';
import { DadoEsgotoStep1, DadoEsgotoStep2 } from './collection/dadoEsgoto';
import { DadosAdicionaisStep1, DadosAdicionaisStep2, DadosAdicionaisStep3, DadosAdicionaisStep4 } from './collection/dadosAdicionais';
import { DadosRioStep1 } from './collection/dadosRio';
import { AutodepuraRecalculate } from './collection/recalculate';


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
        ]
    })

    useEffect(() => { setStep(0) }, [selectedCollection]);

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
        console.log('handleee')
        var collec = collection[selectedCollection]
        collec[step] = isValid
        setValidStepStates({
            ...validStepStates,
            selectedCollection: collec
        });
    };

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
        'Resumo': [
            <AutodepuraValuesPreview />
        ],
        'Gráfico': [],
        'Simular novamente': [
            <AutodepuraRecalculate />
        ]
    }

    const disableClicksForCollections = [
        'Dados do rio',
        'Dados da represa',
        'Gráfico',
        'Simular novamente',
    ]

    const renderStep = (step) => {
        console.log('selectedCollection', selectedCollection)
        if (selectedCollection === null || selectedCollection.length === 0) return collection[selectedCollection][0];
        if (selectedCollection === 'Gráfico') {
            return <AutodepuraChart data={state.data.autodepura} />
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
        if (isFirstStep) {
            if (!isFirstCollection) {
                setSelectedCollection(collectionKeys[currentCollectionIndex - 1]);
                setStep(collection[collectionKeys[currentCollectionIndex - 1]]?.length - 1); // Go to last step of previous collection
            }
        } else {
            console.log(collection[collectionKeys[currentCollectionIndex - 1]]?.length - 1)
            setStep(collection[collectionKeys[currentCollectionIndex - 1]]?.length - 1); // Go to last step of previous collection
        }
    };


    // Handles moving to the next step or collection, or finalizing
    const handleNext = () => {
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
        console.log('selectedCollection', selectedCollection)
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
        <div style={{ height: 'inherit' }}>
            <PageTitle style={{ marginBottom: '8px' }}>AutoDepura</PageTitle>
            <PageSubtitle style={{ marginBottom: '8px' }}>Aqui entra a descrição do que o autodepura faz</PageSubtitle>
            <Row>
                {Object.entries(collection).map(([collectionName, steps],) => {
                    return <ToolsButton
                        key={collection}
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

            <Row style={{ justifyContent: 'space-between', paddingTop: '16px' }}>
                <CancelButton onClick={handleBack}>
                    {isFirstStep && isFirstCollection ? 'Cancelar' : 'Voltar'}
                </CancelButton>


                <ActionButton onClick={handleNext}>
                    {renderText()}
                </ActionButton>
            </Row>
        </div >
    );
}
