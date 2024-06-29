
import { ActionSheetProps, SheetDefinition } from 'react-native-actions-sheet';

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    [x:string]: SheetDefinition<{
      payload: ActionSheetProps&{[x:string]: any},
      returnValue: {[x:string]: any}
    }>;
  }

}
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

