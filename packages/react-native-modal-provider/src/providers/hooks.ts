import { useContext } from "react";
import { ModalProviderContext } from "./main";

export const useModal = () => useContext(ModalProviderContext);

