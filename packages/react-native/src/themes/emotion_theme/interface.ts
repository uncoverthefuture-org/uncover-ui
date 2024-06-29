export enum EmotionThemeName {
    LIGHT = "light",
    DARK = "dark",
}

export type EmotionThemeColors = {
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
    border: string;
    placeholder: string;
    label: string;
    // other color types  can come in from here 
    [x:string]: string;
};

export interface ExtendEmotionTheme {
    colors: EmotionThemeColors
}