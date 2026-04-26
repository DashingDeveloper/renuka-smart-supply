import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import StatCard from "@/components/StatCard";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  Wallet,
  AlertTriangle,
  Clock,
  ShoppingCart,
  Package,
  Truck,
  Receipt,
  UserCog,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import deliveryImage from "@/assets/renuka-aqua-delivery.jpg";

const quickActions = [
  { label: "Create Order", icon: ShoppingCart, path: "/admin/orders", color: "bg-primary text-primary-foreground" },
  { label: "Add Stock", icon: Package, path: "/admin/inventory", color: "bg-success text-success-foreground" },
  { label: "Create Trip", icon: Truck, path: "/admin/trips", color: "bg-accent text-accent-foreground" },
  { label: "Billing", icon: Receipt, path: "/admin/billing", color: "bg-warning text-warning-foreground" },
  { label: "Labour", icon: UserCog, path: "/admin/labour", color: "bg-primary text-primary-foreground" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports", color: "bg-accent text-accent-foreground" },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { orders, products, transactions } = useAppData();
  const navigate = useNavigate();

  const todaySales = transactions.filter((t) => t.category === "Income").reduce((s, t) => s + t.amount, 0);
  const pendingAmount = transactions.filter((t) => t.category === "Pending").reduce((s, t) => s + t.amount, 0);
  const lowStockCount = products.filter((p) => p.stock <= 10).length;
  const recentOrders = orders.slice(0, 3);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <PageHeader title={`Hi, ${user?.name}`} subtitle="Welcome to Renuka Aqua" />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          >
            <img src={deliveryImage} alt="Renuka Aqua delivery worker loading water cans" width={1280} height={720} className="h-36 w-full object-cover sm:h-48 lg:h-56" />
            <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/45 to-transparent" />
            <div className="absolute left-4 top-1/2 max-w-[70%] -translate-y-1/2 sm:left-6">
              <p className="text-xs font-semibold text-primary">Today’s operations</p>
              <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">Water & cold drink supply</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Today Sales" value={`₹${todaySales.toLocaleString()}`} icon={IndianRupee} color="success" />
            <StatCard label="Cash Collected" value="₹8,200" icon={Wallet} color="primary" />
            <StatCard label="Pending" value={`₹${pendingAmount.toLocaleString()}`} icon={Clock} color="warning" />
            <StatCard label="Low Stock" value={`${lowStockCount} items`} icon={AlertTriangle} color="destructive" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted-foreground">Recent Orders</h2>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate("/admin/orders")} className="text-xs text-primary font-medium">
                View All →
              </motion.button>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{order.customer}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground text-sm">₹{order.amount}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${order.status === "Delivered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
