import React, { useState } from "react";
import DateTimePickerModal, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { InputPlaceholder, InputPlaceholderProps } from "./placeholder";
import Entypo from 'react-native-vector-icons/Entypo'
import { useExtendedStyle } from '@hooks/extended_style_hook';

export interface PrimaryDateTimeInputProps extends Omit<InputPlaceholderProps, 'onChange'> {
    onChange?: (date: string) => void,
    dateFormat?: string,
    datePickerProps?: ReactNativeModalDateTimePickerProps,
}


export const PrimaryDateTimeInput: React.FC<PrimaryDateTimeInputProps> = ({
    onChange = () => {},
    ...rest
}) => {
    const { primaryDateTimeInput: props } = useExtendedStyle({ primaryDateTimeInput: {
        dateFormat: "dddd, MMMM Do YYYY",
         ...rest 
    } });
    const defaultDate = (props?.value && props?.value.length) ? moment(props?.value).format(props?.dateFormat) : undefined;
    const [inputValue, setInputValue] = useState<string>(defaultDate ?? '');
    const [open, setOpen] = useState(false)

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

