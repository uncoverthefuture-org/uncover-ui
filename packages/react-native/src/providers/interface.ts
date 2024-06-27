import { ThemeModesProviderProps } from "./theme_modes_provider/interface"
import { UncoverStyleProps } from '@components/interface';


export interface UncoverProviderContextProps {
    extendedStyle: UncoverStyleProps;
    setExtendedStyle: (props: UncoverStyleProps) => void
}


export interface UncoverProviderProps {
    extendStyle?: UncoverStyleProps;
    extendTheme?: ThemeModesProviderProps['extendTheme'],
    children: React.ReactNode
}

