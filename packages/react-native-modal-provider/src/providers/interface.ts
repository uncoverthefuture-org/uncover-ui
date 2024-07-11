import { ComponentProps, ComponentType } from "react";
import { Modal, ModalProps } from "react-native";

export interface ExtendedModalProps extends ModalProps{
    [x:string]: any;
}

// export type ModalComponentType = ComponentType<Modal&ExtendedModalProps>;

export type ModalComponentType = ComponentType<any>;

export interface ShowModalResult<T extends ModalComponentType> {
    id: string;
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
    id: string;
    props?: ComponentProps<T>;
};