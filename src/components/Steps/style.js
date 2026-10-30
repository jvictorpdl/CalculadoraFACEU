import styled from 'styled-components';

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StepCircle = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#17737A' : '#e4e7ec')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #17737A;
    outline-offset: 2px;
  }
`;
export const StepLine = styled.div`
  width: 120px;
  height: 3px;
  background-color: ${(props) => (props.active ? '#17737A' : '#e4e7ec')};
  margin: 0; /* Negative margin to pull line under the circles */

  /* no celular quatro passos com linhas de 120px não cabem na tela */
  @media (max-width: 768px) {
    width: 40px;
  }
`;
