import { ComponentProps, ComponentType } from "react";
import { Modal, ModalProps } from "react-native";

export interface ExtendedModapProps extends ModalProps{
    [x:string]: any;
}

export type ModalComponentType = ComponentType<Modal&ExtendedModapProps>;

export interface ShowModalResult<T extends ModalComponentType> {
    index?: number;
    update: (props?: ComponentProps<T>) => void;
    close: () => void;
}

export interface ModalProviderContextProps {
    showModal: <T extends ModalComponentType>(component: T, props?: ComponentProps<T>) => ShowModalResult<T>,
}

export interface ModalProviderProps {
    children: React.ReactNode
}


export type ModalComponent<T extends ComponentType<any>> = {
    Component: T;
    props?: ComponentProps<T>;
};