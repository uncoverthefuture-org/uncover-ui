import { ThemeFonts } from '@utilities/fonts';
import { UncoverStyleProps } from './../components/interface';
import { ExtendEmotionTheme } from './emotion_theme/interface';

export type ColorProfiles = 'light' | 'dark' | string;

export interface ExtendUncoverTheme {
    colors: ExtendEmotionTheme['colors'];
    styledProps?: UncoverStyleProps;
    fonts?: ThemeFonts;
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