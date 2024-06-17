export enum EmotionThemeName {
    LIGHT = "light",
    DARK = "dark",
}

export interface ExtendEmotionTheme {
    colors: Theme
}

export type Theme = {
    white: string;
    danger: string;
    warning: string;
    success: string;
    disabled: string;
    primary: string;
    secondary: string;
    tertiary: string;
    text: string;
    background: string;
    black: string;
    // other color types  can come in from here 
    primary_2: string;
    primary_3: string;
    primary_4: string;
    primary_5: string;
    primary_6: string;
    secondary_2: string;
    secondary_3: string;
    secondary_4: string;
    secondary_5: string;
    secondary_6: string;
    black_2: string;
    black_3: string;
    black_4: string;
    black_5: string;
    black_6: string;
    green_2: string;
    green_3: string;
    green_4: string;
    green_5: string;
    green_6: string;
    yellow_2: string;
    yellow_3: string;
    yellow_4: string;
    yellow_5: string;
    yellow_6: string;
    red_2: string;
    red_3: string;
    red_4: string;
    red_5: string;
    red_6: string;
    grey_2: string;
    grey_3: string;
    grey_4: string;
    grey_5: string;
    grey_6: string;
    primary_dark_shade: string;
    secondary_dark_shade: string;
    black_dark_shade: string;
    green_dark_shade: string;
    yellow_dark_shade: string;
    red_dark_shade: string;
    grey_dark_shade: string;
};