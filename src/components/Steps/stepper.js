import { StepCircle, StepLine, StepperContainer, StepWrapper } from './style';

export default function Stepper({ totalSteps = 4, currentStep = 0, onTap }) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i);

    return (
        <StepperContainer>
            {steps.map((step, index) => {
                const isActive = step <= currentStep;
                const isFirst = index === 0;
                return (
                    <StepWrapper key={step}>
                        {!isFirst && <StepLine active={isActive} />}
                        <StepCircle
                            type="button"
                            active={isActive}
                            aria-label={`Passo ${step + 1} de ${totalSteps}`}
                            aria-current={step === currentStep ? 'step' : undefined}
                            onClick={() => onTap(step)}
                        >
                            {step + 1}
                        </StepCircle>
                    </StepWrapper>
                );
            })}
        </StepperContainer>
    );
}
