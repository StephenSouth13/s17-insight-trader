import { create } from "zustand";
import { AIInsight } from "@/types";

interface AIState {
  insights: AIInsight[];
  setInsights: (i: AIInsight[]) => void;
  reset: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  insights: [],
  setInsights: (i) => set({ insights: i }),
  reset: () => set({ insights: [] }),
}));
