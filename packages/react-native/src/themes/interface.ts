import { UncoverStyleProps } from './../components/interface';
import { ExtendEmotionTheme } from './emotion_theme/interface';

export type ColorProfiles = 'light'|'dark'|string;

export interface ExtendUncoverTheme {
    colors: ExtendEmotionTheme['colors'];
    styledProps?: UncoverStyleProps
}

export interface CreateUncoverTheme {
    colors?: ExtendEmotionTheme['colors'];
    styledProps?: UncoverStyleProps
}

export interface UncoverThemeProps extends Record<ColorProfiles, ExtendUncoverTheme>{

}

export interface CreateUncoverThemeProps extends Record<ColorProfiles, CreateUncoverTheme>{

}