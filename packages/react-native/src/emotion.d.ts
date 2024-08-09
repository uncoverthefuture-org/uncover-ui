import '@emotion/react';
import { ExtendEmotionTheme, EmotionThemeColors } from './themes'

declare module '@emotion/react' {
  export interface Theme extends ExtendEmotionTheme {
  }
}