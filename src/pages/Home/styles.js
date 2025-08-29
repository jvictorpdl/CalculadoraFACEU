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

export const ToolsButton = styled.button`
    border-radius: var(--Border-Radius-radius-8, 8px);
    border: 1px solid var(--Border-color-border-subtle, ${(props) => (props.selected ? '#2BA3AB' : '#D1D5DB')});
    background: var(--BG-color-background, #FFF);
    color: ${(props) => (props.selected ? '#2BA3AB' : '#D1D5DB')};
    padding: 4px 12px;
    font-weight: 600;
    cursor: ${(props) => (props.disabled ? 'auto' : props.selected ? 'auto' : 'pointer')};
`

export const ActionButton = styled.button`
    border-radius: var(--Border-Radius-radius-8, 8px);
    border: 1px solid ${(props) => (props.disabled ? '#D1D5DB' : '#2BA3AB')};
    color: ${(props) => (props.disabled ? '#D1D5DB' : '#2BA3AB')};
    background: var(--BG-color-background, #FFF);
    padding: 12px 16px;
    cursor: pointer;
`
