import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const Billing = () => {
  const handleGenerate = () => toast.success("Bill generated successfully!");

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Billing" subtitle="Generate invoices" />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        <div className="bg-card rounded-2xl p-4 border border-border space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Select Customer</label>
            <select className="w-full h-12 px-3 bg-secondary rounded-xl text-sm text-foreground border-none focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Sharma General Store</option>
              <option>Patel Kirana</option>
              <option>Krishna Mart</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Products</label>
            <div className="space-y-2">
              {[
                { name: "Bisleri 1L", qty: 10, price: 20 },
                { name: "Mazza 600ml", qty: 5, price: 40 },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between bg-secondary rounded-xl p-3">
                  <span className="text-sm font-medium text-foreground">{p.name} × {p.qty}</span>
                  <span className="text-sm font-bold text-foreground">₹{p.qty * p.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Total</span>
            <span className="text-xl font-bold text-primary">₹400</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button onClick={handleGenerate} className="h-12 bg-primary text-primary-foreground rounded-xl text-sm font-medium">
            Generate
          </button>
          <button className="h-12 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium">
            Save
          </button>
          <button className="h-12 bg-success text-success-foreground rounded-xl text-sm font-medium">
            WhatsApp
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Billing;
