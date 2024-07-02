import { StyledViewProps } from "@components/view/interface";
import { TouchableOpacityProps } from "react-native/Libraries/Components/Touchable/TouchableOpacity";

export interface ButtonStylePropsExtra extends StyledViewProps, TouchableOpacityProps{
    focusedBackgroundColor?: string;
}
