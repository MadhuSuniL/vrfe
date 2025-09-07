import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { useApp } from '@/contexts/AppContext';
import { User, Mail, ArrowLeft, LogOut, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user, logout, videos } = useApp();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const readyVideos = videos.filter(v => v.status === 'ready').length;
  const processingVideos = videos.filter(v => v.status === 'processing').length;

  return (
    <div className="min-h-screen bg-background bg-gradient-hero relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-glass-border bg-glass-bg backdrop-blur-glass">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/dashboard"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-primary animate-glow-pulse" />
              <span className="text-lg font-semibold text-foreground">Profile Settings</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Card */}
          <div className="animate-slide-up">
            <GlassCard className="w-full">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-primary animate-glow-pulse">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {user?.username}
                  </h1>
                  <p className="text-muted-foreground flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Username:</span>
                      <span className="text-foreground font-medium">{user?.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-foreground font-medium">{user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since:</span>
                      <span className="text-foreground font-medium">January 2024</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">VR180 Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Videos:</span>
                      <span className="text-foreground font-medium">{videos.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ready to Watch:</span>
                      <span className="text-accent font-medium">{readyVideos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing:</span>
                      <span className="text-secondary font-medium">{processingVideos}</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Actions */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <GlassCard>
              <h3 className="text-xl font-semibold text-foreground mb-6">Account Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button 
                    variant="outline"
                    className="bg-glass-bg border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Back to Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="bg-glass-bg border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </GlassCard>
          </div>

          {/* Feature Preview */}
          <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
            <GlassCard>
              <h3 className="text-xl font-semibold text-foreground mb-4">VR180 Experience</h3>
              <p className="text-muted-foreground mb-6">
                Transform your 2D content into immersive VR180 experiences with our advanced AI conversion technology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-glass-bg border border-glass-border rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-2">180°</div>
                  <div className="text-sm text-muted-foreground">Field of View</div>
                </div>
                <div className="text-center p-4 bg-glass-bg border border-glass-border rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-2">4K</div>
                  <div className="text-sm text-muted-foreground">Ultra HD Quality</div>
                </div>
                <div className="text-center p-4 bg-glass-bg border border-glass-border rounded-xl">
                  <div className="text-2xl font-bold text-accent mb-2">AI</div>
                  <div className="text-sm text-muted-foreground">Powered Conversion</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;