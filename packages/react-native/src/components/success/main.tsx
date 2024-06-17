import React from "react";
import { Link } from "expo-router";
import {
  BaseView,
  RFSpacingSize,
  Row,
  Spacer,
  ViewContainer,
  spacingSize,
} from "@components/views";
import LogoSvg from "assets/svgs/logo.svg";
import Onboard1 from "assets/svgs/Onboard1.svg";
import { BoldText, RegularText, fontSize } from "components/text";
import { useThemeMode } from "@providers/hooks";
import { router } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, View, Text } from "react-native";
import { PrimaryButton, SecondaryButton } from "@components/button";
import SuccessLogo from "assets/svgs/Success.svg";

export interface SuccessProps {
  title: string;
  note: string;
  button: React.ReactNode
}

export const Success: React.FC<SuccessProps> = ({ title, note, button }) => {
  const { colors } = useThemeMode();
  return (
    <BaseView>
      <Row
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        style={{
          //marginTop: 240,
          height: "100%",
        }}
      >
        <SuccessLogo />
        <ViewContainer>
          <Spacer height={spacingSize.i40} />
          <BoldText
            fontSize={fontSize.lg}
            textAlign="center"
            style={{
              //width: "70%",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            {title}
          </BoldText>
          <RegularText textAlign="center">{note}</RegularText>
          <Spacer height={120} />
       
          {button}
        </ViewContainer>
      </Row>
    </BaseView>
  );
};
