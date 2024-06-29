import { Ref } from "react"
import ActionSheet, { ActionSheetProps, ActionSheetRef, SheetProps, Sheets } from "react-native-actions-sheet"
import { random } from 'lodash';
import React from "react";
import { ViewStyle, useWindowDimensions } from "react-native";
export interface PrimarySheetProps extends ActionSheetProps {
    sheetId?: string,
    innerRef?: Ref<ActionSheetRef>,
    isFullScreen?: boolean
}


export const PrimarySheet: React.FC<PrimarySheetProps> = ({
    sheetId = random(1000000, 90000000).toString(),
    innerRef,
    containerStyle,
    isFullScreen = false,
    headerAlwaysVisible= isFullScreen ? false : undefined,
    defaultOverlayOpacity = isFullScreen ? 1 : undefined,
    elevation = isFullScreen ? 0 : undefined,
    overlayColor = isFullScreen ? (containerStyle?.backgroundColor ?? "#fff") : undefined,
    children,
    ...rest
}) => {
    const { height } = useWindowDimensions()

    return (
        <ActionSheet
            ref={innerRef}
            id={sheetId}
            headerAlwaysVisible={headerAlwaysVisible}
            defaultOverlayOpacity={defaultOverlayOpacity}
            overlayColor={overlayColor as string}
            elevation={elevation}
            containerStyle={{
                height: isFullScreen ? height : 'auto',
                ...containerStyle
            }}
            {...rest}
        >
            {children}
        </ActionSheet>
    )
}