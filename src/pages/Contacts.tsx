import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Phone, Mail, Trash2, Edit2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Contact { id: string; name: string; phone: string; email?: string; relation: string; primary?: boolean }

const initial: Contact[] = [
  { id: "1", name: "Mom", phone: "+91 98765 43210", relation: "Family", primary: true },
  { id: "2", name: "Sara Khan", phone: "+91 91234 56789", email: "sara@mail.com", relation: "Best friend" },
  { id: "3", name: "Priya Sharma", phone: "+91 90000 11111", relation: "Sister" },
];

const Contacts = () => {
  const [list, setList] = useState<Contact[]>(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", relation: "" });

  const add = () => {
    if (!form.name || !form.phone) {
      toast({ title: "Name and phone required", variant: "destructive" });
      return;
    }
    setList([...list, { id: crypto.randomUUID(), ...form }]);
    setForm({ name: "", phone: "", email: "", relation: "" });
    setOpen(false);
    toast({ title: "Contact added", description: `${form.name} is now in your circle.` });
  };

  const remove = (id: string) => {
    setList(list.filter((c) => c.id !== id));
    toast({ title: "Contact removed" });
  };

  const togglePrimary = (id: string) => {
    setList(list.map((c) => ({ ...c, primary: c.id === id })));
  };

  return (
    <div className="container py-10 md:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Trusted circle</h1>
          <p className="text-muted-foreground mt-2">The people who'll be alerted when you need help.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="rounded-full"><UserPlus className="w-4 h-4" /> Add contact</Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Add a trusted contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Name</Label>
                <Input className="rounded-xl mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input className="rounded-xl mt-1.5" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." />
              </div>
              <div>
                <Label>Email (optional)</Label>
                <Input className="rounded-xl mt-1.5" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
              </div>
              <div>
                <Label>Relation</Label>
                <Input className="rounded-xl mt-1.5" value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} placeholder="Sister, friend, partner..." />
              </div>
              <Button variant="hero" className="w-full" onClick={add}>Add to circle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {list.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-card border border-border rounded-3xl p-6 shadow-soft hover:shadow-glow transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl gradient-hero grid place-items-center text-primary-foreground font-display font-bold text-xl">
                  {c.name[0]}
                </div>
                <button
                  onClick={() => togglePrimary(c.id)}
                  className={`p-2 rounded-full ${c.primary ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                  aria-label="Toggle primary"
                >
                  <Star className={`w-5 h-5 ${c.primary ? "fill-primary" : ""}`} />
                </button>
              </div>
              <h3 className="font-display text-xl font-bold">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{c.relation}</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> {c.phone}</div>
                {c.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> {c.email}</div>}
              </div>
              <div className="flex gap-2 mt-5">
                <Button variant="soft" size="sm" className="flex-1 rounded-xl"><Edit2 className="w-3.5 h-3.5" /> Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => remove(c.id)} className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Contacts;
