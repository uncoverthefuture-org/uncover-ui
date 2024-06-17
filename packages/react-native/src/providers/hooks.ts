import { useContext } from "react";
import { ThemeModeProviderContext } from "./theme_modes_provider/main";
import { SheetsProviderContext } from "./sheets_provider/main";

export const useThemeMode = () => useContext(ThemeModeProviderContext);
export const useSheet = () => useContext(SheetsProviderContext);
