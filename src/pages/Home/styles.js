import styled from "styled-components";

export const FinishButton = styled.button`
    border-radius: 8px;
    background: #2BA3AB;
    padding: 12px 16px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #FFF
`


export const CancelButton = styled.button`
    border-radius: var(--Border-Radius-radius-8, 8px);
    border: 1px solid var(--Border-color-border-subtle, #D1D5DB);
    background: var(--BG-color-background, #FFF);
    color: #4B5563;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`

// grupo atual em verde, grupos clicáveis em cinza escuro e os bloqueados em cinza claro
export const ToolsButton = styled.button`
    border-radius: var(--Border-Radius-radius-8, 8px);
    border: 1px solid var(--Border-color-border-subtle, ${(props) => (props.selected ? '#2BA3AB' : '#D1D5DB')});
    background: var(--BG-color-background, #FFF);
    color: ${(props) => (props.selected ? '#17737A' : props.disabled ? '#9CA3AF' : '#4B5563')};
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: ${(props) => (props.disabled ? 'auto' : props.selected ? 'auto' : 'pointer')};
`

export const NavegacaoGrupos = styled.div`
    display: flex;
    align-items: stretch;
    gap: 4px;
`

/* o respiro de 3px evita que a rolagem corte o contorno de foco dos botões */
export const FaixaGrupos = styled.div`
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    gap: 8px;
    margin: -3px 0;
    padding: 3px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    > button {
        flex: none;
    }

    @media (max-width: 768px) {
        > button {
            min-height: 44px;
        }
    }
`

export const SetaGrupos = styled.button`
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    background: #FFF;
    color: #17737A;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: #17737A;
        background: #F0F9FA;
    }

    &:disabled {
        color: #D1D5DB;
        cursor: default;
    }
`

// título à esquerda e limpeza à direita, sem empurrar os campos para baixo
export const CabecalhoCalculadora = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
`

export const BotaoLimpar = styled.button`
    flex: none;
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
        margin: -10px -8px;
    }
`

export const TextoConfirmacao = styled.p`
    margin: 8px 0 16px;
    color: #374151;
    font-size: 14px;
    line-height: 20px;
`

export const BotoesConfirmacao = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`

export const MensagemErro = styled.div`
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #FCA5A5;
    background: #FEF2F2;
    color: #B91C1C;
    font-size: 14px;
    line-height: 1.5;
    scroll-margin: 8px 0 88px;
`

// ação principal preenchida para se destacar do "Voltar"
export const ActionButton = styled.button`
    border-radius: var(--Border-Radius-radius-8, 8px);
    border: 1px solid ${(props) => (props.disabled ? '#D1D5DB' : '#17737A')};
    color: ${(props) => (props.disabled ? '#9CA3AF' : '#FFFFFF')};
    font-weight: 600;
    background: ${(props) => (props.disabled ? '#F3F4F6' : '#17737A')};
    padding: 12px 16px;
    font-size: 14px;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: #125E64;
    }
`

// no celular os botões ficam sempre à mão, presos ao rodapé da tela
export const BarraAcoes = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding-top: 16px;

    @media (max-width: 768px) {
        position: fixed;
        z-index: 10;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 8px 16px;
        background: #FFF;
        box-shadow: 0 -4px 13px 0 rgba(0, 0, 0, 0.08);

        > button {
            flex: 1;
            min-height: 48px;
            font-size: 16px;
        }

        > ${ActionButton} {
            flex: 2;
        }
    }
`
