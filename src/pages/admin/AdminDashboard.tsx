import { useAuth } from "@/contexts/AuthContext";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
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
  Users,
  Receipt,
  UserCog,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title={`Hi, ${user?.name}`} subtitle="Welcome to Renuka Aqua" />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Today Sales" value="₹12,450" icon={IndianRupee} color="success" />
          <StatCard label="Cash Collected" value="₹8,200" icon={Wallet} color="primary" />
          <StatCard label="Pending" value="₹4,250" icon={Clock} color="warning" />
          <StatCard label="Low Stock" value="3 items" icon={AlertTriangle} color="destructive" />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Recent Orders</h2>
          <div className="space-y-2">
            {[
              { shop: "Sharma General Store", items: "10x Bisleri 1L, 5x Mazza", status: "Delivered", amount: "₹850" },
              { shop: "Patel Kirana", items: "20x Sprite 250ml", status: "Pending", amount: "₹400" },
              { shop: "Krishna Mart", items: "15x Bisleri 500ml", status: "Pending", amount: "₹525" },
            ].map((order) => (
              <div key={order.shop} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{order.shop}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.items}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">{order.amount}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${order.status === "Delivered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AdminDashboard;
