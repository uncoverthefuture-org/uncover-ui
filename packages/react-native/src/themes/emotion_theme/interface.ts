import { Theme } from "@emotion/react";
import { ThemeFonts } from "@utilities/fonts";

export enum EmotionThemeName {
    LIGHT = "light",
    DARK = "dark",
}

export interface EmotionThemeColors  {
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
    transparent: string;
    // other color types  can come in from here 
    // [x:string]: string;
};

export interface ExtendEmotionTheme {
    colors: EmotionThemeColors;
    fonts?: ThemeFonts;
}