import React, { useEffect, useState } from "react";
import DateTimePickerModal, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { InputPlaceholder, InputPlaceholderProps } from "./placeholder";
import Entypo from 'react-native-vector-icons/Entypo'
import { useThemeMode } from "@providers/hooks";
import { extendStyledProps } from "@themes/main";

export interface PrimaryDateTimeInputProps extends Omit<InputPlaceholderProps, 'onChange'> {
    onChange?: (date: string) => void,
    dateFormat?: string,
    datePickerProps?: ReactNativeModalDateTimePickerProps,
}


export const PrimaryDateTimeInput: React.FC<PrimaryDateTimeInputProps> = ({
    onChange = () => { },
    ...rest
}) => {
    const [open, setOpen] = useState(false)
    const { colors, fonts, styledProps } = useThemeMode();
    const [inputValue, setInputValue] = useState<string>('');
    const { primaryDateTimeInput: props } = extendStyledProps(styledProps, {
        primaryDateTimeInput: {
            dateFormat: "dddd, MMMM Do YYYY",
            ...styledProps?.primaryDateTimeInput,
            ...rest
        }
    });

    const defaultDate = () => (props?.value && props?.value.length) ? moment(props?.value).format(props?.dateFormat) : undefined;

    useEffect(() => {
        setInputValue(defaultDate() ?? '')
    }, [])

    return (
        <>
            <InputPlaceholder
                placeholder={props?.placeholder}
                value={inputValue}
                onPress={() => setOpen(true)}
                rightComponent={<Entypo name="calendar" size={16} color="#fff" style={{ marginRight: 10 }} />}
                {...rest}
            />
            <DateTimePickerModal
                date={(props?.value && props?.value.length) ? new Date(props?.value) : undefined}
                isVisible={open}
                mode="date"
                onConfirm={(date: any) => {
                    setInputValue(moment(date).format(props?.dateFormat));
                    onChange(moment(date).format(props?.dateFormat));
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                on
                {...props?.datePickerProps}
            />
        </>
    );
};

