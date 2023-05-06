import { AxiosError } from "axios";
import i18n from "i18next";
import { FieldErrors } from "react-hook-form";
import { StatusCodes } from "../../constants";
import { RequestError } from "../../services";

export function getErrorMessage<T extends FieldErrors<any> | object | unknown>(
  error?: Error | false | null | AxiosError | RequestError | Error | T,
  field?: keyof Required<T>,
): string {
  const commonErrors = {
    [StatusCodes.UntrustedDevice]: i18n.t("UntrustedDevice"),
    [StatusCodes.UserRegistrationNotCompleted]: i18n.t("regNotComp"),
    [StatusCodes.UserIsNotActive]: i18n.t("UserIsNotActive"),
    [StatusCodes.IsLockedOut]: i18n.t("IsLockedOut"),
    [StatusCodes.IsNotAllowed]: i18n.t("IsNotAllowed"),
    [StatusCodes.InvalidUserNameOrPassword]: i18n.t("invalidUserPass"),
    [StatusCodes.UserIsSuspended]: i18n.t("UserIsSuspended"),
    [StatusCodes.FaildTwoFa]: i18n.t("failedTwoFa"),
  };
  if (!error) {
    return "";
  }

  if (field) {
    if (RequestError.isRequestError(error)) {
      const errorItem = error.errors?.find(
        ({ field: _field }) => _field === field,
      );

      return errorItem?.message || "";
    }

    return ((error as FieldErrors<any>)?.[field]?.message as string) || "";
  }

  if (RequestError.isRequestError(error)) {
    if (
      error.status !== undefined &&
      Object.keys(commonErrors).includes(error.status.toString())
    ) {
      return commonErrors[error.status as keyof typeof commonErrors];
    }
    return error.message || i18n.t("anUnexpectedErrorOccurred");
  }

  let message;

  if (typeof error === "string") {
    message = error;
  } else if ((error as Error)?.message) {
    message = (error as Error)?.message;
  }

  return message || i18n.t("anUnexpectedErrorOccurred");
}
