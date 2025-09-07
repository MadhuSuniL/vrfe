import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Zap, Play } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background bg-gradient-hero overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-primary/15 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main hero content */}
        <div className="text-center animate-slide-up">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Zap className="w-16 h-16 text-primary animate-glow-pulse rounded-3xl" />
              <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-pulse"></div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-glow-pulse rounded-3xl">
            2D → VR180
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Immersive Converter
          </h2>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Upload your 2D clips and experience them in fully immersive VR180
          </p>

          {/* Demo video preview */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <GlassCard className="inline-block p-8 hover">
              <div className="flex items-center space-x-4">
                <Play className="w-12 h-12 text-accent" />
                <div>
                  <p className="text-lg font-semibold text-foreground">See it in action</p>
                  <p className="text-muted-foreground">Experience the magic of VR180</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Auth buttons */}
        <div className="fixed bottom-8 left-8 flex space-x-4 animate-slide-up" style={{ animationDelay: '1.2s' }}>
          <Link to="/login">
            <Button variant="outline" size="lg" className="bg-glass-bg backdrop-blur-glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-glow-primary">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300 hover:shadow-glow-accent animate-glow-pulse">
              Register
            </Button>
          </Link>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-1/4 left-8 animate-float">
          <div className="w-2 h-2 bg-primary rounded-full shadow-glow-primary"></div>
        </div>
        <div className="absolute top-1/3 right-16 animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-1 h-1 bg-accent rounded-full shadow-glow-accent"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-float" style={{ animationDelay: '2.5s' }}>
          <div className="w-3 h-3 bg-secondary rounded-full shadow-glow-secondary"></div>
        </div>
      </div>
    </div>
  );
};

export default Landing;