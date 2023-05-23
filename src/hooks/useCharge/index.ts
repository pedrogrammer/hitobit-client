import starkString from "starkstring";

import Decimal from "decimal.js";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  CreateChargeRequestRequestVM,
  EpayRequestResponseVM,
  RequestError,
  SwaggerTypescriptMutationDefaultParams,
  useGetWalletV1PublicCurrencyInfo,
  usePostPaymentV1PrivateEpayrequestCharge,
  UserMoneyNetworkResponseVM,
} from "../../services";
export const useCharge = ({
  onError,
  onSuccess,
  currency,
}: {
  onSuccess?:
    | ((
        data: EpayRequestResponseVM,
        variables: {
          requestBody: CreateChargeRequestRequestVM;
        } & SwaggerTypescriptMutationDefaultParams<unknown>,
        context: unknown,
      ) => unknown)
    | undefined;
  onError?:
    | ((
        error: Error | RequestError,
        variables: {
          requestBody: CreateChargeRequestRequestVM;
        } & SwaggerTypescriptMutationDefaultParams<unknown>,
        context: unknown,
      ) => unknown)
    | undefined;
  currency?: string;
}) => {
  const [errorState, setError] = useState("");
  const { userData } = useAuth();
  const { t } = useTranslation();
  const { mutate, isLoading, error, ...rest } =
    usePostPaymentV1PrivateEpayrequestCharge({
      onSuccess,
      onError,
    });

  const { data, isInitialLoading: isLoadingSpot } =
    useGetWalletV1PublicCurrencyInfo({ enabled: !!currency && !!userData });

  const targetMoneyNetwork = useMemo(
    () =>
      data
        ?.find((i) => i.symbol === currency)
        ?.domainMoneyNetworks?.find((o) => o.name === "Shaparak"),
    [currency, data],
  );

  const clearError = () => setError("");

  const { minDeposit, maxDeposit } = useMemo(() => {
    if (!targetMoneyNetwork) return { minDeposit: 0, maxDeposit: 0 };
    const { minDeposit, maxDeposit } = targetMoneyNetwork;
    return {
      minDeposit: minDeposit || 0,
      maxDeposit: maxDeposit || 25_000_000,
    };
  }, [targetMoneyNetwork]) as UserMoneyNetworkResponseVM;

  const checkAmount = (amount?: number | string | null) => {
    if (amount === null || amount === undefined || amount === "") {
      setError(t("enterAmount"));
      return false;
    }
    if (minDeposit === undefined || maxDeposit === undefined) {
      setError(t("anUnexpectedErrorOccurred"));
      return false;
    }
    if (new Decimal(amount).lessThan(minDeposit)) {
      setError(
        t("depositValueShouldBeMoreThanMinPrice", {
          minPrice: starkString(minDeposit).toCurrency().toString(),
        }),
      );
      return false;
    }
    if (new Decimal(amount).greaterThan(maxDeposit)) {
      setError(
        t("depositValueShouldBeLessThanMaxPrice", {
          maxPrice: starkString(maxDeposit).toCurrency().toString(),
        }),
      );
      return false;
    }
    return true;
  };

  const charge = (
    amount?: number | string | null,
    configOveride?: Omit<
      CreateChargeRequestRequestVM,
      "amount" | "userWalletCurrencySymbol" | "redirectType"
    >,
  ) => {
    mutate({
      requestBody: {
        ...configOveride,
        userWalletCurrencySymbol: currency || undefined,
        amount: Number(amount),
        redirectType: "Redirect",
      },
    });
  };

  return {
    errorAmount: errorState,
    serverError: error,
    charge,
    isLoading: isLoading || isLoadingSpot,
    minDeposit,
    maxDeposit,
    clearError,
    checkAmount,
    ...rest,
  };
};
