import { ReactNode } from "react";
import { useUserStore } from "@/stores/userStore";
import { Button } from "@/components/ui/button";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, mockSignIn } = useUserStore();

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto mt-16 rounded-lg border bg-card/60 backdrop-blur p-8 text-center">
        <h1 className="text-2xl font-semibold mb-2">Sign in required</h1>
        <p className="text-muted-foreground mb-6">Connect Supabase + Auth to secure these routes. For now, use the mock sign-in to preview.</p>
        <Button onClick={mockSignIn}>Mock Sign In</Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
