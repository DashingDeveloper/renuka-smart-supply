import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { useAppData } from "@/contexts/AppDataContext";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = ["Income", "Expenses", "Pending"] as const;
const EXPENSE_TYPES = ["Fuel", "Labour", "Maintenance", "Rent", "Electricity", "Other"];

const Payments = () => {
  const { transactions, setTransactions } = useAppData();
  const [activeTab, setActiveTab] = useState<string>("Income");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ desc: "", amount: "", type: "", category: "Income" as string });
  const [saving, setSaving] = useState(false);

  const filtered = transactions.filter((t) => t.category === activeTab);

  const totals = {
    Income: transactions.filter((t) => t.category === "Income").reduce((s, t) => s + t.amount, 0),
    Expenses: transactions.filter((t) => t.category === "Expenses").reduce((s, t) => s + t.amount, 0),
    Pending: transactions.filter((t) => t.category === "Pending").reduce((s, t) => s + t.amount, 0),
  };

  const handleAdd = async () => {
    if (!form.desc || !form.amount || !form.type) { toast.error("Fill all fields"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    const newId = Math.max(...transactions.map((t) => t.id), 0) + 1;
    setTransactions((prev) => [
      { id: newId, desc: form.desc, amount: Number(form.amount), type: form.type, category: form.category as any, date: "14 Apr" },
      ...prev,
    ]);
    toast.success("Transaction added!");
    setSaving(false);
    setDialogOpen(false);
    setForm({ desc: "", amount: "", type: "", category: "Income" });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20">
        <PageHeader title="Payments" subtitle="Track money flow" />
        <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-[10px] text-muted-foreground">Income</p>
              <p className="text-sm font-bold text-success">₹{totals.Income}</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-[10px] text-muted-foreground">Expenses</p>
              <p className="text-sm font-bold text-destructive">₹{totals.Expenses}</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <p className="text-[10px] text-muted-foreground">Pending</p>
              <p className="text-sm font-bold text-warning">₹{totals.Pending}</p>
            </div>
          </div>

          <div className="flex bg-secondary rounded-xl p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { setForm({ desc: "", amount: "", type: "", category: activeTab }); setDialogOpen(true); }}
            className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            + Add Transaction
          </motion.button>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">No transactions in this category</p>
            ) : (
              filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{t.desc}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.type} · {t.date}</p>
                  </div>
                  <p className={`font-bold ${activeTab === "Income" ? "text-success" : activeTab === "Expenses" ? "text-destructive" : "text-warning"}`}>
                    {activeTab === "Income" ? "+" : activeTab === "Expenses" ? "-" : ""}₹{t.amount}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-sm mx-auto rounded-2xl">
            <DialogHeader><DialogTitle>Add Transaction</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {tabs.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
                <input value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="e.g. Sharma Store Payment" className="w-full h-12 px-4 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Amount (₹)</label>
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0" className="w-full h-12 px-4 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Type</label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {(form.category === "Income" ? ["Cash", "UPI", "Bank Transfer"] : form.category === "Expenses" ? EXPENSE_TYPES : ["Pending"]).map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleAdd} disabled={saving} className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-50">
                {saving ? "Saving..." : "Add Transaction"}
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Payments;
