import styled from "styled-components";

export const Container = styled.div`
  color: #171717;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  label {
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: bold;
  }
`;
export const Label = styled.label`
    position: relative;
    display: inline-block;
    
.tooltiptext {
  visibility: hidden;
  width: auto;
  background-color: #1A237A;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: 40%;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: 10%;
  border-width: 5px;
  border-style: solid;
  border-color: #1A237A transparent transparent transparent;
}

:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

`
