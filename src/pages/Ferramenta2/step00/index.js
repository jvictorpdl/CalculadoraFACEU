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
  // const [goToRiver, setGoToRiver] = useState(false);

  // if (goToRiver) {
  //   return <Navigate to ="/Step1" />;
  // }

  return (
    <Content>
      <CardBoardFerramenta2>
        {/* <Title title="Inserção de dados:" /> */}
        <Container>

          <ContainerFor>
          <Box boxname="Dados do Rio" setStep={props.setStep} numberStep={1} />
          </ContainerFor>

          <ContainerFor>
          <Box boxname="Dados do Esgoto" setStep={props.setStep} numberStep={6} />
          </ContainerFor>

          <ContainerFor>
          <Box boxname="Dados adicionais" setStep={props.setStep} numberStep={2} />
          </ContainerFor>

        </Container>





      </CardBoardFerramenta2>

    </Content>
  );
}
