import { useState } from "react";
import { Container, ButtonsSteps, Progress } from "./styles";
import * as calc from "../../utils/calcs";
import PageTemplate from "../PageTemplate";
import Button from "../../components/Button";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import Step8 from "./step8";
import Result from "../Result";

function Home() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    qr: "",
    odr: "",
    dbor: "",
    odmin: "",
    k120c: "",
    tetak1: "",
    temperatura: "",
    k1t: "",
    volume: "",
    tetak2: "",
    h: "", //altitude
    k220c: "",
    k2t: "",
    distancia: "",
    velocidade: "",
    tempo: "",
    cs: "",
    qe: "",
    ode: "",
    dboe: "",
    dboefl: "",
    e: "",
  });
  const [progressWidth, setProgressWidth] = useState(8);
  const resultado = calc.Calculadora(data);

  const prev = () => {
    setProgressWidth(progressWidth - 9);
    setStep(step - 1);
  };

  const next = () => {
    setProgressWidth(progressWidth + 9);
    setStep(step + 1);
  };

  const resetStep = () => {
    setProgressWidth(8);
    setStep(1);
  };

  return (
    <PageTemplate>
      <Container>
        <Progress width={`${progressWidth}%`} />
        {step === 1 && <Step1 data={data} setData={setData} />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 />}
        {step === 7 && <Step7 />}
        {step === 8 && <Step8 />}
        {step === 9 && <Result />}
        {/* }       {step === 10 &&
          <Result />
        }*/}
        <ButtonsSteps>
          {step > 1 && step < 9 && (
            <div onClick={() => prev()}>
              <Button text="Voltar" />
            </div>
          )}
          {step < 8 && (
            <div onClick={() => next()}>
              <Button color="primary" text="Próximo" />
            </div>
          )}
          {step === 8 && (
            <div onClick={() => next()}>
              <Button color="primary" text="Finalizar" />
            </div>
          )}
          {step === 9 && (
            <div onClick={() => resetStep()}>
              <Button text="Calcular novamente" />
            </div>
          )}
        </ButtonsSteps>
      </Container>
    </PageTemplate>
  );
}
export default Home;
