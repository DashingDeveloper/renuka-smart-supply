import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

const tabs = ["Income", "Expenses", "Pending"];

const mockTransactions = {
  Income: [
    { desc: "Sharma Store Payment", amount: 2400, type: "Cash", date: "14 Apr" },
    { desc: "Patel Kirana Payment", amount: 800, type: "UPI", date: "14 Apr" },
    { desc: "Krishna Mart Payment", amount: 1200, type: "Cash", date: "13 Apr" },
  ],
  Expenses: [
    { desc: "Fuel - Tempo", amount: 500, type: "Fuel", date: "14 Apr" },
    { desc: "Labour - Ramesh", amount: 400, type: "Labour", date: "14 Apr" },
    { desc: "Vehicle Repair", amount: 1200, type: "Maintenance", date: "13 Apr" },
  ],
  Pending: [
    { desc: "Balaji Traders", amount: 1500, type: "Pending", date: "12 Apr" },
    { desc: "Mahalaxmi Store", amount: 3200, type: "Pending", date: "10 Apr" },
  ],
};

const Payments = () => {
  const [activeTab, setActiveTab] = useState("Income");

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Payments" subtitle="Track money flow" />
      <div className="px-4 py-4 max-w-lg mx-auto space-y-4">
        <div className="flex bg-secondary rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 h-10 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-medium text-sm">
          + Add Transaction
        </button>

        <div className="space-y-2">
          {mockTransactions[activeTab as keyof typeof mockTransactions].map((t, i) => (
            <div key={i} className="bg-card rounded-xl p-4 border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">{t.desc}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.type} · {t.date}</p>
              </div>
              <p className={`font-bold ${activeTab === "Income" ? "text-success" : activeTab === "Expenses" ? "text-destructive" : "text-warning"}`}>
                {activeTab === "Income" ? "+" : activeTab === "Expenses" ? "-" : ""}₹{t.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Payments;
