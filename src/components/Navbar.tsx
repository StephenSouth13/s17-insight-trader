import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TrendingUp, Users, User } from "lucide-react";

const Navbar = () => {
  const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const linkActive = "bg-secondary text-secondary-foreground";
  const linkIdle = "text-muted-foreground hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <nav className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-semibold">S17</span>
          </div>
          <div className="hidden md:flex items-center gap-1 ml-4">
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
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            <Users className="mr-2 h-4 w-4" /> Create Team
          </Button>
          <Button variant="default" size="sm">
            <User className="mr-2 h-4 w-4" /> Account
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
