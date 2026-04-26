import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
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

const adminMorePaths = [
  "/admin/more",
  "/admin/products",
  "/admin/trips",
  "/admin/billing",
  "/admin/labour",
  "/admin/payments",
  "/admin/reports",
];

const BottomNav = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const items = isAdmin ? adminNav : labourNav;

  const isActivePath = (item: NavItem) => {
    const currentPath = location.pathname;

    if (item.path === "/admin/more") {
      return adminMorePaths.some((path) => currentPath === path || currentPath.startsWith(`${path}/`));
    }

    if (item.path === "/admin" || item.path === "/labour") {
      return currentPath === item.path;
    }

    return currentPath === item.path || currentPath.startsWith(`${item.path}/`);
  };

  return (
    <nav aria-label="Primary navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:px-4 md:bottom-4 md:left-1/2 md:right-auto md:w-[min(92vw,42rem)] md:-translate-x-1/2 md:rounded-2xl md:border md:shadow-lg">
      <div className="mx-auto flex h-16 w-full items-center justify-around gap-1 md:h-14 md:justify-center md:gap-2">
        {items.map((item) => {
          const active = isActivePath(item);
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.85 }}
              onClick={() => navigate(item.path)}
              aria-current={active ? "page" : undefined}
              title={item.label}
              className={cn(
                "relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1.5 py-2 transition-all md:max-w-28 md:px-4",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px h-0.5 w-7 rounded-full bg-primary md:-top-1"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className={cn("h-5 w-5 xs:h-6 xs:w-6 md:h-5 md:w-5", active && "stroke-[2.5]")} />
              <span className="max-w-full truncate text-[9px] font-semibold leading-none xs:text-[10px] md:text-[11px]">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
