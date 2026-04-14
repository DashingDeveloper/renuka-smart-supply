import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Plus } from "lucide-react";

const mockOrders = [
  { id: "ORD-001", customer: "Sharma General Store", items: "10x Bisleri 1L, 5x Mazza", status: "Delivered", amount: 850 },
  { id: "ORD-002", customer: "Patel Kirana", items: "20x Sprite 250ml", status: "Pending", amount: 400 },
  { id: "ORD-003", customer: "Krishna Mart", items: "15x Bisleri 500ml", status: "Pending", amount: 525 },
  { id: "ORD-004", customer: "Balaji Traders", items: "10x Thums Up 750ml, 5x Coca-Cola", status: "Delivered", amount: 600 },
  { id: "ORD-005", customer: "Mahalaxmi Store", items: "30x Bisleri 250ml", status: "Pending", amount: 150 },
];

const Orders = () => (
  <div className="min-h-screen bg-background pb-20">
    <PageHeader title="Orders" subtitle="All orders" />
    <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
      <button className="w-full h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium">
        <Plus className="w-5 h-5" /> Create Order
      </button>

      <div className="space-y-2">
        {mockOrders.map((o) => (
          <div key={o.id} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-foreground text-sm">{o.customer}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                o.status === "Delivered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
              }`}>
                {o.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{o.items}</p>
            <p className="text-sm font-bold text-foreground mt-2">₹{o.amount}</p>
          </div>
        ))}
      </div>
    </div>
    <BottomNav />
  </div>
);

export default Orders;
