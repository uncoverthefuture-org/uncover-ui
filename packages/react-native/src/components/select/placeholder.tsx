import styled from "@emotion/native";
import React from "react";
import { RegularText } from "../text/styled";
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from "utilities/pxToDpConvert";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { ViewStyle, TextStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useThemeMode } from "@providers/hooks";
import { BottomText, InputWrapper } from "components/input/styled";
import { InputColorState, PrimaryInputProps } from "components/input/main";
import { useExtendedStyle } from "hooks/extended_style_hook";

const IconWrapper = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginRight: wp(2),
});

const InputSection = styled.View({
  flexGrow: 1,
})


export interface SelectInputProps extends PrimaryInputProps {
  inputFocused?: boolean;
};

export const SelectInputPlaceholder: React.FC<SelectInputProps> = ({
  ...rest
}) => {
  const { colors } = useThemeMode();

  return (
    <>
      <InputWrapper
        style={{
          paddingHorizontal: widthPixel(20),
          paddingVertical: heightPixel(12),
          width: rest?.width,
          ...rest?.containerStyle,
          ...InputColorState(colors, rest?.inputFocused, rest?.inputError)
        }}
      >
        <InputSection>
          {rest?.value && rest?.value?.length ? (
            <RegularText textAlign={rest?.textAlign} fontSize={RFValue(12)}>{rest?.value}</RegularText>
          ) : (
            <RegularText 
            textAlign={rest?.textAlign} 
            fontSize={RFValue(12)} 
            color={rest?.placeholderTextColor}
            >
              {rest?.placeholder}
              </RegularText>
          )}
        </InputSection>

        <IconWrapper>
          <AntDesign size={fontPixel(15)} color={colors.text} name={"down"} />
        </IconWrapper>
      </InputWrapper>
      {(rest?.bottomText && !rest?.bottomTextOnError) ||
        (rest?.bottomText && rest?.bottomTextOnError && rest?.inputError) ? (
        <BottomText color={rest?.inputError ? colors.danger : colors.text}>
          {rest?.bottomText}
        </BottomText>
      ) : null}
    </>
  );
};
