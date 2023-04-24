import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
import { LimitOrderValues, SellForm } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<LimitOrderValues, "amount">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const {
    setValue: sellSetValue,
    getValues,
    trigger,
    setError,
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
            const { price } = getValues();

            if (!Number(value)) {
              sellSetValue("slider", 0);
              return undefined;
            }

            if (!price) {
              setError("price", { message: t("enterPrice") });
              return undefined;
            }
            /** @todo Fix this */

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
              baseQuantity: Number(value),
              price: Number(price),
            });
          },
        },
      }}
      render={({ field: { onChange, value, ...rest } }) => {
        return render({
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
        });
      }}
    />
  );
};

export { ControllerAmount };
