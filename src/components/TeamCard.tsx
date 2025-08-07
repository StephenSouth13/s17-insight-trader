import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Team } from "@/types";
import { Link } from "react-router-dom";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/teams/${team.id}`} className="block rounded-lg border bg-card/60 backdrop-blur p-4 hover:border-primary transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{team.name}</h3>
        <div className="text-xs text-muted-foreground">{team.members.length} members</div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{team.description}</p>
      <div className="h-16">
        <ResponsiveContainer>
          <AreaChart data={team.performance} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`perf-${team.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="hsl(var(--accent))" fill={`url(#perf-${team.id})`} strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
}
