import styled from "styled-components";

export const Select = styled.select`
  width: 100px;
  height: 24px;
  color: #171717;
  border: 1px solid #171717;
  border-radius: 2px;
  :invalid {
    color: red;
  }
`;
