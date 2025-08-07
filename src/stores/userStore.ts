import { create } from "zustand";
import { Team, PortfolioHolding, Transaction } from "@/types";

interface UserState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  portfolio: PortfolioHolding[];
  transactions: Transaction[];
  teams: Team[];
  mockSignIn: () => void;
  mockSignOut: () => void;
  createTeam: (team: Omit<Team, "id">) => string;
}

const initialTeams: Team[] = [
  {
    id: "team-1",
    name: "Alpha Traders",
    description: "Momentum-based strategies with risk management.",
    members: [
      { id: "u1", name: "Alice" },
      { id: "u2", name: "Bob" },
    ],
    performance: Array.from({ length: 24 }, (_, i) => ({ value: 100 + Math.sin(i / 2) * 10 + i })),
  },
  {
    id: "team-2",
    name: "DeFi Degens",
    description: "High-risk, high-reward DeFi yield hunts.",
    members: [
      { id: "u3", name: "Carol" },
      { id: "u4", name: "Dave" },
      { id: "u5", name: "Eve" },
    ],
    performance: Array.from({ length: 24 }, (_, i) => ({ value: 120 + Math.cos(i / 3) * 8 + i / 2 })),
  },
];

export const useUserStore = create<UserState>((set, get) => ({
  isAuthenticated: true,
  name: "Satoshi",
  email: "satoshi@s17.app",
  portfolio: [
    { symbol: "BTC", amount: 0.8, avgBuyPrice: 42000 },
    { symbol: "ETH", amount: 5, avgBuyPrice: 2400 },
    { symbol: "SOL", amount: 100, avgBuyPrice: 80 },
  ],
  transactions: [
    { id: "t1", symbol: "BTC", type: "buy", amount: 0.5, price: 40000, date: new Date().toISOString() },
    { id: "t2", symbol: "ETH", type: "buy", amount: 2, price: 2300, date: new Date().toISOString() },
  ],
  teams: initialTeams,
  mockSignIn: () => set({ isAuthenticated: true }),
  mockSignOut: () => set({ isAuthenticated: false }),
  createTeam: (team) => {
    const id = `team-${Date.now()}`;
    set({ teams: [...get().teams, { ...team, id }] });
    return id;
  },
}));
