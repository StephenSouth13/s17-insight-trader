import { AIInsight, PortfolioHolding } from "@/types";

// NOTE: For production, do NOT call OpenAI from the client. Connect Supabase and
// move this logic to an Edge Function using Supabase secrets. This is a mocked
// implementation to demonstrate the flow without leaking API keys.

export async function getAIInsights({
  portfolio,
}: {
  portfolio: PortfolioHolding[];
}): Promise<AIInsight[]> {
  // Simulated latency
  await new Promise((r) => setTimeout(r, 800));

  // Simple heuristic-based mock insights
  const total = portfolio.reduce((s, p) => s + p.amount * (p.avgBuyPrice ?? 0), 0);
  const btc = portfolio.find((p) => p.symbol === "BTC");
  const eth = portfolio.find((p) => p.symbol === "ETH");

  const insights: AIInsight[] = [
    {
      title: "Risk Balance",
      summary: total > 0 ? "Your portfolio shows healthy diversification across majors." : "Add assets to start analysis.",
      action: "Maintain position sizes under 35% per asset for risk control.",
    },
    btc && btc.amount > 0
      ? {
          title: "BTC Position",
          summary: `BTC exposure detected (${btc.amount} BTC). Consider DCA during volatility spikes.`,
          action: "Set a recurring buy schedule and define a trailing stop.",
        }
      : {
          title: "BTC Opportunity",
          summary: "No BTC detected. BTC remains the dominant market driver.",
          action: "Consider a starter allocation with strict risk rules.",
        },
    eth && eth.amount > 0
      ? {
          title: "ETH Staking",
          summary: `ETH exposure detected (${eth.amount} ETH). Staking can improve yield.`,
          action: "Evaluate liquid staking options in reputable protocols.",
        }
      : {
          title: "ETH Exposure",
          summary: "No ETH detected. ETH underpins many L2 ecosystems.",
          action: "Consider ETH exposure for ecosystem beta.",
        },
  ].filter(Boolean) as AIInsight[];

  return insights;
}
