import { ComponentProps, ComponentType } from "react";
import { Sheets } from "react-native-actions-sheet";

export interface SheetsProviderProps {
    children: React.ReactNode
}

export type SheetID = keyof Sheets;

export type ShowSheetEssentialProps = { isOpen?: boolean };

// Sheets[T]['payload'],
export type SheetShowProps<T extends SheetComponentType> = Omit<ComponentProps<T>, 'sheetId'> & ShowSheetEssentialProps;

export type SheetShowOtherOptions<T extends SheetID> = Omit<Sheets[T], 'payload'>;

export type SheetHideProps<T extends SheetID> = Sheets[T]['returnValue'];

export type SheetHideOtherOptions<T extends SheetID> = Omit<Sheets[T], 'payload' | 'onClose'>;

export type SheetComponentType = ComponentType<any> & ShowSheetEssentialProps;

export type SheetComponent<T extends SheetComponentType> = {
    Component: T;
    id: string;
    props?: ComponentProps<T>;
};

export interface ShowSheetResult<T extends SheetComponentType> {
    id: string;
    open: (props?: ComponentProps<T>, delay?: number) => void;
    update: (props?: ComponentProps<T>) => void;
    close: () => void;
    hide: () => void;
}

export interface SheetProviderContextProps {
    showSheet: <T extends SheetComponentType>(component: T, props?: ComponentProps<T>, delay?: number) => ShowSheetResult<T>,
    hideSheet: <T extends SheetID>(id: T, payload?: SheetHideProps<T>, otherOptions?: SheetHideOtherOptions<T>) => void,
}

