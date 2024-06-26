import { CreateUncoverThemeProps, UncoverThemeProps } from './interface';
import { EmotionThemeColorBase } from './emotion_theme/main'
import { font } from '@/utilities';

export const UncoverTheme: UncoverThemeProps = {
    light: {
        colors: {
            ...EmotionThemeColorBase
        },
        styledProps: {},
        fonts: font,
    },
    dark: {
        colors: {
            ...EmotionThemeColorBase
        },
        styledProps: {},
        fonts: font,
    },
};


export const createUncoverTheme = (theme: CreateUncoverThemeProps) => {
    let newTheme = UncoverTheme;
    Object.keys(theme).map((key) => {
        // extend the colors for each color profiles
        if (theme[key]?.colors) {
            newTheme[key]['colors'] = { ...(newTheme[key]['colors'] ?? {}), ...theme[key].colors };
        }
        // extend the styledProps for each styledProps profiles
        if (theme[key]?.styledProps) {
            newTheme[key]['styledProps'] = { ...(newTheme[key]['styledProps'] ?? {}), ...theme[key].styledProps };
        }

        // extend the fonts for each fonts profiles
        if (theme[key]?.fonts) {
            newTheme[key]['fonts'] = { ...(newTheme[key]['fonts'] ?? font), ...theme[key].fonts };
        }
    })


    return newTheme;
}