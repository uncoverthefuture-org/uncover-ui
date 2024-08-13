import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { ThemeModeProviderContextProps, ThemeModesProviderProps } from "./interface";
import { EmotionThemeName, ExtendUncoverTheme, getDefaultTheme } from "@themes/index";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { app_theme_color_storage } from '@utilities/constants';

const externalDefaultTheme = getDefaultTheme();

export const ThemeModeProviderContext: React.Context<ThemeModeProviderContextProps> = createContext({
    theme: externalDefaultTheme.light,
    colors: externalDefaultTheme.light.colors,
    fonts: externalDefaultTheme.light.fonts,
    styledProps: externalDefaultTheme?.light?.styledProps,
    setThemeMode: (themeName) => externalDefaultTheme[themeName],
});

export const ThemeModesProvider: React.FC<ThemeModesProviderProps> = ({
    extendTheme,
    children
}) => {
    const uncoverTheme = getDefaultTheme();
    const lightTheme = { ...uncoverTheme?.light, ...extendTheme?.light };
    const darkTheme = { ...uncoverTheme?.dark, ...extendTheme?.dark };
    const { getItem, setItem } = useAsyncStorage(app_theme_color_storage);
    const [activeTheme, setActiveTheme] = useState<ExtendUncoverTheme>(lightTheme);

    useEffect(() => {
        getItem().then((theme) => {
            if (theme) {
                const defaultTheme = ((theme != null) ? ((theme === "dark") ? darkTheme : lightTheme) : lightTheme)
                setActiveTheme(defaultTheme)
            }
        });
    }, [])

    const setThemeMode = (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => {
        const uncoverThemeMode = ((themeName === "dark") ? darkTheme : lightTheme);
        setActiveTheme(uncoverThemeMode);
        setItem(themeName);

        return uncoverThemeMode
    }


    return (
        <ThemeModeProviderContext.Provider
            value={{
                theme: activeTheme,
                colors: activeTheme.colors,
                fonts: activeTheme.fonts,
                styledProps: activeTheme.styledProps,
                setThemeMode,
            }}
        >
            <ThemeProvider theme={activeTheme}>
                {children}
            </ThemeProvider>
        </ThemeModeProviderContext.Provider>
    )
}