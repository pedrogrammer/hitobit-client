import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
import { BuyForm, MarketOrderValues } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "amount">;
  }) => any;
}) => {
  const { setValue, trigger } = BuyForm.useFormContext();
  const { selectedOption } = BuyForm.useWatch();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getAmountError } = useOrderPlacingError();

  const { getSymbolMarketTicker } = useMarketTicker();
  const { toTickSize } = useStepSize(selectedSymbol?.symbol);
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  const { expectedValue, onChangeValue } = useStepValues(
    "market",
    selectedSymbol?.symbol,
  );

  return (
    <BuyForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            if (!Number(value)) {
              return undefined;
            }

            if (selectedOption.value !== "amount") {
              return undefined;
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
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
