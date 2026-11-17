import styled, { css } from "styled-components";
import { FieldWrapper } from "../../../../components/TextFieldWithTooltip/style";

// peças comuns às listas de trechos e de lançamentos

export const Orientacao = styled.p`
    margin: 0 0 16px;
    font-size: 14px;
    line-height: 1.5;
    color: #4B5563;
`;

// o cartão de lançamento fica dentro do de trecho, então é mais discreto; o de trecho tem a barra
// verde à esquerda e mais espaço depois, para a divisa entre um trecho e outro aparecer na lista longa
export const Cartao = styled.section`
    margin: ${({ $interno }) => ($interno ? '12px 0 16px' : '0 0 32px')};
    padding: ${({ $interno }) => ($interno ? '12px' : '16px')};
    border: 1px solid ${({ $interno }) => ($interno ? '#E5E7EB' : '#D1D5DB')};
    border-left: ${({ $interno }) => ($interno ? '1px solid #E5E7EB' : '4px solid #17737A')};
    border-radius: 8px;
    background: ${({ $interno }) => ($interno ? '#F9FAFB' : '#FFF')};

    /* no celular o lançamento fica dentro do trecho; com menos recuo e a coluna dos rótulos mais estreita
       (os dele são curtos: Qe, ODe, DBOe, E), a vazão de 8 casas cabe no campo mesmo em 360 px */
    @media (max-width: 768px) {
        padding: ${({ $interno }) => ($interno ? '8px' : '12px')};
    }

    ${({ $interno }) => $interno && css`
        @media (min-width: 360px) and (max-width: 768px) {
            ${FieldWrapper} {
                grid-template-columns: 88px minmax(0, 1fr);
            }
        }
    `}
`;

export const CabecalhoCartao = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

// faixa do título do trecho, de ponta a ponta do cartão
export const CabecalhoTrecho = styled(CabecalhoCartao)`
    margin: -16px -16px 12px;
    padding: 8px 16px;
    border-bottom: 1px solid #CDE6E8;
    border-radius: 4px 7px 0 0 / 7px 7px 0 0;
    background: #F0F9FA;

    @media (max-width: 768px) {
        margin: -12px -12px 12px;
        padding: 0 12px;
    }
`;

export const NomeTrecho = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 12px;
`;

export const TituloCartao = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #17737A;
`;

// onde o trecho começa e termina, como a distância acumulada das planilhas
export const FaixaKm = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #4B5563;
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
