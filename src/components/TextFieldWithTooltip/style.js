import styled from "styled-components";

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  min-height: 48px;
  width: 100%;

  /* no celular rótulo e campo dividem a linha: todos ficam com a mesma largura e sobra espaço para o valor;
     abaixo de 360 px o campo volta para a linha de baixo, senão não cabe número longo com unidade */
  @media (min-width: 360px) and (max-width: 768px) {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    align-items: center;
    column-gap: 8px;

    > p {
      grid-column: 1 / -1;
    }
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280; /* Tailwind's text-muted-foreground */

  @media (max-width: 768px) {
    min-height: 44px;
  }
`;

// A borda fica no contorno para a unidade aparecer dentro do campo, sempre visível
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => (props.$invalido ? '#B91C1C' : '#d1d5db')};
  border-radius: 0.375rem;
  background: #fff;
  opacity: ${props => (props.$disabled ? 0.5 : 1)};

  box-shadow: ${props => (props.$invalido ? '0 0 0 1px #B91C1C' : 'none')};

  &:focus-within {
    border-color: ${props => (props.$invalido ? '#B91C1C' : '#17737A')};
    box-shadow: 0 0 0 1px ${props => (props.$invalido ? '#B91C1C' : '#17737A')};
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 0.375rem;
  background: transparent;
  font-size: 0.875rem;
  outline: none;

  /* abaixo de 16 px o Safari do iPhone dá zoom na página ao focar o campo */
  @media (max-width: 768px) {
    min-height: 44px;
    padding: 0.5rem 0.25rem 0.5rem 0.5rem;
    font-size: 16px;
  }
`;

export const Unidade = styled.span`
  padding: 0 0.75rem 0 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 0.5rem 0 0;
  }
`;