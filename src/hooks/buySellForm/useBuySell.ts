import { groupBy, map } from "lodash-es";
import { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  AppOrderSide,
  AppOrderType,
  usePostExchangeV1PrivateOrder,
  usePostPaymentV1PrivateEpayrequestPostactionplacemarketbuyorder,
  UserBankResponseVM,
} from "../../services";
import { getErrorMessage } from "../../utils";
import { MarketTicker, useMarketTicker } from "../marketTicker";
import { useCharge } from "../useCharge";
import { BuySellContext, BuySellProps } from "./context";

type OrderProps = {
  triggerBeforeOrder?: () => void;
  type: AppOrderType;
  side: AppOrderSide;
};

type Charge = {
  redirectUrl: string;
  clientId?: string;
  amountToCharge?: number;
};

type SelectedQueries = {
  crypto?: string;
  fiat?: string;
};

export const useBuySell = (callbacks?: BuySellProps) => {
  if (typeof BuySellContext.context === "undefined") {
    throw new Error("You must use this hook under the BuySellProvider.");
  }

  const { handleSubmit, reset, setValue } = BuySellContext.useFormContext();

  const {
    lastChangeInput,
    recieve,
    selected,
    spend,
    shouldCharge,
    selectedBank,
    showChargeMessage,
    chargeAmount,
  } = BuySellContext.useWatch();

  const { getSymbolMarketTicker, marketsTicker } = useMarketTicker();

  const selectedMarket = getSymbolMarketTicker(selected);

  const isChargeable = selectedMarket?.quoteCurrency?.canCharge;

  const marketsTickerGrouped = map(
    groupBy(
      marketsTicker?.filter((item) => item.quoteCurrency?.canCharge),
      (item) => item.quoteAsset,
    ),
    (item) => item,
  )[0];

  const selectedAssignedValue = useCallback(
    ({ crypto, fiat }: SelectedQueries) => {
      if (selected || !marketsTickerGrouped?.length) {
        return;
      }

      let _selected: MarketTicker | undefined;

      if (crypto) {
        _selected = marketsTickerGrouped.find(
          (item) => item?.baseAsset?.toLowerCase() === crypto.toLowerCase(),
        );
      } else if (fiat) {
        _selected = marketsTickerGrouped.find(
          (item) => item?.quoteAsset?.toLowerCase() === fiat.toLowerCase(),
        );
      } else {
        const defaultSelected = marketsTickerGrouped?.find(
          ({ symbol }) =>
            symbol?.toLowerCase() === (__DEV__ ? "btcirr" : "btcirt"),
        );

        if (defaultSelected) {
          _selected = defaultSelected;
        } else {
          _selected = marketsTickerGrouped[0];
        }
      }

      setValue(
        "selected",
        _selected?.symbol || marketsTickerGrouped[0]?.symbol,
      );
    },
    [marketsTickerGrouped, selected, setValue],
  );

  const {
    mutate: placeOrder,
    error: orderError,
    isLoading: isOrderLoading,
    reset: resetApi,
  } = usePostExchangeV1PrivateOrder({
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
      reset();
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });

  const {
    charge: requestCharge,
    isLoading: isLoadingCharge,
    errorAmount,
    serverError,
    clearError,
    checkAmount,
  } = useCharge({
    currency: selectedMarket?.quoteAsset,
    onSuccess: (data) => {
      window.location.href = data?.paymentLink || "";
    },
  });

  const chargeError = errorAmount || getErrorMessage(serverError);

  const { mutate: postAction, isLoading: isLoadingPostAction } =
    usePostPaymentV1PrivateEpayrequestPostactionplacemarketbuyorder<Charge>({
      onSuccess: ({ postActionUniqueId }, { _extraVariables }) => {
        const clientUniqueId = _extraVariables?.clientId || uuidv4();
        requestCharge(chargeAmount, {
          postActionUniqueId,
          redirectUrl: window.location.origin + _extraVariables?.redirectUrl,
          clientUniqueId,
          userBankId: selectedBank?.id,
        });
      },
    });

  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recieve]);

  const charge = ({ redirectUrl, clientId }: Charge) => {
    const quoteQuantity = Number(spend);
    postAction({
      requestBody: {
        marketType: "Spot",
        postActionStatus: "Success",
        postActionNature: "PlaceMarketBuyOrder",
        quoteQuantity,
        marketSymbol: selected,
      },
      _extraVariables: { redirectUrl, clientId },
    });
  };

  const validateCharge = () => {
    const isValidAmount = checkAmount(chargeAmount);
    if (!isValidAmount) {
      return;
    }
    setValue("showChargeMessage", true);
  };
  const onSubmit = async ({ type, side, triggerBeforeOrder }: OrderProps) => {
    await new Promise((resolve) => resolve(triggerBeforeOrder?.()));

    const quantity =
      side === "BUY"
        ? lastChangeInput === "recieve"
          ? Number(recieve)
          : undefined
        : lastChangeInput === "spend"
        ? Number(spend)
        : undefined;

    const quoteOrderQty =
      side === "BUY"
        ? lastChangeInput === "spend"
          ? Number(spend)
          : undefined
        : lastChangeInput === "recieve"
        ? Number(recieve)
        : undefined;

    const order = () => {
      placeOrder({
        requestBody: {
          type,
          symbol: selected,
          quantity,
          quoteOrderQty,
          side,
          orderSourceType: side === "BUY" ? "InstantBuy" : "InstantSell",
        },
      });
    };

    handleSubmit(order)();
  };

  const isChargeLoading = isLoadingCharge || isLoadingPostAction;

  const hideChargeMessage = () => {
    setValue("showChargeMessage", false);
  };

  const setSelectedBank = (userBank?: UserBankResponseVM | null) => {
    setValue("selectedBank", userBank);
  };

  return {
    onSubmit,
    charge,
    isChargeLoading,
    isOrderLoading,
    isChargeable,
    orderError,
    shouldCharge,
    spend,
    recieve,
    selected,
    selectedMarket,
    lastChangeInput,
    selectedAssignedValue,
    reset: resetApi,
    chargeError,
    clearChargeError: clearError,
    hideChargeMessage,
    setSelectedBank,
    chargeAmount,
    selectedBank,
    showChargeMessage,
    validateCharge,
  };
};
