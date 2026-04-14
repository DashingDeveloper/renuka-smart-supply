import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Truck, User, Package, MapPin } from "lucide-react";

const mockTrips = [
  { id: 1, vehicle: "Tempo - MH12 AB 1234", labour: "Ramesh", products: 45, route: "Market Area", status: "Ongoing" },
  { id: 2, vehicle: "Mini Van - MH12 CD 5678", labour: "Suresh", products: 30, route: "Station Road", status: "Completed" },
  { id: 3, vehicle: "Auto - MH12 EF 9012", labour: "Mahesh", products: 20, route: "Industrial Area", status: "Ongoing" },
];

const Trips = () => (
  <div className="min-h-screen bg-background pb-20">
    <PageHeader title="Vehicles & Trips" subtitle="Manage trips" />
    <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
      <button className="w-full h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium">
        <Truck className="w-5 h-5" /> Create Trip
      </button>

      <div className="space-y-2">
        {mockTrips.map((t) => (
          <div key={t.id} className="bg-card rounded-xl p-4 border border-border space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <p className="font-medium text-foreground text-sm">{t.vehicle}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                t.status === "Ongoing" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
              }`}>
                {t.status}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {t.labour}</span>
              <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {t.products} items</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.route}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    <BottomNav />
  </div>
);

export default Trips;
