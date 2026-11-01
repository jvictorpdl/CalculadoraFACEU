import { createContext, useEffect, useState } from "react";
import { defaultState } from "./state";

export const ApplicationContext = createContext('ApplicationState');

const CHAVE_DADOS = 'calimpe-h20:dados';

// os valores digitados ficam só neste navegador; se o armazenamento estiver bloqueado, nada se perde além disso
function estadoInicial() {
    try {
        const salvos = JSON.parse(localStorage.getItem(CHAVE_DADOS));
        return {
            ...defaultState,
            data: {
                autodepura: { ...defaultState.data.autodepura, ...salvos?.autodepura },
                colicalc: { ...defaultState.data.colicalc, ...salvos?.colicalc },
            },
        };
    } catch {
        return defaultState;
    }
}

export function ApplicationStateProvider({ children }) {
    const [state, dispatch] = useState(estadoInicial);

    useEffect(() => {
        try {
            localStorage.setItem(CHAVE_DADOS, JSON.stringify(state.data));
        } catch {
            // navegação privada ou cota cheia: a calculadora segue funcionando sem guardar
        }
    }, [state.data]);

    return (
        <ApplicationContext.Provider value={{ state, dispatch }}>
            {children}
        </ApplicationContext.Provider>
    )
}

