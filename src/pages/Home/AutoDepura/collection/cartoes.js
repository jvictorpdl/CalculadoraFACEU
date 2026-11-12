import styled from "styled-components";

// peças comuns às listas de trechos e de lançamentos

export const Orientacao = styled.p`
    margin: 0 0 16px;
    font-size: 14px;
    line-height: 1.5;
    color: #4B5563;
`;

// o cartão de lançamento fica dentro do de trecho, então é mais discreto
export const Cartao = styled.section`
    margin-bottom: 16px;
    padding: ${({ $interno }) => ($interno ? '12px' : '16px')};
    border: 1px solid ${({ $interno }) => ($interno ? '#E5E7EB' : '#D1D5DB')};
    border-radius: 8px;
    background: ${({ $interno }) => ($interno ? '#F9FAFB' : '#FFF')};

    @media (max-width: 768px) {
        padding: 12px;
    }
`;

export const CabecalhoCartao = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

export const TituloCartao = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #374151;
`;

export const TituloLancamento = styled.h4`
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
    color: #374151;
`;

export const BotaoRemover = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #B91C1C;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #FEF2F2;
    }

    @media (max-width: 768px) {
        min-height: 44px;
        margin-right: -8px;
    }
`;

export const Montante = styled.p`
    margin: 4px 0 0;
    font-size: 14px;
    line-height: 1.5;
    color: #4B5563;
`;

export const Subtitulo = styled.p`
    margin: 16px 0 8px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
`;

export const BotaoAdicionar = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1px dashed #17737A;
    border-radius: 8px;
    background: #F0F9FA;
    color: #17737A;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: #E0F2F3;
    }

    &:disabled {
        border-color: #D1D5DB;
        background: #F3F4F6;
        color: #9CA3AF;
        cursor: auto;
    }

    @media (max-width: 768px) {
        width: 100%;
        min-height: 44px;
    }
`;

// id estável: mantém cada campo ligado ao seu item quando um item do meio é removido
export const novoId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
