import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import EmptyState from "@/components/EmptyState";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useAppData } from "@/contexts/AppDataContext";
import { Plus, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
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

const Orders = () => {
  const { orders, setOrders, customers, products } = useAppData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orderItems, setOrderItems] = useState<{ productId: string; qty: string }[]>([{ productId: "", qty: "" }]);
  const [saving, setSaving] = useState(false);
  const [markId, setMarkId] = useState<string | null>(null);

  const addItem = () => setOrderItems((prev) => [...prev, { productId: "", qty: "" }]);

  const updateItem = (i: number, field: "productId" | "qty", value: string) => {
    setOrderItems((prev) => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  };

  const removeItem = (i: number) => setOrderItems((prev) => prev.filter((_, idx) => idx !== i));

  const total = orderItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === Number(item.productId));
    return sum + (product ? product.price * Number(item.qty || 0) : 0);
  }, 0);

  const handleCreate = async () => {
    if (!selectedCustomer) { toast.error("Select a customer"); return; }
    const validItems = orderItems.filter((i) => i.productId && Number(i.qty) > 0);
    if (validItems.length === 0) { toast.error("Add at least one product"); return; }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));

    const customer = customers.find((c) => c.id === Number(selectedCustomer))!;
    const items = validItems.map((i) => {
      const p = products.find((pr) => pr.id === Number(i.productId))!;
      return { productId: p.id, name: `${p.name} ${p.size}`, qty: Number(i.qty), price: p.price };
    });
    const amount = items.reduce((s, i) => s + i.qty * i.price, 0);
    const newId = `ORD-${String(orders.length + 1).padStart(3, "0")}`;

    setOrders((prev) => [{ id: newId, customerId: customer.id, customer: customer.name, items, status: "Pending", amount, date: "14 Apr" }, ...prev]);
    toast.success(`Order ${newId} created!`);
    setSaving(false);
    setDialogOpen(false);
    setSelectedCustomer("");
    setOrderItems([{ productId: "", qty: "" }]);
  };

  const handleMarkDelivered = () => {
    if (markId) {
      setOrders((prev) => prev.map((o) => o.id === markId ? { ...o, status: "Delivered" } : o));
      toast.success("Order marked as delivered!");
      setMarkId(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title="Orders" subtitle={`${orders.length} orders`} />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDialogOpen(true)}
            className="w-full h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" /> Create Order
          </motion.button>

          {orders.length === 0 ? (
            <EmptyState icon={ShoppingCart} title="No orders yet" description="Create your first order" />
          ) : (
            <div className="space-y-3">
              {orders.map((o, i) => (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground text-sm">{o.customer}</p>
                      <p className="text-[10px] text-muted-foreground">{o.id} · {o.date}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      o.status === "Delivered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {o.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{o.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-foreground">₹{o.amount}</p>
                    {o.status === "Pending" && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMarkId(o.id)}
                        className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg"
                      >
                        <Check className="w-3 h-3" /> Mark Delivered
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-sm mx-auto rounded-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Customer</label>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select customer" /></SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Products</label>
                <div className="space-y-3">
                  {orderItems.map((item, i) => (
                    <div key={i} className="grid grid-cols-[minmax(0,1fr)_5rem_auto] gap-2">
                      <Select value={item.productId} onValueChange={(v) => updateItem(i, "productId", v)}>
                        <SelectTrigger className="h-10 min-w-0 rounded-lg"><SelectValue placeholder="Product" /></SelectTrigger>
                        <SelectContent>
                          {products.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.name} {p.size} - ₹{p.price}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateItem(i, "qty", e.target.value)}
                        placeholder="Qty"
                        className="h-10 w-full rounded-lg bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {orderItems.length > 1 && (
                        <button onClick={() => removeItem(i)} className="text-destructive text-xs font-medium px-2">✕</button>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={addItem} className="text-xs text-primary font-medium mt-2">+ Add more</button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">₹{total}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCreate}
                disabled={saving}
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Order"}
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={markId !== null}
          onOpenChange={() => setMarkId(null)}
          title="Mark as Delivered"
          description="Confirm this order has been delivered?"
          confirmLabel="Yes, Delivered"
          onConfirm={handleMarkDelivered}
        />

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Orders;
