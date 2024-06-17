import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { FloatingTouchableOpacity } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';



interface FloatingButtonProps extends TouchableOpacityProps {
  icon?: React.ReactElement;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  ...rest
}) => {
  const { colors } = useTheme();


  return (
    <FloatingTouchableOpacity
      backgroundColor={colors.primary}
      activeOpacity={0.8}
      {...rest}
    >
      {icon ?? <Ionicons name="add" color="#ffffff" size={RFValue(17)} />}
    </FloatingTouchableOpacity>
  );
};
