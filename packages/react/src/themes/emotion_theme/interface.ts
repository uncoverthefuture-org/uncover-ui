export enum EmotionThemeName {
    LIGHT = "light",
    DARK = "dark",
}

export interface ExtendEmotionTheme {
    colors: Theme
}

export type Theme = {
    primary: string;
    primary_tint_1: string;
    primary_tint_2: string;
    primary_tint_3: string;
    primary_tint_4: string;
    danger_tint_3: string,
    danger_tint_2: string,
    danger_tint_1: string,
    secondary: string;
    tertiary: string;
    danger: string;
    warning: string;
    success: string;
    disabled: string;
    neutral_grey_1: string;
    neutral_grey_2: string;
    neutral_grey_3: string;
    neutral_grey_4: string;
    neutral_grey_5: string;
    off_black_1: string;
    off_black_2: string;
    white: string;

};