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

export const DuoFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  > * {
    flex: 1 1 calc(50% - 8px); /* 8px = metade do gap */
    box-sizing: border-box;
    min-width: 0; /* evita overflow de conteúdo */
  }

  @media (max-width: 640px) {
    > * { flex-basis: 100%; }
  }
`;


export const Duo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px; /* espaço entre itens */
`;