import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/tracking", label: "Live Map" },
  { to: "/contacts", label: "Contacts" },
  { to: "/report", label: "Report" },
  { to: "/safety-tips", label: "Tips" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "Stay safe out there." });
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-hero grid place-items-center shadow-glow group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">
            Safe<span className="text-gradient">Her</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive ? "text-primary bg-accent/60" : "text-foreground/70 hover:text-foreground hover:bg-accent/40"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          {user ? (
            <Button onClick={handleSignOut} variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full">
              <LogOut className="w-4 h-4" /> Sign out
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex rounded-full">
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-accent/50"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="container py-4 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium ${
                      isActive ? "bg-accent text-primary" : "hover:bg-accent/50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex gap-2 pt-2">
                {user ? (
                  <Button onClick={handleSignOut} variant="outline" className="flex-1 rounded-full">
                    <LogOut className="w-4 h-4" /> Sign out
                  </Button>
                ) : (
                  <>
                    <Button asChild variant="outline" className="flex-1 rounded-full">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild variant="hero" className="flex-1 rounded-full">
                      <Link to="/signup">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
