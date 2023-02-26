import { createFormContext } from "react-hook-form-context";
import {
  OrderAckInfoResponseVM,
  RequestError,
  UserBankResponseVM,
} from "../../services";

export interface BuySellFormProps {
  spend?: string;
  recieve?: string;
  lastChangeInput?: "spend" | "recieve";
  selected?: string;
  shouldCharge?: boolean;
  chargeAmount?: number;
  showChargeMessage?: boolean;
  selectedBank?: UserBankResponseVM | null | undefined;
}

export type BuySellProps = {
  onSuccess?: (data: OrderAckInfoResponseVM) => void;
  onError?: (error: RequestError | Error | null) => void;
};

const buySellInitialValues: BuySellFormProps = {
  spend: "",
  recieve: "",
  lastChangeInput: undefined,
  selected: "",
  shouldCharge: false,
  chargeAmount: undefined,
  selectedBank: null,
  showChargeMessage: false,
};

const BuySellContext = createFormContext(buySellInitialValues, "onChange");

const BuySellProvider = BuySellContext.Provider;

export { BuySellContext, BuySellProvider };
