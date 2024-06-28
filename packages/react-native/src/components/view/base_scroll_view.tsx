import { ScrollView, ScrollViewProps } from "react-native";
import { BaseSafeView, BaseViewProps } from "./base_views";
import { SafeAreaViewProps } from "react-native-safe-area-context";


export interface BaseScrollViewProps extends ScrollViewProps {
    baseViewProps?: BaseViewProps;
}
export const BaseScrollView: React.FC<BaseScrollViewProps> = ({
    baseViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseSafeView baseViewProps={baseViewProps} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} {...rest}>
                {children}
            </ScrollView>
        </BaseSafeView>
    )
}


export interface BaseSafeScrollViewProps extends ScrollViewProps {
    baseViewProps?: BaseViewProps;
    safeAreaViewProps?: SafeAreaViewProps;
}
export const BaseSafeScrollView: React.FC<BaseSafeScrollViewProps> = ({
    baseViewProps,
    safeAreaViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseSafeView baseViewProps={baseViewProps} {...safeAreaViewProps}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} {...rest}>
                {children}
            </ScrollView>
        </BaseSafeView>
    )
}