import { ComponentProps, ComponentType } from "react";
import { Sheets } from "react-native-actions-sheet";
export interface SheetsProviderProps {
    children: React.ReactNode;
}
export type SheetID = keyof Sheets;
export type SheetShowProps<T extends SheetID> = Omit<Sheets[T]['payload'], 'sheetId'>;
export type SheetShowOtherOptions<T extends SheetID> = Omit<Sheets[T], 'payload'>;
export type SheetHideProps<T extends SheetID> = Sheets[T]['returnValue'];
export type SheetHideOtherOptions<T extends SheetID> = Omit<Sheets[T], 'payload' | 'onClose'>;
export type SheetComponentType = ComponentType<any>;
export type SheetComponent<T extends ComponentType<any>> = {
    Component: T;
    id: string;
    props?: ComponentProps<T>;
};
export interface ShowSheetResult<T extends SheetComponentType> {
    id: string;
    update: (props?: ComponentProps<T>) => void;
    close: () => void;
}
export interface SheetProviderContextProps {
    showSheet: <T extends SheetComponentType>(component: T, props?: ComponentProps<T>) => ShowSheetResult<T>;
    hideSheet: <T extends SheetID>(id: T, payload?: SheetHideProps<T>, otherOptions?: SheetHideOtherOptions<T>) => void;
}
