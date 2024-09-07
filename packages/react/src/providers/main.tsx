import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/app.css"
import React from "react";
import { createContext, useContext } from "react";
import { ChakraProviderLoader } from "./chakra_provider";
import { ThemeModesProvider } from "./theme_modes_provider";
import { UIMainProviderProps } from "./interface";

type UncoverUIProviderProv = {
};

export const UncoverUIProviderContext = createContext<UncoverUIProviderProv>({
    initNotification: () => { },
});

export const UncoverUIProvider: React.FC<UIMainProviderProps> = ({
    chakraTheme,
    chakraProviderProps,
    extendEmotionTheme,
    themeModesProviderProps,
    children
}) => {
    return (
        <UncoverUIProviderContext.Provider
            value={{}}
        >
            <ChakraProviderLoader
                theme={chakraTheme}
                {...chakraProviderProps}
            >
                <ThemeModesProvider
                    extendTheme={extendEmotionTheme}
                    {...themeModesProviderProps}
                >
                    {children}
                </ThemeModesProvider>
            </ChakraProviderLoader>
        </UncoverUIProviderContext.Provider>
    )
}

export const useUncoverUI = () => useContext(UncoverUIProviderContext);