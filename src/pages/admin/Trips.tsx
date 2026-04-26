import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useAppData } from "@/contexts/AppDataContext";
import { Truck, User, Package, MapPin, Plus, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VEHICLES = ["Tempo - MH12 AB 1234", "Mini Van - MH12 CD 5678", "Auto - MH12 EF 9012", "Bike - MH12 GH 3456", "Truck - MH12 IJ 7890"];
const ROUTES = ["Market Area", "Station Road", "Industrial Area", "Highway Route", "City Center", "Residential Zone"];

const Trips = () => {
  const { trips, setTrips, labours } = useAppData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ vehicle: "", labour: "", route: "" });
  const [saving, setSaving] = useState(false);
  const [completeId, setCompleteId] = useState<number | null>(null);

  const handleCreate = async () => {
    if (!form.vehicle || !form.labour || !form.route) { toast.error("Select vehicle, labour and route"); return; }
    if (trips.some((t) => t.vehicle === form.vehicle && t.status !== "Completed")) { toast.error("Vehicle already has an active trip"); return; }
    if (trips.some((t) => t.labour === form.labour && t.status !== "Completed")) { toast.error("Labour already assigned to an active trip"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    const newId = Math.max(...trips.map((t) => t.id), 0) + 1;
    setTrips((prev) => [...prev, { id: newId, vehicle: form.vehicle, labour: form.labour, products: 0, route: form.route, status: "Not Started", deliveries: [] }]);
    toast.success("Trip created", { description: `${form.labour} · ${form.route}` });
    setSaving(false);
    setDialogOpen(false);
    setForm({ vehicle: "", labour: "", route: "" });
  };

  const handleComplete = () => {
    if (completeId !== null) {
      setTrips((prev) => prev.map((t) => t.id === completeId ? { ...t, status: "Completed" } : t));
      toast.success("Trip completed successfully");
      setCompleteId(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title="Vehicles & Trips" subtitle={`${trips.length} trips`} />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDialogOpen(true)}
            className="w-full h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" /> Create Trip
          </motion.button>

          <div className="space-y-3">
            {trips.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card rounded-xl p-4 border border-border space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <p className="font-medium text-foreground text-sm">{t.vehicle}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    t.status === "Ongoing" ? "bg-primary/10 text-primary" : t.status === "Completed" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
                  }`}>
                    {t.status}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {t.labour}</span>
                  <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {t.products} items</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.route}</span>
                </div>
                {t.status !== "Completed" && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCompleteId(t.id)}
                    className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-3 py-1.5 rounded-lg mt-1"
                  >
                    <Check className="w-3 h-3" /> Complete Trip
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-sm mx-auto rounded-xl">
            <DialogHeader><DialogTitle>Create Trip</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vehicle</label>
                <Select value={form.vehicle} onValueChange={(v) => setForm({ ...form, vehicle: v })}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                  <SelectContent>
                    {VEHICLES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Assign Labour</label>
                <Select value={form.labour} onValueChange={(v) => setForm({ ...form, labour: v })}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select labour" /></SelectTrigger>
                  <SelectContent>
                    {labours.map((l) => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Route</label>
                <Select value={form.route} onValueChange={(v) => setForm({ ...form, route: v })}>
                  <SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select route" /></SelectTrigger>
                  <SelectContent>
                    {ROUTES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCreate}
                disabled={saving}
                className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Trip"}
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={completeId !== null}
          onOpenChange={() => setCompleteId(null)}
          title="Complete Trip"
          description="Mark this trip as completed?"
          confirmLabel="Complete"
          onConfirm={handleComplete}
        />

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Trips;
