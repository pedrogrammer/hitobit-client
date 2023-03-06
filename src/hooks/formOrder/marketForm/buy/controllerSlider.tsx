import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useStepSize } from "../../../useStepSize";
import { useUserSelectedUserAssets } from "../../../useUserSelectedUserAssets";
import { BuyForm, MarketOrderValues } from "../types";

const ControllerSlider = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "slider">;
  }) => any;
}) => {
  const { setValue, trigger } = BuyForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toTickSize, toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { getSymbolMarketTicker } = useMarketTicker();
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  const { quoteAvailableRemain } = useUserSelectedUserAssets();

  return (
    <BuyForm.Controller
      name="slider"
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              if (!quoteAvailableRemain) return;
              let _total: Decimal = new Decimal(0);
              onChange(_value);

              // setValue("selectedOption", { value: "total" });
              trigger(["amount", "total"]);

              const total =
                _value && quoteAvailableRemain
                  ? toTickSize(
                      new Decimal(Number(quoteAvailableRemain))
                        .mul(_value)
                        .div(100),
                    )
                  : "";

              setValue("total", total);

              if (_value) {
                _total = new Decimal(quoteAvailableRemain).mul(_value).div(100);
              }

              setValue(
                "amount",
                currentTicker?.lastPrice
                  ? toStepSize(_total.div(currentTicker?.lastPrice))
                  : "",
              );

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
