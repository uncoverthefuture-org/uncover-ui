import React, { ComponentProps } from 'react';
import { SheetHideOtherOptions, SheetHideProps, SheetsProviderProps } from "./interface";
export declare const SheetsProviderContext: React.Context<{
    showSheet: <T extends React.ComponentType<any>>(component: T, props?: React.ComponentProps<T> | undefined) => void;
    hideSheet: <T_1 extends string | number>(id: T_1, payload?: SheetHideProps<T_1> | undefined, otherOptions?: SheetHideOtherOptions<T_1> | undefined) => void;
}>;
export declare const SheetsProvider: React.FC<SheetsProviderProps>;
