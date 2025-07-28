import { useEffect, useState } from 'react';
import { Flex, Row } from '../../../components/Layout/layout';
import Stepper from '../../../components/Steps/stepper';

import { HorizontalSplitter } from '../../../components/Splitter/splitter';
import { ActionButton, CancelButton, ToolsButton } from '../styles';
import { DadoEsgotoStep1, DadoEsgotoStep2 } from './collection/dadoEsgoto';
import { DadosAdicionaisStep1, DadosAdicionaisStep2, DadosAdicionaisStep3, DadosAdicionaisStep4 } from './collection/dadosAdicionais';
import { DadosRioStep1 } from './collection/dadosRio';


export function AutoDepura() {

    const [step, setStep] = useState(0);
    const [selectedCollection, setSelectedCollection] = useState('Dados do rio');

    useEffect(() => { setStep(0) }, [selectedCollection]);

    const collection = {
        'Dados do rio': [
            <DadosRioStep1 />
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
        ]
    }


    const renderStep = (step) => {
        console.log('selectedCollection', selectedCollection)
        if (selectedCollection === null || selectedCollection.length === 0) return collection[selectedCollection][0];
        return collection[selectedCollection][step]
    }



    return (
        <div style={{ height: 'inherit' }}>
            <Row>
                {Object.entries(collection).map(([collectionName, steps],) => {
                    console.log(`Key: ${collectionName}, Value: ${steps}`);
                    return <ToolsButton
                        key={collection}
                        selected={selectedCollection === collectionName}
                        disabled={selectedCollection === collectionName}
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
                {step === collection[selectedCollection]?.length - 1 && <ActionButton>Finalizar</ActionButton>}
            </Row>

        </div >
    );
}
