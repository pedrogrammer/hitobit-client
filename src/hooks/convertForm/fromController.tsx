import { useQueryClient } from "@tanstack/react-query";
import Decimal from "decimal.js";
import { ReactNode, useMemo, useTransition } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { postExchangeV1PrivateOrder } from "../../services";
import { Asset, useAssets } from "../useAssets";
import { useMarketFilters } from "../useMarketFilters";
import { useMarkets } from "../useMarkets";
import { useMatchedMarketsList } from "../useMatchedMarketsList";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { useStepSize } from "../useStepSize";
import { useStepValues } from "../useStepValues";
import { ConvertContext, ConvertFormProps } from "./context";

type ConvertFromRenderProps = {
  render: (state: {
    field: ControllerRenderProps<ConvertFormProps, "fromAmount"> & {
      onSelect: (asset?: Asset) => void;
      assets: Asset[];
      asset: Asset | undefined;
      getMaxSize?: (
        value: string | number | Decimal,
        passedSymbol?: string | undefined,
      ) => string;
      minQuantity: number;
      maxQuantity: number;
      hasError?: boolean;
      onFocus?: () => void;
    };
  }) => React.ReactElement;
  type: "market" | "limit";
  renderErrorComponent?: (message?: string) => ReactNode;
};

export const ConvertFromController = ({
  render,
  renderErrorComponent,
  type,
}: ConvertFromRenderProps) => {
  const { t } = useTranslation();
  const { toMarket, fromAmount, fromAsset, toAmount, lastChangedField } =
    ConvertContext.useWatch();

  const queryClient = useQueryClient();

  const { marketsSymbols } = useMarkets();

  const [, startTransition] = useTransition();

  const { setValue, trigger, clearErrors, register } =
    ConvertContext.useFormContext();

  const { errors } = ConvertContext.useFormState();

  register("lastChangedField");

  const { getAmountError, getTotalError } = useOrderPlacingError();

  const { allAssets } = useAssets({
    onSuccess: (data) => {
      const BTC = data.find(({ symbol }) => symbol?.toUpperCase() === "BTC");
      setValue("fromAsset", (BTC ? BTC : data?.[0])?.symbol);
    },
  });

  const selectedCurrency = useMemo(() => {
    return allAssets?.find(({ symbol }) => symbol === fromAsset);
  }, [allAssets, fromAsset]);

  const { selectedMarket, isBuy, isFromSelectedQuoteAsset } =
    useMatchedMarketsList({
      fromAsset,
      toMarket,
    });

  const { toTickSize, toStepSize } = useStepSize(selectedMarket?.name);

  const {
    maxNotional,
    minNotional,
    minQuantity: _minQuantity,
    maxQuantity: _maxQuantity,
  } = useMarketFilters({ selectedMarket, type });

  const minQuantity = marketsSymbols?.find(
    ({ quoteAsset }) => quoteAsset === selectedCurrency?.symbol,
  )
    ? minNotional || 0
    : _minQuantity || 0;

  const maxQuantity = marketsSymbols?.find(
    ({ quoteAsset }) => quoteAsset === selectedCurrency?.symbol,
  )
    ? maxNotional || 0
    : _maxQuantity || 0;

  const getMaxSize = marketsSymbols?.find(
    ({ quoteAsset }) => quoteAsset === selectedCurrency?.symbol,
  )
    ? toTickSize
    : toStepSize;

  const canThrowError =
    errors["fromAmount"] && fromAmount !== null && fromAmount !== undefined;

  const { expectedValue, onChangeValue } = useStepValues(
    type,
    selectedMarket?.name,
  );

  return (
    <>
      <ConvertContext.Controller
        name="fromAmount"
        rules={{
          validate: {
            amount: (value) => {
              if (toAmount) return undefined;

              if (!value) {
                return t("enterAmount");
              }

              return value
                ? selectedCurrency?.symbol === selectedMarket?.baseAsset
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
              assets: allAssets?.filter(({ canTrade }) => canTrade) || [],
              asset: selectedCurrency,
              getMaxSize: getMaxSize,
              hasError: value ? !!errors.fromAmount : false,
              onSelect: (asset?: Asset) => {
                startTransition(() => {
                  if (!fromAmount) {
                    trigger("fromAmount");
                  }
                  setValue("fromAsset", asset?.symbol);

                  const fromCurrency = asset?.symbol?.toLowerCase();
                  const _asset = marketsSymbols?.find(
                    (item) =>
                      item.baseAsset?.toLowerCase() === fromCurrency ||
                      item.quoteAsset?.toLowerCase() === fromCurrency,
                  );

                  setValue("toMarket", _asset?.name);
                });
              },
              onChange: (value) => {
                setValue("lastChangedField", "from");
                clearErrors("toAmount");
                onChange(onChangeValue(value, isFromSelectedQuoteAsset));
                setValue("toAmount", value ? null : "");
                queryClient.resetQueries({
                  queryKey: [postExchangeV1PrivateOrder.key],
                  type: "all",
                });
              },
              onFocus: () => {
                setValue("lastChangedField", "from");
              },
              ...rest,
            },
          });
        }}
      />
      {renderErrorComponent &&
        renderErrorComponent?.(
          lastChangedField === "from" && canThrowError
            ? errors["fromAmount"]?.message
            : "",
        )}
    </>
  );
};
