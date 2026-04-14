import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Plus, AlertTriangle } from "lucide-react";

const mockStock = [
  { name: "Bisleri 1L", qty: 120, low: false },
  { name: "Bisleri 500ml", qty: 85, low: false },
  { name: "Mazza 600ml", qty: 45, low: false },
  { name: "Sprite 250ml", qty: 60, low: false },
  { name: "Coca-Cola 750ml", qty: 8, low: true },
  { name: "Thums Up 750ml", qty: 15, low: true },
  { name: "Bisleri 250ml", qty: 200, low: false },
  { name: "Sprite 750ml", qty: 5, low: true },
];

const Inventory = () => (
  <div className="min-h-screen bg-background pb-20">
    <PageHeader title="Godown / Inventory" subtitle="Stock management" />
    <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
      <div className="flex gap-2">
        <button className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium">
          <Plus className="w-5 h-5" /> Add Stock
        </button>
        <button className="flex-1 h-12 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center gap-2 font-medium">
          Adjust Stock
        </button>
      </div>

      <div className="space-y-2">
        {mockStock.map((item) => (
          <div
            key={item.name}
            className={`bg-card rounded-xl p-4 border flex items-center justify-between ${
              item.low ? "border-destructive/30" : "border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.low && <AlertTriangle className="w-5 h-5 text-destructive" />}
              <div>
                <p className="font-medium text-foreground text-sm">{item.name}</p>
                {item.low && <p className="text-[10px] text-destructive font-medium">Low Stock!</p>}
              </div>
            </div>
            <p className="font-bold text-foreground text-lg">{item.qty}</p>
          </div>
        ))}
      </div>
    </div>
    <BottomNav />
  </div>
);

export default Inventory;
