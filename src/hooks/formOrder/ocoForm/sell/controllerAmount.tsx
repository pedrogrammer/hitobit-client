import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
import { OcoOrderValues, SellForm } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "amount">;
  }) => any;
}) => {
  const {
    setValue: sellSetValue,
    getValues,
    trigger,
  } = SellForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getAmountError } = useOrderPlacingError();

  const { expectedValue, onChangeValue } = useStepValues(
    "limit",
    selectedSymbol?.symbol,
  );

  return (
    <SellForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            const { limit, price } = getValues();

            if (!Number(value)) {
              sellSetValue("slider", 0);
              return undefined;
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
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
            onChange: (_value) => {
              const { price } = getValues();

              sellSetValue(
                "total",
                price && _value
                  ? toTickSize(new Decimal(_value).mul(Number(price)))
                  : "",
              );
              onChange(onChangeValue(_value) || _value);

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
