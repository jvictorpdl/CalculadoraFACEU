import styled from 'styled-components';

export const Lancamentos = styled.ul`
width: 450px;
height: 400px;
overflow-y: scroll;
display: flex;
align-items: center;
justify-content: start;
flex-direction: column;

li{
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-count: 3;
    padding: 0px;
    gap: 8px;
}

`