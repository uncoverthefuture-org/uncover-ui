import { registerSheet } from 'react-native-actions-sheet';
import { LogoutSheet, LogoutSheetProps } from 'app/(tabs)/profile/components/logout_sheet';

const sheets = [
    {
        id: 'logout-sheet', 
        component: LogoutSheet, 
    }
]


sheets.map(({ id, component}) => {
    registerSheet(id, component);
})

export { };