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
    font-weight: 600;
    cursor: ${(props) => (props.disabled ? 'auto' : props.selected ? 'auto' : 'pointer')};
`

export const MensagemErro = styled.div`
    margin-top: 16px;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #FCA5A5;
    background: #FEF2F2;
    color: #B91C1C;
    font-size: 14px;
    line-height: 1.5;
`

// ação principal preenchida para se destacar do "Voltar"
export const ActionButton = styled.button`
    border-radius: var(--Border-Radius-radius-8, 8px);
    border: 1px solid ${(props) => (props.disabled ? '#D1D5DB' : '#17737A')};
    color: ${(props) => (props.disabled ? '#9CA3AF' : '#FFFFFF')};
    font-weight: 600;
    background: ${(props) => (props.disabled ? '#F3F4F6' : '#17737A')};
    padding: 12px 16px;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: #125E64;
    }
`
