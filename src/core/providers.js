import { createContext, useEffect, useState } from "react";
import { defaultState } from "./state";

export const ApplicationContext = createContext('ApplicationState');

export function ApplicationStateProvider({ children }) {
    const [state, dispatch] = useState(defaultState);

    useEffect(() => {
        console.log(`[${Date()}] Updating State:`, state)
    }, [state])

    return (
        <ApplicationContext.Provider value={{ state, dispatch }}>
            {children}
        </ApplicationContext.Provider>
    )
}

