import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #F1F8FF;
    box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.08);
`

export const Holder = styled.div`
    width: 100%;
    height: 80%;
    margin: 16px auto;
    padding-left: 24px;
    padding-right: 24px;
    left: 0;
    right: 0;

    /* a folga no fim da página é para a barra fixa de botões não cobrir o conteúdo */
    @media (max-width: 768px) {
        margin-top: 8px;
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 88px;
    }
`
