import { Ref } from "react";
import { ActionSheetProps, ActionSheetRef } from "react-native-actions-sheet";
import React from "react";
export interface PrimarySheetProps extends ActionSheetProps {
    sheetId?: string;
    innerRef?: Ref<ActionSheetRef>;
    isFullScreen?: boolean;
}
export declare const PrimarySheet: React.FC<PrimarySheetProps>;
