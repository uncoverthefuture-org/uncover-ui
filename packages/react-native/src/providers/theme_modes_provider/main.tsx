import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { ThemeModeProviderContextProps, ThemeModesProviderProps } from "./interface";
import { EmotionThemeName, ExtendUncoverTheme, getDefaultTheme } from "@themes/index";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { app_theme_color_storage } from '@utilities/constants';
import { merge } from 'lodash';

const externalDefaultTheme = getDefaultTheme();

export const ThemeModeProviderContext: React.Context<ThemeModeProviderContextProps> = createContext({
    isLoadingTheme: false,
    theme: externalDefaultTheme.light,
    colors: externalDefaultTheme.light.colors,
    fonts: externalDefaultTheme.light.fonts,
    styledProps: externalDefaultTheme?.light?.styledProps,
    setThemeMode: (themeName) => externalDefaultTheme[themeName],
} as ThemeModeProviderContextProps);

export const ThemeModesProvider: React.FC<ThemeModesProviderProps> = ({
    extendTheme,
    children
}) => {
    const uncoverTheme = getDefaultTheme();
    const { getItem, setItem } = useAsyncStorage(app_theme_color_storage);
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);
    const [activeTheme, setActiveTheme] = useState<ExtendUncoverTheme>(merge(uncoverTheme?.light ?? {}, extendTheme?.light ?? {}));


    const lightTheme = () => merge(uncoverTheme?.light ?? {}, extendTheme?.light ?? {});

    const darkTheme = () => merge(uncoverTheme?.dark ?? {}, extendTheme?.dark ?? {});

    const setThemeMode = (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => {
        setIsLoadingTheme(true)
        const uncoverThemeMode = ((themeName === "dark") ? darkTheme() : lightTheme());
        setActiveTheme(uncoverThemeMode);
        setItem(themeName);
        
        return uncoverThemeMode
    }

    useEffect(() => {
        getItem().then((theme) => {
            let defaultTheme = lightTheme();
            if (theme) {
                defaultTheme = ((theme === "dark") ? darkTheme() : defaultTheme)
                setActiveTheme(defaultTheme)
            }
        });
    }, [extendTheme])

    useEffect(() => {
        setIsLoadingTheme(false)
    }, [activeTheme])

    return (
        <ThemeModeProviderContext.Provider
            value={{
                theme: activeTheme,
                colors: activeTheme.colors,
                fonts: activeTheme.fonts,
                styledProps: activeTheme.styledProps,
                isLoadingTheme,
                setThemeMode,
            }}
        >
            <ThemeProvider theme={activeTheme}>
                {children}
            </ThemeProvider>
        </ThemeModeProviderContext.Provider>
    )
}