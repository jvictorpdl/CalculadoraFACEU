import * as Tooltip from '@radix-ui/react-tooltip';
import styled from "styled-components";

export const BotaoInfo = styled.button`
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

  /* no toque a área cresce sem aumentar a linha do rótulo */
  @media (max-width: 768px) {
    min-width: 40px;
    min-height: 40px;
    margin: -4px -8px;
  }
`;

export const TooltipContentStyled = styled(Tooltip.Content)`
  background-color: black;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  max-width: 200px;
`;

export const TextoDica = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #4B5563;
`;
