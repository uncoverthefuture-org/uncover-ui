import { API_URL, CURRENT_ENV } from "@env";

import Constants from "expo-constants";
import * as Updates from "expo-updates";

// console.log(process.env, API_URL, CURRENT_ENV,);

const stillTestingArray = ["development", "testing"];

export const currentEnvironment = CURRENT_ENV ?? "development";

export const releaseChannel = Updates?.releaseChannel ?? currentEnvironment;

export const productionOnly =
  process.env.NODE_ENV === "production" &&
  !stillTestingArray.includes(releaseChannel);

export const isDevelopmentRelease = Boolean(releaseChannel === "development");

export const isInExpoGo = Boolean(Constants.appOwnership === "expo");

export const isInDevelopment = __DEV__;

export const app_storage = "@shako.local.storage";
export const app_theme_color_storage = "@shako.theme.local.storage";

// live url as default
export const baseUrl =
  process.env.API_URL ?? API_URL ?? "https://api-dev.shakohub.com/v1";

export const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

// console.log(releaseChannel)
