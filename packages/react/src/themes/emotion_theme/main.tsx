import { ExtendEmotionTheme } from "./interface";

export const EmothionThemeColorBase: ExtendEmotionTheme['colors'] = {
  primary: "#005E5E",
  primary_tint_1: "#C5F6E5",
  primary_tint_2: "#8FEED6",
  primary_tint_3: "#52CEB9",
  primary_tint_4: "#003F3F",
  danger_tint_3: "#FFA39E",
  danger_tint_2: "#FFCCC7",
  danger_tint_1: "#FFF1F0",
  secondary: " #F8AB29",
  tertiary: "#FF8749",
  danger: "#FF4D4F",
  warning: "#FAAD14",
  success: "#73D13D",
  disabled: "#D9D9D9",
  neutral_grey_1: "#FAFAFA",
  neutral_grey_2: "#F0F0F0",
  neutral_grey_3: "#D9D9D9",
  neutral_grey_4: "#8C8C8C",
  neutral_grey_5: "#595959",
  off_black_1: "#595959",
  off_black_2: "#141414",
  white: "#FFFFFF",
}

export const EmotionTheme: Record<string, ExtendEmotionTheme> = {
  light: {
    colors: {
      ...EmothionThemeColorBase
    }
  },
  dark: {
    colors: {
      ...EmothionThemeColorBase
    }
  },
};
