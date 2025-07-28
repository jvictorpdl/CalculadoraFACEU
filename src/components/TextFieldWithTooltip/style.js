import * as Tooltip from '@radix-ui/react-tooltip';
import styled from "styled-components";

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 230px;
  min-height: 48px;
  width: 100%;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280; /* Tailwind's text-muted-foreground */
`;

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const TooltipContentStyled = styled(Tooltip.Content)`
  background-color: black;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  max-width: 200px;
`;