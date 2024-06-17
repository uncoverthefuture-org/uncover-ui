import React, { useState } from "react";
import DateTimePickerModal, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Entypo } from "@expo/vector-icons";
import { InputPlaceholder } from "./placeholder";
import { PrimaryInputProps } from "./main";

export interface PrimaryDateTimeProp extends PrimaryInputProps {
    placeholder: string,
    date?: string,
    setDate: (date: string) => void,
    dateFormat?: string,
    dateProps?: ReactNativeModalDateTimePickerProps,
};


export const PrimaryDateTime: React.FC<PrimaryDateTimeProp> = ({
    placeholder,
    date,
    setDate,
    dateFormat,
    dateProps,
    ...rest
}) => {
    const defaultDate = (date && date.length) ? moment(date).format('dddd, MMMM Do YYYY') : undefined;
    const [inputValue, setInputValue] = useState<string>(defaultDate ?? '');
    const [open, setOpen] = useState(false)

    return (
        <>
            <InputPlaceholder
                placeholder={placeholder}
                value={inputValue}
                onPress={() => setOpen(true)}
                rightComponent={<Entypo name="calendar" size={16} color="#fff" style={{ marginRight: 10 }} />}
                {...rest}
            />
            <DateTimePickerModal
                {...dateProps}
                date={(date && date.length) ? new Date(date) : undefined}
                isVisible={open}
                mode="date"
                onConfirm={(date: any) => {
                    setInputValue(moment(date).format('dddd, MMMM Do YYYY'));
                    setDate(moment(date).format(dateFormat));
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
            />
        </>
    );
};

