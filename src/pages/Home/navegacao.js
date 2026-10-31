import { useEffect, useRef } from 'react';
import { FaixaGrupos, ToolsButton } from './styles';

// no celular a faixa rola de lado; o grupo atual fica sempre à vista
export function Grupos({ nomes, selecionado, bloqueados, onSelecionar }) {
    const faixa = useRef(null);

    useEffect(() => {
        const atual = faixa.current.querySelector('[aria-current="step"]');
        if (atual) {
            const centro = atual.offsetLeft - (faixa.current.clientWidth - atual.offsetWidth) / 2;
            faixa.current.scrollTo({ left: centro, behavior: 'smooth' });
        }
    }, [selecionado]);

    return (
        <FaixaGrupos ref={faixa}>
            {nomes.map((nome) => (
                <ToolsButton
                    key={nome}
                    selected={selecionado === nome}
                    aria-current={selecionado === nome ? 'step' : undefined}
                    disabled={selecionado === nome || bloqueados.includes(nome)}
                    onClick={() => onSelecionar(nome)}>
                    {nome}
                </ToolsButton>
            ))}
        </FaixaGrupos>
    );
}

// mostra a mensagem de erro e leva o foco ao primeiro campo com problema
export function irParaErro(calculadora) {
    calculadora.querySelector('[role="alert"]')?.scrollIntoView({ block: 'nearest' });
    calculadora.querySelector('input[aria-invalid="true"]:not(:disabled)')?.focus();
}
