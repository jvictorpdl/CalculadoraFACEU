import { useContext, useEffect, useState } from 'react';
import { Flex, Row } from '../../../components/Layout/layout';
import Stepper from '../../../components/Steps/stepper';

import { PageDescription, PageSubtitle, PageTitle } from '../../../components/PageTitles/titles';
import { RadioButton } from '../../../components/RadioButton/radioButton';
import { HorizontalSplitter } from '../../../components/Splitter/splitter';
import { ApplicationContext } from '../../../core/providers';
import { CalculadoraAutodepura } from '../../../utils/autoDepuraCalculation';
import { ActionButton, CancelButton, ToolsButton } from '../styles';
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


    useEffect(() => { setStep(0) }, [selectedCollection]);

    useEffect(() => {


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
        ]
    }

    const disableClicksForCollections = [
        'Dados do rio',
        'Dados da represa'
    ]


    const renderStep = (step) => {
        console.log('selectedCollection', selectedCollection)
        if (selectedCollection === null || selectedCollection.length === 0) return collection[selectedCollection][0];
        return collection[selectedCollection][step]
    }



    return (
        <div style={{ height: 'inherit' }}>
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
                    console.log(`Key: ${collectionName}, Value: ${steps}`);
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

            <Row style={{ justifyContent: 'space-between' }}>
                {step === 0 && <CancelButton>Cancelar</CancelButton>}
                {step > 0 && <CancelButton onClick={() => setStep(step - 1)}>Voltar</CancelButton>}

                {step !== collection[selectedCollection]?.length - 1 && <ActionButton onClick={() => setStep(step + 1)}>Próximo</ActionButton>}
                {step === collection[selectedCollection]?.length - 1 && <ActionButton onClick={() => saveResult(CalculadoraAutodepura(state.data.colicalc))}>Finalizar</ActionButton>}
            </Row>
        </div >
    );
}
