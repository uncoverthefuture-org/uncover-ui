import { useContext } from "react";
import { SheetProviderContext } from "./main";

export const useSheet = () => useContext(SheetProviderContext);

