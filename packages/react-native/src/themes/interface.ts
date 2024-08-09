import { ThemeFonts } from '@utilities/fonts';
import { UncoverStyleProps } from './../components/interface';
import { ExtendEmotionTheme } from './emotion_theme/interface';
import { Theme } from '@emotion/react';

export type ColorProfiles = 'light' | 'dark' | string;

export interface ExtendUncoverTheme extends Theme {
    styledProps?: UncoverStyleProps;
}

export interface CreateUncoverTheme {
    colors?: { [x: string]: string };
    styledProps?: UncoverStyleProps;
    fonts?: ThemeFonts;
}

export interface UncoverThemeProps extends Record<ColorProfiles, ExtendUncoverTheme> {

}

export interface CreateUncoverThemeProps extends Record<ColorProfiles, CreateUncoverTheme> {

}