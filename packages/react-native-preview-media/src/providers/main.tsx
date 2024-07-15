import React from 'react';
import { createContext } from "react";
import { PreviewMediaProviderContextProps, PreviewMediaProviderProps } from "./interface";
import { ModalProvider } from '@uncover-ui/rn-modal-provider';


export const PreviewMediaProviderContext: React.Context<PreviewMediaProviderContextProps> = createContext({
});

export const PreviewMediaProvider: React.FC<PreviewMediaProviderProps> = ({
    children
}) => {
    return (
        <PreviewMediaProviderContext.Provider
            value={{ }}
        >
            <ModalProvider>
                {children}
            </ModalProvider>
        </PreviewMediaProviderContext.Provider>
    )
}