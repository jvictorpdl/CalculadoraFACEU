import styled from "styled-components";

/** Seção de ajuda minimalista: sem bordas, sem raio, sem height fixa */
export const CardHelp = styled.section`
  width: 100%;
  background: transparent;
  color:  #111827;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 1vw, 12px);




  /* Em telas maiores, pode ficar “grudado” à rolagem como um aside,
     mas sem parecer um bloco fechado */
  @media (min-width: 1024px) {
    position: sticky;
    top: 12px;
    align-self: start;
  }
`;

/* Título enxuto */
export const HelpTitle = styled.h3`
  font-size: clamp(14px, 1.6vw, 16px);
  font-weight: 600;
  letter-spacing: 0.1px;
  margin: 0;
`;

/* Texto/descrição discreta */
export const HelpText = styled.p`
  font-size: clamp(12px, 1.4vw, 14px);
  line-height: 1.5;
  color: rgba(17, 24, 39, 0.75);
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: rgba(229, 231, 235, 0.75);
  }
`;

/* Link/ação minimalista com sublinhado animado (sem “botão”) */
export const HelpLink = styled.button`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  align-self: start;

  color: var(--accent, #18259F);
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 500;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: -2px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 180ms ease;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }
`;
