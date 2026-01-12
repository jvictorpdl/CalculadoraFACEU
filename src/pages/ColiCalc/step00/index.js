import { useEffect, useState } from "react";
import Box from "../../../components/Box";
import { CardBoardColiCalc, Content } from "../styleSteps";
import { Container, ContainerFor, ContainerThree, ContainerTwo } from "./styles";

export default function Step0(props) {
  const [represa, setRepresa] = useState(props.data.represa);

  const handleClick = (boxname, numberStep) => {
    // console.log(boxname);

    if (boxname === 'Dados do Rio') {
      props.setData({ ...props.data, represa: false }); // Altera represa para false se clicar em "Dados do Rio"
      setRepresa(false)
    } else if (boxname === 'Dados da Represa') {
      props.setData({ ...props.data, represa: true });
      setRepresa(true)

      // Altera represa para true se clicar em "Dados da Represa"
    }
    props.setStep(numberStep);
  };
  // const [goToRiver, setGoToRiver] = useState(false);

  // if (goToRiver) {
  //   return <Navigate to ="/Step1" />;
  // }
  useEffect(() => {

  }, [represa])
  return (
    <Content>
      <CardBoardColiCalc>
        {/* <Title title="Inserção de dados:" /> */}
        <h1>INSERÇÃO DE DADOS</h1>

        <Container>
          <ContainerTwo>


            <ContainerFor>
              {/* {props.data.represa + ''} */}

              {/* <button onClick={() => setRepresa(false)}>botao</button> */}
              {/* {represa + ''} */}
              <Box
                boxname="Dados do Rio"
                setStep={props.setStep}
                handleClick={handleClick}
                numberStep={1}
                buttonColor={represa ? 'inative' : 'primary'}
              // setData={props.setData}
              // represa={false}
              // setRepresa={setRepresa}
              // data={props.data}
              />
            </ContainerFor>
            <h3>Ou</h3>
            <ContainerFor>
              {/* {props.data.represa + ''}
              {represa + ''} */}

              <Box
                boxname="Dados da Represa"
                setStep={props.setStep}
                numberStep={4}
                buttonColor={represa ? 'primary' : 'inative'}

                // represa={true}
                // setRepresa={setRepresa}
                handleClick={handleClick}

              />
            </ContainerFor>
          </ContainerTwo>
          <ContainerTwo>

            <ContainerFor>
              <Box boxname="Dados do Esgoto" setStep={props.setStep} numberStep={6} handleClick={handleClick} />
            </ContainerFor>

            <ContainerFor>
              <Box boxname="Dados da Mistura" setStep={props.setStep} numberStep={3} handleClick={handleClick} />
            </ContainerFor>

            <ContainerFor>
              <Box boxname="Dados Adicionais" setStep={props.setStep} numberStep={2} handleClick={handleClick} />
            </ContainerFor>
          </ContainerTwo>
          <ContainerThree>

          </ContainerThree>



        </Container>





      </CardBoardColiCalc>

    </Content>
  );
}
