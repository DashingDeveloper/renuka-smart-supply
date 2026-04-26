import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import StatCard from "@/components/StatCard";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const LabourHome = () => {
  const { user } = useAuth();
  const { trips } = useAppData();
  const myTrips = trips.filter((t) => t.labour === user?.name);
  const totalDeliveries = myTrips.reduce((s, t) => s + t.deliveries.length, 0);
  const pendingDeliveries = myTrips.reduce((s, t) => s + t.deliveries.filter((d) => !d.delivered).length, 0);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title={`Hi, ${user?.name}`} subtitle="Today's assignments" />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Trips Today" value={String(myTrips.length)} icon={Truck} color="primary" />
            <StatCard label="Deliveries" value={String(totalDeliveries)} icon={MapPin} color="accent" />
            <StatCard label="Products Loaded" value={String(myTrips.reduce((s, t) => s + t.products, 0))} icon={Package} color="success" />
            <StatCard label="Pending" value={String(pendingDeliveries)} icon={Clock} color="warning" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">Today's Trips</h2>
            {myTrips.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No trips assigned today</p>
            ) : (
              <div className="space-y-3">
                {myTrips.map((trip, i) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-xl p-4 border border-border space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-primary" />
                        <p className="font-medium text-foreground text-sm">{trip.vehicle}</p>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        trip.status === "Ongoing" ? "bg-primary/10 text-primary" : trip.status === "Completed" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
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
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default LabourHome;
