// Arquivo: src/components/ItemForm/styles.js

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Garante que o Label e o Input ocupem a largura total */
  width: 100%;
  padding: 8px;
  box-sizing: border-box; /* Garante que o padding não afete a largura total */
`;

export const Label = styled.label`
  position: relative;
  display: inline-block;
  margin-bottom: 8px;   /* Espaçamento entre o label e o input */
  font-weight: bold;
  font-size: 16px;
  color: #171717;
  
  /* Seu código de tooltip continua aqui, está perfeito */
  .tooltiptext {
    visibility: hidden;
    min-width: 200px;
    transform: translateX(-50%);
    background-color: #1A237A;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    z-index: 1;
    position: absolute;
    bottom: 125%;
    left: 50%;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltiptext::after {
    content: "";
    position: absolute;
    transform: translateX(-50%);
    top: 100%;
    left: 50%;
    border-width: 5px;
    border-style: solid;
    border-color: #1A237A transparent transparent transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;