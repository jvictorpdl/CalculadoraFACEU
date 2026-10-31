import { useId } from 'react';
import styled from 'styled-components';

const Grupo = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 8px;
`;

const Legenda = styled.span`
    color: #4B5563;
    font-family: var(--Font-Family-title, 'Inter', sans-serif);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;

    /* no celular as opções ocupam a largura toda e falam por si; o leitor de tela segue lendo a legenda */
    @media (max-width: 768px) {
        display: none;
    }
`;

const Opcoes = styled.div`
    display: inline-flex;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    overflow: hidden;

    @media (max-width: 768px) {
        display: flex;
        width: 100%;
    }
`;

const Opcao = styled.label`
    position: relative;
    flex: 1;
    cursor: pointer;

    input {
        position: absolute;
        inset: 0;
        margin: 0;
        opacity: 0;
        cursor: pointer;
    }

    span {
        display: block;
        padding: 6px 16px;
        background: #FFF;
        color: #4B5563;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        text-align: center;
    }

    input:checked + span {
        background: #17737A;
        color: #FFF;
    }

    input:focus-visible + span {
        outline: 2px solid #111827;
        outline-offset: -4px;
    }

    @media (max-width: 768px) {
        span {
            padding: 12px 16px;
        }
    }
`;

export function RadioGroup({ legenda, children }) {
    const id = useId();

    return (
        <Grupo role="radiogroup" aria-labelledby={id}>
            <Legenda id={id}>{legenda}</Legenda>
            <Opcoes>{children}</Opcoes>
        </Grupo>
    );
}

export function RadioButton({ value, name, checked, onChange, label }) {
    return (
        <Opcao>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span>{label}</span>
        </Opcao>
    );
}
