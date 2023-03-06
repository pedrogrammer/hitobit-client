import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { BuyForm, MarketOrderValues } from "../types";

const ControllerTotal = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "total">;
  }) => any;
}) => {
  const { setValue, trigger, reset } = BuyForm.useFormContext();
  const { selectedOption } = BuyForm.useWatch();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getTotalError } = useOrderPlacingError();

  const { getSymbolMarketTicker } = useMarketTicker();
  const { toStepSize } = useStepSize(selectedSymbol?.symbol);
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  return (
    <BuyForm.Controller
      name="total"
      rules={{
        validate: {
          check: (value) => {
            if (!Number(value)) {
              // reset();
              return;
            }

            if (selectedOption.value !== "total") {
              return;
            }

            return getTotalError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
              total: Number(value),
            });
          },
        },
      }}
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              if (selectedOption.value !== "total") {
                return;
              }

              setValue(
                "amount",
                _value && currentTicker?.lastPrice
                  ? toStepSize(new Decimal(_value).div(currentTicker.lastPrice))
                  : "",
              );
              onChange(_value);
              trigger(["amount", "total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerTotal };
