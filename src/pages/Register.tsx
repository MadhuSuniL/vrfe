import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { Mail, Lock, User, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nick_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords don't match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", {
        nick_name: formData.nick_name,
        email: formData.email,
        password: formData.password
      });

      const data = response.data;

      toast({
        title: "Account created!",
        description: "Welcome to the VR180 experience.",
      });

      window.location.href = '/login';
    } catch (error: unknown) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.detail || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-40 left-20 w-36 h-36 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-8 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="fixed top-8 left-8 z-20 text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="w-full max-w-md animate-slide-up">
        <GlassCard className="w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Join the Future
            </h1>
            <p className="text-muted-foreground">
              Create your VR180 account today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nick_name" className="text-foreground">Nickname</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="nick_name"
                  type="text"
                  value={formData.nick_name}
                  onChange={(e) => handleChange('nick_name', e.target.value)}
                  className="pl-12 bg-glass-bg border-glass-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary transition-all duration-300"
                  placeholder="Choose a nickname"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-12 bg-glass-bg border-glass-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-12 bg-glass-bg border-glass-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary transition-all duration-300"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="pl-12 bg-glass-bg border-glass-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary transition-all duration-300"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-300 hover:shadow-glow-primary animate-glow-pulse text-lg py-3 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-secondary transition-colors duration-300 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Register;
