import './styles.scss';
import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, InputElementProps, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, InputRightAddon, InputAddonProps, InputGroupProps } from "@chakra-ui/react";
import { SizeProp } from 'chakra-react-select/dist/types/types';
import React from 'react';



export interface PrimaryInputWrapperProp {
    label?: string;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    inputGroupProps?: InputGroupProps;
    error?: boolean;
    size?: SizeProp;
    bottomText?: string | React.ReactElement;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
    leftComponentProps?: InputElementProps;
    rightComponentProps?: InputElementProps;
    leftAddonProps?: InputAddonProps;
    rightAddonProps?: InputAddonProps;
    errorTextProps?: FormErrorMessageProps;
    bottomTextProps?: FormHelperTextProps;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    children?: React.ReactNode
}


export const PrimaryInputWrapper: React.FC<PrimaryInputWrapperProp> = ({
    label,
    labelProps,
    error,
    bottomText,
    leftComponent,
    rightComponent,
    formControlProps,
    inputGroupProps,
    leftComponentProps,
    rightComponentProps,
    leftAddon,
    rightAddon,
    leftAddonProps,
    rightAddonProps,
    errorTextProps,
    bottomTextProps,
    isRequired,
    isReadOnly,
    isDisabled,
    size = "md",
    children,
}) => {

    return (
        <FormControl
            isInvalid={error}
            isRequired={isRequired}
            isReadOnly={isReadOnly}
            isDisabled={isDisabled}
            {...formControlProps}
        >
            {Boolean(label) && (<FormLabel {...labelProps}>{label}</FormLabel>)}
            <InputGroup size={size} isolation={'unset'} {...inputGroupProps}>
                {/* left component goes here  */}
                {Boolean(leftComponent) && (
                    <InputLeftElement  {...leftComponentProps}>
                        {leftComponent}
                    </InputLeftElement>
                )}

                {Boolean(leftAddon) && (
                    <InputLeftAddon  {...leftAddonProps}>
                        {leftAddon}
                    </InputLeftAddon>
                )}

                {children}

                {Boolean(rightAddon) && (
                    <InputRightAddon {...rightAddonProps}>
                        {rightAddon}
                    </InputRightAddon>
                )}

                {/* right component goes here  */}
                {Boolean(rightComponent) && (
                    <InputRightElement {...rightComponentProps}>
                        {rightComponent}
                    </InputRightElement>
                )}
            </InputGroup>
            {Boolean(error && bottomText) && (<FormErrorMessage {...errorTextProps}>{bottomText}</FormErrorMessage>)}
            {Boolean(!error && bottomText) && (<FormHelperText {...bottomTextProps}>{bottomText}</FormHelperText>)}
        </FormControl>
    )
}
