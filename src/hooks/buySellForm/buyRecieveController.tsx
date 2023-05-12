import Decimal from "decimal.js";
import React, { ReactNode, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MarketTicker, useMarketTicker } from "../marketTicker";
import { useConvertBaseToQuote } from "../useConvertBaseToQuote";
import { useMarketFilters } from "../useMarketFilters";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { useStepSize } from "../useStepSize";
import { useStepValues } from "../useStepValues";
import { BuySellContext, BuySellFormProps } from "./context";
import { useBuySellPrice } from "./useBuySellPrice";

type BuyRecieveRenderProps = {
  render: (state: {
    field: ControllerRenderProps<BuySellFormProps, "recieve"> & {
      assets: MarketTicker[];
      asset?: MarketTicker;
      minQuantity: number;
      maxQuantity: number;
      hasError?: boolean;
      availableRemain: number;
      onSelect?: (value?: MarketTicker | undefined) => void;
      onFocus?: (e: any) => void;
      getMaxSize?: (value: number) => string | number;
    };
  }) => React.ReactElement;
  type: "market" | "limit";
  renderErrorComponent?: (message?: string) => ReactNode;
};

export const BuyRecieveController = ({
  render,
  renderErrorComponent,
  type,
}: BuyRecieveRenderProps) => {
  const { t } = useTranslation();
  const { lastChangeInput, selected, spend } = BuySellContext.useWatch();

  const { errors } = BuySellContext.useFormState();

  const convert = useConvertBaseToQuote();

  const { setValue, clearErrors, register, trigger } =
    BuySellContext.useFormContext();

  register("shouldCharge");

  const { getAmountError } = useOrderPlacingError();

  const { marketsTicker, getSymbolMarketTicker } = useMarketTicker();
  const { calculateSpend } = useBuySellPrice("buy");

  const selectedMarket = getSymbolMarketTicker(selected);

  const { toTickSize } = useStepSize(selected);

  const { expectedValue, onChangeValue } = useStepValues(type, selected);

  const isChargeable = selectedMarket?.quoteCurrency?.canCharge;

  const { minQuantity, maxQuantity } = useMarketFilters({
    selectedMarket,
    type,
  });

  const availableRemain = selectedMarket?.quoteCurrency?.availableRemain || 0;

  const assets = useMemo(
    () =>
      marketsTicker?.filter(
        (item) => item.quoteAsset === selectedMarket?.quoteAsset,
      ) || [],
    [marketsTicker, selectedMarket?.quoteAsset],
  );

  const canThrowError =
    errors["recieve"] && spend !== null && spend !== undefined;

  return (
    <>
      <BuySellContext.Controller
        name="recieve"
        rules={{
          validate: {
            check: (value) => {
              if (lastChangeInput !== "recieve") {
                return undefined;
              }
              if (!value) {
                return t("enterAmount");
              }

              const convertedBaseQuantity = convert(
                Number(value || 0),
                selectedMarket?.baseAsset,
                selectedMarket?.quoteAsset,
              );
              if (
                isChargeable &&
                Number(selectedMarket?.quoteCurrency?.availableRemain) <
                  convertedBaseQuantity
              ) {
                setValue("shouldCharge", true);

                setValue(
                  "chargeAmount",
                  new Decimal(convertedBaseQuantity)
                    .minus(
                      Number(selectedMarket?.quoteCurrency?.availableRemain),
                    )
                    .toNumber(),
                );
                return t("insufficientBalance");
              } else {
                setValue("shouldCharge", false);
              }
              return getAmountError({
                side: "Buy",
                symbol: selected,
                baseQuantity: Number(value),
              });
            },
          },
        }}
        render={({ field: { onChange, value, ...rest } }) => {
          return render({
            field: {
              value: expectedValue(value),
              assets,
              availableRemain,
              minQuantity: minQuantity || 0,
              maxQuantity: maxQuantity || 0,
              asset: selectedMarket,
              hasError: value ? !!errors.recieve : false,
              getMaxSize: toTickSize,
              onFocus(e) {
                if (lastChangeInput !== "recieve") {
                  e?.target?.value > 0 &&
                    setValue(
                      "recieve",
                      onChangeValue(e.target.value).toString(),
                    );
                  setValue("lastChangeInput", "recieve");
                }
              },
              async onSelect(asset?: MarketTicker) {
                setValue("selected", asset?.symbol);
                await trigger("recieve");
              },
              onChange(value) {
                onChange(onChangeValue(value));
                const spend = calculateSpend(value);
                setValue("spend", spend);
                clearErrors("spend");
                lastChangeInput !== "recieve" &&
                  setValue("lastChangeInput", "recieve");
              },
              ...rest,
            },
          });
        }}
      />
      {renderErrorComponent &&
        renderErrorComponent(canThrowError ? errors["recieve"]?.message : "")}
    </>
  );
};
