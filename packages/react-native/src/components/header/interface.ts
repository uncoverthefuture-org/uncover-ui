import { StyledViewProps } from "@components/view/interface";
import { ViewProps } from "react-native";

export interface HeaderContainerProps extends ViewProps, StyledViewProps {
    elevation?: number,
    floating?: boolean;
    hasBorderBottom?: boolean;
  }