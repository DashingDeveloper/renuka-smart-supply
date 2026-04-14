import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import {
  Truck,
  Receipt,
  UserCog,
  IndianRupee,
  BarChart3,
  Package,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { label: "Products", icon: Package, path: "/admin/products", desc: "Manage products & prices" },
  { label: "Vehicles & Trips", icon: Truck, path: "/admin/trips", desc: "Manage vehicles & trips" },
  { label: "Billing", icon: Receipt, path: "/admin/billing", desc: "Generate invoices & bills" },
  { label: "Labour Management", icon: UserCog, path: "/admin/labour", desc: "Manage workers" },
  { label: "Payments", icon: IndianRupee, path: "/admin/payments", desc: "Income, expenses & pending" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports", desc: "Sales & profit analytics" },
];

const AdminMore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="More" subtitle="All modules" />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4 text-left hover:shadow-sm transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default AdminMore;
