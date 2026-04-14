import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";

const PaymentEntry = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Cash");
  const [customer, setCustomer] = useState("Sharma General Store");

  const handleSubmit = () => {
    if (!amount) {
      toast.error("Please enter amount");
      return;
    }
    toast.success(`₹${amount} received from ${customer} via ${type}`);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Payment Entry" subtitle="Record payment received" />
      <div className="px-4 py-4 max-w-lg mx-auto">
        <div className="bg-card rounded-2xl p-5 border border-border space-y-5">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Customer</label>
            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full h-14 px-4 bg-secondary rounded-xl text-sm text-foreground border-none focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Sharma General Store</option>
              <option>Patel Kirana</option>
              <option>Balaji Traders</option>
              <option>Mahalaxmi Store</option>
            </select>
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
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 h-14 rounded-xl text-sm font-semibold transition-colors ${
                    type === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-success text-success-foreground rounded-xl text-base font-semibold"
          >
            Submit Payment
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PaymentEntry;
