import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { BaseSafeView, BaseSafeViewProps, BaseView, BaseViewProps } from "./base_views";
import { SafeAreaViewProps } from "react-native-safe-area-context";
import { ScrollViewContainer } from "./styled";
import { StyledViewProps } from "./interface";


export interface BaseScrollViewProps extends BaseViewProps  {
    scrollViewProps?: ScrollViewProps & StyledViewProps;
}

export const BaseScrollView: React.FC<BaseScrollViewProps> = ({
    scrollViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseView {...rest} >
            <ScrollViewContainer contentContainerStyle={{ flexGrow: 1 }} {...scrollViewProps}>
                {children}
            </ScrollViewContainer>
        </BaseView>
    )
}


export interface BaseSafeScrollViewProps extends BaseSafeViewProps  {
    scrollViewProps?: ScrollViewProps & StyledViewProps;
}

export const BaseSafeScrollView: React.FC<BaseSafeScrollViewProps> = ({
    scrollViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseSafeView {...rest}>
            <ScrollViewContainer contentContainerStyle={{ flexGrow: 1 }} {...scrollViewProps}>
                {children}
            </ScrollViewContainer>
        </BaseSafeView>
    )
}