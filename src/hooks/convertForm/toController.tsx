import { useQueryClient } from "@tanstack/react-query";
import Decimal from "decimal.js";
import { ReactNode, useEffect, useMemo, useTransition } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postExchangeV1PrivateOrder } from "../../services";
import { useAssets } from "../useAssets";
import { useMarketFilters } from "../useMarketFilters";
import { Market, useMarkets } from "../useMarkets";
import { useMatchedMarketsList } from "../useMatchedMarketsList";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { useStepSize } from "../useStepSize";
import { useStepValues } from "../useStepValues";
import { ConvertContext, ConvertFormProps } from "./context";

type ConvertToRenderProps = {
  render: (state: {
    field: ControllerRenderProps<ConvertFormProps, "toAmount"> & {
      onSelect: (asset?: Market) => void;
      assets: Market[];
      asset?: Market;
      fromAsset?: string;
      minQuantity: number;
      maxQuantity: number;
      hasError?: boolean;
      getMaxSize?: (
        value: string | number | Decimal,
        passedSymbol?: string | undefined,
      ) => string;
      onFocus?: () => void;
    };
  }) => React.ReactElement;
  type: "market" | "limit";
  renderErrorComponent?: (message?: string) => ReactNode;
};

export const ConvertToController = ({
  render,
  renderErrorComponent,
  type,
}: ConvertToRenderProps) => {
  const { t } = useTranslation();
  const { toMarket, toAmount, fromAsset, fromAmount, lastChangedField } =
    ConvertContext.useWatch();

  const queryClient = useQueryClient();

  const { marketsSymbols } = useMarkets();

  const [, startTransition] = useTransition();

  const { setValue, trigger, clearErrors, register } =
    ConvertContext.useFormContext();

  const { errors } = ConvertContext.useFormState();

  register("lastChangedField");

  const { getAmountError, getTotalError } = useOrderPlacingError();

  const { allAssets } = useAssets();

  const selectedCurrency = useMemo(() => {
    return allAssets?.find(({ symbol }) => symbol === fromAsset);
  }, [allAssets, fromAsset]);

  const {
    selectedMarket,
    isBuy,
    isFromSelectedQuoteAsset,
    isFromSelectedBaseAsset,
    availableToMarkets,
  } = useMatchedMarketsList({
    fromAsset,
    toMarket,
  });

  const { toTickSize, toStepSize } = useStepSize(selectedMarket?.name);

  const { expectedValue, onChangeValue } = useStepValues(
    type,
    selectedMarket?.name,
  );

  const {
    maxNotional,
    minNotional,
    minQuantity: _minQuantity,
    maxQuantity: _maxQuantity,
  } = useMarketFilters({ selectedMarket, type });

  const minQuantity = isFromSelectedQuoteAsset
    ? _minQuantity || 0
    : minNotional || 0;

  const maxQuantity = isFromSelectedQuoteAsset
    ? _maxQuantity || 0
    : maxNotional || 0;

  const getMaxSize = isFromSelectedQuoteAsset ? toTickSize : toStepSize;

  useEffect(() => {
    if (selectedMarket) return;

    const fromCurrency = fromAsset?.toLowerCase();
    const _asset = marketsSymbols?.find(
      (item) =>
        item.baseAsset?.toLowerCase() === fromCurrency ||
        item.quoteAsset?.toLowerCase() === fromCurrency,
    );

    setValue("toMarket", _asset?.name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketsSymbols, selectedMarket, fromAsset]);

  const canThrowError =
    errors["toAmount"] && toAmount !== null && toAmount !== undefined;

  return (
    <>
      <ConvertContext.Controller
        name="toAmount"
        rules={{
          validate: {
            amount: (value) => {
              if (fromAmount) return undefined;

              if (!value) {
                return t("enterAmount");
              }
              return value
                ? selectedCurrency?.symbol === selectedMarket?.quoteAsset
                  ? getAmountError({
                      symbol: selectedMarket?.name,
                      baseQuantity: Number(value),
                      side: isBuy ? "Buy" : "Sell",
                    })
                  : getTotalError({
                      side: isBuy ? "Buy" : "Sell",
                      symbol: selectedMarket?.name,
                      total: Number(value),
                    })
                : undefined;
            },
          },
        }}
        render={({ field: { onChange, value, ...rest } }) => {
          return render({
            field: {
              value: expectedValue(value),
              minQuantity,
              maxQuantity,
              assets: availableToMarkets || [],
              asset: selectedMarket,
              getMaxSize: getMaxSize,
              fromAsset,
              hasError: value ? !!errors.toAmount : false,
              onSelect: (asset?: Market) => {
                startTransition(() => {
                  if (!toAmount) {
                    trigger("toAmount");
                  }
                  setValue("toMarket", asset?.name);
                });
              },
              onChange: (value) => {
                setValue("lastChangedField", "to");
                clearErrors("fromAmount");
                onChange(onChangeValue(value, isFromSelectedBaseAsset));
                setValue("fromAmount", value ? null : "");
                queryClient.resetQueries({
                  queryKey: [postExchangeV1PrivateOrder.key],
                  type: "all",
                });
              },
              onFocus: () => {
                setValue("lastChangedField", "to");
              },
              ...rest,
            },
          });
        }}
      />
      {renderErrorComponent &&
        renderErrorComponent?.(
          lastChangedField === "to" && canThrowError
            ? errors["toAmount"]?.message
            : "",
        )}
    </>
  );
};
