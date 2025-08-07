import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <>
      <SEO title="S17 Social Trading Platform" description="Crypto dashboard with teams and AI portfolio insights." canonical="/" />
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trade smarter with S17</h1>
          <p className="text-lg text-muted-foreground mb-6">Real-time crypto data, collaborative teams, and AI-powered insights in one sleek dashboard.</p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild>
              <Link to="/dashboard">Open Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/teams">Explore Teams</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
