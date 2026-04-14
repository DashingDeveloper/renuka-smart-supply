import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Home,
  MapPin,
  IndianRupee,
  BarChart3,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const adminNav: NavItem[] = [
  { label: "Home", icon: LayoutDashboard, path: "/admin" },
  { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { label: "Stock", icon: Package, path: "/admin/inventory" },
  { label: "Customers", icon: Users, path: "/admin/customers" },
  { label: "More", icon: BarChart3, path: "/admin/more" },
];

const labourNav: NavItem[] = [
  { label: "Home", icon: Home, path: "/labour" },
  { label: "Deliveries", icon: MapPin, path: "/labour/deliveries" },
  { label: "Payment", icon: IndianRupee, path: "/labour/payment" },
];

const BottomNav = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const items = isAdmin ? adminNav : labourNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const active = location.pathname === item.path || (item.path !== "/admin" && item.path !== "/labour" && location.pathname.startsWith(item.path));
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.85 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors relative ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-1 w-6 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className={`w-6 h-6 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
