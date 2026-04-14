import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
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
import { motion } from "framer-motion";

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
    <PageTransition>
      <div className="min-h-screen bg-background pb-20">
        <PageHeader title="More" subtitle="All modules" />
        <div className="px-4 py-4 max-w-lg mx-auto space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4 text-left hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default AdminMore;
