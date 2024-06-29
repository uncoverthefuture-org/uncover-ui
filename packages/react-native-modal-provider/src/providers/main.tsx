import React, { ComponentProps, ComponentType, useState } from 'react';
import { createContext } from "react";
import { ModalComponent, ModalProviderContextProps, ModalProviderProps } from "./interface";


export const ModalProviderContext: React.Context<ModalProviderContextProps> = createContext({
    showModal: (compoent, props) => ({ update: () => { }, close: () => { } }),
});

export const ModalProvider: React.FC<ModalProviderProps> = ({
    children
}) => {
    const [modals, setModals] = useState<ModalComponent<ComponentType<any>>[]>([]);

    const showModal = <T extends ComponentType<any>>(Component: T, props?: ComponentProps<T>) => {
        const index = modals.length;
        try {
            setModals([
                { Component, props: { ...props } },
                ...modals
            ])
        } catch (err) {
            console.warn('ModalProvider Error: ', err);
        }

        return {
            index,
            update: (props?: ComponentProps<T>) => {
                if (modals[index]) {
                    modals[index].props = { ...modals[index].props, ...props };
                }
            },
            close: (props?: ComponentProps<T>) => {
                let modalsCopy = [...modals];
                if (modalsCopy[index]) {
                    modalsCopy.splice(index, 1);
                    setModals(modalsCopy)
                }
            }
        }
    }


    return (
        <ModalProviderContext.Provider
            value={{ showModal }}
        >
            {modals.map(({ Component, props }, _index) => (
                <Component
                    key={_index}
                    {...props}
                />
            ))}
            {children}
        </ModalProviderContext.Provider>
    )
}