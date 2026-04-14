import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { useAppData } from "@/contexts/AppDataContext";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Billing = () => {
  const { customers, products } = useAppData();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [billItems, setBillItems] = useState<{ productId: string; qty: string }[]>([{ productId: "", qty: "" }]);
  const [generating, setGenerating] = useState(false);

  const addItem = () => setBillItems((prev) => [...prev, { productId: "", qty: "" }]);
  const updateItem = (i: number, field: "productId" | "qty", value: string) => {
    setBillItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  };
  const removeItem = (i: number) => setBillItems((prev) => prev.filter((_, idx) => idx !== i));

  const total = billItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === Number(item.productId));
    return sum + (product ? product.price * Number(item.qty || 0) : 0);
  }, 0);

  const handleGenerate = async () => {
    if (!selectedCustomer) { toast.error("Select a customer"); return; }
    const valid = billItems.filter((i) => i.productId && Number(i.qty) > 0);
    if (valid.length === 0) { toast.error("Add products"); return; }
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Bill generated successfully!");
    setGenerating(false);
  };

  const handleWhatsApp = () => {
    const customer = customers.find((c) => c.id === Number(selectedCustomer));
    if (!customer) { toast.error("Select a customer first"); return; }
    const items = billItems
      .filter((i) => i.productId && Number(i.qty) > 0)
      .map((i) => {
        const p = products.find((pr) => pr.id === Number(i.productId));
        return p ? `${i.qty}x ${p.name} ${p.size} = ₹${Number(i.qty) * p.price}` : "";
      })
      .filter(Boolean)
      .join("\n");
    const msg = encodeURIComponent(`*Renuka Aqua - Invoice*\n\nCustomer: ${customer.name}\n\n${items}\n\n*Total: ₹${total}*\n\nThank you!`);
    window.open(`https://wa.me/91${customer.phone}?text=${msg}`, "_blank");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20">
        <PageHeader title="Billing" subtitle="Generate invoices" />
        <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
          <div className="bg-card rounded-2xl p-4 border border-border space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Select Customer</label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Choose customer" /></SelectTrigger>
                <SelectContent>
                  {customers.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Products</label>
              <div className="space-y-2">
                {billItems.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Select value={item.productId} onValueChange={(v) => updateItem(i, "productId", v)}>
                      <SelectTrigger className="h-10 rounded-lg flex-1"><SelectValue placeholder="Product" /></SelectTrigger>
                      <SelectContent>
                        {products.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name} {p.size} - ₹{p.price}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(i, "qty", e.target.value)}
                      placeholder="Qty"
                      className="w-20 h-10 px-3 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {billItems.length > 1 && (
                      <button onClick={() => removeItem(i)} className="text-destructive text-xs font-medium px-2">✕</button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addItem} className="text-xs text-primary font-medium mt-2">+ Add product</button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{total}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleGenerate} disabled={generating} className="h-12 bg-primary text-primary-foreground rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors">
              {generating ? "..." : "Generate"}
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => toast.success("Bill saved!")} className="h-12 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
              Save
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleWhatsApp} className="h-12 bg-success text-success-foreground rounded-xl text-sm font-medium hover:bg-success/90 transition-colors">
              WhatsApp
            </motion.button>
          </div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Billing;
