import styled from "styled-components";

// uma coluna no celular; em telas largas os grupos ficam lado a lado
export const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px 32px;
  align-items: start;
`;

export const Cabecalho = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid #D1D5DB;
`;

export const TituloGrupo = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #374151;
`;

export const BotaoEditar = styled.button`
  min-height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #17737A;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 768px) {
    min-width: 44px;
    min-height: 44px;
    text-align: right;
  }
`;

export const Lista = styled.dl`
  margin: 0;
`;

export const Linha = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 8px;
  min-height: 40px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  line-height: 20px;

  dt {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 600;
    color: ${(props) => (props.$erro ? '#B91C1C' : '#374151')};
  }

  dd {
    margin: 0;
    text-align: right;
    color: #374151;
  }

  /* texto da dica aberta com toque */
  dd + dd {
    grid-column: 1 / -1;
    padding-bottom: 8px;
    text-align: left;
    color: #4B5563;
  }
`;
