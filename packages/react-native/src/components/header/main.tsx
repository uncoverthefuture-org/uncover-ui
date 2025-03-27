import React, { ReactNode, useMemo } from "react";
import { BoldText, StyledTextProps } from '../text/styled';
import { useNavigation } from "@react-navigation/native";
import { useThemeMode } from "@providers/hooks";
import { HeaderContainer, SideComponent } from "./styled";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { extendStyledProps } from "@themes/main";
import { fontSize } from "@components/text";
import { StyledTouchableOpacityProps, ViewContainerProps } from "@components/view/types";


export interface NavHeaderProps extends ViewContainerProps {
  title?: string;
  rightComponent?: ReactNode;
  centerComponent?: ReactNode;
  leftComponent?: React.ReactElement;
  rightComponentProps?: StyledTouchableOpacityProps;
  centerComponentProps?: StyledTouchableOpacityProps;
  leftComponentProps?: StyledTouchableOpacityProps;
  onBackPress?: () => void;
  elevation?: number,
  floating?: boolean;
  hasBorderBottom?: boolean;
  backIconColor?: string;
  titleColor?: string;
  titleProps?: StyledTextProps;
  useDefaultBackButon?: boolean;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  ...rest
}) => {
  const { colors, styledProps } = useThemeMode();
  const navigation = useNavigation();
  const { navHeader: props } = extendStyledProps(styledProps, {
    navHeader: {
      backIconColor: colors.black,
      useDefaultBackButon: true,
      onBackPress: () => navigation.goBack(),
    }
  });

  const _props = useMemo(() => ({
    ...props,
    ...styledProps?.navHeader,
    ...rest
  }), [props, styledProps?.navHeader, rest]);

  return (
    <HeaderContainer {..._props}>
      <SideComponent
        onPress={_props?.onBackPress}
        height={'100%'}
        width={"15%"}
        {..._props?.leftComponentProps}
      >
        {(_props?.leftComponent) ? _props?.leftComponent : ((_props?.useDefaultBackButon) && (
          <AntDesign
            name="arrowleft"
            size={24}
            color={_props?.backIconColor}
            onPress={_props?.onBackPress}
          />
        ))}
      </SideComponent>
      <SideComponent
        flexGrow={3}
        {..._props?.centerComponentProps}
      >
        {(_props?.centerComponent) ? _props?.centerComponent : (
          <BoldText
            fontSize={fontSize.md}
            textAlign="center"
            color={_props?.titleColor}
            {..._props?.titleProps}
          >{_props?.title}</BoldText>
        )}
      </SideComponent>
      <SideComponent
        alignItems="flex-end"
        height={'100%'}
        width={"15%"}
        {..._props?.rightComponentProps}
      >
        {(_props?.rightComponent) ? _props?.rightComponent : (
          <>
          </>
        )}
      </SideComponent>
    </HeaderContainer>
  );
};


