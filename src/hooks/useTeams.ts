import { useUserStore } from "@/stores/userStore";
import { Team } from "@/types";

export function useTeams() {
  const { teams, createTeam } = useUserStore();

  const addTeam = (input: Omit<Team, "id">) => createTeam(input);

  return { teams, addTeam };
}
