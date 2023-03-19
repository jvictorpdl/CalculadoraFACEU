import { useState } from "react";
import PageTemplate from "../PageTemplate";
import { Container, ButtonsSteps, Progress } from "./styles";
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
    h: "",
    formula: "",
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

/* 
Qr (m³/s)     (usuario tem de ter)

ODr (mg/L)    ("tabela")

DBOR (mg/L) (tabela)

k1 (1/d)      k1 = k1(20ºC), θ , T(temperatura ºC)

k2 (1/d)      k2 = 3,73((v^0,5)/H^1,5) // H(m) profundidade do curso d'agua // v(m/s) velocidade do curso d'água
formula O'Connor e Dobbins:   3.73*(v^0.5)*(H^-1,5)  // USADA CASO  0.6m <= H < 4m  && 0.05m/s <= v < 0,8 m/s
formula Churchill et al: 5*(v^0.97)*(H*1.67)    // usada caso 0.6m <= H < 4m && 0.8m/s <= v < 1.5m/s
formula Owens et al: 5.3*(v^0.67)*(H^-1.85)   // usada caso 0.1m <= H <0.6m && 0.05m/s <= v < 1.5 m/s

para corrigir a temperatura k2r = k2(20ºC)*θ^(T-20)


t (d)         t = d/v*86400 // d(m) = distancia de percuso // v(m/s) = velocidade do curso d'agua

Cs (mg/L)      // T(ºC) // Altitude (m)

ODmin(mg/L)    (tabela)

------------------------

Qe (m³/s)     (o usuario tem de ter)

ODe (mg/L)    (tabela)

DBOe (mg/L)   DBOefl = DBOe*(1-(E/100))

--------------------------
                                  Saída

Concentração de oxigênio da mistura: 
Co (mg/L)     Co=(Qr*ODr + Qe*ODe)/(Qr+Qe) 

Déficit de oxigênio:
Do (mg/L)     Do = Cs - Co


Concentração de DBO ultima mistura (Lo){
  
Constante de transformação DBO5->DBO ultima
Kt = DBOm/DBO5

DBO5o(mg/L) = (Qr*DBOr + Qe*DBOe)/(Qr + Qe)

L0 = DBO5o*Kt}
}

Tempo crítico (tc)
tc (d) = (1/(k2-k1))*ln{(k2/k1)*[1-(D0*(K2-k1))/L0*k1]}

Distancia crítica (dc)
dc (km) =  tc * v * 86400   //v(velocidade)

Concentração crítica de oxigênio dissolvido (ODc){

Deficit crítico (Dc)
Dc (mg/L)= (k1/k2)*Lo*e^-(k1*tc)

ODc (mg/L) = Cs-Dc
}





*/
