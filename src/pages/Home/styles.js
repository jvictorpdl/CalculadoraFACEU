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

export const FaixaGrupos = styled.div`
    position: relative;
    display: flex;
    gap: 8px;

    @media (max-width: 900px) {
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        margin: 0 -16px;
        padding: 0 16px;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        > button {
            flex: none;
            min-height: 44px;
        }
    }
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
