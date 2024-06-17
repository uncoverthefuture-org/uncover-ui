import { ExtendEmotionTheme } from "./interface";

export const EmothionThemeColorBase: ExtendEmotionTheme['colors'] = {
  white: "#FFFFFF",
  danger: "#fe0000",
  warning: "#eaa218",
  success: "#00ad5a",
  disabled: "#D9D9D9",
  text: "#000000",
  background: "#F8FDFD",
  primary: "#80005C",
  secondary: "#FF31C5",
  tertiary: "#212427",
  black: "#000",
  // others
  primary_2: "#952a77",
  primary_3: "#aa5592",
  primary_4: "#c080ae",
  primary_5: "#d5aac9",
  primary_6: "#e6ccde",
  secondary_2: "#ff53cf",
  secondary_3: "#ff76d8",
  secondary_4: "#ff98e2",
  secondary_5: "#ffbaec",
  secondary_6: "#ffd6f3",
  black_2: "#46494b",
  black_3: "#6b6d6f",
  black_4: "#909293",
  black_5: "#b5b6b7",
  black_6: "#d3d3d4",
  grey_2: "#e7e7e9",
  grey_3: "#ececed",
  grey_4: "#f1f1f2",
  grey_5: "#f5f5f6",
  grey_6: "#f9f9fa",
  green_2: "#2abb76",
  green_3: "#55c891",
  green_4: "#80d6ad",
  green_5: "#aae4c8",
  green_6: "#ccefde",
  yellow_2: "#eeb23e",
  yellow_3: "#f1c165",
  yellow_4: "#f5d18c",
  yellow_5: "#f8e0b2",
  yellow_6: "#fbecd1",
  red_2: "#fe2a2a",
  red_3: "#fe5555",
  red_4: "#ff8080",
  red_5: "#ffaaaa",
  red_6: "#ffcccc",
  primary_dark_shade: "#6b004d",
  secondary_dark_shade: "#d529a4",
  black_dark_shade: "#1c1e21",
  grey_dark_shade: "#bcbcbe",
  green_dark_shade: "#00904b",
  yellow_dark_shade: "#c38714",
  red_dark_shade: "#d40000",
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
