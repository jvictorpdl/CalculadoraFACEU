import { useState } from "react";
import { Container, ButtonsSteps, ButtonsStepOne, Progress, TitlePage } from "./styles";
import PageTemplate from "../PageTemplate";
import Button from "../../components/Button";
import Step0 from "./step00";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import Step8 from "./step8";
import Step9 from "./step9";
import Result from "../Result";
import Step11 from "./step9";

function Home() {
  const [step, setStep] = useState(0);
  const [restartStep, setRestartStep] = useState(false);
  const [data, setData] = useState({
    qr: "0.651",
    odr: "7",
    dbor: "2",
    odmin: "5",
    k120c: "",
    tetak1: "1.047",
    temperatura: "23",
    k1t: "0.44",
    tetak2: "1.024",
    h: "0.80", //profundidade
    k220c: "3.08",
    k2t: "3.31", //3.31
    distancia: "50000",
    velocidade: "0.35",
    particoes: "5",
    tempo: "1.65",
    cs: "",
    cslinha: "7.8",
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

    ctvet: [],
    lancamentos: [],

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
        <TitlePage>
          <h1>DepUFERSA</h1>
        </TitlePage>
        <Progress width={`${progressWidth}%`} />
        {step === 0 && <Step0 data={data} setStep={setStep} setRestartStep={setRestartStep} />}
        {step === 1 && <Step1 data={data} setData={setData} />}
        {step === 2 && <Step2 data={data} setData={setData} restartStep={resetStep} />}
        {step === 3 && <Step3 data={data} setData={setData} />}
        {step === 4 && <Step4 data={data} setData={setData} />}
        {step === 5 && <Step5 data={data} setData={setData} />}
        {step === 6 && <Step6 data={data} setData={setData} />}
        {step === 7 && <Step7 data={data} setData={setData} />}
        {step === 8 && <Step8 data={data} setData={setData} />}
        {step === 9 && <Result data={data} />}
        {step === 10 && <Step9 data={data} setData={setData} />}


        <ButtonsSteps>
          {/**botoes para voltar ao menu inicial do step 0 */}
          {(step === 2 || step === 6) && (
            <Button text="Voltar" handle={() => { setStep(0); setRestartStep(true) }} />
          )}
          {/**botoes para retornar um step */}
          {(step > 2 && step < 6)&& (
            <div onClick={() => prev()}>
              <Button text="Voltar" />
            </div>
          )}
          {step === 7 && (
            <div onClick={() => prev()}>
              <Button text="Voltar" />
            </div>
          )}
          {/* botões para retornar ao step 0 ao concluir a inserção de dados */}
          {(step === 1 || step === 5 || step === 7) && (

            <Button color="primary" text="Confirmar" handle={() => { setStep(0); setRestartStep(true) }} />

          )}
          {/**botao para voltar após conferir os dados para o menu inicial */}
          {step === 8 && (

            <Button text="Voltar" handle={() => { setStep(0); setRestartStep(true) }} />

          )}
          {/**botoes para avançar um step */}
          {(step < 5 && step > 1) && (
            <div onClick={() => next()}>
              <Button color="primary" text="Próximo" />
            </div>
          )}
          {step === 6 && (
            <div onClick={() => next()}>
              <Button color="primary" text="Próximo" />
            </div>
          )}
          {step === 8 && (
            <div onClick={() => next()}>
              <Button color="primary" text="Calcular" />
            </div>
          )}



          {/*botao para conferir dados do step 0 */}
          {step === 0 && (
            <Button color="primary" text="Finalizar" handle={() => { setStep(8); setRestartStep(true) }} />
          )}

          {/*botoes na aba de resultado */}
          {step === 9 && (
            <Button text="Calcular novamente" handle={() => { setStep(0); setRestartStep(true) }} />
          )}
          {step === 9 && (
            <div onClick={() => next()}>
              <Button color="primary" text="Simular novamente" />
            </div>
          )}

          {/*botao no step 10 (step utilizado caso o usuario queira uma nova simulação) */}
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
