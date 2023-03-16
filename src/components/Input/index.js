import styled from "styled-components";

export const Input = styled.input`
  width: 100px;
  height: 24px;
  color: #171717;
  border: 1px solid #171717;
  border-radius: 2px;
  padding: 0 5px;

  &:disabled {
    border: none;
    border-left: 1px solid #171717;
    background: none;
  }

  &::-webkit-input-placeholder {
    text-align: center;

    color: #c3c3c3;
  }
`;
