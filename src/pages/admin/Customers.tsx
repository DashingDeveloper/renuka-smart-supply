import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import EmptyState from "@/components/EmptyState";
import { useAppData } from "@/contexts/AppDataContext";
import { Phone, Search, ChevronRight, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Customers = () => {
  const { customers, setCustomers } = useAppData();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    if (!form.name || !form.phone) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.phone.length !== 10) {
      toast.error("Phone must be 10 digits");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const newId = Math.max(...customers.map((c) => c.id), 0) + 1;
    setCustomers((prev) => [...prev, { id: newId, name: form.name, phone: form.phone, pending: 0 }]);
    toast.success("Customer added!");
    setSaving(false);
    setDialogOpen(false);
    setForm({ name: "", phone: "" });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title="Customers" subtitle={`${customers.length} customers`} />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="w-full h-11 pl-10 pr-4 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setForm({ name: "", phone: "" }); setDialogOpen(true); }}
              className="h-11 px-4 bg-primary text-primary-foreground rounded-xl flex items-center gap-1 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </motion.button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={Users} title="No customers found" description="Add your first customer" />
          ) : (
            <div className="space-y-3">
              {filtered.map((c, i) => (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/admin/customers/${c.id}`)}
                  className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between text-left hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{c.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{c.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.pending > 0 && (
                      <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-lg">
                        ₹{c.pending}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-sm mx-auto rounded-xl">
            <DialogHeader>
              <DialogTitle>Add Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Shop Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter shop name"
                  className="w-full h-12 px-4 bg-secondary rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  placeholder="10-digit number"
                  className="w-full h-12 px-4 bg-secondary rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                disabled={saving}
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Customer"}
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Customers;
