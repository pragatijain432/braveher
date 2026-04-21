import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MapPin, Users, AlertTriangle, Shield, Clock, Mic, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOSButton } from "@/components/safety/SOSButton";
import { toast } from "@/hooks/use-toast";

const helplines = [
  { name: "Women's Helpline", number: "1091" },
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "102" },
  { name: "Domestic Abuse", number: "181" },
];

const quickActions = [
  { icon: MapPin, label: "Live tracking", to: "/tracking", color: "from-primary to-primary-glow" },
  { icon: Users, label: "Trusted contacts", to: "/contacts", color: "from-pink-500 to-rose-500" },
  { icon: AlertTriangle, label: "Report incident", to: "/report", color: "from-fuchsia-500 to-purple-500" },
  { icon: Shield, label: "Safety tips", to: "/safety-tips", color: "from-rose-500 to-orange-400" },
];

const Dashboard = () => {
  const fakeCall = () => {
    toast({
      title: "📞 Incoming call",
      description: 'Mom is calling... (simulated in 5 seconds)',
    });
  };
  const checkIn = () => {
    toast({
      title: "Check-in scheduled",
      description: "We'll alert your contacts in 30 minutes if you don't confirm.",
    });
  };
  const voiceHelp = () => {
    toast({
      title: "🎙️ Voice command active",
      description: 'Say "Help me" to trigger emergency alert.',
    });
  };

  return (
    <div className="container py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-primary font-medium mb-2">Welcome back, Jane 👋</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Your safety dashboard</h1>
        <p className="text-muted-foreground mt-2">Everything you need, one tap away.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-8 md:p-10 flex flex-col items-center gradient-card">
          <h2 className="font-display text-2xl font-bold mb-6">Emergency SOS</h2>
          <SOSButton />
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 grid place-items-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold">Fake call</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get a discreet incoming call to escape uncomfortable moments.
            </p>
            <Button variant="soft" className="w-full rounded-xl" onClick={fakeCall}>
              Trigger fake call
            </Button>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 grid place-items-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold">Check-in timer</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Set a timer — if you don't confirm, we alert your contacts.
            </p>
            <Button variant="soft" className="w-full rounded-xl" onClick={checkIn}>
              Start 30-min timer
            </Button>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/15 grid place-items-center">
                <Mic className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold">Voice command</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Say "Help me" to instantly trigger SOS hands-free.
            </p>
            <Button variant="soft" className="w-full rounded-xl" onClick={voiceHelp}>
              Activate voice
            </Button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={a.to}
              className="block p-6 rounded-3xl bg-card border border-border hover:shadow-glow hover:-translate-y-1 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.color} grid place-items-center mb-4`}>
                <a.icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold">{a.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-3xl p-6 shadow-soft">
          <h3 className="font-display text-xl font-bold mb-4">Emergency helplines</h3>
          <div className="space-y-2">
            {helplines.map((h) => (
              <a
                key={h.number}
                href={`tel:${h.number}`}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors"
              >
                <span className="font-medium">{h.name}</span>
                <span className="font-mono font-bold text-primary">{h.number}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 shadow-soft gradient-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl gradient-hero grid place-items-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold">AI Safety Assistant</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Ask anything — safety tips, what to do in specific situations, or how to use SafeHer features.
          </p>
          <Button variant="hero" className="rounded-full">Open chat</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
