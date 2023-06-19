import { useState } from "react";
import { Container, ButtonsSteps, Progress } from "./styles";
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
import Step10 from "./step10";
import Result from "../Result";

function Home() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    qr: "0.651",
    odr: "7",
    dbor: "2",
    odmin: "5",
    k120c: "0.38",
    tetak1: "1.047",
    temperatura: "23",
    k1t: "0.44",
    volume: "0.35",
    tetak2: "1.024",
    h: "1000", //altitude
    k220c: "3.08",
    k2t: "", //3.31
    distancia: "50000",
    velocidade: "0.35",
    particoes: "5",
    tempo: "1.65",
    cs: "7.8",
    cslinha: "",
    qe: "0.114",
    ode: "0",
    dboe: "341",
    dboefl: "",
    e: "",
    //saída
    co: "",
    do: "",
    dbo5: "",
    kt: "",
    tc: "",
    distanciac: "",
    deficitc: "",
    odc: "",
    ct: "",

    ctvet: []
    
  });
  // ctvet[]: React.useState([]),
  // useState: ({ctvet[]}),
  const [progressWidth, setProgressWidth] = useState(8);
  

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
        {step === 2 && <Step2 data={data} setData={setData} />}
        {step === 3 && <Step3 data={data} setData={setData} />}
        {step === 4 && <Step4 data={data} setData={setData} />}
        {step === 5 && <Step5 data={data} setData={setData} />}
        {step === 6 && <Step6 data={data} setData={setData} />}
        {step === 7 && <Step7 data={data} setData={setData} />}
        {step === 8 && <Step8 data={data} setData={setData} />}
        {step === 9 && <Result data={data} />}
        {step === 10 && <Step10 data={data} setData={setData} />}
        
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
          {step === 9 && (
            <div onClick={() => next()}>
              <Button color="primary" text="Simular novamente" />
            </div>
          )}
          {step === 10 && (
            <div onClick={() => prev()}>
              <Button color="primary" text="Simular" />
            </div>
          )}
        </ButtonsSteps>
      </Container>
    </PageTemplate>
  );
}
export default Home;
