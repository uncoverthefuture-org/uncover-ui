import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { BaseSafeView, BaseSafeViewProps, BaseViewProps } from "./base_views";
import { SafeAreaViewProps } from "react-native-safe-area-context";


export interface BaseScrollViewProps extends BaseViewProps  {
    scrollViewProps?: ScrollViewProps;
}
export const BaseScrollView: React.FC<BaseScrollViewProps> = ({
    scrollViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseSafeView {...rest} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} {...scrollViewProps}>
                {children}
            </ScrollView>
        </BaseSafeView>
    )
}


export interface BaseSafeScrollViewProps extends BaseSafeViewProps  {
    scrollViewProps?: ScrollViewProps;
}
export const BaseSafeScrollView: React.FC<BaseSafeScrollViewProps> = ({
    scrollViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseSafeView {...rest}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} {...scrollViewProps}>
                {children}
            </ScrollView>
        </BaseSafeView>
    )
}