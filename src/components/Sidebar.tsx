import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const linkBase = "block px-3 py-2 rounded-md text-sm transition-colors";
  const linkActive = "bg-secondary text-secondary-foreground";
  const linkIdle = "text-muted-foreground hover:text-foreground";

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-20 space-y-1">
        <NavLink to="/dashboard" className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}>
          Dashboard
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}>
          Teams
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => cn(linkBase, isActive ? linkActive : linkIdle)}>
          Profile
        </NavLink>
      </div>
    </aside>
  );
}
