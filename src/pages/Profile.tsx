import SEO from "@/components/SEO";
import AIInsights from "@/components/AIInsights";
import { useUserStore } from "@/stores/userStore";

export default function Profile() {
  const { name, email, portfolio, transactions } = useUserStore();

  return (
    <>
      <SEO title="Profile – S17 Social Trading Platform" description="Your portfolio, transactions, and AI analysis." canonical="/profile" />
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border bg-card/60 backdrop-blur p-4">
          <h3 className="font-semibold mb-2">Account</h3>
          <div className="text-sm">{name}</div>
          <div className="text-sm text-muted-foreground">{email}</div>
        </div>

        <div className="lg:col-span-2 rounded-lg border bg-card/60 backdrop-blur p-4 overflow-x-auto">
          <h3 className="font-semibold mb-3">Portfolio</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Asset</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Avg Buy</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((p) => (
                <tr key={p.symbol} className="border-t">
                  <td className="py-2">{p.symbol}</td>
                  <td className="py-2">{p.amount}</td>
                  <td className="py-2">${p.avgBuyPrice?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-card/60 backdrop-blur p-4 overflow-x-auto">
          <h3 className="font-semibold mb-3">Recent Transactions</h3>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">ID</th>
                <th className="py-2">Type</th>
                <th className="py-2">Asset</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Price</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="py-2">{t.id}</td>
                  <td className="py-2 capitalize">{t.type}</td>
                  <td className="py-2">{t.symbol}</td>
                  <td className="py-2">{t.amount}</td>
                  <td className="py-2">${t.price.toLocaleString()}</td>
                  <td className="py-2">{new Date(t.date).toLocaleString()}</td>
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
