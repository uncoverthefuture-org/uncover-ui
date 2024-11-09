import { ThemeModesProviderProps } from "./theme_modes_provider/interface"
import { UncoverStyleProps } from '@components/interface';


export interface UncoverProviderContextProps {
}


export interface UncoverProviderProps {
    extendTheme?: ThemeModesProviderProps['extendTheme'],
    children: React.ReactNode
}

