import React from 'react';
import './styles.scss';
import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, Select, InputElementProps, InputGroup, InputLeftElement, SelectProps, InputRightElement, InputLeftAddon, InputRightAddon, InputAddonProps } from "@chakra-ui/react"



export interface PrimarySelectOption {
    text: string | number, props?: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
}
export interface PrimarySelectProp extends SelectProps {
    label?: string;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    error?: boolean;
    options?: PrimarySelectOption[];
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
}

export const PrimarySelect: React.FC<PrimarySelectProp> = ({
    label,
    labelProps,
    setValue,
    options = [],
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
    children,
    ...rest
}) => {
    const leftAddonClass = (Boolean(leftAddon) ? 'select-border-left-0' : '');
    const rightAddonClass = (Boolean(rightAddon) ? 'select-border-right-0' : '');

    return (
        <FormControl
            isInvalid={error}
            isRequired={rest.isRequired}
            isReadOnly={rest.isReadOnly}
            {...formControlProps}
        >
            {Boolean(label) && (<FormLabel {...labelProps}>{label}</FormLabel>)}
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

                <Select 
                {...rest} 
                className={`py-3 h-auto ${leftAddonClass} ${rightAddonClass}`}
                >
                    {(placeholder && placeholder.length) && <option value="" disabled>{placeholder}</option>}
                    {(options).map((item, index) => (
                        <option key={index} {...item.props}>{item.text}</option>
                    ))}
                    {children}
                </Select>

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