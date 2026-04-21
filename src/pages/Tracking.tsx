import { LiveMap } from "@/components/safety/LiveMap";
import { Button } from "@/components/ui/button";
import { Share2, Navigation, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Tracking = () => (
  <div className="container py-10 md:py-14">
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Live location</h1>
        <p className="text-muted-foreground mt-2">Share your real-time location with trusted contacts.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="rounded-full" onClick={() => toast({ title: "Link copied", description: "Live tracking link copied to clipboard." })}>
          <Share2 className="w-4 h-4" /> Share link
        </Button>
        <Button variant="hero" className="rounded-full" onClick={() => toast({ title: "Tracking started", description: "Your contacts can now see your live location." })}>
          <Navigation className="w-4 h-4" /> Start tracking
        </Button>
      </div>
    </div>

    <LiveMap height="600px" />

    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {[
        { label: "Safe Zones nearby", value: "3", desc: "Police, hospital, help center" },
        { label: "Estimated route", value: "12 min", desc: "Walking to home" },
        { label: "Watching", value: "3 contacts", desc: "Mom, Sara, Priya" },
      ].map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-2xl p-5 shadow-soft">
          <div className="flex items-center gap-2 text-primary mb-1">
            <ShieldCheck className="w-4 h-4" />
            <p className="text-sm font-medium">{s.label}</p>
          </div>
          <div className="font-display text-2xl font-bold">{s.value}</div>
          <p className="text-sm text-muted-foreground">{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Tracking;
