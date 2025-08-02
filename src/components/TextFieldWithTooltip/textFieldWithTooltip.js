import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { FieldWrapper, Input, LabelWrapper, TooltipContentStyled } from './style';

export default function TextFieldWithTooltip({
    label,
    tooltip,
    placeholder,
    disabled = false,
    onBlurValue,
    value,
}) {
    const [currentValue, setValue] = useState(value?.toString()?.replaceAll('.', ',') ?? '');

    // Regex allows only numbers with up to 5 decimal places
    const handleChange = (e) => {
        const input = e.target.value;

        // Allow empty input
        if (input === '') {
            setValue('');
            return;
        }

        const valid = /^(\d+(\,\d{0,5})?)?$/.test(input);
        if (valid) {
            setValue(input);
        }
    };

    const handleBlur = () => {
        if (onBlurValue && currentValue !== '') {
            const parsed = parseFloat(currentValue.replaceAll(',', '.'));
            if (!isNaN(parsed)) {
                // Optionally round to 5 decimals for consistency
                const rounded = parseFloat(parsed.toFixed(5));
                setValue(rounded.toString());
                onBlurValue(rounded);
            }
        }
    };


    return (
        <FieldWrapper>
            <LabelWrapper>
                <span style={{ fontWeight: 600, color: "#374151" }}>{label}</span>
                <Tooltip.Provider delayDuration={100}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <span style={{ display: "inline-flex", cursor: "pointer" }}>
                                <Info size={16} />
                            </span>
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
            <Input
                type="text"
                inputMode="decimal"
                placeholder={placeholder}
                disabled={disabled}
                value={currentValue.replaceAll('.', ',')}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </FieldWrapper>
    );
}
