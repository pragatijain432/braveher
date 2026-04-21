import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tips = [
  {
    title: "10 essentials for a safer commute",
    excerpt: "From sharing your route to choosing well-lit streets, small habits that change everything.",
    category: "Daily safety",
    read: "5 min",
    color: "from-primary to-primary-glow",
  },
  {
    title: "What to do if you're being followed",
    excerpt: "A calm, step-by-step guide to handling one of the scariest situations.",
    category: "Emergency",
    read: "4 min",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Self-defense: 5 moves every woman should know",
    excerpt: "Simple, effective techniques that don't require strength — only awareness.",
    category: "Self defense",
    read: "8 min",
    color: "from-fuchsia-500 to-purple-500",
  },
  {
    title: "Travel solo, travel safe",
    excerpt: "Researching destinations, picking accommodation, and trusting your instincts on the road.",
    category: "Travel",
    read: "7 min",
    color: "from-pink-500 to-rose-400",
  },
  {
    title: "Cybersecurity 101 for women",
    excerpt: "Online stalking, doxxing, and how to lock down your digital footprint.",
    category: "Digital",
    read: "6 min",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Knowing your legal rights",
    excerpt: "What every woman should know about laws protecting her from harassment and abuse.",
    category: "Legal",
    read: "10 min",
    color: "from-rose-400 to-orange-400",
  },
];

const SafetyTips = () => (
  <div className="container py-10 md:py-14">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">Knowledge is power</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Safety tips & guides</h1>
      <p className="text-muted-foreground text-lg">
        Curated, practical, real-world advice from women, for women.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tips.map((t, i) => (
        <motion.article
          key={t.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all cursor-pointer"
        >
          <div className={`h-40 bg-gradient-to-br ${t.color} relative`}>
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/25 backdrop-blur-sm text-white text-xs font-semibold">
              {t.category}
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Clock className="w-3.5 h-3.5" /> {t.read} read
            </div>
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {t.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{t.excerpt}</p>
            <Button variant="link" className="px-0 text-primary">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
);

export default SafetyTips;
