import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../assets/css/app.scss"

import React from "react";
import { createContext, useContext } from "react";
import { ChakraProviderLoader } from "./chakra.provider";

type UncoverUIProviderProv = {
};

export const UncoverUIProviderContext = createContext<UncoverUIProviderProv>({
    initNotification: () => { },
});

export const UncoverUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <UncoverUIProviderContext.Provider
            value={{
            }}
        >
            <ChakraProviderLoader>
                {children}
            </ChakraProviderLoader>
        </UncoverUIProviderContext.Provider>
    )
}

export const useUncoverUI = () => useContext(UncoverUIProviderContext);