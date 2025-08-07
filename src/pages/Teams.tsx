import SEO from "@/components/SEO";
import TeamCard from "@/components/TeamCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useTeams } from "@/hooks/useTeams";

export default function Teams() {
  const { teams, addTeam } = useTeams();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    addTeam({ name, description, members: [], performance: Array.from({ length: 24 }, (_, i) => ({ value: 100 + i })) });
    setOpen(false);
    setName("");
    setDescription("");
  };

  return (
    <>
      <SEO title="Teams – S17 Social Trading Platform" description="Create and manage S17 trading teams." canonical="/teams" />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Teams</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="My Pro Traders" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Strategy and goals" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teams.map((t) => (
          <TeamCard key={t.id} team={t} />
        ))}
      </section>
    </>
  );
}
