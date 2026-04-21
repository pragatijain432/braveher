import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Phone, Sparkles, Star, ArrowRight, Bell, Users, AlertTriangle, Headphones } from "lucide-react";
import heroImage from "@/assets/hero-safeher.jpg";

const features = [
  { icon: Shield, title: "One-tap SOS", desc: "Instantly alert your circle with your live location and a panic signal." },
  { icon: MapPin, title: "Live tracking", desc: "Share your real-time route with trusted contacts until you're safe." },
  { icon: Users, title: "Trusted circle", desc: "Curate the people who matter — family, friends, anyone who has your back." },
  { icon: Phone, title: "Fake call", desc: "Trigger an instant fake call to discreetly exit uncomfortable situations." },
  { icon: AlertTriangle, title: "Incident reports", desc: "Document and share unsafe areas to protect the wider community." },
  { icon: Headphones, title: "24/7 helpline", desc: "Quick-dial verified emergency lines and women's helpline numbers." },
];

const testimonials = [
  { name: "Aisha M.", role: "Student, Mumbai", text: "I walk home at night with so much more confidence. The check-in timer alone has changed everything." },
  { name: "Priya K.", role: "Designer, Bangalore", text: "The fake call saved me from a terrible cab ride. SafeHer feels like having a friend on standby." },
  { name: "Sara L.", role: "Nurse, Delhi", text: "After my late shifts I always activate live tracking. My husband knows I'm safe and so do I." },
];

export const Hero = () => (
  <section className="relative overflow-hidden gradient-soft">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl float" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-accent/40 blur-3xl float" style={{ animationDelay: "2s" }} />
    </div>

    <div className="container pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/60 border border-primary/20 text-sm font-medium text-primary mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Your safety, simplified
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
          Walk anywhere.{" "}
          <span className="text-gradient">Feel safe</span> everywhere.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          SafeHer is the all-in-one safety companion for women — one-tap SOS, live tracking,
          trusted contacts, and a community that has your back, 24/7.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="xl" variant="hero">
            <Link to="/signup">
              Get protected now <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="rounded-full">
            <Link to="/dashboard">See how it works</Link>
          </Button>
        </div>
        <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
          <div>
            <div className="font-display text-2xl font-bold text-foreground">120k+</div>
            women protected
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <div className="font-display text-2xl font-bold text-foreground">4.9★</div>
            average rating
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <div className="font-display text-2xl font-bold text-foreground">24/7</div>
            always on
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative"
      >
        <div className="relative rounded-[2rem] overflow-hidden shadow-glow border-4 border-background">
          <img
            src={heroImage}
            alt="Confident young woman walking through a sunset-lit city street"
            width={1280}
            height={1280}
            className="w-full h-[500px] lg:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute -left-4 top-10 bg-card border border-border rounded-2xl p-4 shadow-soft flex items-center gap-3 max-w-[220px]"
        >
          <div className="w-10 h-10 rounded-full bg-primary/15 grid place-items-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold">Check-in sent</div>
            <div className="text-xs text-muted-foreground">3 contacts notified</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -right-4 bottom-16 bg-card border border-border rounded-2xl p-4 shadow-soft max-w-[240px]"
        >
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            "I finally feel safe coming home from late shifts." — <span className="font-semibold text-foreground">Sara</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export const Features = () => (
  <section className="container py-20 lg:py-28">
    <div className="text-center max-w-2xl mx-auto mb-14">
      <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">Everything you need</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
        Built for the moments that matter most
      </h2>
      <p className="text-muted-foreground text-lg">
        From everyday peace of mind to true emergencies — every feature is designed
        with one goal: keeping you safe.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="group p-7 rounded-3xl gradient-card border border-border hover:shadow-glow transition-all hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl gradient-hero grid place-items-center mb-5 group-hover:scale-110 transition-transform">
            <f.icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export const Testimonials = () => (
  <section className="bg-secondary/40 py-20 lg:py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">Loved by women everywhere</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Stories that matter
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card p-7 rounded-3xl border border-border shadow-soft"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/90 mb-6 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full gradient-hero grid place-items-center text-primary-foreground font-semibold">
                {t.name[0]}
              </div>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const CTA = () => (
  <section className="container py-20 lg:py-24">
    <div className="relative overflow-hidden rounded-[2.5rem] gradient-hero p-10 md:p-16 text-center text-primary-foreground shadow-glow">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
      <div className="relative">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto">
          Your safety shouldn't depend on luck.
        </h2>
        <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8 text-lg">
          Join SafeHer today and walk into every moment with the confidence you deserve.
        </p>
        <Button asChild size="xl" variant="secondary" className="rounded-full">
          <Link to="/signup">
            Create your free account <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);
