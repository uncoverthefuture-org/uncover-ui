import React from "react";
import { ScrollViewProps } from "react-native";
import { BaseSafeView, BaseSafeViewProps, BaseView, BaseViewProps } from "./base_views";
import { ScrollViewContainer } from "./styled";
import { StyledViewProps } from "./interface";


export interface BaseScrollViewProps extends BaseViewProps {
    scrollViewProps?: ScrollViewProps & StyledViewProps;
}

export const BaseScrollView: React.FC<BaseScrollViewProps> = ({
    scrollViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseView {...rest} >
            <ScrollViewContainer
                contentContainerStyle={[{ flexGrow: 1, flex: 1, }, scrollViewProps?.contentContainerStyle]}
                {...scrollViewProps}
            >
                {children}
            </ScrollViewContainer>
        </BaseView>
    )
}


export interface BaseSafeScrollViewProps extends BaseSafeViewProps {
    scrollViewProps?: ScrollViewProps & StyledViewProps;
}

export const BaseSafeScrollView: React.FC<BaseSafeScrollViewProps> = ({
    scrollViewProps,
    children,
    ...rest
}) => {
    return (
        <BaseSafeView {...rest}>
            <ScrollViewContainer
                contentContainerStyle={[{ flexGrow: 1, flex: 1, }, scrollViewProps?.contentContainerStyle]}
                {...scrollViewProps}
            >
                {children}
            </ScrollViewContainer>
        </BaseSafeView>
    )
}