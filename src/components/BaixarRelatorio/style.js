import styled from 'styled-components';

export const Caixa = styled.section`
    margin-bottom: 16px;
`;

export const Titulo = styled.h3`
    margin-bottom: 8px;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
`;

export const Botoes = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Botao = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    background: #FFF;
    color: #17737A;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: #17737A;
        background: #F0F9FA;
    }

    &:disabled {
        color: #6B7280;
        cursor: progress;
    }

    @media (max-width: 768px) {
        flex: 1 1 130px;
        min-height: 44px;
    }
`;

export const Erro = styled.p`
    margin-top: 8px;
    color: #B91C1C;
    font-size: 14px;
    line-height: 20px;
`;
