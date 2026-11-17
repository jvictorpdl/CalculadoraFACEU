import { createContext, useContext, useId, useState } from 'react';
import BotaoDica from '../Dica';
import { TextoDica } from '../Dica/style';
import { FieldWrapper, Input, InputWrapper, LabelWrapper, Unidade } from './style';

// rótulos dos campos apontados pela validação; a calculadora fornece ao redor do passo atual
export const CamposComErro = createContext(new Set());

// String(0.0000005) daria "5e-7", que o campo não aceita de volta; o número sai sempre por extenso
export const porExtenso = (valor) => (typeof valor === 'number'
    ? valor.toLocaleString('en-US', { maximumFractionDigits: 8, useGrouping: false })
    : valor?.toString());

export default function TextFieldWithTooltip({
    label,
    campo = label,
    tooltip,
    placeholder,
    disabled = false,
    onBlurValue,
    value,
}) {
    const [currentValue, setValue] = useState(porExtenso(value)?.replaceAll('.', ',') ?? '');
    const [dicaAberta, setDicaAberta] = useState(false);
    // campos repetidos (como os de cada trecho) informam um nome próprio para o destaque de erro
    const invalido = useContext(CamposComErro).has(campo);
    const id = useId();
    // o placeholder recebido é a unidade do campo (m³/s, mg/L, ...)
    const unidade = placeholder?.trim();
    // vazões de lançamento podem ser bem pequenas (0,00004897 m³/s); os demais campos ficam com 5 casas
    const casas = unidade === 'm³/s' ? 8 : 5;

    const handleChange = (e) => {
        // Ponto também vale como separador decimal; antes era descartado e "0.651" virava 651
        const input = e.target.value.replaceAll('.', ',');

        // Allow empty input
        if (input === '') {
            setValue('');
            return;
        }

        const valid = new RegExp(`^(\\d+(,\\d{0,${casas}})?)?$`).test(input);
        if (valid) {
            setValue(input);
        }
    };

    const handleBlur = () => {
        if (onBlurValue && currentValue !== '' && currentValue !== null && currentValue !== undefined) {
            const parsed = parseFloat(currentValue.replaceAll(',', '.'));
            if (!isNaN(parsed)) {
                const rounded = parseFloat(parsed.toFixed(casas));
                setValue(porExtenso(rounded));
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
                <BotaoDica rotulo={label} texto={tooltip} onToque={() => setDicaAberta(!dicaAberta)} />
            </LabelWrapper>
            <InputWrapper $disabled={disabled} $invalido={invalido}>
                <Input
                    id={id}
                    type="text"
                    inputMode="decimal"
                    aria-describedby={unidade ? `${id}-unidade` : undefined}
                    aria-invalid={invalido || undefined}
                    disabled={disabled}
                    value={currentValue?.replaceAll('.', ',')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {unidade && <Unidade id={`${id}-unidade`}>{unidade}</Unidade>}
            </InputWrapper>
            {dicaAberta && <TextoDica>{tooltip}</TextoDica>}
        </FieldWrapper>
    );
}
