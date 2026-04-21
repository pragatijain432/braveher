import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Phone, Mail, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  relation: string | null;
  is_primary: boolean;
}

const Contacts = () => {
  const { user } = useAuth();
  const [list, setList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", relation: "" });

  const fetchContacts = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("trusted_contacts")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast({ title: "Could not load contacts", description: error.message, variant: "destructive" });
    } else {
      setList(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const add = async () => {
    if (!user) return;
    if (!form.name || !form.phone) {
      toast({ title: "Name and phone required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("trusted_contacts")
      .insert({
        user_id: user.id,
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        relation: form.relation || null,
      })
      .select()
      .single();
    setSaving(false);

    if (error) {
      toast({ title: "Could not add contact", description: error.message, variant: "destructive" });
      return;
    }
    setList([...list, data as Contact]);
    setForm({ name: "", phone: "", email: "", relation: "" });
    setOpen(false);
    toast({ title: "Contact added", description: `${data.name} is now in your circle.` });
  };

  const remove = async (id: string) => {
    const prev = list;
    setList(list.filter((c) => c.id !== id));
    const { error } = await supabase.from("trusted_contacts").delete().eq("id", id);
    if (error) {
      setList(prev);
      toast({ title: "Could not remove", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Contact removed" });
  };

  const togglePrimary = async (id: string) => {
    if (!user) return;
    const prev = list;
    setList(list.map((c) => ({ ...c, is_primary: c.id === id })));
    // unset all, then set selected
    const { error: clearErr } = await supabase
      .from("trusted_contacts")
      .update({ is_primary: false })
      .eq("user_id", user.id);
    if (clearErr) {
      setList(prev);
      toast({ title: "Could not update", description: clearErr.message, variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("trusted_contacts").update({ is_primary: true }).eq("id", id);
    if (error) {
      setList(prev);
      toast({ title: "Could not update", description: error.message, variant: "destructive" });
    }
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
              <Button variant="hero" className="w-full" onClick={add} disabled={saving}>
                {saving ? "Adding..." : "Add to circle"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground">Loading contacts...</div>
      ) : list.length === 0 ? (
        <div className="bg-card border border-border rounded-3xl p-10 text-center shadow-soft">
          <p className="text-muted-foreground">No trusted contacts yet. Add the people who matter most.</p>
        </div>
      ) : (
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
                    {c.name[0]?.toUpperCase()}
                  </div>
                  <button
                    onClick={() => togglePrimary(c.id)}
                    className={`p-2 rounded-full ${c.is_primary ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                    aria-label="Toggle primary"
                  >
                    <Star className={`w-5 h-5 ${c.is_primary ? "fill-primary" : ""}`} />
                  </button>
                </div>
                <h3 className="font-display text-xl font-bold">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{c.relation || "Contact"}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> {c.phone}</div>
                  {c.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> {c.email}</div>}
                </div>
                <div className="flex gap-2 mt-5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(c.id)}
                    className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Contacts;
