import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Check, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialDeliveries = [
  { id: 1, customer: "Sharma General Store", items: "10x Bisleri 1L, 5x Mazza", delivered: false },
  { id: 2, customer: "Patel Kirana", items: "20x Sprite 250ml", delivered: false },
  { id: 3, customer: "Krishna Mart", items: "15x Bisleri 500ml", delivered: true },
  { id: 4, customer: "Balaji Traders", items: "10x Thums Up 750ml", delivered: false },
  { id: 5, customer: "Mahalaxmi Store", items: "30x Bisleri 250ml", delivered: false },
];

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const markDelivered = (id: number) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, delivered: true } : d))
    );
    toast.success("Marked as delivered!");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Deliveries" subtitle="Today's delivery list" />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-2">
        {deliveries.map((d) => (
          <div
            key={d.id}
            className={`bg-card rounded-xl p-4 border flex items-center gap-3 ${
              d.delivered ? "border-success/30 opacity-70" : "border-border"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <p className="font-medium text-foreground text-sm">{d.customer}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-5">{d.items}</p>
            </div>
            {d.delivered ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-success bg-success/10 px-3 py-2 rounded-xl">
                <Check className="w-4 h-4" /> Done
              </span>
            ) : (
              <button
                onClick={() => markDelivered(d.id)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Deliver
              </button>
            )}
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Deliveries;
