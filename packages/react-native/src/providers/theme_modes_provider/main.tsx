import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { ThemeModeProviderContextProps, ThemeModesProviderProps } from "./interface";
import { UncoverTheme, EmotionThemeName, ExtendUncoverTheme } from "@themes/index";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { app_theme_color_storage } from '@utilities/constants';


export const ThemeModeProviderContext: React.Context<ThemeModeProviderContextProps> = createContext({
    theme: UncoverTheme.light,
    colors: UncoverTheme.light.colors,
    styledProps: UncoverTheme?.light?.styledProps,
    setThemeMode: (themeName) => UncoverTheme[themeName],
});

export const ThemeModesProvider: React.FC<ThemeModesProviderProps> = ({
    extendTheme,
    children
}) => {
    const { getItem, setItem } = useAsyncStorage(app_theme_color_storage);
    const lightTheme = { ...UncoverTheme.light, ...extendTheme?.light }
    const darkTheme = { ...UncoverTheme.dark, ...extendTheme?.dark }
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
        const uncoverTheme = ((themeName === "dark") ? darkTheme : lightTheme);
        setActiveTheme(uncoverTheme);
        setItem(themeName);

        return uncoverTheme
    }


    return (
        <ThemeModeProviderContext.Provider
            value={{
                theme: activeTheme,
                colors: activeTheme.colors,
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