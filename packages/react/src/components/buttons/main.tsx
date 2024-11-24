import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';
import { useThemeMode } from '../../providers/hooks';

/**
 * Use `Button` to allow users to take actions with clicks and taps.
 *
 * @defaultValue
 * `color="white" | fontSize='small'`
 *
 * @leadingIcon
 * `leadingIcon={<MdHeartBroken />}`
 *
 *
 * @prop
 * `color | backgroundColor | loadingText | fontSize`
 *
 *
 */

export interface PrimaryButtonProps extends ButtonProps {
  value?: string;
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  value,
  children,
  ...rest
}) => {
  const { colors } = useThemeMode();

  return (
    <Button
      color={colors.white}
      backgroundColor={colors.primary}
      loadingText="Submitting"
      fontSize={'small'}
      size={'lg'}
      height="auto"
      _hover={{ backgroundColor: colors.primary_tint_4 }}
      _focus={{
        backgroundColor: colors.primary_tint_4,
        color: colors.neutral_grey_3,
      }}
      {...rest}
    >
      {value}
      {children}
    </Button>
  );
};
