import { Ref, useRef } from "react"
import React from "react";
import { Modal, ModalProps, ViewStyle } from "react-native";
import { BaseModal } from "@components/view";
import { PrimaryFlashMessage, PrimaryFlashMessageProps } from "@components/notify";
import FlashMessage from "react-native-flash-message";
import { StyledViewProps } from "@components/view/interface";


export interface PrimaryModalProps extends ViewStyle, ModalProps  {
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