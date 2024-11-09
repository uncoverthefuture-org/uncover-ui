import React from "react";
import { FormControl, FormControlProps, FormErrorMessage, FormErrorMessageProps, FormHelperText, FormLabel, FormLabelProps, FormHelperTextProps, Input, InputElementProps, InputGroup, InputLeftElement, InputProps, InputRightElement, InputAddonProps, InputLeftAddon, InputRightAddon, InputGroupProps } from "@chakra-ui/react"
import { useThemeMode } from "../../providers/hooks";

export interface PrimaryInputProp extends InputProps {
    inputRef?: React.LegacyRef<HTMLInputElement>,
    label?: string;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    inputGroupProps?: InputGroupProps;
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

export const PrimaryInput: React.FC<PrimaryInputProp> = ({
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
    inputGroupProps,
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
    const { colors } = useThemeMode();

    return (
        <FormControl
            isInvalid={error}
            isRequired={rest.isRequired}
            isReadOnly={rest.isReadOnly}
            {...formControlProps}
        >
            {Boolean(label) && (
                <FormLabel
                    aria-invalid={error}
                    _invalid={{ color: colors.danger_tint_3 }}
                    {...labelProps}
                >{label}</FormLabel>
            )}
            <InputGroup
                size={rest.size}
                {...inputGroupProps}
            >
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


                <Input
                    ref={inputRef}
                    className="py-3 h-auto"
                    isInvalid={error}
                    isRequired={rest.isRequired}
                    borderColor={colors.neutral_grey_3}
                    focusBorderColor={colors.primary}
                    errorBorderColor={colors.danger_tint_3}
                    _focusVisible={{
                        boxShadow: 'none',
                        borderColor: colors.primary,
                        ...rest?._focusVisible
                    }}
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
            {Boolean(!bottomTextOnError && (!error && bottomText)) && (<FormHelperText {...bottomTextProps}>{bottomText}</FormHelperText>)}
        </FormControl>
    )
}