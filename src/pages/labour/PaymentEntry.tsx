import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { useAppData } from "@/contexts/AppDataContext";
import { useState } from "react";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaymentEntry = () => {
  const { customers, setTransactions } = useAppData();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Cash");
  const [customer, setCustomer] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!customer) { toast.error("Select a customer"); return; }
    if (!amount || Number(amount) <= 0) { toast.error("Enter a valid amount"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    const cust = customers.find((c) => c.id === Number(customer));
    setTransactions((prev) => [
      { id: Math.max(...prev.map((t) => t.id), 0) + 1, desc: `${cust?.name} Payment`, amount: Number(amount), type, category: "Income", date: "14 Apr" },
      ...prev,
    ]);
    toast.success(`₹${amount} received from ${cust?.name} via ${type}`);
    setAmount("");
    setSaving(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20">
        <PageHeader title="Payment Entry" subtitle="Record payment received" />
        <div className="px-4 py-4 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-5 border border-border space-y-5"
          >
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Customer</label>
              <Select value={customer} onValueChange={setCustomer}>
                <SelectTrigger className="h-14 rounded-xl text-sm"><SelectValue placeholder="Select customer" /></SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name} {c.pending > 0 ? `(Pending: ₹${c.pending})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Amount Received</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full h-14 pl-12 pr-4 bg-secondary rounded-xl text-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Payment Type</label>
              <div className="flex gap-2">
                {["Cash", "UPI"].map((t) => (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setType(t)}
                    className={`flex-1 h-14 rounded-xl text-sm font-semibold transition-all ${
                      type === t
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={saving}
              className="w-full h-14 bg-success text-success-foreground rounded-xl text-base font-semibold disabled:opacity-50 hover:bg-success/90 transition-colors"
            >
              {saving ? "Submitting..." : "Submit Payment"}
            </motion.button>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default PaymentEntry;
