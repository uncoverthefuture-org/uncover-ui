import { ChakraProviderLoaderProps } from "./chakra_provider"
import { ThemeModesProviderProps } from "./theme_modes_provider/interface"

export interface UIMainProviderProps {
    chakraTheme?: ChakraProviderLoaderProps['theme'],
    chakraProviderProps?: Omit<ChakraProviderLoaderProps, 'children'>,
    themeModesProviderProps?: Omit<ThemeModesProviderProps, 'children'>,
    extendEmotionTheme?: ThemeModesProviderProps['extendTheme'],
    children: React.ReactNode
}