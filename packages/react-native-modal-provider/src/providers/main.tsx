import React, { ComponentProps, ComponentType, useState } from 'react';
import { createContext } from "react";
import { ModalComponent, ModalProviderContextProps, ModalProviderProps } from "./interface";
import { generateRandomStringWithTimestamp } from '../utilitiies/unique_id';


export const ModalProviderContext: React.Context<ModalProviderContextProps> = createContext({
    showModal: (compoent, props) => ({ update: () => { }, close: () => { } }),
});

export const ModalProvider: React.FC<ModalProviderProps> = ({
    children
}) => {
    const [modals, setModals] = useState<ModalComponent<ComponentType<any>>[]>([]);

    const showModal = <T extends ComponentType<any>>(Component: T, props?: ComponentProps<T>) => {
        const id = generateRandomStringWithTimestamp();
        try {
            setModals([
                ...modals,
                { Component, id, props: { visible: true, ...props } },
            ])
        } catch (err) {
            console.warn('ModalProvider Error: ', err);
        }

        return {
            id,
            update: (props?: ComponentProps<T>) => {
                let modalsCopy=[...modals];
                const modalIndex = modals.findIndex(modal =>( modal.id === id));
                if (modalsCopy[modalIndex]) {
                    modalsCopy[modalIndex].props = { ...modalsCopy[modalIndex].props, ...props };
                    setModals(modalsCopy)
                }
            },
            close: (props?: ComponentProps<T>) => {
                let modalsCopy=[...modals];
                const modalIndex = modals.findIndex(modal =>( modal.id === id));
                if (modalsCopy[modalIndex]) {
                    modalsCopy[modalIndex].props = { ...modalsCopy[modalIndex].props, ...props, visible: false };
                    // remove  modal from imported modals in page 
                    setTimeout(() => {
                        modalsCopy.splice(modalIndex, 1);
                        setModals(modalsCopy)
                    }, 1500)
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