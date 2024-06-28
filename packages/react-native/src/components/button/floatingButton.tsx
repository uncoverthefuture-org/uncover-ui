import React from 'react';
import { useTheme } from '@react-navigation/native';
import { ColorValue, TouchableOpacityProps } from 'react-native';
import { FloatingTouchableOpacity } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useExtendedStyle } from 'hooks/extended_style_hook';
import { StyledViewProps } from '@components/view';


export interface FloatingButtonProps extends TouchableOpacityProps,StyledViewProps {
  icon?: React.ReactElement;
  iconColor?: ColorValue|string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  ...rest
}) => {
  const { colors } = useTheme();
  const { floatingButton: props } = useExtendedStyle({ floatingButton: { 
    backgroundColor: colors.primary,
    activeOpacity: 0.8,
    iconColor: "#fff", 
    ...rest 
  } });
  


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
