import { RFValue } from "react-native-responsive-fontsize";

export const fontSize = {
    xxs: 10.5,
    xs: 13,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 28,
    xxxl: 32
}

export const lineHeight = {
    xxs: 13,
    xs: 14,
    sm: 16,
    base: 18,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
    xxxl: 36
}

export type TextSizesPropsType = typeof fontSize;

let mappingRFFontSize = fontSize;
Object.entries(fontSize).forEach(([key, value]) => {
    mappingRFFontSize = { ...mappingRFFontSize, [key]: RFValue(value) };
});

let mappingRFLineHeight = lineHeight;
Object.entries(lineHeight).forEach(([key, value]) => {
    mappingRFLineHeight = { ...mappingRFLineHeight, [key]: RFValue(value) };
});

export var RFFontSize: TextSizesPropsType = mappingRFFontSize;
export var RFLineHeight: TextSizesPropsType = mappingRFLineHeight;