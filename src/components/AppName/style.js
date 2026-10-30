import styled from "styled-components";

export const Container = styled.div`
    margin-left: 24px;
    margin-top: 32px;
    text-align: start;
    color: #4F5666;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Inter', sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;

    @media (max-width: 768px) {
        margin-left: 16px;
        margin-top: 24px;
        font-size: clamp(22px, 7vw, 26px);
    }
`;
