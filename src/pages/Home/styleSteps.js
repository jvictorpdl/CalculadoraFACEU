import styled from "styled-components";

export const Content = styled.div`
  width: 80vw;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* background: tomato; */
  gap: 16px;
  padding: 16px;
  @media (min-width: 400px) {
  }
`;

export const CardInput = styled.section`
  /* height: 300px; */
  max-width: 380px;
  background: #fff;
  /* border-top: 2px solid #18259F; */
  border-bottom: 2px solid #18259F;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;

  border-radius: 4px;
background: #FFF;
box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.15);

  @media (min-width: 400px) {
    //width: 380px;
    /* margin: auto 2.5% auto auto; */
  }
`;
export const CardBoard = styled.section`
display: inline-flex;
height: 450px;
width: 800px;
padding: 12px 14.998px 504.473px 11.998px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 9.527px;
flex-shrink: 0;
box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.15);
border-bottom: 2px solid #171717;
border-radius: 4px;
background: #FFF;
padding: 32px;

  


`;
export const CardHelp = styled.section`
  width: 100%;
  height: 200px;
  background: transparent;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  border-top: 2px solid #18259F;
  border-bottom: 2px solid #18259F;
  /* box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.15); */

  @media (min-width: 400px) {
    width: 380px;

    /* margin: auto auto auto 2.5%; */
  }
`;
