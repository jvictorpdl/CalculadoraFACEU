import { useState } from "react";
import PageTemplate from "../PageTemplate";
import { Container, Title, Card, TitleCard, FormGrid, Item } from "./styles";
import Button from "../../components/Button";

function Home() {
  const [calculated, setCalculated] = useState(false);

  return (
    <PageTemplate>
      <Title>Title</Title>
      <Container>
        <Title>Titulo do card</Title>
        <Card>
          <div>
            <TitleCard>rio</TitleCard>
            <FormGrid>
              <Item>
                text
                <input />
              </Item>
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
            </FormGrid>
          </div>
          <div>
            <TitleCard>rio</TitleCard>
            <FormGrid>
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
              <input />
            </FormGrid>
          </div>
        </Card>
        {calculated && <Card>resultados</Card>}
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
