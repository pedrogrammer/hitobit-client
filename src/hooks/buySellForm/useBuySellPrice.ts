import Decimal from "decimal.js";
import { useMemo } from "react";
import starkString from "starkstring";
import { useMarketTicker } from "../marketTicker";
import { useConvertBaseToQuote } from "../useConvertBaseToQuote";
import { useStepSize } from "../useStepSize";
import { BuySellContext } from "./context";

export const useBuySellPrice = (mode: "buy" | "sell") => {
  if (typeof BuySellContext.context === "undefined") {
    throw new Error("You must use this hook under the BuySellProvider.");
  }

  const { getSymbolMarketTicker } = useMarketTicker();

  const { toTickSize } = useStepSize();
  const convert = useConvertBaseToQuote();

  const { recieve, selected, lastChangeInput, spend } =
    BuySellContext.useWatch();

  const selectedMarket = getSymbolMarketTicker(selected);

  const { convertedPrice } = useMemo(() => {
    const convertedPrice = {
      baseAsset: selectedMarket?.baseAsset || "--",
      quoteAsset: selectedMarket?.quoteAsset || "--",
      value: convert(1, selectedMarket?.quoteAsset, selectedMarket?.baseAsset),
      reversedValue: convert(
        1,
        selectedMarket?.baseAsset,
        selectedMarket?.quoteAsset,
      ),
    };
    return { convertedPrice };
  }, [convert, selectedMarket]);

  const calculateRecieveOrSpendSell = useMemo(() => {
    if (lastChangeInput === "spend") {
      const value = convert(
        Number(spend || 0),
        selectedMarket?.baseAsset,
        selectedMarket?.quoteAsset,
      );
      return starkString(value)
        .scientificNotationToDecimal()
        .toCurrency()
        .toString();
    } else {
      const value = convert(
        Number(recieve || 0),
        selectedMarket?.quoteAsset,
        selectedMarket?.baseAsset,
      );
      return starkString(value)
        .scientificNotationToDecimal()
        .toCurrency()
        .toString();
    }
  }, [convert, lastChangeInput, recieve, selectedMarket, spend]);

  const calculateRecieveOrSpendBuy = useMemo(() => {
    if (lastChangeInput === "spend") {
      const value = convert(
        Number(spend || 0),
        selectedMarket?.quoteAsset,
        selectedMarket?.baseAsset,
      );
      return starkString(value)
        .scientificNotationToDecimal()
        .toCurrency()
        .toString();
    } else {
      const value = convert(
        Number(recieve || 0),
        selectedMarket?.baseAsset,
        selectedMarket?.quoteAsset,
      );

      return starkString(value)
        .scientificNotationToDecimal()
        .toCurrency()
        .toString();
    }
  }, [convert, lastChangeInput, recieve, selectedMarket, spend]);

  const calculateRecieveOrSpend =
    mode === "buy" ? calculateRecieveOrSpendBuy : calculateRecieveOrSpendSell;

  const calculateSpend = (baseQty?: string) => {
    if (baseQty === "" || baseQty === undefined) {
      return "";
    }
    if (mode === "buy") {
      const value = convert(
        new Decimal(baseQty).toNumber(),
        selectedMarket?.baseCurrencySymbol,
        selectedMarket?.quoteCurrencySymbol,
      );
      return starkString(toTickSize(value)).toString();
    } else {
      const value = convert(
        new Decimal(baseQty).toNumber(),
        selectedMarket?.quoteCurrencySymbol,
        selectedMarket?.baseCurrencySymbol,
      );
      return starkString(value).toString();
    }
  };
  const calculateReceive = (quoteQty?: string) => {
    if (quoteQty === "" || quoteQty === undefined) {
      return "";
    }
    if (mode === "buy") {
      const value = convert(
        new Decimal(quoteQty).toNumber(),
        selectedMarket?.quoteCurrencySymbol,
        selectedMarket?.baseCurrencySymbol,
      );
      return starkString(value).scientificNotationToDecimal().toString();
    } else {
      const value = convert(
        new Decimal(quoteQty).toNumber(),
        selectedMarket?.baseCurrencySymbol,
        selectedMarket?.quoteCurrencySymbol,
      );
      return starkString(toTickSize(value)).toString();
    }
  };

  return {
    convertedPrice,
    calculateRecieveOrSpend,
    calculateSpend,
    calculateReceive,
  };
};
