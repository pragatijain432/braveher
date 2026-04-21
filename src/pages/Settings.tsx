import { motion } from "framer-motion";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const save = () => toast({ title: "Settings saved" });

  return (
    <div className="container py-10 md:py-14 max-w-4xl">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Profile & settings</h1>
      <p className="text-muted-foreground mb-10">Manage your account and safety preferences.</p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-3xl p-7 md:p-9 mb-6 shadow-soft">
        <h2 className="font-display text-2xl font-bold mb-6">Profile</h2>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-20 h-20 rounded-full gradient-hero grid place-items-center text-primary-foreground font-display text-3xl font-bold">J</div>
          <Button variant="outline" className="rounded-full"><Camera className="w-4 h-4" /> Change photo</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Full name</Label><Input className="rounded-xl mt-1.5 h-11" defaultValue="Jane Doe" /></div>
          <div><Label>Email</Label><Input className="rounded-xl mt-1.5 h-11" defaultValue="jane@example.com" /></div>
          <div><Label>Phone</Label><Input className="rounded-xl mt-1.5 h-11" defaultValue="+91 98765 43210" /></div>
          <div><Label>Date of birth</Label><Input type="date" className="rounded-xl mt-1.5 h-11" /></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-3xl p-7 md:p-9 mb-6 shadow-soft">
        <h2 className="font-display text-2xl font-bold mb-6">Preferences</h2>
        <div className="space-y-5">
          {[
            { label: "Voice command activation", desc: "Trigger SOS by saying 'Help me'", on: true },
            { label: "Auto check-in reminders", desc: "Periodic safety check-ins during late hours", on: true },
            { label: "Share location with circle", desc: "Always allow trusted contacts to see your location", on: false },
            { label: "Anonymous incident reports", desc: "Submit reports without revealing identity by default", on: false },
            { label: "Push notifications", desc: "Alerts, reminders, and updates", on: true },
          ].map((s) => (
            <div key={s.label} className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
              <div>
                <div className="font-semibold">{s.label}</div>
                <div className="text-sm text-muted-foreground">{s.desc}</div>
              </div>
              <Switch defaultChecked={s.on} />
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div>
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="rounded-xl mt-1.5 h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Region</Label>
            <Select defaultValue="in">
              <SelectTrigger className="rounded-xl mt-1.5 h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <Button variant="hero" size="lg" onClick={save}><Save className="w-4 h-4" /> Save changes</Button>
    </div>
  );
};

export default Settings;
