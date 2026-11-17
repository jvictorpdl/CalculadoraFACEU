import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  /* campos ocupam o espaço que sobra; a coluna de ajuda (a última) tem largura fixa */
  > ${Column}:first-child {
    flex: 1 1 0;
    min-width: 0;
  }

  > ${Column}:last-child:not(:first-child) {
    flex: 0 0 280px;
  }

  /* em telas estreitas as colunas (campos e ajuda) ficam uma embaixo da outra */
  @media (max-width: 900px) {
    flex-wrap: wrap;

    > ${Column}, > ${Column}:first-child, > ${Column}:last-child:not(:first-child) {
      flex: 1 1 100%;
      min-width: 0;
    }
  }
`;

// cada campo precisa de uns 168 px para mostrar 0,00002434 com a unidade; com espaço, ficam as colunas
// pedidas e, sem ele, as que não cabem descem para a linha de baixo (os 0,1 px evitam perder uma coluna no arredondamento)
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(168px, calc((100% - ${(props) => props.columns - 1}rem) / ${(props) => props.columns} - 0.1px)), 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
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