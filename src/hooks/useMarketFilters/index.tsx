import {
  MarketFilterLotSize,
  MarketFilterMinNotional,
  MarketFilterPriceFilter,
  MarketSymbolResponse,
} from "../../utils";
import { MarketTicker } from "../marketTicker";
import { useConvertBaseToQuote } from "../useConvertBaseToQuote";

const useMarketFilters = ({
  selectedMarket,
}: {
  selectedMarket?: Partial<MarketSymbolResponse> | Partial<MarketTicker>;
}) => {
  const filterMinNotional = selectedMarket?.filters?.find(
    (item) => item.filterType === ("MIN_NOTIONAL" as any),
  ) as MarketFilterMinNotional;
  const filterLotSize = selectedMarket?.filters?.find(
    (item) => item.filterType === ("LOT_SIZE" as any),
  ) as MarketFilterLotSize;
  const filterPrice = selectedMarket?.filters?.find(
    (item) => item.filterType === ("PRICE_FILTER" as any),
  ) as MarketFilterPriceFilter | undefined;

  const minNotional = filterMinNotional?.minNotional;

  const maxQuantity = filterLotSize?.maxQty;
  const minQuantity = filterLotSize?.minQty;

  const convert = useConvertBaseToQuote();
  const maxNotional = selectedMarket
    ? convert(
        maxQuantity || 0,
        selectedMarket.baseAsset,
        selectedMarket.quoteAsset,
      )
    : 0;

  return {
    filterMinNotional,
    filterLotSize,
    filterPrice,
    maxNotional,
    minNotional,
    maxQuantity,
    minQuantity,
  };
};

export { useMarketFilters };
