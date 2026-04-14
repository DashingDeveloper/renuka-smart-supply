import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

const Reports = () => (
  <div className="min-h-screen bg-background pb-20">
    <PageHeader title="Reports" subtitle="Business analytics" />
    <div className="px-4 py-4 max-w-lg mx-auto space-y-6">
      <div className="bg-card rounded-2xl p-4 border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Daily Sales (This Week)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="sales" fill="hsl(211,90%,50%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
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
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4 border border-border text-center">
          <p className="text-xs text-muted-foreground">Monthly Revenue</p>
          <p className="text-2xl font-bold text-success mt-1">₹1.2L</p>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border text-center">
          <p className="text-xs text-muted-foreground">Monthly Expenses</p>
          <p className="text-2xl font-bold text-destructive mt-1">₹45K</p>
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
);

export default Reports;
