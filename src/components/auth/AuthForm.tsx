import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  mode: "login" | "signup";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast({
          title: "Account created",
          description: "Welcome to SafeHer. You're signed in.",
        });
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back", description: "You're signed in." });
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast({
        title: "Authentication failed",
        description: err.message ?? "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] gradient-soft flex items-center py-12">
      <div className="container max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-soft"
        >
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-hero grid place-items-center shadow-glow">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold text-center mb-2">
            {isSignup ? "Join SafeHer" : "Welcome back"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isSignup
              ? "Start your safer journey today."
              : "Sign in to continue your protection."}
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <Label htmlFor="name">Full name</Label>
                <div className="relative mt-1.5">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    className="pl-9 rounded-xl h-11"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9 rounded-xl h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 rounded-xl h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignup ? "Already a member? " : "New to SafeHer? "}
            <Link
              to={isSignup ? "/login" : "/signup"}
              className="text-primary font-semibold hover:underline"
            >
              {isSignup ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
