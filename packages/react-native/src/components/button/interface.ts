import { StyledViewProps } from "@components/view/interface";
import { TouchableOpacityProps, ViewProps, ViewStyle } from "react-native";

export type StyledButtonProps = ViewStyle & Omit<ViewProps, 'hitSlop'> & TouchableOpacityProps & {
    focusedBackgroundColor?: string;
}

