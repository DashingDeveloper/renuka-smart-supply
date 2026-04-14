import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Phone, Calendar, IndianRupee } from "lucide-react";

const mockLabour = [
  { id: 1, name: "Ramesh", phone: "9876543211", salary: "Monthly", present: true, paid: 8000, pending: 4000 },
  { id: 2, name: "Suresh", phone: "9876543212", salary: "Weekly", present: true, paid: 3000, pending: 1500 },
  { id: 3, name: "Mahesh", phone: "9876543213", salary: "Daily", present: false, paid: 6000, pending: 0 },
  { id: 4, name: "Ganesh", phone: "9876543214", salary: "Monthly", present: true, paid: 7000, pending: 5000 },
  { id: 5, name: "Dinesh", phone: "9876543215", salary: "Weekly", present: true, paid: 2500, pending: 1000 },
];

const LabourManagement = () => (
  <div className="min-h-screen bg-background pb-20">
    <PageHeader title="Labour" subtitle="Manage workers" />
    <div className="px-4 py-4 max-w-lg mx-auto space-y-2">
      {mockLabour.map((l) => (
        <div key={l.id} className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-foreground">{l.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{l.phone}</span>
              </div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              l.present ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}>
              {l.present ? "Present" : "Absent"}
            </span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {l.salary}</span>
            <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" /> Paid: ₹{l.paid}</span>
            {l.pending > 0 && (
              <span className="text-destructive font-medium">Pending: ₹{l.pending}</span>
            )}
          </div>
        </div>
      ))}
    </div>
    <BottomNav />
  </div>
);

export default LabourManagement;
