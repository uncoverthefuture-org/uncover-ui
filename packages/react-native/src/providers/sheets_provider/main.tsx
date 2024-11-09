import React, { ComponentProps, ComponentType, useState } from 'react';
import { createContext } from "react";
import { Sheet, SheetHideOtherOptions, SheetHideProps, SheetID, SheetsProviderProps } from "./interface";
import { SheetManager, SheetProvider } from 'react-native-actions-sheet';


export const SheetsProviderContext = createContext({
    showSheet: <T extends ComponentType<any>>(component: T, props?: ComponentProps<T>) => { },
    hideSheet: <T extends SheetID>(id: T, payload?: SheetHideProps<T>, otherOptions?: SheetHideOtherOptions<T>) => { },

});

export const SheetsProvider: React.FC<SheetsProviderProps> = ({
    children
}) => {
    const [sheets, setSheets] = useState<Sheet<ComponentType<any>>[]>([])


    const hideSheet = <T extends SheetID>(id: T, payload?: SheetHideProps<T>, otherOptions?: SheetHideOtherOptions<T>) => {
        return SheetManager.hide(id, {
            payload,
            ...otherOptions
        });
    }

    const showSheet = <T extends ComponentType<any>>(Component: T, props?: Omit<ComponentProps<T>,'sheetId'>) => {
        return new Promise<any>((resolve, reject) => {
            try {
                const id = `sheet-${sheets.length}`; // Unique ID for each sheet
                setSheets([
                    { Component, props: { sheetId: id, ...props } },
                    ...sheets
                ])
                // Open the sheet after adding it
                setTimeout(() => {
                    const mSheet = SheetManager.show(id, {
                        payload: { sheetId: id as any, ...props},
                        onClose:(data)=> resolve(data)
                    }).then((data) => {
                        resolve(data);
                    }).catch((err) => reject(err));
                }, 100);
            } catch (err) {
                reject(err)
            }
        });
    }


    return (
        <SheetsProviderContext.Provider
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
        </SheetsProviderContext.Provider>
    )
}