import { Link } from "react-router-dom";
import { Shield, Heart, Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border bg-secondary/30 mt-24">
    <div className="container py-14 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl gradient-hero grid place-items-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">
            Safe<span className="text-gradient">Her</span>
          </span>
        </Link>
        <p className="text-muted-foreground max-w-md">
          A safety companion built for women, by women. Empowering you with
          tools, community, and peace of mind — wherever you go.
        </p>
        <div className="flex gap-3 mt-5">
          {[Instagram, Twitter, Facebook].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 rounded-full bg-background border border-border grid place-items-center hover:bg-accent transition-colors"
              aria-label="Social link"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-lg mb-4">Product</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
          <li><Link to="/tracking" className="hover:text-foreground">Live Tracking</Link></li>
          <li><Link to="/contacts" className="hover:text-foreground">Trusted Contacts</Link></li>
          <li><Link to="/safety-tips" className="hover:text-foreground">Safety Tips</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-lg mb-4">Support</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/contact" className="hover:text-foreground">Contact us</Link></li>
          <li><Link to="/report" className="hover:text-foreground">Report incident</Link></li>
          <li><a href="#" className="hover:text-foreground">Privacy policy</a></li>
          <li><a href="#" className="hover:text-foreground">Terms of service</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border">
      <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} SafeHer. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> for every woman.
        </p>
      </div>
    </div>
  </footer>
);
