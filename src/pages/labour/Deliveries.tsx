import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { Check, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Deliveries = () => {
  const { user } = useAuth();
  const { trips, setTrips } = useAppData();
  const [confirmDelivery, setConfirmDelivery] = useState<{ tripId: number; customerId: number } | null>(null);

  const myTrips = trips.filter((t) => t.labour === user?.name);
  const allDeliveries = myTrips.flatMap((t) => t.deliveries.map((d) => ({ ...d, tripId: t.id })));

  const markDelivered = () => {
    if (!confirmDelivery) return;
    setTrips((prev) =>
      prev.map((t) =>
        t.id === confirmDelivery.tripId
          ? { ...t, deliveries: t.deliveries.map((d) => d.customerId === confirmDelivery.customerId ? { ...d, delivered: true } : d) }
          : t
      )
    );
    toast.success("Delivery completed", { description: "Customer delivery marked as done." });
    setConfirmDelivery(null);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title="Deliveries" subtitle="Today's delivery list" />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-3">
          {allDeliveries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">No deliveries assigned</p>
          ) : (
            allDeliveries.map((d, i) => (
              <motion.div
                key={`${d.tripId}-${d.customerId}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
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
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setConfirmDelivery({ tripId: d.tripId, customerId: d.customerId })}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Deliver
                  </motion.button>
                )}
              </motion.div>
            ))
          )}
        </div>

        <ConfirmDialog
          open={confirmDelivery !== null}
          onOpenChange={() => setConfirmDelivery(null)}
          title="Confirm Delivery"
          description="Mark this delivery as completed?"
          confirmLabel="Yes, Delivered"
          onConfirm={markDelivered}
        />

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Deliveries;
