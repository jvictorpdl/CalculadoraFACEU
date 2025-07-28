import { createContext, useState } from "react";
import { defaultState } from "./state";

export const ApplicationContext = createContext('ApplicationState');

export function ApplicationStateProvider({ children }) {
    const [state, dispatch] = useState(defaultState);


    return (
        <ApplicationContext.Provider value={{ state, dispatch }}>
            {children}
        </ApplicationContext.Provider>
    )
}