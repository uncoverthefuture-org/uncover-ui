import React, { ComponentProps, ComponentType, useState } from 'react';
import { createContext } from "react";
import { SheetComponent, SheetHideOtherOptions, SheetHideProps, SheetID, SheetProviderContextProps, SheetsProviderProps } from "./interface";
import { SheetManager, SheetProvider } from 'react-native-actions-sheet';


export const SheetProviderContext: React.Context<SheetProviderContextProps> = createContext({
    showSheet: (component, props) => ({ id: "", update: () => { }, close: () => { } }),
    hideSheet: (component, props) => {},
});

export const SheetsProvider: React.FC<SheetsProviderProps> = ({
    children
}) => {
    const [sheets, setSheets] = useState<SheetComponent<ComponentType<any>>[]>([])


    const hideSheet = <T extends SheetID>(id: T, payload?: SheetHideProps<T>, otherOptions?: SheetHideOtherOptions<T>) => {
        return SheetManager.hide(id, {
            payload,
            ...otherOptions
        });
    }

    const showSheet = <T extends ComponentType<any>>(Component: T, props?: Omit<ComponentProps<T>, 'sheetId'>) => {
        const id = `sheet-${sheets.length}`; // Unique ID for each sheet
        try {

            setSheets([
                { Component, id, props: { sheetId: id, ...props } },
                ...sheets
            ])
            // Open the sheet after adding it
            setTimeout(() => {
                SheetManager.show(id, {
                    payload: { sheetId: id as any, ...props },
                }).catch((err) => {
                    console.warn('SheetProvider Error: ', err);
                });
            }, 100);
        } catch (err) {
            console.warn('SheetProvider Error: ', err);
        }

        return {
            id,
            update: (props?: ComponentProps<T>) => {
                setSheets(prevSheets => {
                    // console.warn("Updating sheet: ", id);
                    let sheetsCopy = [...prevSheets];
                    const sheetIndex = sheetsCopy.findIndex((sheet) => (sheet.id === id));
                    // console.warn("Found Updating sheet: ", sheetIndex, sheetsCopy[sheetIndex], sheetsCopy, prevSheets);
                    if (sheetsCopy[sheetIndex]) {
                        sheetsCopy[sheetIndex].props = { ...sheetsCopy[sheetIndex].props, ...props };

                        // console.warn("Updated sheet: ", id);
                        return sheetsCopy;
                    }
                    return prevSheets;
                })
            },
            close: () => {
                setSheets(prevSheets => {
                    // console.warn("Closing sheet: ", id);
                    let sheetsCopy = [...prevSheets];
                    const sheetIndex = sheetsCopy.findIndex((sheet) => (sheet.id === id));
                    // console.warn("Found Closing sheet: ", sheetIndex, sheetsCopy[sheetIndex], sheetsCopy, prevSheets);
                    if (sheetsCopy[sheetIndex]) {
                        sheetsCopy[sheetIndex].props = { ...sheetsCopy[sheetIndex].props, ...props, visible: false };
                        // remove  sheet from imported sheets in page 
                        sheetsCopy.splice(sheetIndex, 1);

                        // console.warn("Closed sheet: ", id);
                        return sheetsCopy;
                    }
                    return prevSheets;
                })
            }
        }
    }


    return (
        <SheetProviderContext.Provider
            value={{
                showSheet,
                hideSheet,
            }}
        >
            <SheetProvider>
                {sheets.map(({ Component, props }, _index) => (
                    <Component
                        key={_index}
                        {...props}
                    />
                ))}
                {children}
            </SheetProvider>
        </SheetProviderContext.Provider>
    )
}