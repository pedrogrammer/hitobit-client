import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrderOco,
} from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { OcoOrderValues, SellForm } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const {
    handleSubmit: sellHandleSubmit,
    reset,
    setError,
  } = SellForm.useFormContext();
  useResetOnSymbol(SellForm.useFormContext);

  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrderOco({
    onSuccess: () => {
      reset();
    },
  });
  const { userData } = useAuth();
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference({
    enabled: !!userData,
  });
  const onSellSubmit = ({
    price: _price,
    amount: _amount,
    limit: _limit,
    stopPrice: _stopPrice,
  }: OcoOrderValues) => {
    const amount = Number(_amount);
    const stopPrice = Number(_stopPrice);
    const price = Number(_price);
    const limit = Number(_limit);

    if (!price) {
      setError("price", {
        message: t("enterPrice"),
      });
      return;
    }

    if (!stopPrice) {
      setError("stopPrice", {
        message: t("enterStop"),
      });
      return;
    }

    if (!limit) {
      setError("limit", {
        message: t("enterPrice"),
      });
      return;
    }

    if (!amount) {
      setError("amount", {
        message: t("enterAmount"),
      });
      return;
    }

    const placeOrder = () => {
      mutate({
        // @todo type property is redundant
        // @ts-ignore
        requestBody: {
          symbol: selectedSymbol?.symbol,
          side: "SELL",
          price: Number(price),
          stopLimitPrice: Number(limit),
          stopPrice: Number(stopPrice),
          quantity: Number(amount),
        },
      });
    };

    if (userPreferences?.stopLimitOrder && onOpenConfirmationModal) {
      onOpenConfirmationModal(placeOrder);

      return;
    }

    placeOrder();
  };

  return {
    onSubmit: sellHandleSubmit(onSellSubmit),
    isLoading,
    error,
  };
};

export { useSubmit };
