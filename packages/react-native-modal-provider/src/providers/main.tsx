import React, { ComponentProps, ComponentType, useState } from 'react';
import { createContext } from "react";
import { ModalComponent, ModalProviderContextProps, ModalProviderProps } from "./interface";
import { generateRandomStringWithTimestamp } from '../utilitiies/unique_id';


export const ModalProviderContext: React.Context<ModalProviderContextProps> = createContext({
    showModal: (compoent, props) => ({ id: "", update: () => { }, close: () => { } }),
});

export const ModalProvider: React.FC<ModalProviderProps> = ({
    children
}) => {
    const [modals, setModals] = useState<ModalComponent<ComponentType<any>>[]>([]);

    const showModal = <T extends ComponentType<any>>(Component: T, props?: ComponentProps<T>) => {
        const id = generateRandomStringWithTimestamp();
        try {
            setModals([
                { Component, id, props: { visible: true, ...props } },
                ...modals,
            ])
        } catch (err) {
            console.warn('ModalProvider Error: ', err);
        }

        return {
            id,
            update: (props?: ComponentProps<T>) => {
                setModals(prevModals => {
                    // console.warn("Updating modal: ", id);
                    let modalsCopy = [...prevModals];
                    const modalIndex = modalsCopy.findIndex((modal) => (modal.id === id));
                    // console.warn("Found Updating modal: ", modalIndex, modalsCopy[modalIndex], modalsCopy, prevModals);
                    if (modalsCopy[modalIndex]) {
                        modalsCopy[modalIndex].props = { ...modalsCopy[modalIndex].props, ...props };
                        
                        // console.warn("Updated modal: ", id);
                        return modalsCopy;
                    }
                    return prevModals;
                })
            },
            close: () => {
                setModals(prevModals => {
                    // console.warn("Closing modal: ", id);
                    let modalsCopy = [...prevModals];
                    const modalIndex = modalsCopy.findIndex((modal) => (modal.id === id));
                    // console.warn("Found Closing modal: ", modalIndex, modalsCopy[modalIndex], modalsCopy, prevModals);
                    if (modalsCopy[modalIndex]) {
                        modalsCopy[modalIndex].props = { ...modalsCopy[modalIndex].props, ...props, visible: false };
                        // remove  modal from imported modals in page 
                        modalsCopy.splice(modalIndex, 1);

                        // console.warn("Closed modal: ", id);
                        return modalsCopy;
                    }
                    return prevModals;
                })
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