import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import PageTransition from "@/components/PageTransition";
import { useAppData } from "@/contexts/AppDataContext";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, ShoppingCart, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, orders, transactions } = useAppData();
  const customer = customers.find((c) => c.id === Number(id));

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Customer not found</p>
      </div>
    );
  }

  const customerOrders = orders.filter((o) => o.customerId === customer.id);
  const customerPayments = transactions.filter((t) => t.desc.includes(customer.name.split(" ")[0]));

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-24 md:pb-28">
        <div className="sticky top-0 z-40 border-b border-border bg-card/80 px-4 py-3 backdrop-blur-lg sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-foreground sm:text-lg">{customer.name}</h1>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{customer.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-primary mt-1">{customerOrders.length}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground">Pending Amount</p>
              <p className={`text-2xl font-bold mt-1 ${customer.pending > 0 ? "text-destructive" : "text-success"}`}>₹{customer.pending}</p>
            </div>
          </div>

          {/* Order History */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Order History
            </h2>
            {customerOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {customerOrders.map((o) => (
                  <div key={o.id} className="bg-card rounded-xl p-3 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-muted-foreground">{o.id} · {o.date}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        o.status === "Delivered" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>{o.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{o.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}</p>
                    <p className="text-sm font-bold text-foreground mt-1">₹{o.amount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment History */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <IndianRupee className="w-4 h-4" /> Payment History
            </h2>
            {customerPayments.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No payments recorded</p>
            ) : (
              <div className="space-y-3">
                {customerPayments.map((t) => (
                  <div key={t.id} className="bg-card rounded-xl p-3 border border-border flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.desc}</p>
                      <p className="text-xs text-muted-foreground">{t.type} · {t.date}</p>
                    </div>
                    <p className="font-bold text-success">+₹{t.amount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default CustomerDetail;
