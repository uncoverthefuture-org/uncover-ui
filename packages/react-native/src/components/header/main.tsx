import React, { ReactNode } from "react";
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
      ...styledProps?.navHeader,
      onBackPress: () => navigation.goBack(),
      ...rest
    }
  });

  return (
    <HeaderContainer  {...props}>
      <SideComponent
        onPress={props?.onBackPress}
        height={'100%'}
        width={"15%"}
        {...props?.leftComponentProps}
      >
        {(props?.leftComponent) ? props?.leftComponent : ((props?.useDefaultBackButon) && (
          <AntDesign
            name="arrowleft"
            size={24}
            color={props?.backIconColor}
            style={{ marginTop: 3 }}
            onPress={props?.onBackPress}
          />
        ))}
      </SideComponent>
      <SideComponent
        flexGrow={3}
        {...props?.centerComponentProps}
      >
        {(props?.centerComponent) ? props?.centerComponent : (
          <BoldText
            fontSize={fontSize.md}
            textAlign="center"
            color={props?.titleColor}
            {...props?.titleProps}
          >{props?.title}</BoldText>
        )}
      </SideComponent>
      <SideComponent
        alignItems="flex-end"
        height={'100%'}
        width={"15%"}
        {...props?.rightComponentProps}
      >
        {(props?.rightComponent) ? props?.rightComponent : (
          <>
          </>
        )}
      </SideComponent>
    </HeaderContainer>
  );
};


