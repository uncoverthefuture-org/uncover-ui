import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, InputElementProps, InputGroup, InputLeftElement, InputRightElement, InputAddonProps, InputLeftAddon, InputRightAddon, Checkbox, CheckboxProps, Stack, StackProps, InputGroupProps } from "@chakra-ui/react";
import React from "react";

export interface ExtraCheckboxes extends CheckboxProps {
    inlineText?: string
}

export interface PrimaryCheckBoxProp extends CheckboxProps {
    label?: string;
    isMulti?: boolean;
    checkboxes?: ExtraCheckboxes[];
    multiStackContainerProps?: StackProps,
    inlineText?: string;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    inputGroupProps?: InputGroupProps;
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
}

export const PrimaryCheckBox: React.FC<PrimaryCheckBoxProp> = ({
    label,
    isMulti,
    inlineText,
    labelProps,
    setValue,
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
    multiStackContainerProps,
    checkboxes,
    ...rest
}) => {
    return (
        <FormControl
            isInvalid={error}
            isRequired={rest.isRequired}
            isReadOnly={rest.isReadOnly}
            {...formControlProps}
        >
            {Boolean(label) && (<FormLabel {...labelProps}>{label}</FormLabel>)}
            <InputGroup size={rest.size} {...inputGroupProps}>
                {/* left component goes here  */}
                {Boolean(leftComponent) && (
                    <InputLeftElement {...leftComponentProps}>
                        {leftComponent}
                    </InputLeftElement>
                )}

                {Boolean(leftAddon) && (
                    <InputLeftAddon {...leftAddonProps}>
                        {leftAddon}
                    </InputLeftAddon>
                )}


                {(isMulti) ? (
                    <Stack spacing={4} {...multiStackContainerProps}>
                        {(checkboxes)?.map((props) => (
                            <Checkbox mb={0} colorScheme="teal" {...props} >
                                {props.inlineText}
                            </Checkbox>
                        ))}
                    </Stack>
                ) : (
                    <Checkbox colorScheme="teal" {...rest}>{inlineText}</Checkbox>
                )}


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