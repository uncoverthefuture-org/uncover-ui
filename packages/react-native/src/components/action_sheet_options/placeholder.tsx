import styled from "@emotion/native";
import React from "react";
import { RegularText } from "../text/styled";
import AntDesign from "@expo/vector-icons/build/AntDesign";
import {
  fontPixel,
  heightPixel,
  widthPixel,
} from "utils/pxToDpConvert";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { ViewStyle, TextStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useThemeMode } from "providers/hooks";
import { InputWrapper } from "components/input/styled";
import { InputColorState } from "components/input/main";

const IconWrapper = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginRight: wp(2),
});

const InputSection = styled.View({
  flexGrow: 1,
})

export const BottomText = styled(RegularText)({
  paddingLeft: widthPixel(15),
  paddingBottom: heightPixel(10),
});

export type SelectInputProps = {
  title: string;
  value: string | undefined;
  bottomText?: string;
  inputFocused?: boolean;
  inputError?: boolean;
  bottomTextOnError?: boolean;
  textAlign?: TextStyle['textAlign'];
  width?: number;
  solid?: boolean;
  style?: ViewStyle
};

export const SelectInputPlaceholder: React.FC<SelectInputProps> = ({
  title,
  value,
  bottomText,
  bottomTextOnError = true,
  inputError = false,
  solid = false,
  inputFocused = false,
  textAlign = 'left',
  width,
  style
}) => {
  const { colors } = useThemeMode();

  return (
    <>
      <InputWrapper
        style={{
          paddingHorizontal: widthPixel(20),
          paddingVertical: heightPixel(12),
          width: width,
          ...style,
          ...InputColorState(colors, inputFocused, inputError)
        }}
      >
        <InputSection>
          {value && value?.length ? (
            <RegularText textAlign={textAlign} fontSize={RFValue(12)}>{value}</RegularText>
          ) : (
            <RegularText textAlign={textAlign} fontSize={RFValue(12)} color={colors.black_4}>{title}</RegularText>
          )}
        </InputSection>

        <IconWrapper>
          <AntDesign size={fontPixel(15)} color={colors.text} name={"down"} />
        </IconWrapper>
      </InputWrapper>
      {(bottomText && !bottomTextOnError) ||
        (bottomText && bottomTextOnError && inputError) ? (
        <BottomText color={inputError ? colors.danger : colors.text}>
          {bottomText}
        </BottomText>
      ) : null}
    </>
  );
};
