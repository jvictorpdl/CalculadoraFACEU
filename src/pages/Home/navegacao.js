import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/Modal';
import { PageTitle } from '../../components/PageTitles/titles';
import { ActionButton, BotaoLimpar, BotoesConfirmacao, CabecalhoCalculadora, CancelButton, FaixaGrupos, NavegacaoGrupos, SetaGrupos, TextoConfirmacao, ToolsButton } from './styles';

// a faixa rola de lado quando os grupos não cabem; o grupo atual fica sempre à vista
export function Grupos({ nomes, selecionado, bloqueados, onSelecionar }) {
    const faixa = useRef(null);
    const [sobra, setSobra] = useState({ antes: false, depois: false });
    const chaveNomes = nomes.join();

    useEffect(() => {
        const atual = faixa.current.querySelector('[aria-current="step"]');
        if (atual) {
            const centro = atual.offsetLeft - (faixa.current.clientWidth - atual.offsetWidth) / 2;
            faixa.current.scrollTo({ left: centro, behavior: 'smooth' });
        }
    }, [selecionado]);

    // observa também os botões: a largura deles muda quando a fonte termina de carregar
    useEffect(() => {
        const elemento = faixa.current;
        const medir = () => setSobra({
            antes: elemento.scrollLeft > 1,
            depois: elemento.scrollLeft + elemento.clientWidth < elemento.scrollWidth - 1,
        });
        const observador = new ResizeObserver(medir);
        [elemento, ...elemento.children].forEach((item) => observador.observe(item));
        elemento.addEventListener('scroll', medir, { passive: true });

        return () => {
            observador.disconnect();
            elemento.removeEventListener('scroll', medir);
        };
    }, [chaveNomes]);

    // leva à vista o primeiro botão escondido naquele lado, sem pular nenhum
    function rolar(direcao) {
        const { scrollLeft, clientWidth } = faixa.current;
        const botoes = [...faixa.current.children];
        const alvo = direcao > 0
            ? botoes.find((botao) => botao.offsetLeft + botao.offsetWidth > scrollLeft + clientWidth + 1)
            : botoes.reverse().find((botao) => botao.offsetLeft < scrollLeft - 1);

        if (alvo) {
            const left = direcao > 0 ? alvo.offsetLeft : alvo.offsetLeft + alvo.offsetWidth - clientWidth;
            faixa.current.scrollTo({ left, behavior: 'smooth' });
        }
    }

    const temSetas = sobra.antes || sobra.depois;

    // as setas só ajudam quem usa ponteiro ou toque: no teclado, o Tab já percorre e rola a faixa
    return (
        <NavegacaoGrupos>
            {temSetas &&
                <SetaGrupos type="button" aria-hidden="true" tabIndex={-1} disabled={!sobra.antes} onClick={() => rolar(-1)}>
                    <ChevronLeft size={18} />
                </SetaGrupos>}
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
            {temSetas &&
                <SetaGrupos type="button" aria-hidden="true" tabIndex={-1} disabled={!sobra.depois} onClick={() => rolar(1)}>
                    <ChevronRight size={18} />
                </SetaGrupos>}
        </NavegacaoGrupos>
    );
}

// o botão só aparece com algo digitado; os valores ficam guardados até a pessoa limpar
export function TituloCalculadora({ titulo, dados, onLimpar }) {
    const [confirmando, setConfirmando] = useState(false);
    const temDados = Object.values(dados).some((valor) => typeof valor === 'number');

    return (
        <>
            <CabecalhoCalculadora>
                <PageTitle>{titulo}</PageTitle>
                {temDados && <BotaoLimpar type="button" onClick={() => setConfirmando(true)}>Limpar dados</BotaoLimpar>}
            </CabecalhoCalculadora>
            <Modal modalIsOpen={confirmando} closeModal={() => setConfirmando(false)} title={`Limpar dados do ${titulo}?`}>
                <TextoConfirmacao>
                    Os valores ficam guardados só neste navegador. Depois de limpar, não dá para recuperá-los.
                </TextoConfirmacao>
                <BotoesConfirmacao>
                    <CancelButton type="button" onClick={() => setConfirmando(false)}>Cancelar</CancelButton>
                    <ActionButton
                        type="button"
                        onClick={() => {
                            setConfirmando(false);
                            onLimpar();
                        }}>
                        Limpar dados
                    </ActionButton>
                </BotoesConfirmacao>
            </Modal>
        </>
    );
}

// mostra a mensagem de erro e leva o foco ao primeiro campo com problema
export function irParaErro(calculadora) {
    calculadora.querySelector('[role="alert"]')?.scrollIntoView({ block: 'nearest' });
    calculadora.querySelector('input[aria-invalid="true"]:not(:disabled)')?.focus();
}
