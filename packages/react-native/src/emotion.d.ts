import '@emotion/react';
import { ExtendEmotionTheme } from './themes'

declare module '@emotion/react' {
  export interface Theme extends ExtendEmotionTheme {

  }
}