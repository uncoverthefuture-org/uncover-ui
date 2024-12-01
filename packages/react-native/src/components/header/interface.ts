import { ViewContainerProps } from "@components/view";

export interface HeaderContainerProps extends ViewContainerProps {
  elevation?: number,
  floating?: boolean;
  hasBorderBottom?: boolean;
}