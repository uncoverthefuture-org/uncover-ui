import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { ThemeModesProviderProps } from "./interface";
import { EmotionTheme, EmotionThemeName, ExtendEmotionTheme } from "themes";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { app_theme_color_storage } from 'utils/constants';


export const ThemeModeProviderContext = createContext({
    theme: EmotionTheme.light,
    colors: EmotionTheme.light.colors,
    setTheme: (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => { return EmotionTheme[themeName] },
});

export const ThemeModesProvider: React.FC<ThemeModesProviderProps> = ({
    extendTheme,
    children
}) => {
    const { getItem, setItem } = useAsyncStorage(app_theme_color_storage);
    const lightTheme = { ...EmotionTheme.light, ...extendTheme?.light }
    const darkTheme = { ...EmotionTheme.dark, ...extendTheme?.dark }
    const [activeTheme, setActiveTheme] = useState<ExtendEmotionTheme>(lightTheme);

    useEffect(() => {
        getItem().then((theme) => {
            if(theme){
                const defaultTheme = ((theme != null) ? ((theme === "dark") ? darkTheme : lightTheme) : lightTheme)
                setActiveTheme(defaultTheme)
            }
        });
    }, [])

    const setTheme = (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => {
        const emotionTheme = ((themeName === "dark") ? darkTheme : lightTheme);
        setActiveTheme(emotionTheme);
        setItem(themeName);

        return emotionTheme
    }


    return (
        <ThemeModeProviderContext.Provider
            value={{
                theme: activeTheme,
                colors: activeTheme.colors,
                setTheme,
            }}
        >
            <ThemeProvider theme={activeTheme}>
                {children}
            </ThemeProvider>
        </ThemeModeProviderContext.Provider>
    )
}