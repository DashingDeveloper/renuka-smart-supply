import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const mockProducts = [
  { id: 1, name: "Bisleri", size: "1L", price: 20, stock: 120 },
  { id: 2, name: "Bisleri", size: "500ml", price: 10, stock: 85 },
  { id: 3, name: "Bisleri", size: "250ml", price: 5, stock: 200 },
  { id: 4, name: "Mazza", size: "600ml", price: 40, stock: 45 },
  { id: 5, name: "Sprite", size: "250ml", price: 20, stock: 60 },
  { id: 6, name: "Sprite", size: "750ml", price: 40, stock: 30 },
  { id: 7, name: "Coca-Cola", size: "750ml", price: 40, stock: 8 },
  { id: 8, name: "Thums Up", size: "750ml", price: 40, stock: 15 },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const filtered = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Products" subtitle="Manage your products" />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="w-full h-11 pl-10 pr-4 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="h-11 px-4 bg-primary text-primary-foreground rounded-xl flex items-center gap-1 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">{p.name} - {p.size}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Stock: {p.stock} units</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-foreground">₹{p.price}</p>
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Products;
