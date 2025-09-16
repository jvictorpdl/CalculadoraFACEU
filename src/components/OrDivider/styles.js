import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${({ $gap }) => $gap || "8px"};
  margin: ${({ $margin }) => $margin || "12px 0"};
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ $lineColor, theme }) =>
    $lineColor || theme?.colors?.border || "rgba(0, 0, 0, 0.15)"};
`;

export const Center = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ $textColor, theme }) =>
    $textColor || theme?.colors?.muted || "rgba(0, 0, 0, 0.6)"};
  letter-spacing: 0.02em;
  text-transform: ${({ $uppercase }) => ($uppercase ? "uppercase" : "none")};
`;
