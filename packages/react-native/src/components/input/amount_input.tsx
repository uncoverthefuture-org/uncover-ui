import { Ionicons } from "@expo/vector-icons";
import React from "react";
import currencyFormatter from "utils/currencyFormatter";
import { sterilizeNumber } from "utils/general";
import { fontPixel, heightPixel } from "utils/pxToDpConvert";
import { PrimaryInput } from "./main";

export const AmountInput: React.FC<{
    amount?: string;
    error?: boolean;
    incrementBy?: number;
    decrementBy?: number;
    disabled?: boolean;
    onChange?: (value: string) => void;
    setError?: (status: boolean) => void;
}> = ({
    amount = "",
    error,
    disabled = false,
    incrementBy = 10,
    decrementBy = 10,
    onChange,
    setError
}) => {
        return (
            <PrimaryInput
                value={amount.length ? "₦ " + currencyFormatter(amount) : undefined}
                solid={true}
                placeholder="Enter amount"
                inputError={error}
                editable={!disabled}
                keyboardType="numeric"
                bottomText={"Enter a valid amount of minimum a ₦1,000."}
                containerStyle={{
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    paddingVertical: heightPixel(30)
                }}
                style={{ textAlign: 'center', fontSize: fontPixel(24), lineHeight: fontPixel(30) }}
                rightIcon={<Ionicons
                    name="add-circle-outline"
                    size={40} color={disabled ? "grey" : "black"}
                    onPress={() => {
                        if (!disabled) {
                            const curPrice = Number(sterilizeNumber(amount));
                            const newPrice = curPrice + incrementBy;
                            onChange && onChange(String(newPrice));
                        }
                    }}
                />}
                leftIcon={<Ionicons
                    name="remove-circle-outline"
                    size={40} color={disabled ? "grey" : "black"}
                    onPress={() => {
                        if (!disabled) {
                            const curPrice = Number(sterilizeNumber(amount));
                            const newPrice = (curPrice >= decrementBy) ? curPrice - decrementBy : curPrice;
                            onChange && onChange(String(newPrice));
                        }
                    }}
                />}
                onChangeText={(text) => {
                    onChange && onChange(sterilizeNumber(text));
                    setError && setError(false);
                }}
            />
        )
    }