import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import EmptyState from "@/components/EmptyState";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useAppData, Product } from "@/contexts/AppDataContext";
import { Plus, Search, Edit, Trash2, X, Package } from "lucide-react";
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

const SIZES = ["250ml", "500ml", "600ml", "750ml", "1L", "2L", "5L", "20L"];
const BRANDS = ["Bisleri", "Mazza", "Sprite", "Coca-Cola", "Thums Up", "Fanta", "Limca", "Kinley"];

const Products = () => {
  const { products, setProducts } = useAppData();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", size: "", price: "" });
  const [saving, setSaving] = useState(false);

  const filtered = products.filter((p) =>
    `${p.name} ${p.size}`.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", size: "", price: "" });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, size: p.size, price: String(p.price) });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.size || !form.price) {
      toast.error("Please fill all fields");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => p.id === editProduct.id ? { ...p, name: form.name, size: form.size, price: Number(form.price) } : p)
      );
      toast.success("Product updated!");
    } else {
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      setProducts((prev) => [...prev, { id: newId, name: form.name, size: form.size, price: Number(form.price), stock: 0 }]);
      toast.success("Product added!");
    }
    setSaving(false);
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Product deleted");
      setDeleteId(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20">
        <PageHeader title="Products" subtitle="Manage your products" />
        <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="w-full h-11 pl-10 pr-4 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={openAdd}
              className="h-11 px-4 bg-primary text-primary-foreground rounded-xl flex items-center gap-1 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </motion.button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={Package} title="No products found" description="Add your first product to get started" action={
              <button onClick={openAdd} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium">Add Product</button>
            } />
          ) : (
            <AnimatePresence>
              <div className="space-y-2">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{p.name} - {p.size}</p>
                      <p className={`text-xs mt-0.5 ${p.stock <= 10 ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                        Stock: {p.stock} units {p.stock <= 10 ? "⚠️" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-foreground">₹{p.price}</p>
                      <div className="flex gap-1">
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDeleteId(p.id)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-sm mx-auto rounded-2xl">
            <DialogHeader>
              <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Brand Name</label>
                <Select value={form.name} onValueChange={(v) => setForm({ ...form, name: v })}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select brand" /></SelectTrigger>
                  <SelectContent>
                    {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Size</label>
                <Select value={form.size} onValueChange={(v) => setForm({ ...form, size: v })}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select size" /></SelectTrigger>
                  <SelectContent>
                    {SIZES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Price (₹)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                  className="w-full h-12 px-4 bg-secondary rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                disabled={saving}
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                {saving ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteId !== null}
          onOpenChange={() => setDeleteId(null)}
          title="Delete Product"
          description="Are you sure you want to delete this product? This cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleDelete}
          variant="destructive"
        />

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Products;
