import styled from "styled-components";

export const Title = styled.h1`
  font-size: 25px;
  text-align: center;
`;

export const Container = styled.section`
  width: 100vw;
  display: flex;
  padding-top: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${Title} {
    font-size: 15px;
  }
`;

export const Card = styled.div`
  width: 60%;
  height: 300px;
  margin-top: 30px;
  border-radius: 8px;
  background: #f8f8f8;
  display: flex;
  -webkit-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.4);
`;

export const TitleCard = styled.h2`
  font-size: 15px;
`;
// ajustar tamanho do input
export const FormGrid = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 15px;
  grid-template-columns: auto auto auto;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
