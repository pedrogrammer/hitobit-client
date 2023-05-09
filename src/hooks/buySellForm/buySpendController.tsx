import Decimal from "decimal.js";
import { groupBy, map } from "lodash-es";
import React, { FocusEventHandler, ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MarketTicker, useMarketTicker } from "../marketTicker";
import { useMarketFilters } from "../useMarketFilters";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { useStepSize } from "../useStepSize";
import { BuySellContext, BuySellFormProps } from "./context";
import { useBuySellPrice } from "./useBuySellPrice";

type BuySpendRenderProps = {
  render: (state: {
    field: ControllerRenderProps<BuySellFormProps, "spend"> & {
      assets: MarketTicker[];
      asset?: MarketTicker;
      minQuantity: number;
      hasError?: boolean;
      maxQuantity: number;
      availableRemain: number;
      onSelect?: (value?: MarketTicker | undefined) => void;
      onFocus?: (e: FocusEventHandler<any> | undefined) => void;
      getMaxSize?: (value: number) => string | number;
    };
  }) => React.ReactElement;
  type: "market" | "limit";
  renderErrorComponent?: (message?: string) => ReactNode;
};

export const BuySpendController = ({
  render,
  renderErrorComponent,
  type,
}: BuySpendRenderProps) => {
  const { t } = useTranslation();
  const { lastChangeInput, selected, spend, recieve } =
    BuySellContext.useWatch();

  const { errors } = BuySellContext.useFormState();

  const { setValue, clearErrors, register, trigger } =
    BuySellContext.useFormContext();

  register("shouldCharge");
  const { calculateReceive } = useBuySellPrice("buy");
  const { getTotalError } = useOrderPlacingError();

  const { marketsTicker, getSymbolMarketTicker } = useMarketTicker();

  const marketsTickerGrouped = map(
    groupBy(
      marketsTicker?.filter((item) => item.quoteCurrency?.canCharge),
      (item) => item.quoteAsset,
    ),
    (item) => item[0],
  );

  const selectedMarket = getSymbolMarketTicker(selected);

  const { toTickSize } = useStepSize(selected);

  const isChargeable = selectedMarket?.quoteCurrency?.canCharge;

  const { minNotional, maxNotional } = useMarketFilters({
    selectedMarket,
    type,
  });

  const availableRemain = selectedMarket?.quoteCurrency?.availableRemain || 0;

  const canThrowError =
    errors["spend"] && spend !== null && spend !== undefined;

  return (
    <>
      <BuySellContext.Controller
        name="spend"
        rules={{
          validate: {
            check: (value) => {
              if (lastChangeInput !== "spend") {
                return undefined;
              }
              if (!value) {
                return t("enterAmount");
              }
              if (
                isChargeable &&
                Number(selectedMarket?.quoteCurrency?.availableRemain) <
                  Number(value) &&
                new Decimal(value).lessThanOrEqualTo(maxNotional)
              ) {
                setValue("shouldCharge", true);
                setValue(
                  "chargeAmount",
                  new Decimal(value)
                    .minus(
                      Number(selectedMarket?.quoteCurrency?.availableRemain),
                    )
                    .toNumber(),
                );

                return t("insufficientBalance");
              } else {
                setValue("shouldCharge", false);
              }

              return getTotalError({
                side: "Buy",
                symbol: selected,
                total: Number(value),
              });
            },
          },
        }}
        render={({ field: { onChange, value, ...rest } }) => {
          return render({
            field: {
              value: value,
              assets: marketsTickerGrouped || [],
              availableRemain,
              minQuantity: minNotional || 0,
              maxQuantity: maxNotional || 0,
              asset: selectedMarket,
              hasError: value ? !!errors.spend : false,
              getMaxSize: toTickSize,
              onFocus() {
                if (lastChangeInput !== "spend") {
                  setValue("lastChangeInput", "spend");
                }
              },
              async onSelect(asset?: MarketTicker) {
                setValue("selected", asset?.symbol);
                await trigger("spend");
              },
              onChange(value) {
                onChange(value === "" ? null : value);
                const recieve = calculateReceive(value);
                setValue("recieve", recieve);
                clearErrors("recieve");
                lastChangeInput !== "spend" &&
                  setValue("lastChangeInput", "spend");
              },
              ...rest,
            },
          });
        }}
      />
      {renderErrorComponent &&
        renderErrorComponent(canThrowError ? errors["spend"]?.message : "")}
    </>
  );
};
