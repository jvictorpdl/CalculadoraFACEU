import styled from 'styled-components';

export const Container = styled.div`
display: flex;
/*Define uma largura máxima para o conteúdo*/
max-width: 1120px;

/*Centralziar um elemento dde bloco com largura definida*/
/*margin-left: auto;*/
/*margin-right: auto;*/

/*Adiciona um espaço nas laterais para telas menores*/
/*padding-left: 24px;*/
/*padding-right: 24px;*/
padding: 0 24px;


height: 664px;


flex-direction: column;

justify-content: flex-end;

align-self: stretch;

/*para o padding não afetar a largura total*/
box-sizing: border-box;
`;