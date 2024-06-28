import { StyledViewProps } from "@components/view/styled";
import { ViewProps } from "react-native";

export interface HeaderContainerProps extends ViewProps, StyledViewProps {
    elevation?: number,
    floating?: boolean;
    hasBorderBottom?: boolean;
  }