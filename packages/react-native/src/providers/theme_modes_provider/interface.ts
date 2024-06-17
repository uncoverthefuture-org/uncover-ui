import { ExtendEmotionTheme } from "../../themes"

export interface ThemeModesProviderProps {
    extendTheme?: Record<string, ExtendEmotionTheme>
    children: React.ReactNode
}