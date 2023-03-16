import styled from "styled-components";

export const Content = styled.div`
  width: 80vw;
  height: 500px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: tomato;
  gap: 16px;
  padding: 16px;
  @media (min-width: 400px) {
  }
`;

export const CardInput = styled.section`
  height: 200px;
  max-width: 380px;
  background: #fff;
  border-bottom: 2px solid #171717;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;

  @media (min-width: 400px) {
    //width: 380px;
    /* margin: auto 2.5% auto auto; */
  }
`;
export const CardHelp = styled.section`
  width: 100%;
  height: 200px;
  background: #fff;
  border-bottom: 2px solid #171717;
  box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 400px) {
    width: 380px;

    /* margin: auto auto auto 2.5%; */
  }
`;
