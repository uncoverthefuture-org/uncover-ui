export const getErrorMessage = (error: any): string | null => {
  return typeof error?.data?.response === "string"
    ? error?.data?.response
    : null;
};

export const validationError = (errors: object) => {
  let error = "";
  if (errors && typeof errors !== "string") {
    Object.entries(errors).forEach(([key, value]) => {
      error = value.join(", ");
      if (error.length) {
        return;
      }
    });
  }
  return error.length ? error : null;
};

export const resolveApiError = (error: any, message?: string): string => {
  // console.log("error -->", error);
  // console.log("message -->", message);
  // console.log("error -->", error);
  const check_validation_error = validationError(error?.data?.response);
  if (check_validation_error) return check_validation_error;

  const check_message_error = getErrorMessage(error);
  if (check_message_error) return check_message_error;

  if (message) return message;

  return "Kindly check your internet connection and try again.";
};
