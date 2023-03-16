import styled from "styled-components";

export const Container = styled.form`
  background-color: green;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* flex-direction: column; */
  column-count: 3;
  /* align-items: flex-start; */
  padding: 0px;
  gap: 8px;

  /* flex-wrap: wrap; */
  /* justify-content: center; */
`;
