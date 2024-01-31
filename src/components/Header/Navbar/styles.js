import styled from "styled-components";

export const List = styled.ul`
  justify-content: space-between;
  align-items: center;
  display: flex;
  gap: 8px;
  color: white;
`;

export const ListItem = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  padding: 0px 4px 0px;
  border-radius: 4px;

  &:hover {
    background-color: #333;
    border-radius: 0.3s;
  }

  a.route {
    color: white;
    text-decoration: none;
    transition: background-color 0.3s;

   
  }
`;
