import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Phone, Search, ChevronRight } from "lucide-react";
import { useState } from "react";

const mockCustomers = [
  { id: 1, name: "Sharma General Store", phone: "9876543001", pending: 2400 },
  { id: 2, name: "Patel Kirana", phone: "9876543002", pending: 800 },
  { id: 3, name: "Krishna Mart", phone: "9876543003", pending: 0 },
  { id: 4, name: "Balaji Traders", phone: "9876543004", pending: 1500 },
  { id: 5, name: "Mahalaxmi Store", phone: "9876543005", pending: 3200 },
  { id: 6, name: "Sai Provision", phone: "9876543006", pending: 0 },
];

const Customers = () => {
  const [search, setSearch] = useState("");
  const filtered = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Customers" subtitle={`${mockCustomers.length} customers`} />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full h-11 pl-10 pr-4 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {filtered.map((c) => (
            <div key={c.id} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">{c.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {c.pending > 0 && (
                  <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-lg">
                    ₹{c.pending}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Customers;
