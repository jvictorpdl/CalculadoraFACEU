import styled from "styled-components";

export const List = styled.ul`
  justify-content: space-between;
  align-items: center;
  display: flex;
  gap: 8px;
  color: white;
`;

export const ListItem = styled.div`
  height: 58px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  padding: 0px 4px 0px;
  border-radius: 4px;


  &:hover {
    background-color: #318ce7;
    border-radius: 0.3s;
    /* height: auto; */
  }

  a.route {
    color: black;
    text-decoration: wavy;
    font-size: 16px;
    transition: opacity 0.5s ease-in;

   
  }
`;
