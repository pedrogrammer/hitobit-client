import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
import { BuyForm, LimitOrderValues } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<LimitOrderValues, "amount">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const {
    setValue: buySetValue,
    getValues,
    trigger,
    setError,
  } = BuyForm.useFormContext();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { expectedValue, onChangeValue } = useStepValues(
    "limit",
    selectedSymbol?.symbol,
  );

  const { getAmountError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            const { price } = getValues();

            if (!Number(value)) {
              buySetValue("slider", 0);
              return undefined;
            }

            if (!price) {
              setError("price", { message: t("enterAmount") });
              return undefined;
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
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

              buySetValue(
                "total",
                price && _value
                  ? toTickSize(new Decimal(_value).mul(Number(price)))
                  : "",
              );

              onChange(onChangeValue(_value) || _value);
              trigger(["amount"]);
            },
            ...rest,
          },
        });
      }}
    />
  );
};

export { ControllerAmount };
