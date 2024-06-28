import { StyledTouchableOpacity, StyledView } from "@components/view/styled";
import { HeaderContainerProps } from "./interface";
import styled from "@emotion/native";
import { heightPixel, widthPixel } from "utilities/pxToDpConvert";

export const HeaderContainer = styled(StyledView)<HeaderContainerProps>(({
    elevation,
    floating,
    hasBorderBottom,
    backgroundColor
  }) => ({
    position: floating ? "absolute" : "relative",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: widthPixel(25),
    paddingBottom: heightPixel(20),
    paddingTop: heightPixel(55),
    width: "100%",
    zIndex: elevation ?? 10,
    elevation: elevation,
    borderBottomWidth: hasBorderBottom ? 0.3 : 0,
    borderBottomColor: "#979797",
    backgroundColor
  }));
  
  export const SideComponent = styled(StyledTouchableOpacity)(({
    flexGrow = 1,
  }) => ({
    flexGrow
  }));