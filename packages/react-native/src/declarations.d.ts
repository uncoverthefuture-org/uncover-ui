
import { LogoutSheetProps } from 'app/(tabs)/profile/components/logout_sheet';
import { SheetDefinition } from 'react-native-actions-sheet';

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'logout-sheet': SheetDefinition<{
      payload: LogoutSheetProps,
      returnValue: {}
    }>;
  }

}
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

