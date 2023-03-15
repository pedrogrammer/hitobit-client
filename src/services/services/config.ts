/**
 * Please add your custom config
 *
 * @version 4
 */
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import i18n from "i18next";
import { StatusCodes } from "../../constants";
import { getDeviceId, URLManager } from "../../modules";
//@ts-ignore
import qs from "qs";
import { axiosMiddle, removeUser } from "../context/userManager";
import { GrantType } from "./types";

let axiosInstance: AxiosInstance;

function getAxiosInstance(security: any): AxiosInstance {
  if (!axiosInstance) {
    const baseConfig: AxiosRequestConfig = {
      headers: {
        "Content-Encoding": "UTF-8",
        Accept: "application/json",
        "Content-Type": "application/json",
        clientId: __CLIENT_ID__,
        deviceId: getDeviceId(),
      },
      timeout: 200 * 1000,
      paramsSerializer: (param) =>
        qs.stringify(param, { indices: true, allowDots: true }),
    };

    axiosInstance = Axios.create(baseConfig);
    if (typeof window !== "undefined") {
      axiosMiddle(
        axiosInstance,
        (config: any) =>
          (config.data?.grantType as GrantType) === "RefreshToken",
      );
    }

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (async (response: AxiosResponse): Promise<SwaggerResponse<any>> => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        /**
         * Example on response manipulation
         *
         * @example
         *   const swaggerResponse: SwaggerResponse = {
         *     ...response,
         *   };
         *   return swaggerResponse;
         */
        return response.data;
      }) as any,
      async (error: AxiosError<any>) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response) {
          if (error.response.status === StatusCodes.UserTrustedDevice) {
            await removeUser();
          }
          const errors =
            error.response?.data?.errors || error.response?.data?.value?.errors;

          return Promise.reject(
            new RequestError({
              message:
                error.response?.data?.message ||
                error.response?.data?.msg ||
                errors?.[0]?.message,
              status: error.response.status || errors?.[0]?.statusCode,
              response: error.response,
              errors: errors,
            }),
          );
        }

        if (error.isAxiosError) {
          return Promise.reject(
            new RequestError({
              message: "noInternetConnection",
            }),
          );
        }
        return Promise.reject(error);
      },
    );
    axiosInstance.interceptors.request.use((request) => {
      request.headers = {
        ...request.headers,
        "Accept-Language": i18n.language,
      };

      return request;
    });
  }

  axiosInstance.defaults.baseURL = URLManager.baseUrl;

  return axiosInstance;
}

interface ErrorParam {
  message: string;
  status?: number;
  response?: AxiosResponse;
  errors?: any[];
}

class RequestError extends Error {
  message: string;
  status?: number;
  response?: AxiosResponse<{ code: number; message: string }>;
  errors?: any[];

  constructor({ message, status, response, errors }: ErrorParam) {
    super(message);
    this.message = message;
    this.status = status;
    this.response = response;
    this.errors = errors;
  }

  isApiException = true;

  static isRequestError(error: any): error is RequestError {
    return error?.isApiException;
  }

  /** @deprecated Use isRequestError instead */
  static isApiException(error: any): error is RequestError {
    return error?.isApiException;
  }
}

export type Security = any[] | undefined;

export type SwaggerResponse<R> = R;

export { getAxiosInstance, RequestError };
