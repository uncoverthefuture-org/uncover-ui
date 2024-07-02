import { themeStorage } from "./storage"

const themeFontString = themeStorage.getString('fonts') // { 'username': 'Marc', 'age': 21 }
const themeFontJson = themeFontString ? JSON.parse(themeFontString) : {};

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
  light: 'RobotoLight',
  regular: 'RobotoRegular',
  medium: 'RobotoMedium',
  semiBold: 'RobotoSemiBold',
  bold: 'RobotoBold',
  extraBold: 'RobotoExtraBold',
  black: 'RobotoBlack',
  ...themeFontJson
}


