import { BoldText } from "@uncover-ui/react-native"
import { PrimarySheet, PrimarySheetProps } from "@uncover-ui/rn-sheet-provider"

export interface ExampleSheetProps extends PrimarySheetProps{

}
export const ExampleSheet: React.FC<ExampleSheetProps> = ({
    ...rest
}) => {
    return (
        <PrimarySheet
            {...rest}
        >
            <BoldText>
                Big Sheet
            </BoldText>
        </PrimarySheet>
    )
}