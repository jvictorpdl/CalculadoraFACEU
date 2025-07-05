// Arquivo: src/components/Input/index.js

import styled from "styled-components";


export const Input = styled.input`
  /* Dimensões */
  width: 100%; 
  height: 48px; 
  padding: 0 12px;
  
  /* Aparência e Cores (pegue os valores exatos do seu Figma) */
  background-color: #FFFFFF;
  border: 1px solid #D1D1D1; /* Cor para 'Border/color-border-subtle' */
  border-radius: 8px;
  
  /* Texto e Placeholder */
  font-size: 16px;
  color: #555555;             /* Cor para 'Text and icons/color-fg-secondary' */
  box-sizing: border-box; 
  
  &::placeholder {
    color: #AFAFAF;         /* Cor para 'Text and icons/color-fg-placeholder' */
  }

  /* Efeitos de Interação */
  &:focus {
    outline: none;
    border-color: #007BFF;     /* Azul para indicar foco, ou a cor do seu design system */
    box-shadow: 0 0 0 1px #007BFF;
  }

  &:disabled {
    background-color: #F5F5F5;
    cursor: not-allowed;
  }
`;