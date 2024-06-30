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
export type Sheet<T extends ComponentType<any>> = {
    Component: T;
    props?: ComponentProps<T>;
};
