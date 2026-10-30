import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerChildren = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: auto;
  /* tabela mais larga que o modal rola de lado em vez de ficar cortada */
  overflow-x: auto;
`;

export const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid black;
padding: 5px 0;
min-height: 40px;
gap: 8px;
`;

export const Content = styled.div`
  color: rgba(75, 85, 99, 1);
  padding: 10px;

  `;

export const modaltitle = styled.div`
  
  color: red;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */

  `;

