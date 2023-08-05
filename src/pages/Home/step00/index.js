import { Content, CardBoard } from "../styleSteps";
import Title from "../../../components/Title";
import Rio from "../../../assets/Rio.svg";
import Button from "../../../components/Button";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Box from "../../../components/Box";
import { Container, ContainerTwo } from "./styles";

export default function Step0(props) {
  // const [goToRiver, setGoToRiver] = useState(false);

  // if (goToRiver) {
  //   return <Navigate to ="/Step1" />;
  // }

  return (
    <Content>
      <CardBoard>
        <Title title="Inserção de dados:" />
        <Container>

          <Box boxname="Dados do Esgoto" setStep={props.setStep} numberStep={6} />
          <Box boxname="Dados adicionais" setStep={props.setStep} numberStep={2} />

        </Container>

        <img src={Rio} />

          <ContainerTwo>
           <Box boxname="Dados do Rio" setStep={props.setStep} numberStep={1} />
          </ContainerTwo>

        {/* {/* <Button color="primary" text="Inserir dados 2" handle = { ( ) => { props.setStep(2); props.setRestartStep(true) }}/> */}
        {/* <Button color="primary" text="Inserir dados 3" handle = { ( ) => { props.setStep(6); props.setRestartStep(true) }}/>  */}


      </CardBoard>

    </Content>
  );
}
