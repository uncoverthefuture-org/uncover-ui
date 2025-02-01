import { TextStyle } from "react-native";

export interface StyledInputProps extends TextStyle {

}

export type ActiveIconProp = {
    inActive: React.ReactElement
    active: React.ReactElement
}

export interface InputBoxProps extends StyledInputProps {
    hasIcon?: boolean,
    disabledOpacity?: InputBoxProps['opacity'],
}