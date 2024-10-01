import { ViewContainerProps } from "@components/view/types";

export interface HeaderContainerProps extends ViewContainerProps {
    elevation?: number,
    floating?: boolean;
    hasBorderBottom?: boolean;
  }