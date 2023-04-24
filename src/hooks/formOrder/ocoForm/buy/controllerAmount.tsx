import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
import { BuyForm, OcoOrderValues } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "amount">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();

  const {
    setValue: buySetValue,
    getValues,
    trigger,
  } = BuyForm.useFormContext();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getAmountError } = useOrderPlacingError();

  const { expectedValue, onChangeValue } = useStepValues(
    "limit",
    selectedSymbol?.symbol,
  );

  return (
    <BuyForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            const { limit, price } = getValues();

            if (!Number(value)) {
              buySetValue("slider", 0);
              return undefined;
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
              baseQuantity: Number(value),
              price: Math.max(Number(limit), Number(price)),
            });
          },
        },
      }}
      render={({ field: { onChange, value, ...rest } }) =>
        render({
          field: {
            value: expectedValue(value),
            onChange: (amount) => {
              if (amount) {
                const { price, limit } = getValues();
                const total = toTickSize(
                  new Decimal(amount).mul(
                    Math.max(Number(limit), Number(price)),
                  ),
                );
                buySetValue("total", total);
              } else {
                buySetValue("total", "");
              }
              onChange(onChangeValue(amount) || amount);
              trigger(["total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerAmount };
