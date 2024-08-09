import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import { BoldText, StyledTextProps } from '../text/styled';
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useThemeMode } from "@providers/hooks";
import { HeaderContainerProps } from "./interface";
import { HeaderContainer, SideComponent } from "./styled";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StyledViewProps } from "@components/view/interface";
import { extendStyledProps } from "@themes/main";
import { fontSize } from "@components/text";


export interface NavHeaderProps extends HeaderContainerProps {
  title?: string;
  rightComponent?: ReactNode;
  centerComponent?: ReactNode;
  leftComponent?: React.ReactElement;
  rightComponentProps?: TouchableOpacityProps & StyledViewProps;
  centerComponentProps?: TouchableOpacityProps & StyledViewProps;
  leftComponentProps?: TouchableOpacityProps & StyledViewProps;
  onBackPress?: () => void;
  elevation?: number;
  backIconColor?: string;
  titleColor?: string;
  titleProps?: StyledTextProps;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  ...rest
}) => {
  const { colors, styledProps } = useThemeMode();
  const navigation = useNavigation();
  const { navHeader: props } = extendStyledProps(styledProps, {
    navHeader: {
      backIconColor: colors.black,
      onBackPress: rest?.onBackPress ?? (() => navigation.goBack()),
      ...styledProps?.navHeader,
      ...rest
    }
  });

  return (
    <HeaderContainer  {...rest}>
      <SideComponent
        onPress={props?.onBackPress}
        height={'100%'}
        width={"15%"}
        {...props?.leftComponentProps}
      >
        {(props?.leftComponent) ? props?.leftComponent : (
          <AntDesign
            name="arrowleft"
            size={24}
            color={props?.backIconColor}
            style={{ marginTop: 3 }}
            onPress={props?.onBackPress}
          />
        )}
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


