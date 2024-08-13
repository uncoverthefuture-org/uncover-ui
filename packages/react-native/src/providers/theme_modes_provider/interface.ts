import { Theme } from "@emotion/react";
import { EmotionThemeName } from "@themes/emotion_theme";
import { ExtendUncoverTheme } from "@themes/interface"

export interface ThemeModesProviderProps {
    extendTheme?: Record<string, ExtendUncoverTheme>
    children: React.ReactNode
}

export interface ThemeModeProviderContextProps {
    theme: ExtendUncoverTheme;
    colors: Theme['colors'];
    fonts: ExtendUncoverTheme['fonts'];
    styledProps: ExtendUncoverTheme['styledProps'];
    setThemeMode: (themeName: EmotionThemeName) => ExtendUncoverTheme
}