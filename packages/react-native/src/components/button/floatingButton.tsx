import React from 'react';
import { ColorValue, TouchableOpacityProps } from 'react-native';
import { FloatingTouchableOpacity } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyledViewProps } from '@components/view/interface';
import { extendStyledProps } from '@themes/main';
import { useThemeMode } from '@providers/hooks';
import { StyledTouchableOpacityProps } from '@components/view';


export interface FloatingButtonProps extends StyledTouchableOpacityProps, TouchableOpacityProps {
  icon?: React.ReactElement;
  iconColor?: ColorValue | string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  ...rest
}) => {
  const { colors, styledProps } = useThemeMode();
  const { floatingButton: props } = extendStyledProps(styledProps, {
    floatingButton: {
      backgroundColor: colors.primary,
      activeOpacity: 0.8,
      iconColor: "#fff",
      ...rest
    }
  });

  return (
    <FloatingTouchableOpacity
      {...props}
    >
      {props?.icon ?? (
        <Ionicons
          name="add"
          color={props?.iconColor}
          size={RFValue(17)}
        />
      )}
    </FloatingTouchableOpacity>
  );
};
