import { renderHook } from "@testing-library/react";
import { createContext, useState } from "react";
import { defaultState } from "./state";

export const ApplicationContext = createContext('ApplicationState');

export function ApplicationStateProvider({ children }) {
    const [state, dispatch] = useState(defaultState);

    renderHook(() => {
        console.log(state);
    }, [state]);


    return (
        <ApplicationContext.Provider value={{ state, dispatch }}>
            {children}
        </ApplicationContext.Provider>
    )
}