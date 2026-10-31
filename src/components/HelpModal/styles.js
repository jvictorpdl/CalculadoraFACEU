import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: left;
  align-items: center;
`;

export const HelpButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  min-height: 24px;
  text-align: left;
  // text-decoration: underline;
  color: #17737A;
  padding: 0;
  font-weight: 600;
  border: 0;
  background-color: transparent;

  @media (max-width: 768px) {
    min-height: 44px;
  }
`;

