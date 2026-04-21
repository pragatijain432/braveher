import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface AuthFormProps {
  mode: "login" | "signup";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const isSignup = mode === "signup";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isSignup ? "Account created (demo)" : "Welcome back (demo)",
      description: "Authentication will be wired up to Lovable Cloud next.",
    });
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
                  <Input id="name" placeholder="Jane Doe" className="pl-9 rounded-xl h-11" required />
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-9 rounded-xl h-11" required />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-9 rounded-xl h-11" required />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              {isSignup ? "Create account" : "Sign in"}
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
