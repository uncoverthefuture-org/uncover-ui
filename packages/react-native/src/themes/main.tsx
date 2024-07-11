import { CreateUncoverThemeProps, UncoverThemeProps } from './interface';
import { EmotionThemeColorBase } from './emotion_theme/main'
import { font } from '@utilities/fonts';
import { UncoverStyleProps } from '@components/interface';
import { merge } from 'lodash';


export const extendStyledProps = (currentStyledProps: UncoverStyleProps = {}, newStyledProps: UncoverStyleProps = {}) => {
    const styled: UncoverStyleProps = currentStyledProps;

    Object.keys(newStyledProps).map((key) => {
        const prop = key as keyof UncoverStyleProps;
        if (newStyledProps[prop] && styled[prop]) {
            styled[prop] = merge((styled[prop] as any), (newStyledProps[prop] as any));
        } else {
            styled[prop] = newStyledProps[prop] as any;
        }
    })

    return { ...newStyledProps };
}

export const getDefaultTheme = (): UncoverThemeProps => {
    const colors = { ...EmotionThemeColorBase };
    const light = ({
        colors,
        styledProps: {
            primaryButton: {
                focusedBackgroundColor: colors.primary,
                backgroundColor: colors.primary,
                loadColor: colors.white,
                color: colors?.white,
            }
        },
        fonts: font,
    });

    const dark = {
        ...light
    }

    return ({ light, dark });
};

export const createUncoverTheme = (theme: CreateUncoverThemeProps) => {
    let newTheme = getDefaultTheme();
    Object.keys(theme).map((key) => {
        // extend the colors for each color profiles
        if (theme[key]?.colors) {
            newTheme[key]['colors'] = { ...(newTheme[key]['colors'] ?? {}), ...theme[key].colors };
        }

        // extend the styledProps for each styledProps profiles
        if (theme[key]?.styledProps) {
            newTheme[key]['styledProps'] = merge((newTheme[key]['styledProps'] ?? {}), (theme[key].styledProps ?? {}));
        }

        // extend the fonts for each fonts profiles
        if (theme[key]?.fonts) {
            newTheme[key]['fonts'] = { ...(newTheme[key]['fonts'] ?? font), ...theme[key].fonts };
        }
    })


    return newTheme;
}

export const UncoverTheme = getDefaultTheme();



