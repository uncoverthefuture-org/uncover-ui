import { useContext } from "react";
import { UncoverUIProviderContext } from "./main";
import { ThemeModeProviderContext } from "./theme_modes_provider";


export const useUncoverUIProvider = () => useContext(UncoverUIProviderContext);
export const useThemeMode = () => useContext(ThemeModeProviderContext);


