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

export const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#25a2aa' : '#e4e7ec')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
`;
export const StepLine = styled.div`
  width: 120px;
  height: 3px;
  background-color: ${(props) => (props.active ? '#25a2aa' : '#e4e7ec')};
  margin: 0; /* Negative margin to pull line under the circles */
`;