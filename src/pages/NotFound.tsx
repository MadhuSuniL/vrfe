import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-8 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 animate-slide-up">
        <GlassCard className="text-center max-w-md">
          <div className="space-y-6">
            <div className="relative">
              <AlertTriangle className="w-20 h-20 text-accent mx-auto animate-glow-pulse" />
              <div className="absolute inset-0 w-20 h-20 bg-accent/20 rounded-full blur-lg animate-pulse mx-auto"></div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-foreground">
                Page Not Found
              </h2>
              <p className="text-muted-foreground">
                Oops! The page you're looking for doesn't exist in our VR180 universe.
              </p>
            </div>

            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300 hover:shadow-glow-primary animate-glow-pulse">
                <Home className="w-5 h-5 mr-2" />
                Return to Home
              </Button>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NotFound;
