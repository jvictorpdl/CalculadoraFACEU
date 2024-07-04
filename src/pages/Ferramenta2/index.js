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
    qr:0,
    qe: 0,
    temperatura: 0,
    no: 0, // Concentracao de Coliformes na Mistura
    nop: 0, // Concentracao Max permitida de Coliformes no ponto de mistura
    nr: 0, // Concentração de coliformes no Rio a montante do lançamento 
    ne: 0, //Concentração de coliformes no esgoto
    ntempo: 0, // Concentração de coliformes ao longo do tempo ou da distancia
    nep: 0, //Concentração máxima permissivel de coliformes no esgoto
    kb: 0, //Coeficiente de decaimento bacteriano
    kbt: 0, //Coeficiente de decaimento bacteriano a uma temperatura T
    teta: 0, //Coeficiente de temperatura 
    eficiencia: 0, //eficiencia de remoção de coliformes requerida no tratamento
    tempo: 0, //tempo de percurso
    velocidade: 0, //velocidade de percurso
    distancia: 0, //distancia de percurso
    particoes: 0, // Quantidade de partições no qual o calculo sera feito
    classLimit: 0,
    // classLimit1: 200,
    // classLimit2: 1000,
    // classLimit3: 4000,
    represa: false,

    //REPRESA
    tRepresa: 0,
    tDentencao: 0, 
    volume: 0, 
    qAfluente: 0, 
    nRepresa: 0, //n0 represa
    nRepresaMax: 0,



    neperiano: 2.7182818285,


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
          {(step === 1 || step === 0 ||step ===4|| step === 10 || step === 6|| step === 2) && (
            <Button color="tertiary"  />
            )}
            {/**botoes para voltar ao menu inicial do step 0 */}


          {/* botões para retornar ao step 0 ao concluir a inserção de dados */}
          {(step === 1 || step === 2 ||step ===4|| step === 6 || step ===3) && (

            <Button color="primary" text="Confirmar" handle={() => { setStep(0); setRestartStep(true) }} />

          )}
          {/**botao para voltar após conferir os dados para o menu inicial */}
          {step === 8 && (

            <Button text="Voltar" handle={() => { setStep(0); setRestartStep(true) }} />

          )}
          {/**botoes para avançar um step */}
       

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
