import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAIInsights } from "@/lib/ai";
import { useAIStore } from "@/stores/aiStore";
import { PortfolioHolding } from "@/types";

export default function AIInsights({ portfolio }: { portfolio: PortfolioHolding[] }) {
  const [loading, setLoading] = useState(false);
  const { insights, setInsights } = useAIStore();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await getAIInsights({ portfolio });
      setInsights(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card/60 backdrop-blur p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">AI Insights</h3>
        <Button size="sm" onClick={handleGenerate} disabled={loading}>
          {loading ? "Analyzing..." : "Generate"}
        </Button>
      </div>
      {insights.length === 0 ? (
        <p className="text-sm text-muted-foreground">No insights yet. Click Generate to analyze your portfolio.</p>
      ) : (
        <ul className="space-y-2 list-disc pl-5">
          {insights.map((i, idx) => (
            <li key={idx}>
              <span className="font-medium">{i.title}:</span> {i.summary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
