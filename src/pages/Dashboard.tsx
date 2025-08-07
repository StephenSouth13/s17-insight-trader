import SEO from "@/components/SEO";
import { useCryptoData } from "@/hooks/useCryptoData";
import CryptoChart from "@/components/CryptoChart";
import AIInsights from "@/components/AIInsights";
import { useUserStore } from "@/stores/userStore";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card/60 backdrop-blur p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const { global, topCoins, btcChart } = useCryptoData();
  const { portfolio } = useUserStore();

  return (
    <>
      <SEO
        title="Dashboard – S17 Social Trading Platform"
        description="Real-time crypto market data, top coins, and AI insights."
        canonical="/dashboard"
      />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Market Cap"
          value={global ? `$${Math.round(global.marketCap).toLocaleString()}` : "—"}
        />
        <StatCard
          label="24h Volume"
          value={global ? `$${Math.round(global.volume24h).toLocaleString()}` : "—"}
        />
        <StatCard
          label="BTC Dominance"
          value={global ? `${global.btcDominance.toFixed(2)}%` : "—"}
        />
      </section>

      <section className="mt-6">
        <CryptoChart data={btcChart} />
      </section>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border bg-card/60 backdrop-blur p-4 overflow-x-auto">
          <h3 className="font-semibold mb-3">Top Cryptocurrencies</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">#</th>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">24h</th>
                <th className="py-2">Market Cap</th>
                <th className="py-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {topCoins.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2">{c.rank}</td>
                  <td className="py-2 flex items-center gap-2">
                    <img src={c.image} alt={`${c.name} logo`} className="h-5 w-5" loading="lazy" />
                    {c.name} ({c.symbol})
                  </td>
                  <td className="py-2">${c.price.toLocaleString()}</td>
                  <td className={c.change24h >= 0 ? "text-primary" : "text-destructive"}>
                    {c.change24h?.toFixed(2)}%
                  </td>
                  <td className="py-2">${c.marketCap.toLocaleString()}</td>
                  <td className="py-2">${c.volume24h.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AIInsights portfolio={portfolio} />
      </section>
    </>
  );
}
