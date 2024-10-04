import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, InputElementProps, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, InputRightAddon, InputAddonProps } from "@chakra-ui/react";
import { ActionMeta, InputActionMeta, MultiValue, SingleValue, Select, useChakraSelectProps } from 'chakra-react-select';
import { SizeProp } from 'chakra-react-select';
import React from 'react';



export interface PrimaryMultiSelectOption {
    label: string;
    value: string | number;
    [x: string]: any;
    // back
}
export interface PrimaryMultiSelectProp {
    label?: string;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    name?: string;
    error?: boolean;
    options?: PrimaryMultiSelectOption[];
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
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    selectProps?: boolean;
    isLoading?: boolean;
    size?: SizeProp;
    value?: any;
    isMulti?: boolean;
    inputValue?: any,
    useBasicStyles?: boolean,
    onInputChange?: ((newValue: string, actionMeta: InputActionMeta) => void),
    onChange?: (newValue: SingleValue<any>, actionMeta: ActionMeta<any>) => void,
    onMultiChange?: (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => void,
    downChevron?: React.ReactElement,
    isClearable?: boolean;
    createOptionPosition?: "first" | "last"
    allowCreateWhileLoading?: boolean;
    canCreate?: boolean
}



export const PrimaryMultiSelect: React.FC<PrimaryMultiSelectProp> = ({
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
    isRequired,
    isReadOnly,
    isDisabled,
    isLoading,
    size = "md",
    isMulti,
    onChange,
    onMultiChange,
    name,
    value,
    inputValue,
    onInputChange,
    useBasicStyles = true,
    canCreate,
    ...rest
}) => {
    const leftAddonClass = (Boolean(leftAddon) ? 'select-border-left-0' : '');
    const rightAddonClass = (Boolean(rightAddon) ? 'select-border-right-0' : '');
    const selectProps = useChakraSelectProps({
        name,
        size,
        isMulti,
        // useBasicStyles,
        value,
        inputValue,
        onInputChange,
        isDisabled,
        options,
        isLoading,
        placeholder,
        isInvalid: error,
        onChange: isMulti ? onMultiChange : onChange,
        ...rest
    });


    return (
        <FormControl
            isInvalid={error}
            isRequired={isRequired}
            isReadOnly={isReadOnly}
            {...formControlProps}
        >
            {Boolean(label) && (<FormLabel {...labelProps}>{label}</FormLabel>)}
            <InputGroup size={size} isolation={'unset'}>
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
                    // colorScheme="purple"
                    tagVariant="solid"
                    className={`w-100 primary-multi-select ${leftAddonClass} ${rightAddonClass} bg-white`}
                    {...selectProps}
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
