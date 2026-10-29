import * as Tooltip from '@radix-ui/react-tooltip';
import styled from "styled-components";

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 230px;
  min-height: 48px;
  width: 100%;

  @media (max-width: 768px) {
    min-width: 0;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280; /* Tailwind's text-muted-foreground */
`;

export const TooltipTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  min-height: 24px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #17737A;
  }
`;

// A borda fica no contorno para a unidade aparecer dentro do campo, sempre visível
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  opacity: ${props => (props.$disabled ? 0.5 : 1)};

  &:focus-within {
    border-color: #17737A;
    box-shadow: 0 0 0 1px #17737A;
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
`;

export const Unidade = styled.span`
  padding: 0 0.75rem 0 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
`;

export const TooltipContentStyled = styled(Tooltip.Content)`
  background-color: black;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  max-width: 200px;
`;