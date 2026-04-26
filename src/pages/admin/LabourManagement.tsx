import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useAppData } from "@/contexts/AppDataContext";
import { Phone, Calendar, IndianRupee, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const LabourManagement = () => {
  const { labours, setLabours } = useAppData();
  const [toggleId, setToggleId] = useState<number | null>(null);
  const toggleLabour = labours.find((l) => l.id === toggleId);

  const handleToggle = () => {
    if (toggleId !== null) {
      setLabours((prev) =>
        prev.map((l) => l.id === toggleId ? { ...l, present: !l.present } : l)
      );
      toast.success("Attendance updated", { description: toggleLabour?.name });
      setToggleId(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title="Labour" subtitle={`${labours.length} workers · ${labours.filter(l => l.present).length} present`} />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-3">
          {labours.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground">{l.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{l.phone}</span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setToggleId(l.id)}
                  className={`flex items-center gap-1 text-[10px] font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    l.present ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {l.present ? <><UserCheck className="w-3 h-3" /> Present</> : <><UserX className="w-3 h-3" /> Absent</>}
                </motion.button>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {l.salary}</span>
                <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" /> Paid: ₹{l.paid}</span>
                {l.pending > 0 && (
                  <span className="text-destructive font-medium">Pending: ₹{l.pending}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <ConfirmDialog
          open={toggleId !== null}
          onOpenChange={() => setToggleId(null)}
          title="Update Attendance"
          description={toggleLabour ? `Mark ${toggleLabour.name} as ${toggleLabour.present ? "Absent" : "Present"}?` : ""}
          confirmLabel={toggleLabour?.present ? "Mark Absent" : "Mark Present"}
          onConfirm={handleToggle}
        />

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default LabourManagement;
