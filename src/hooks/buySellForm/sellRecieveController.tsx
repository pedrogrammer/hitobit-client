import React, { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { MarketTicker, useMarketTicker } from "../marketTicker";
import { useMarketFilters } from "../useMarketFilters";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { useStepValues } from "../useStepValues";
import { BuySellContext, BuySellFormProps } from "./context";
import { useBuySellPrice } from "./useBuySellPrice";

type SellRecieveRenderProps = {
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
    };
  }) => React.ReactElement;

  renderErrorComponent?: (message?: string) => ReactNode;
};

export const SellRecieveController = ({
  render,
  renderErrorComponent,
}: SellRecieveRenderProps) => {
  const { lastChangeInput, selected, spend } = BuySellContext.useWatch();

  const { errors } = BuySellContext.useFormState();

  const { setValue, clearErrors } = BuySellContext.useFormContext();

  const { getTotalError } = useOrderPlacingError();

  const { onChangeValue } = useStepValues();

  const { marketsTicker, getSymbolMarketTicker } = useMarketTicker();

  const { calculateSpend } = useBuySellPrice("sell");

  const selectedMarket = getSymbolMarketTicker(selected);

  const { minNotional, maxNotional } = useMarketFilters({ selectedMarket });

  const availableRemain = selectedMarket?.quoteCurrency?.availableRemain || 0;

  const assets =
    marketsTicker?.filter(
      (item) =>
        item.baseAsset === selectedMarket?.baseAsset &&
        item.quoteCurrency?.canCharge,
    ) || [];

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
              return getTotalError({
                side: "Sell",
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
              assets,
              availableRemain,
              minQuantity: minNotional || 0,
              maxQuantity: maxNotional || 0,
              asset: selectedMarket,
              hasError: value ? !!errors.recieve : false,
              onFocus(e) {
                e?.target?.value > 0 &&
                  setValue("spend", onChangeValue(e.target.value).toString());
                setValue("lastChangeInput", "recieve");
              },
              onSelect(asset?: MarketTicker) {
                setValue("selected", asset?.symbol);
              },
              onChange(value) {
                onChange(value === "" ? null : value);
                const spend = calculateSpend(value);
                setValue("spend", spend);
                clearErrors("spend");
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
