import SEO from "@/components/SEO";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import { useMemo, useState } from "react";

export default function TeamDetail() {
  const { teamId } = useParams();
  const { teams } = useUserStore();
  const team = useMemo(() => teams.find((t) => t.id === teamId), [teams, teamId]);
  const [messages, setMessages] = useState<{ id: string; text: string; user: string; date: string }[]>([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [{ id: String(Date.now()), text: input, user: "You", date: new Date().toISOString() }, ...m]);
    setInput("");
  };

  if (!team) return <div>Team not found.</div>;

  return (
    <>
      <SEO title={`${team.name} – S17 Teams`} description={team.description} canonical={`/teams/${team.id}`} />
      <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
      <p className="text-muted-foreground mb-6">{team.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-card/60 backdrop-blur p-4">
            <h3 className="font-semibold mb-3">Members</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {team.members.map((m) => (
                <li key={m.id} className="rounded-md border bg-card/60 px-3 py-2">{m.name}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border bg-card/60 backdrop-blur p-4">
            <h3 className="font-semibold mb-3">Team Chat</h3>
            <div className="flex gap-2 mb-3">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write a message" className="flex-1 rounded-md border bg-background px-3 py-2" />
              <button onClick={send} className="rounded-md bg-primary text-primary-foreground px-4">Send</button>
            </div>
            <ul className="space-y-3">
              {messages.map((m) => (
                <li key={m.id} className="rounded-md border bg-background px-3 py-2">
                  <div className="text-sm text-muted-foreground">{m.user} · {new Date(m.date).toLocaleTimeString()}</div>
                  <div>{m.text}</div>
                </li>
              ))}
              {messages.length === 0 && (
                <li className="text-sm text-muted-foreground">No messages yet.</li>
              )}
            </ul>
          </div>
        </div>
        <div className="rounded-lg border bg-card/60 backdrop-blur p-4">
          <h3 className="font-semibold mb-3">Performance</h3>
          <div className="text-sm text-muted-foreground mb-2">Placeholder performance metrics</div>
          <ul className="text-sm space-y-2">
            <li>Win rate: 58%</li>
            <li>Sharpe ratio: 1.2</li>
            <li>Max drawdown: 12%</li>
          </ul>
        </div>
      </div>
    </>
  );
}
