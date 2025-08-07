import { useEffect } from "react";
import { useMarketStore } from "@/stores/marketStore";
import { fetchGlobalData, fetchTopCoins, fetchBTCMarketChart } from "@/lib/api";

export function useCryptoData() {
  const { global, topCoins, btcChart, setGlobal, setTopCoins, setBtcChart } = useMarketStore();

  useEffect(() => {
    (async () => {
      try {
        const [g, t, chart] = await Promise.all([
          fetchGlobalData(),
          fetchTopCoins(10),
          fetchBTCMarketChart(30),
        ]);
        setGlobal(g);
        setTopCoins(t);
        setBtcChart(chart);
      } catch (e) {
        console.error("crypto data error", e);
      }
    })();
  }, [setGlobal, setTopCoins, setBtcChart]);

  return { global, topCoins, btcChart };
}
