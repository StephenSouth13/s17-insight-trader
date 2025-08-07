export type PricePoint = { time: number; price: number };

export type MarketGlobal = {
  marketCap: number;
  volume24h: number;
  btcDominance: number;
};

export type CoinMarket = {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  image: string;
};

export type Member = { id: string; name: string };

export type Team = {
  id: string;
  name: string;
  description: string;
  members: Member[];
  performance: { value: number }[];
};

export type PortfolioHolding = {
  symbol: string;
  amount: number;
  avgBuyPrice?: number;
};

export type Transaction = {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  date: string; // ISO
};

export type AIInsight = {
  title: string;
  summary: string;
  action: string;
};
