import { Ref, useRef } from "react"
import React from "react";
import { Modal, ModalProps } from "react-native";
import { BaseModal } from "@components/view";
import { PrimaryFlashMessage, PrimaryFlashMessageProps } from "@components/notify";
import FlashMessage from "react-native-flash-message";


export interface PrimaryModalProps extends ModalProps {
    innerRef?: Ref<Modal>,
    flashMessgeRef?: Ref<FlashMessage>,
    flashMessageProps?: PrimaryFlashMessageProps;
}


export const PrimaryModal: React.FC<PrimaryModalProps> = ({
    innerRef,
    flashMessgeRef,
    flashMessageProps,
    children,
    ...rest
}) => {
    const flashRef = useRef<FlashMessage>(null);


    return (
        <BaseModal
            ref={innerRef}
            {...rest}
        >
            {children}
            <PrimaryFlashMessage
                innerRef={flashMessgeRef ?? flashRef}
                {...flashMessageProps}
            />
        </BaseModal>
    )
}