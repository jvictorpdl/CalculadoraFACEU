import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.columns)}, 1fr);
  gap: 1rem;
`;


export const Flex = styled.div`
  display: flex;
  flex: 1; /* expands to occupy available space */
  width: 100%;
  height: 100%;
  flex-direction: column; /* optional */
`;