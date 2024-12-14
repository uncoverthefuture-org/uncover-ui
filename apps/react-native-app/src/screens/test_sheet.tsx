import { RegularText, StyledTouchableOpacity } from "@uncover-ui/react-native"
import { BaseView } from "@uncover-ui/react-native"
import { useSheet } from "@uncover-ui/rn-sheet-provider"
import { ExampleSheet } from "../components/example_sheet";

export const TestSheetScreen = () => {
    const { showSheet} = useSheet();

    const handleOpenSheet = () => {
        const sheet = showSheet(ExampleSheet, {

        })
    }
    return (
        <BaseView>
            <StyledTouchableOpacity>
                <RegularText>
                    Open Shee
                </RegularText>
            </StyledTouchableOpacity>
        </BaseView>
    )
}