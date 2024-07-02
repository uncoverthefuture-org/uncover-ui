import AsyncStorage from "@react-native-async-storage/async-storage";
import { app_theme_font_storage } from "./constants";

export interface ThemeFonts {
  light: string;
  regular: string;
  medium: string;
  semiBold: string;
  bold: string;
  extraBold: string;
  black: string;
  [x: string]: string;
}


export const font: ThemeFonts = {
  light: 'PlusJakartaSansLight',
  regular: 'PlusJakartaSansRegular',
  medium: 'PlusJakartaSansMedium',
  semiBold: 'PlusJakartaSansSemiBold',
  bold: 'PlusJakartaSansBold',
  extraBold: 'PlusJakartaSansExtraBold',
  black: 'PlusJakartaSansBlack',
}

export const fonts = (): ThemeFonts => {
  let themeFontJson = {};
  AsyncStorage.getItem(app_theme_font_storage, (error, themeFontString) => {
    if (!error && themeFontString) {
      themeFontJson = JSON.parse(themeFontString);
      console.log("in function", themeFontJson, themeFontString)
    } else {
      console.warn("Could not find theme font!, setting default theme font...");
    }
  });

  return ({
    ...font,
    ...themeFontJson
  });
}




export const loadUncoverFonts = () => ({
  PlusJakartaSansLight: require("@assets/fonts/plus-jakarta-sans/PlusJakartaSans-Light.ttf"),
  PlusJakartaSansRegular: require("@assets/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.ttf"),
  PlusJakartaSansMedium: require("@assets/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.ttf"),
  PlusJakartaSansSemiBold: require("@assets/fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.ttf"),
  PlusJakartaSansBold: require("@assets/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.ttf"),
  PlusJakartaSansExtraBold: require("@assets/fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBold.ttf"),
  PlusJakartaSansBlack: require("@assets/fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBold.ttf"),
})