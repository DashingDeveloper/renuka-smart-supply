import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { useAppData } from "@/contexts/AppDataContext";
import { Plus, AlertTriangle, Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { parsePositiveInteger } from "@/lib/validation";
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

const Inventory = () => {
  const { products, setProducts } = useAppData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "adjust">("add");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState("");
  const [saving, setSaving] = useState(false);

  const openDialog = (m: "add" | "adjust") => {
    setMode(m);
    setSelectedProduct("");
    setQty("");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const amount = parsePositiveInteger(qty, 5000);
    const product = products.find((p) => p.id === Number(selectedProduct));
    if (!selectedProduct || !amount || !product) {
      toast.error("Select a product and enter quantity");
      return;
    }
    if (mode === "adjust" && amount > product.stock) {
      toast.error("Quantity is more than available stock", { description: `${product.name} ${product.size} has only ${product.stock} units.` });
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    setProducts((prev) =>
      prev.map((p) =>
        p.id === Number(selectedProduct)
          ? { ...p, stock: mode === "add" ? p.stock + amount : Math.max(0, p.stock - amount) }
          : p
      )
    );
    toast.success(mode === "add" ? "Stock added successfully" : "Stock reduced successfully", {
      description: `${amount} units · ${product.name} ${product.size}`,
    });
    setSaving(false);
    setDialogOpen(false);
  };

  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title="Godown / Inventory" subtitle={`${products.length} products · ${lowStockCount} low stock`} />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => openDialog("add")}
              className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add Stock
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => openDialog("adjust")}
              className="flex-1 h-12 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-secondary/80 transition-colors"
            >
              <Minus className="w-5 h-5" /> Adjust Stock
            </motion.button>
          </div>

          <div className="space-y-3">
            {products.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`bg-card rounded-xl p-4 border flex items-center justify-between hover:shadow-md transition-shadow ${
                  item.stock <= 10 ? "border-destructive/30" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.stock <= 10 && <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />}
                  <div>
                    <p className="font-medium text-foreground text-sm">{item.name} {item.size}</p>
                    {item.stock <= 10 && <p className="text-[10px] text-destructive font-medium">Low Stock!</p>}
                  </div>
                </div>
                <p className={`font-bold text-lg ${item.stock <= 10 ? "text-destructive" : "text-foreground"}`}>{item.stock}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-sm mx-auto rounded-xl">
            <DialogHeader>
              <DialogTitle>{mode === "add" ? "Add Stock" : "Adjust Stock"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Product</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select product" /></SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>{p.name} {p.size} (Current: {p.stock})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Quantity</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full h-12 px-4 bg-secondary rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={saving}
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : mode === "add" ? "Add Stock" : "Reduce Stock"}
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Inventory;
