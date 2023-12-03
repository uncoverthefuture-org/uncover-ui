import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, Textarea, InputElementProps, InputGroup, InputLeftElement, TextareaProps, InputRightElement, InputAddonProps, InputLeftAddon, InputRightAddon } from "@chakra-ui/react"
import React from "react";

export interface PrimaryTextareaProp extends TextareaProps {
    inputRef?: React.LegacyRef<HTMLTextAreaElement>,
    label?: string;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    value?: string;
    error?: boolean;
    bottomTextOnError?: boolean;
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

export const PrimaryTextarea: React.FC<PrimaryTextareaProp> = ({
    inputRef,
    label,
    labelProps,
    setValue,
    error,
    bottomTextOnError = true,
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
    ...rest
}) => {
    return (
        <FormControl
            isInvalid={error}
            isRequired={rest.isRequired}
            isReadOnly={rest.isReadOnly}
            {...formControlProps}
        >
            <FormLabel {...labelProps}>{label}</FormLabel>
            <InputGroup size={rest.size}>
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


                <Textarea
                    ref={inputRef}
                    className="py-3 h-auto"
                    isInvalid={error}
                    isRequired={rest.isRequired}
                    errorBorderColor='red.300'
                    {...rest} />

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
            {Boolean(!bottomTextOnError && (!error && bottomText)) && (<FormHelperText {...bottomTextProps}>{bottomText}</FormHelperText>)}
        </FormControl>
    )
}