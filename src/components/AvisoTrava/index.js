import { Lock } from 'lucide-react';
import styled from 'styled-components';

const Texto = styled.p`
    display: flex;
    align-items: flex-start;
    gap: 6px;
    margin: 6px 0 0;
    font-size: 13px;
    line-height: 1.4;
    color: #6B7280;

    svg {
        flex: none;
        margin-top: 2px;
    }
`;

const lista = (rotulos) => (rotulos.length > 1
    ? `${rotulos.slice(0, -1).join(', ')} e ${rotulos[rotulos.length - 1]}`
    : rotulos[0]);

// diz qual campo travou a opção e como liberá-la; some quando nada está bloqueado
export default function AvisoTrava({ campos, por }) {
    if (!por.length) return null;
    const varios = campos.length > 1;

    return (
        <Texto>
            <Lock size={14} aria-hidden="true" />
            {`${varios ? 'Campos' : 'Campo'} ${lista(campos)} ${varios ? 'bloqueados' : 'bloqueado'}: já há valor em ${lista(por)}. `
                + `Para ${varios ? 'usá-los' : 'usá-lo'}, apague ${por.length > 1 ? 'esses valores' : 'esse valor'}.`}
        </Texto>
    );
}
