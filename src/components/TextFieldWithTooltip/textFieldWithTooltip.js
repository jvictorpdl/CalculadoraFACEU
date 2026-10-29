import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useId, useState } from 'react';
import { FieldWrapper, Input, InputWrapper, LabelWrapper, TooltipContentStyled, TooltipTrigger, Unidade } from './style';

export default function TextFieldWithTooltip({
    label,
    tooltip,
    placeholder,
    disabled = false,
    onBlurValue,
    value,
}) {
    const [currentValue, setValue] = useState(value?.toString()?.replaceAll('.', ',') ?? '');
    const id = useId();
    // o placeholder recebido é a unidade do campo (m³/s, mg/L, ...)
    const unidade = placeholder?.trim();

    // Regex allows only numbers with up to 5 decimal places
    const handleChange = (e) => {
        // Ponto também vale como separador decimal; antes era descartado e "0.651" virava 651
        const input = e.target.value.replaceAll('.', ',');

        // Allow empty input
        if (input === '') {
            setValue('');
            return;
        }

        const valid = /^(\d+(,\d{0,5})?)?$/.test(input);
        if (valid) {
            setValue(input);
        }
    };

    const handleBlur = () => {
        if (onBlurValue && currentValue !== '' && currentValue !== null && currentValue !== undefined) {
            const parsed = parseFloat(currentValue.replaceAll(',', '.'));
            if (!isNaN(parsed)) {
                // Optionally round to 5 decimals for consistency
                const rounded = parseFloat(parsed.toFixed(5));
                setValue(rounded.toString());
                onBlurValue(rounded);
            }
        } else {
            setValue(null);
            onBlurValue(null);
        }
    };


    return (
        <FieldWrapper>
            <LabelWrapper>
                <label htmlFor={id} style={{ fontWeight: 600, color: "#374151" }}>{label}</label>
                <Tooltip.Provider delayDuration={100}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <TooltipTrigger type="button" aria-label={`Sobre ${label}: ${tooltip}`}>
                                <Info size={16} aria-hidden="true" />
                            </TooltipTrigger>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <TooltipContentStyled side="top" sideOffset={4}>
                                {tooltip}
                                <Tooltip.Arrow />
                            </TooltipContentStyled>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </LabelWrapper>
            <InputWrapper $disabled={disabled}>
                <Input
                    id={id}
                    type="text"
                    inputMode="decimal"
                    aria-describedby={unidade ? `${id}-unidade` : undefined}
                    disabled={disabled}
                    value={currentValue?.replaceAll('.', ',')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {unidade && <Unidade id={`${id}-unidade`}>{unidade}</Unidade>}
            </InputWrapper>
        </FieldWrapper>
    );
}
