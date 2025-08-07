import { useAIStore } from "@/stores/aiStore";
import { getAIInsights } from "@/lib/ai";
import { PortfolioHolding } from "@/types";

export function useAIInsights() {
  const { insights, setInsights, reset } = useAIStore();

  const analyze = async (portfolio: PortfolioHolding[]) => {
    const res = await getAIInsights({ portfolio });
    setInsights(res);
  };

  return { insights, analyze, reset };
}
