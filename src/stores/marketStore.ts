import { create } from "zustand";
import { MarketGlobal, CoinMarket, PricePoint } from "@/types";

interface MarketState {
  global: MarketGlobal | null;
  topCoins: CoinMarket[];
  btcChart: PricePoint[];
  setGlobal: (g: MarketGlobal | null) => void;
  setTopCoins: (c: CoinMarket[]) => void;
  setBtcChart: (d: PricePoint[]) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  global: null,
  topCoins: [],
  btcChart: [],
  setGlobal: (g) => set({ global: g }),
  setTopCoins: (c) => set({ topCoins: c }),
  setBtcChart: (d) => set({ btcChart: d }),
}));
