import { Content, CardBoard } from "../styleSteps";
import Title from "../../../components/Title";
import Rio from "../../../assets/Rio.svg";
import Button from "../../../components/Button";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";


export default function Step0(props) {
  const [goToRiver, setGoToRiver] = useState(false);

  if (goToRiver) {
    return <Navigate to ="/Step1" />;
  }

  return (
    <Content>
      <CardBoard>
        <Title title="Inserção de dados:" />
        <Button color="primary" text="Inserir dados 1" handle = { ( ) => { props.setStep(1); props.setRestartStep(true) }}/>

        <img src={Rio} />
       
        <Button color="primary" text="Inserir dados 2" handle = { ( ) => { props.setStep(2); props.setRestartStep(true) }}/>
        <Button color="primary" text="Inserir dados 3" handle = { ( ) => { props.setStep(6); props.setRestartStep(true) }}/>


      </CardBoard>
       
    </Content>
  );
}
