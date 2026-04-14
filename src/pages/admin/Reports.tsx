import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { motion } from "framer-motion";

const dailySales = [
  { day: "Mon", sales: 3200 },
  { day: "Tue", sales: 4100 },
  { day: "Wed", sales: 2800 },
  { day: "Thu", sales: 5200 },
  { day: "Fri", sales: 4800 },
  { day: "Sat", sales: 6100 },
  { day: "Sun", sales: 3400 },
];

const topProducts = [
  { name: "Bisleri 1L", value: 35 },
  { name: "Mazza", value: 25 },
  { name: "Sprite", value: 20 },
  { name: "Coca-Cola", value: 12 },
  { name: "Thums Up", value: 8 },
];

const COLORS = ["hsl(211,90%,50%)", "hsl(199,80%,46%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(0,72%,51%)"];

const periods = ["This Week", "This Month", "Last Month"];

const Reports = () => {
  const [period, setPeriod] = useState("This Week");

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-20">
        <PageHeader title="Reports" subtitle="Business analytics" />
        <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
          {/* Period Selector */}
          <div className="flex bg-secondary rounded-xl p-1">
            {periods.map((p) => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPeriod(p)}
                className={`flex-1 h-9 rounded-lg text-xs font-medium transition-all ${
                  period === p ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {p}
              </motion.button>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Daily Sales</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="sales" fill="hsl(211,90%,50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Top Selling Products</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={topProducts} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                  {topProducts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold text-success mt-1">₹1.2L</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground">Monthly Expenses</p>
              <p className="text-2xl font-bold text-destructive mt-1">₹45K</p>
            </motion.div>
          </div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Reports;
