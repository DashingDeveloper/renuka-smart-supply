import { useAuth } from "@/contexts/AuthContext";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import StatCard from "@/components/StatCard";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const LabourHome = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title={`Hi, ${user?.name}`} subtitle="Today's assignments" />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Trips Today" value="2" icon={Truck} color="primary" />
          <StatCard label="Deliveries" value="8" icon={MapPin} color="accent" />
          <StatCard label="Products Loaded" value="65" icon={Package} color="success" />
          <StatCard label="Pending" value="3" icon={Clock} color="warning" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Today's Trips</h2>
          <div className="space-y-3">
            {[
              { vehicle: "Tempo - MH12 AB 1234", route: "Market Area", products: 35, status: "Ongoing" },
              { vehicle: "Tempo - MH12 AB 1234", route: "Station Road", products: 30, status: "Not Started" },
            ].map((trip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-4 border border-border space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <p className="font-medium text-foreground text-sm">{trip.vehicle}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    trip.status === "Ongoing" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                  }`}>
                    {trip.status}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {trip.route}</span>
                  <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {trip.products} items</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default LabourHome;
