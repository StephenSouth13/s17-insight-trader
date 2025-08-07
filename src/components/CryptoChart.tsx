import { ResponsiveContainer, LineChart, Line, Tooltip, YAxis, XAxis, CartesianGrid } from "recharts";
import { PricePoint } from "@/types";

export default function CryptoChart({ data, height = 280 }: { data: PricePoint[]; height?: number }) {
  return (
    <div className="rounded-lg border bg-card/60 backdrop-blur p-4">
      <div className="mb-2 text-sm text-muted-foreground">BTC / USD · 30D</div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" tickFormatter={(t) => new Date(t).toLocaleDateString()} hide />
            <YAxis domain={["auto", "auto"]} width={50} tickFormatter={(v) => `$${v.toLocaleString()}`} />
            <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Price"]} labelFormatter={(l) => new Date(Number(l)).toLocaleString()} />
            <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
