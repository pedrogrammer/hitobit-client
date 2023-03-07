import { createFormContext } from "react-hook-form-context";

type AmountMode = "amount" | "total";

export type SellSelectType = {
  value: AmountMode;
  label?: string;
};

// Buy Form

export interface MarketOrderValues {
  amount?: string;
  total?: string;
  slider?: number;
  selectedOption: SellSelectType;
}

const buyInitialValue: MarketOrderValues = {
  amount: "",
  total: "",
  slider: 0,
  selectedOption: { value: "total" },
};

export const BuyForm = createFormContext(buyInitialValue);

// Sell Form

const sellInitialValue: MarketOrderValues = {
  amount: "",
  total: "",
  slider: 0,
  selectedOption: { value: "amount" },
};

export const SellForm = createFormContext(sellInitialValue);
