import React from 'react';
import { createContext } from "react";
import { UncoverProviderContextProps, UncoverProviderProps } from "./interface";
import { ThemeModesProvider } from './theme_modes_provider';


export const UncoverProviderContext: React.Context<UncoverProviderContextProps> = createContext({

});

export const UncoverProvider: React.FC<UncoverProviderProps> = ({
    extendTheme,
    children
}) => {


    return (
        <UncoverProviderContext.Provider
            value={{}}
        >
            <ThemeModesProvider extendTheme={extendTheme}>
                {children}
            </ThemeModesProvider>
        </UncoverProviderContext.Provider>
    )
}