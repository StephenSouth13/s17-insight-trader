import { CoinMarket, MarketGlobal, PricePoint } from "@/types";

const CG_BASE = "https://api.coingecko.com/api/v3";

export async function fetchGlobalData(): Promise<MarketGlobal> {
  const res = await fetch(`${CG_BASE}/global`);
  if (!res.ok) throw new Error("Failed to fetch global market data");
  const json = await res.json();
  const data = json.data;
  return {
    marketCap: data.total_market_cap.usd,
    volume24h: data.total_volume.usd,
    btcDominance: data.market_cap_percentage.btc,
  };
}

export async function fetchTopCoins(limit = 10): Promise<CoinMarket[]> {
  const url = `${CG_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch markets");
  const json = await res.json();
  return json.map((c: any) => ({
    id: c.id,
    rank: c.market_cap_rank,
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    price: c.current_price,
    change24h: c.price_change_percentage_24h,
    marketCap: c.market_cap,
    volume24h: c.total_volume,
    image: c.image,
  })) as CoinMarket[];
}

export async function fetchBTCMarketChart(days = 30): Promise<PricePoint[]> {
  const res = await fetch(`${CG_BASE}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`);
  if (!res.ok) throw new Error("Failed to fetch BTC chart");
  const json = await res.json();
  return (json.prices as [number, number][]).map(([time, price]) => ({ time, price }));
}
