import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useStepSize } from "../../../useStepSize";
import { useUserSelectedUserAssets } from "../../../useUserSelectedUserAssets";
import { MarketOrderValues, SellForm } from "../types";

const ControllerSlider = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "slider">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { setValue, trigger } = SellForm.useFormContext();

  const { toStepSize, toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { baseAvailableRemain } = useUserSelectedUserAssets();

  const { getSymbolMarketTicker } = useMarketTicker();
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  return (
    <SellForm.Controller
      name="slider"
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              if (!baseAvailableRemain) return;
              onChange(_value);
              let result: Decimal = new Decimal(0);
              if (_value && baseAvailableRemain) {
                result = new Decimal(baseAvailableRemain).mul(_value).div(100);
              }
              const total = toTickSize(
                currentTicker?.lastPrice
                  ? result.mul(currentTicker.lastPrice)
                  : 0,
              );

              const amount = currentTicker?.lastPrice
                ? toStepSize(result.toNumber())
                : "";

              setValue("total", total);
              setValue("amount", amount);
              // setValue("selectedOption", { value: "total" });
              trigger(["amount", "total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerSlider };
