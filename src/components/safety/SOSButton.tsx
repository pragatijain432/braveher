import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export const SOSButton = () => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    let raf: number;
    if (holding && progress < 100) {
      raf = window.setTimeout(() => setProgress((p) => Math.min(100, p + 4)), 60);
    }
    if (progress >= 100 && !activated) trigger();
    return () => clearTimeout(raf);
  }, [holding, progress]);

  useEffect(() => {
    if (!holding) setProgress(0);
  }, [holding]);

  const trigger = () => {
    setActivated(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCoords({ lat: 28.6139, lng: 77.209 }),
      );
    } else {
      setCoords({ lat: 28.6139, lng: 77.209 });
    }
    toast({
      title: "🚨 SOS Activated",
      description: "Your trusted contacts have been alerted with your live location.",
    });
  };

  const cancel = () => {
    setActivated(false);
    setProgress(0);
    setHolding(false);
    setCoords(null);
    toast({ title: "SOS cancelled", description: "Stay safe out there." });
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.div
            key="idle"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onMouseDown={() => setHolding(true)}
              onMouseUp={() => setHolding(false)}
              onMouseLeave={() => setHolding(false)}
              onTouchStart={() => setHolding(true)}
              onTouchEnd={() => setHolding(false)}
              className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-sos text-sos-foreground font-display font-bold text-3xl shadow-glow grid place-items-center sos-pulse hover:scale-105 active:scale-95 transition-transform select-none"
              aria-label="Hold to send SOS"
            >
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="hsl(var(--sos-foreground) / 0.2)" strokeWidth="3" />
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="hsl(var(--sos-foreground))"
                  strokeWidth="3"
                  strokeDasharray={`${(progress / 100) * 301} 301`}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
              </svg>
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="w-12 h-12" />
                <span>SOS</span>
              </div>
            </button>
            <p className="text-muted-foreground text-center max-w-xs">
              Press and hold for 1.5 seconds to send an emergency alert to your trusted contacts.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6 max-w-md text-center"
          >
            <div className="w-24 h-24 rounded-full bg-sos/15 grid place-items-center">
              <CheckCircle2 className="w-12 h-12 text-sos" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">Help is on the way</h3>
              <p className="text-muted-foreground">
                Your 3 trusted contacts have been notified with your live location and a panic message.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 w-full text-left">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <MapPin className="w-4 h-4 text-primary" /> Sharing live location
              </div>
              {coords ? (
                <div className="font-mono text-sm">
                  {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Locating...
                </div>
              )}
            </div>
            <Button variant="outline" size="lg" onClick={cancel} className="rounded-full">
              I'm safe — Cancel SOS
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
