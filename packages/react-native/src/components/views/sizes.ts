import { RFValue } from "react-native-responsive-fontsize";

export const spacingSize = {
    i4: 4,
    i5: 5,
    i8: 8,
    i10: 10,
    i12: 12,
    i14: 14,
    i16: 16,
    i18: 18,
    i20: 20,
    i24: 24,
    i28: 28,
    i32: 32,
    i40: 40
}

export type SpacingSizesPropsType = typeof spacingSize;

let mappingRFspacingSize = spacingSize;
Object.entries(spacingSize).forEach(([key, value]) => {
    mappingRFspacingSize = { ...mappingRFspacingSize, [key]: RFValue(value) };
});


export var RFSpacingSize: SpacingSizesPropsType = mappingRFspacingSize;
