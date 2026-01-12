import { useState } from "react";
import Button from "../../components/Button";
import Result2 from "../ColiCalcResult";
import PageTemplate from "../PageTemplate";
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
import { ButtonsSteps, Container, TitlePage } from "./styles";

function ColiCalc() {
  const [step, setStep] = useState(0);
  const [, setRestartStep] = useState(false);
  const [data, setData] = useState({

    qr: "",
    qe: "",
    temperatura: "",
    no: "", // Concentracao de Coliformes na Mistura
    nop: "", // Concentracao Max permitida de Coliformes no ponto de mistura
    nr: "", // Concentração de coliformes no Rio a montante do lançamento 
    ne: "", //Concentração de coliformes no esgoto
    ntempo: "", // Concentração de coliformes ao longo do tempo ou da distancia
    nep: "", //Concentração máxima permissivel de coliformes no esgoto
    kb: "", //Coeficiente de decaimento bacteriano
    kbt: "", //Coeficiente de decaimento bacteriano a uma temperatura T
    teta: "", //Coeficiente de temperatura 
    eficiencia: "", //eficiencia de remoção de coliformes requerida no tratamento
    tempo: "", //tempo de percurso
    velocidade: "", //velocidade de percurso
    distancia: "", //distancia de percurso
    particoes: "", // Quantidade de partições no qual o calculo sera feito
    classLimit: "",
    represa: false,

    //REPRESA
    tRepresa: "",
    tDentencao: "",
    volume: "",
    qAfluente: "",
    nRepresa: "", //n0 represa
    nRepresaMax: "",



    neperiano: 2.7182818285


  });
  // ctvet[]: React.useState([]),
  // useState: ({ctvet[]}),


  const prev = () => {
    // setProgressWidth(progressWidth - 9);
    setStep(step - 1);
  };
  // const next = () => {
  //   // setProgressWidth(progressWidth + 9);
  //   setStep(step + 1);
  // };

  const resetStep = () => {
    // setProgressWidth(8);
    setStep(1);
  };

  return (
    <PageTemplate>
      <Container>
        <TitlePage>
          <h1>Calimpe-H20</h1>
        </TitlePage>
        {/* <Progress width={`${progressWidth}%`} /> */}
        {step === 0 && <Step0 data={data} setStep={setStep} setRestartStep={setRestartStep} setData={setData} />}
        {step === 1 && <Step1 data={data} setData={setData} />}
        {step === 2 && <Step2 data={data} setData={setData} restartStep={resetStep} />}
        {step === 3 && <Step3 data={data} setData={setData} />}
        {step === 4 && <Step4 data={data} setData={setData} />}
        {step === 5 && <Step5 data={data} setData={setData} />}
        {step === 6 && <Step6 data={data} setData={setData} />}
        {step === 7 && <Step7 data={data} setData={setData} />}
        {step === 8 && <Step8 data={data} setData={setData} />}
        {step === 9 && <Result2 data={data} />}
        {step === 10 && <Step9 data={data} setData={setData} />}


        <ButtonsSteps>
          {(step === 1 || step === 0 || step === 4 || step === 10 || step === 6 || step === 2 || step === 9) && (
            <Button color="tertiary" />
          )}
          {/**botoes para voltar ao menu inicial do step 0 */}


          {/* botões para retornar ao step 0 ao concluir a inserção de dados */}
          {(step === 1 || step === 2 || step === 4 || step === 6 || step === 3) && (

            <Button color="primary" text="Confirmar" handle={() => { setStep(0); setRestartStep(true) }} />

          )}
          {/**botao para voltar após conferir os dados para o menu inicial */}
          {step === 8 && (

            <Button text="Voltar" handle={() => { setStep(0); setRestartStep(true) }} />

          )}

          {/*botao para conferir dados do step 0 */}
          {step === 0 && (
            <Button color="primary" text="Finalizar" handle={() => { setStep(8); setRestartStep(true) }} />
          )}
          {/* botao para calcular */}
          {step === 8 && (
            <Button color="primary" text="Calcular" handle={() => { setStep(9); setRestartStep(true) }} />
          )}




          {/*botoes na aba de resultado */}
          {step === 9 && (
            <Button color="primary" text="Calcular novamente" handle={() => { setStep(0); setRestartStep(true) }} />
          )}
          {/* {step === 9 && (
            <Button color="primary" text="Simular novamente" handle={() => next()} />
          )} */}

          {/*botao no step 10 (step utilizado caso o usuario queira uma nova simulação) */}
          {step === 10 && (
            <Button color="primary" text="Simular" handle={() => prev()} />
          )}

        </ButtonsSteps>
      </Container>
    </PageTemplate>
  );
}
export default ColiCalc;
