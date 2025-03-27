import React, { ComponentProps, ComponentType, useState } from 'react';
import { createContext } from "react";
import { SheetComponent, SheetComponentType, SheetHideOtherOptions, SheetHideProps, SheetID, SheetProviderContextProps, SheetShowProps, SheetsProviderProps } from "./interface";
import { SheetManager, SheetProvider } from 'react-native-actions-sheet';


export const SheetProviderContext: React.Context<SheetProviderContextProps> = createContext({
    showSheet: (component, props, delay) => ({ id: "", open: () => { }, update: () => { }, close: () => { }, hide: () => { } }),
    hideSheet: (component, props) => { },
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

    const openSheet = <T extends ComponentType<any>>(id: string, props?: ComponentProps<T>, delay: number = 0) => {
        setTimeout(() => {
            // console.info('DEBUG: calling added sheet');
            const _sheet = SheetManager.show(id, {
                payload: { sheetId: id as any, ...props },
            }).then((data) => {
                // console.warn('SheetProvider Result: ', data);
            }).catch((err) => {
                // console.warn('SheetProvider Error: ', err);
            });
        }, delay);
    }

    const updateSheet = <T extends SheetComponentType>(id:string, props?: SheetShowProps<T>) => {
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
    }

    const showSheet = <T extends SheetComponentType>(Component: T, props?: SheetShowProps<T>, delay: number = 1) => {
        const id = `sheet-${sheets.length}`; // Unique ID for each sheet
        try {
            // console.info('DEBUG: adding sheet ...');
            setSheets([
                { Component, id, props: { sheetId: id, ...props } },
                ...sheets
            ]);
            if (props?.isOpen || props?.isOpen === undefined) {
                // console.info('DEBUG: Initiating timeout on sheet');
                // Open the sheet after adding it
                openSheet(id, props, delay);
            }
        } catch (err) {
            console.warn('SheetProvider Error: ', err);
        }

        return {
            id,
            open: (props?: ComponentProps<T>, openDelay?: number) => {
                openSheet(id, props, openDelay);
            },
            update: (props?: ComponentProps<T>) => {
                updateSheet(id, props);
            },
            hide: () =>{
                SheetManager.hide(id).then(() => {
                    updateSheet(id, { isOpen: false });
                });
            },
            close: () => {
                SheetManager.hide(id).then(() => {
                    setSheets(prevSheets => {
                        // console.warn("Closing sheet: ", id);
                        let sheetsCopy = [...prevSheets];
                        const sheetIndex = sheetsCopy.findIndex((sheet) => (sheet.id === id));
                        // console.warn("Found Closing sheet: ", sheetIndex, sheetsCopy[sheetIndex], sheetsCopy, prevSheets);
                        if (sheetsCopy[sheetIndex]) {
                            const sheet = sheetsCopy[sheetIndex];
                            // sheetsCopy[sheetIndex].props = { ...sheetsCopy[sheetIndex].props, ...props, visible: false };
                            // remove  sheet from imported sheets in page 
                            sheetsCopy.splice(sheetIndex, 1);
                            // console.warn("Closed sheet: ", id);
                            return sheetsCopy;
                        }
                        return prevSheets;
                    })
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