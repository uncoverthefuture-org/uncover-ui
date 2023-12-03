import { AlertDialogProps, Button, ButtonProps, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, ModalHeaderProps } from "@chakra-ui/react";
import React from "react";

export interface ChakraDrawerProps {
    title?: string;
    children?: string | React.ReactNode;
    size?: AlertDialogProps['size'],
    isOpen?: boolean;
    onClose?: () => void;
    onProceed?: () => void;
    isProceeding?: boolean;
    isCancelling?: boolean;
    headerProps?: ModalHeaderProps;
    proceedButtonProps?: ButtonProps;
    proceedButtonDefaultChild?: string | React.ReactElement;
    closeButtonProps?: ButtonProps;
    cancelButtonDefaultChild?: string | React.ReactElement;
    focusRef?: React.RefObject<any>
}
export const ChakraDrawer: React.FC<ChakraDrawerProps> = ({
    title = "Sign Out",
    children = "You are about to delete this record kindly click continue to proceed.",
    isOpen = false,
    onClose = () => { },
    onProceed = () => { },
    isProceeding,
    isCancelling,
    headerProps,
    proceedButtonProps,
    closeButtonProps,
    proceedButtonDefaultChild = 'Continue',
    cancelButtonDefaultChild = 'Cancel',
    focusRef,
    ...rest
}) => {
    const cancelRef = React.useRef<any>()

    return (
        <>
            <Drawer
                {...rest}
                isOpen={isOpen}
                placement='right'
                initialFocusRef={focusRef}
                onClose={onClose}
            >

                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize='lg' fontWeight='bold' borderBottomWidth='1px' {...headerProps}>
                        {title}
                    </DrawerHeader>

                    <DrawerBody>
                        {children}
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button
                            variant='outline'
                            ref={cancelRef}
                            onClick={onClose}
                            isLoading={isCancelling}
                            {...closeButtonProps}
                        >
                            {cancelButtonDefaultChild}
                        </Button>
                        <Button
                            colorScheme='red'
                            onClick={onProceed}
                            ml={3}
                            isLoading={isProceeding}
                            {...proceedButtonProps}
                        >
                            {proceedButtonDefaultChild}
                        </Button>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
