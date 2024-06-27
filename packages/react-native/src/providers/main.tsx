import React, { useState } from 'react';
import { createContext } from "react";
import { UncoverProviderContextProps, UncoverProviderProps } from "./interface";
import { ThemeModesProvider } from './theme_modes_provider';
import { UncoverStyleProps } from '@components/interface';


export const UncoverProviderContext: React.Context<UncoverProviderContextProps> = createContext({
    extendedStyle: {},
    setExtendedStyle: (props: UncoverStyleProps) => {}
});

export const UncoverProvider: React.FC<UncoverProviderProps> = ({
    extendStyle = {},
    extendTheme,
    children
}) => {
   const [extendedStyle, setExtendedStyle] = useState<UncoverStyleProps>(extendStyle)


    return (
        <UncoverProviderContext.Provider
            value={{
                extendedStyle,
                setExtendedStyle
            }}
        >
            <ThemeModesProvider extendTheme={extendTheme}>
                {children}
            </ThemeModesProvider>
        </UncoverProviderContext.Provider>
    )
}