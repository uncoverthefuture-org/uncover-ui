import '../../assets/css/input.scss';
import 'react-phone-number-input/style.css';
import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, InputElementProps, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, InputRightAddon, InputAddonProps } from "@chakra-ui/react";
import PhoneInput, { DefaultInputComponentProps } from 'react-phone-number-input';
import React from 'react';


export interface PrimaryPhoneProp extends DefaultInputComponentProps {
    label?: string;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    value?: string;
    error?: boolean;
    bottomText?: string | React.ReactElement;
    setValue?: (value: string) => void;
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
    placeholder?: string;
    children?: React.ReactNode;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    onChange?: (value?: string) => void
}

export const PrimaryPhone: React.FC<PrimaryPhoneProp> = ({
    label,
    labelProps,
    setValue,
    error,
    bottomText,
    leftComponent,
    rightComponent,
    formControlProps,
    leftComponentProps,
    rightComponentProps,
    leftAddon,
    rightAddon,
    leftAddonProps,
    rightAddonProps,
    errorTextProps,
    bottomTextProps,
    placeholder,
    isRequired,
    isReadOnly,
    isDisabled,
    children,
    onChange = () => {},
    ...rest
}) => {
    const leftAddonClass = (Boolean(leftAddon) ? 'select-border-left-0' : '');
    const rightAddonClass = (Boolean(rightAddon) ? 'select-border-right-0' : '');

    return (
        <FormControl
            isInvalid={error}
            isRequired={isRequired}
            isReadOnly={isReadOnly}
            {...formControlProps}
        >
            <FormLabel {...labelProps}>{label}</FormLabel>
            <InputGroup size={rest.size}>
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

                <PhoneInput
                    className={`${leftAddonClass} ${rightAddonClass}`}
                    onChange={(phone) => onChange(String(phone))}
                    defaultCountry="US"
                    placeholder={placeholder}
                    disabled={isDisabled}

                    {...rest}
                />

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