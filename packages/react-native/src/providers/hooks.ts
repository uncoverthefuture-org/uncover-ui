import { useContext } from "react";
import { ThemeModeProviderContext } from "./theme_modes_provider/main";
import { SheetsProviderContext } from "./sheets_provider/main";
import { UncoverProviderContext } from "./main";

export const useThemeMode = () => useContext(ThemeModeProviderContext);
export const useSheet = () => useContext(SheetsProviderContext);
export const useUncover = () => useContext(UncoverProviderContext);
