import React from 'react';
import { createContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { ThemeModesProviderProps } from "./interface";
import { EmotionTheme, EmotionThemeName } from "../../themes";
import { reactLocalStorage } from "reactjs-localstorage";


export const ThemeModeProviderContext = createContext({
    theme: EmotionTheme.light,
    colors: EmotionTheme.light.colors,
    setTheme: (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => { return EmotionTheme[themeName] },
});

export const ThemeModesProvider: React.FC<ThemeModesProviderProps> = ({
    extendTheme,
    children
}) => {
    const theme = reactLocalStorage.get("@uncover_theme_mode");
    const lightTheme = { ...EmotionTheme.light, ...extendTheme?.light }
    const darkTheme = { ...EmotionTheme.dark, ...extendTheme?.dark }
    const defaultTheme = ((theme != null) ? ((theme === "dark") ? darkTheme : lightTheme) : lightTheme)
    const [activeTheme, setActiveTheme] = useState(defaultTheme);

    const setTheme = (themeName: EmotionThemeName = EmotionThemeName.LIGHT) => {
        const emotionTheme = EmotionTheme[themeName];
        setActiveTheme(emotionTheme);
        reactLocalStorage.set("@uncover_theme_mode", themeName);
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