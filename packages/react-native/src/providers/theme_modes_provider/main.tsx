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
        // console.log(`Updated theme too ${themeName}: `, uncoverThemeMode)
        return uncoverThemeMode
    }

    useEffect(() => {
        // console.log("Reloading theme as extendtheme updates...")
        setIsLoadingTheme(true)
        getItem().then((theme) => {
            // console.log("Reloading using theme defined in storage...")
            const storedThemeMode = theme ?? undefined
            setThemeMode(storedThemeMode as EmotionThemeName)
        }).catch(() => {
            // console.log("Reloading using default defined...")
            setThemeMode()
        });
}, [extendTheme])

    useEffect(() => {
        setIsLoadingTheme(false)
        // console.log("Finalized Loading Theme")
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