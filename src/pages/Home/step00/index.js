import { Content, CardBoard } from "../styleSteps";
import Rio from "../../../assets/Rio.svg";
import React from "react";
import Box from "../../../components/Box";
import { Container, ContainerTwo } from "./styles";

export default function Step0(props) {
  const handleClick = (boxname, numberStep) => {
    // console.log(boxname);


    props.setStep(numberStep);
  };
  // const [goToRiver, setGoToRiver] = useState(false);

  // if (goToRiver) {
  //   return <Navigate to ="/Step1" />;
  // }

  return (
    <Content>
      <CardBoard>
        {/* <Title title="Inserção de dados:" /> */}
        <Container>
          {/* <ContainerThree> */}

          <Box boxname="Dados do esgoto" setStep={props.setStep} numberStep={6} handleClick={handleClick} />
          {/* <img src={boldArrow} /> */}
          {/* </ContainerThree> */}
          <Box boxname="Dados adicionais" setStep={props.setStep} numberStep={2} handleClick={handleClick} />

        </Container>

        <img src={Rio} alt="imagem meramente ilustrativa de um rio" />

        <ContainerTwo>
          <Box boxname="Dados do rio" setStep={props.setStep} numberStep={1} handleClick={handleClick} />
        </ContainerTwo>

        {/* {/* <Button color="primary" text="Inserir dados 2" handle = { ( ) => { props.setStep(2); props.setRestartStep(true) }}/> */}
        {/* <Button color="primary" text="Inserir dados 3" handle = { ( ) => { props.setStep(6); props.setRestartStep(true) }}/>  */}


      </CardBoard>

    </Content>
  );
}
