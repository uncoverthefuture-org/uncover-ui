import { Ref } from "react"
import ActionSheet, { ActionSheetProps, ActionSheetRef, SheetProps, Sheets } from "react-native-actions-sheet"
import { random } from 'lodash';
export interface PrimarySheetProps extends ActionSheetProps {
    sheetId?: string ,
    innerRef?: Ref<ActionSheetRef>,
}

export const PrimarySheet: React.FC<PrimarySheetProps> = ({
    sheetId = random(1000000, 90000000).toString(),
    innerRef,
    children,
    ...rest
}) => {
    return (
        <ActionSheet
            ref={innerRef}
            id={sheetId}
            // isModal={false}
            // backgroundInteractionEnabled={true}
            // containerStyle={{
            //     height: heightPercentageToDP('100%'),
            //     paddingTop: top,
            // }}
            {...rest}
        >
            {children}
        </ActionSheet>
    )
}