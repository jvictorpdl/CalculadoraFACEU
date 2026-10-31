import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useRef } from 'react';
import { BotaoInfo, TooltipContentStyled } from './style';

// O Tooltip do Radix só abre com mouse e teclado; no toque o botão avisa quem o usa para mostrar o texto na tela
export default function BotaoDica({ rotulo, texto, onToque }) {
    const toque = useRef(false);

    return (
        <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <BotaoInfo
                        type="button"
                        aria-label={`Sobre ${rotulo}: ${texto}`}
                        onPointerDown={(e) => { toque.current = e.pointerType !== 'mouse'; }}
                        onClick={() => { if (toque.current) onToque(); }}
                    >
                        <Info size={16} aria-hidden="true" />
                    </BotaoInfo>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <TooltipContentStyled side="top" sideOffset={4}>
                        {texto}
                        <Tooltip.Arrow />
                    </TooltipContentStyled>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
