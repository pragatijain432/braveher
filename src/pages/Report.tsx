import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Upload, Mic, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Report = () => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [incidentAt, setIncidentAt] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const reset = () => {
    setIncidentType("");
    setIncidentAt("");
    setLocation("");
    setDescription("");
    setAnonymous(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!incidentType) {
      toast({ title: "Please select an incident type", variant: "destructive" });
      return;
    }
    if (!user && !anonymous) {
      toast({
        title: "Sign in to submit",
        description: "Or check 'Submit anonymously' to continue.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("incident_reports").insert({
      user_id: anonymous ? null : user?.id ?? null,
      incident_type: incidentType,
      incident_at: incidentAt ? new Date(incidentAt).toISOString() : null,
      location: location || null,
      description: description || null,
      is_anonymous: anonymous,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: "Could not submit", description: error.message, variant: "destructive" });
      return;
    }

    reset();
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safer.",
    });
  };

  return (
    <div className="container py-10 md:py-14 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-destructive/15 grid place-items-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold">Report an incident</h1>
            <p className="text-muted-foreground">Your report helps make the community safer for everyone.</p>
          </div>
        </div>

        <form onSubmit={submit} className="bg-card border border-border rounded-3xl p-7 md:p-9 mt-8 shadow-soft space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Incident type</Label>
              <Select value={incidentType} onValueChange={setIncidentType}>
                <SelectTrigger className="rounded-xl mt-1.5 h-11"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="stalking">Stalking</SelectItem>
                  <SelectItem value="unsafe-area">Unsafe area</SelectItem>
                  <SelectItem value="suspicious">Suspicious activity</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date & time</Label>
              <Input
                type="datetime-local"
                className="rounded-xl mt-1.5 h-11"
                value={incidentAt}
                onChange={(e) => setIncidentAt(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Location</Label>
            <div className="relative mt-1.5">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9 rounded-xl h-11"
                placeholder="Street, neighborhood, city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Describe what happened</Label>
            <Textarea
              className="rounded-xl mt-1.5 min-h-32"
              placeholder="Share as much detail as you're comfortable with..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Attach evidence (optional)</Label>
            <div className="grid sm:grid-cols-3 gap-3 mt-2">
              {[
                { icon: Upload, label: "Photo / file" },
                { icon: Mic, label: "Audio note" },
                { icon: Video, label: "Video" },
              ].map((o) => (
                <button
                  key={o.label}
                  type="button"
                  className="p-4 border-2 border-dashed border-border rounded-2xl hover:bg-accent/40 hover:border-primary transition-all flex flex-col items-center gap-2 text-sm"
                >
                  <o.icon className="w-5 h-5 text-primary" />
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 rounded-xl bg-accent/40 text-sm">
            <input
              type="checkbox"
              id="anon"
              className="accent-primary w-4 h-4"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <label htmlFor="anon">Submit anonymously</label>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit report"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Report;
