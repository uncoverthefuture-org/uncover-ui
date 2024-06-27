import { notify, notifyInfo } from "./notify";

export const LogOutErrors = {
  AUTH_ERROR: "",
  INVALID_DEVICE: "",
  USER_BLOCKED: "",
};

export const TokenErrors = [
  "token has expired",
  "token not parsed",
  "invalid token",
  "unauthenticated.",
];

export const ValidateResponseError = (
  error: any,
  token: string | null = null
) => {
  // console.log(error, "val_error");
  if (typeof error !== "string" && error?.data) {
    if (typeof error?.data !== "string") {
      // has meta_data errors
      const hasMetaDataErrors = error?.data && error?.data?.response;
      let possibleErrors = {
        token:
          error?.data?.response && typeof error?.data?.response === "string"
            ? TokenErrors.includes(
                (error?.data?.response ?? "--").trim().toLowerCase()
              )
            : false,
        auth: hasMetaDataErrors
          ? Object.keys(LogOutErrors).includes(error?.data?.response ?? "--")
          : false,
      };
      // console.log(possibleErrors);
      // handle errors
      if (possibleErrors.token || possibleErrors.auth) {
        if (token)
          notifyInfo("Error", "Kindly login again to verify your account.");
        return true;
      }
      // continue external validations
      return false;
    } else {
      notify(
        "Request Failed",
        "an error occurred while completing request, kindly try again!"
      );
      // console.log("api code break issue");
      return false;
    }
  } else {
    notify(
      "Request Failed",
      "kindly check your internet connection, and try again!"
    );
    // console.log("might be network issue");
    return false;
  }
};
