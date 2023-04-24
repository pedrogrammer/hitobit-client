import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
import { MarketOrderValues, SellForm } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "amount">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { selectedOption } = SellForm.useWatch();
  const { setValue, trigger } = SellForm.useFormContext();

  const { getSymbolMarketTicker } = useMarketTicker();
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);
  const { toTickSize } = useStepSize(selectedSymbol?.symbol);
  const { getAmountError } = useOrderPlacingError();

  const { expectedValue, onChangeValue } = useStepValues(
    "market",
    selectedSymbol?.symbol,
  );

  return (
    <SellForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            if (selectedOption.value !== "amount") {
              return undefined;
            }

            if (!Number(value)) {
              return undefined;
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
              baseQuantity: Number(value),
            });
          },
        },
      }}
      render={({ field: { onChange, value, ...rest } }) =>
        render({
          field: {
            value: expectedValue(value),
            onChange: (_value) => {
              if (selectedOption.value !== "amount") {
                return;
              }

              setValue(
                "total",
                _value && currentTicker?.lastPrice
                  ? toTickSize(new Decimal(_value).mul(currentTicker.lastPrice))
                  : "",
              );
              onChange(onChangeValue(_value) || _value);
              trigger(["amount", "total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerAmount };
