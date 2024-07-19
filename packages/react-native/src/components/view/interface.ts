import { ViewStyle } from "react-native";


export interface StyledViewProps extends ViewStyle {
    borderRadius?: ViewStyle['borderRadius'] | number;
    bgColor?: ViewStyle['backgroundColor']
    mt?: ViewStyle['marginTop'],
    mb?: ViewStyle['marginBottom'],
    ml?: ViewStyle['marginLeft'],
    mr?: ViewStyle['marginRight'],
    h?: ViewStyle['height'],
    w?: ViewStyle['width'],
}
