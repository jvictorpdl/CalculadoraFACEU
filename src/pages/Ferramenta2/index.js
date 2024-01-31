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

function Ferramenta2() {
  const [step, setStep] = useState(0);
  const [restartStep, setRestartStep] = useState(false);
  const [data, setData] = useState({
    qr: "", 
    odr: "",
    dbor: "",
    odmin: "",
    k120c: "",
    tetak1: "",
    temperatura: "",
    k1t: "",
    k220c: "",
    tetak2: "",
    h: "", //profundidade
    k2t: "", //3.31
    distancia: "",
    velocidade: "",
    particoes: "",
    tempo: "",
    cs: "",
    cslinha: "",
    qe: "",
    ode: "",
    dboe: "",
    dboefl: "",
    e: "",
    altitude: "",
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
    // setProgressWidth(progressWidth - 9);
    setStep(step - 1);
  };
  const next = () => {
    // setProgressWidth(progressWidth + 9);
    setStep(step + 1);
  };

  const resetStep = () => {
    // setProgressWidth(8);
    setStep(1);
  };

  return (
    <PageTemplate>
      <Container>
        <TitlePage>
          <h1>Ferramenta 2</h1>
        </TitlePage>
        {/* <Progress width={`${progressWidth}%`} /> */}
        {step === 0 && <Step0 data={data} setStep={setStep} setRestartStep={setRestartStep} />}
        {step === 1 && <Step1 data={data} setData={setData} />}
        {step === 2 && <Step2 data={data} setData={setData} restartStep={resetStep} />}
        {step === 3 && <Step3 data={data} setData={setData} />}
        {step === 4 && <Step4 data={data} setData={setData} />}
        {step === 5 && <Step5 data={data} setData={setData} />}
        {step === 6 && <Step6 data={data} setData={setData} />}
        {step === 7 && <Step7 data={data} setData={setData} />}
        {step === 8 && <Step8 data={data} setData={setData} />}
        {step === 9 &&<Result data={data} />}
        {step === 10 && <Step9 data={data} setData={setData} />}


        <ButtonsSteps>
          {(step === 1 || step === 0 || step === 10) && (
            <Button color="tertiary"  />
            )}
            {/**botoes para voltar ao menu inicial do step 0 */}
          {(step === 2 || step === 6) && (
            <Button text="Voltar" handle={() => { setStep(0); setRestartStep(true) }} />
          )}
          {/**botoes para retornar um step */}
          {(step > 2 && step < 6)&& (
              <Button text="Voltar" handle={() => prev()} />
          )}
          {step === 7 && (
              <Button text="Voltar" handle={() => prev()} />
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
              <Button color="primary" text="Próximo" handle={() => next()}/>
          )}
          {step === 6 && (
              <Button color="primary" text="Próximo" handle={() => next()} /> //lembrar de colocar o handle em todos os botoes
          )}
          {step === 8 && (
              <Button color="primary" text="Calcular" handle={() => next()} />
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
              <Button color="primary" text="Simular novamente" handle={() => next()}/>
          )}

          {/*botao no step 10 (step utilizado caso o usuario queira uma nova simulação) */}
          {step === 10 && (
              <Button color="primary" text="Simular" handle={() => prev()}/>
          )}

        </ButtonsSteps>
      </Container>
    </PageTemplate>
  );
}
export default Ferramenta2;
