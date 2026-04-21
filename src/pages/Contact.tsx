import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "We'll get back to you within 24 hours." });
  };

  return (
    <div className="container py-10 md:py-14">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">We're here for you</h1>
        <p className="text-muted-foreground text-lg">Questions, feedback, or just want to say hi? Reach out.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { icon: Mail, label: "Email us", value: "hello@safeher.app" },
          { icon: Phone, label: "Call helpline", value: "+91 1800 SAFE HER" },
          { icon: MapPin, label: "Visit us", value: "Mumbai · Bangalore · Delhi" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-3xl p-6 text-center shadow-soft"
          >
            <div className="w-12 h-12 rounded-2xl gradient-hero grid place-items-center mx-auto mb-4">
              <c.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{c.label}</p>
            <p className="font-semibold">{c.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-3xl p-7 md:p-10 mt-8 max-w-3xl mx-auto shadow-soft space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Your name</Label>
            <Input className="rounded-xl mt-1.5 h-11" placeholder="Jane Doe" required />
          </div>
          <div>
            <Label>Your email</Label>
            <Input type="email" className="rounded-xl mt-1.5 h-11" placeholder="you@example.com" required />
          </div>
        </div>
        <div>
          <Label>Subject</Label>
          <Input className="rounded-xl mt-1.5 h-11" placeholder="What's on your mind?" />
        </div>
        <div>
          <Label>Message</Label>
          <Textarea className="rounded-xl mt-1.5 min-h-36" placeholder="Tell us more..." required />
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full">
          <Send className="w-4 h-4" /> Send message
        </Button>
      </motion.form>
    </div>
  );
};

export default Contact;
