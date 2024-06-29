import { CreateUncoverThemeProps, UncoverThemeProps } from './interface';
import { EmotionThemeColorBase } from './emotion_theme/main'

export const UncoverTheme: UncoverThemeProps = {
    light: {
        colors: {
            ...EmotionThemeColorBase
        },
        styledProps: {},
    },
    dark: {
        colors: {
            ...EmotionThemeColorBase
        },
        styledProps: {},
    },
};


export const createUncoverTheme = (theme: CreateUncoverThemeProps) => {
    let newTheme = UncoverTheme;
    Object.keys(theme).map((key) => {
        // extend the colors for each color profiles
        if (theme[key]?.colors) {
            newTheme[key]['colors'] = { ...(newTheme[key]['colors'] ?? {}), ...theme[key].colors };
        }
        // extend the styledPropss for each styledProps profiles
        if (theme[key]?.styledProps) {
            newTheme[key]['styledProps'] = { ...(newTheme[key]['styledProps'] ?? {}), ...theme[key].styledProps };
        }
    })


    return newTheme;
}