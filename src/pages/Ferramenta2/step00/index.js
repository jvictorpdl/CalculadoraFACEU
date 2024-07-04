import { Content, CardBoard, CardBoardFerramenta2 } from "../styleSteps";
import Title from "../../../components/Title";
import Rio from "../../../assets/Rio.svg";
import boldArrow from "../../../assets/boldArrow.svg";
import Button from "../../../components/Button";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Box from "../../../components/Box";
import { Container, ContainerTwo, ContainerThree, ContainerFor } from "./styles";

export default function Step0(props) {
  const [represa, setRepresa] = useState(false);
  // const [goToRiver, setGoToRiver] = useState(false);

  // if (goToRiver) {
  //   return <Navigate to ="/Step1" />;
  // }

  return (
    <Content>
      <CardBoardFerramenta2>
        {/* <Title title="Inserção de dados:" /> */}
        <h1>INSERÇÃO DE DADOS</h1>

        <Container>
        {/* <Box
                boxname="Dados do Rio"
                setStep={props.setStep}
                numberStep={1}
                setRepresa={setRepresa}
                represa={represa}
            />
            <Box
                boxname="Dados da Represa"
                setStep={props.setStep}
                numberStep={2}
                setRepresa={setRepresa}
                represa={represa}
            />
            <Box
                boxname="Outro Box Ativo"
                setStep={props.setStep}
                numberStep={3}
                setRepresa={setRepresa}
                represa={represa}
            /> */}
          <ContainerTwo>

          <ContainerFor>
            <Box
              boxname="Dados do Rio"
              setStep={props.setStep}
              numberStep={1}
              represa={false}
              setRepresa={setRepresa}
            />
          </ContainerFor>
          <h3>Ou</h3>
          <ContainerFor>
            <Box
              boxname="Dados da Represa"
              setStep={props.setStep}
              numberStep={4}
              represa={true}
              setRepresa={setRepresa}
              />
          </ContainerFor>
              </ContainerTwo>
<ContainerTwo>

          <ContainerFor>
            <Box boxname="Dados do Esgoto" setStep={props.setStep} numberStep={6} />
          </ContainerFor>

          <ContainerFor>
            <Box boxname="Dados da Mistura" setStep={props.setStep} numberStep={3} />
          </ContainerFor>

          <ContainerFor>
            <Box boxname="Dados Adicionais" setStep={props.setStep} numberStep={2} />
          </ContainerFor>
</ContainerTwo>
<ContainerThree>

</ContainerThree>



        </Container>





      </CardBoardFerramenta2>

    </Content>
  );
}
