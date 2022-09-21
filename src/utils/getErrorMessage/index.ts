import { AxiosError } from "axios";
import i18n from "i18next";
import { FieldErrors } from "react-hook-form";
import { RequestError } from "../../services";

export function getErrorMessage<T extends FieldErrors<any> | object | unknown>(
  error?: Error | false | null | AxiosError | RequestError | Error | T,
  field?: keyof Required<T>,
): string {
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