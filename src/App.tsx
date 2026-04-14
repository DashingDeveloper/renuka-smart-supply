import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppDataProvider } from "@/contexts/AppDataContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/Products";
import Inventory from "./pages/admin/Inventory";
import Customers from "./pages/admin/Customers";
import CustomerDetail from "./pages/admin/CustomerDetail";
import Orders from "./pages/admin/Orders";
import AdminMore from "./pages/admin/AdminMore";
import Trips from "./pages/admin/Trips";
import Billing from "./pages/admin/Billing";
import LabourManagement from "./pages/admin/LabourManagement";
import Payments from "./pages/admin/Payments";
import Reports from "./pages/admin/Reports";
import LabourHome from "./pages/labour/LabourHome";
import Deliveries from "./pages/labour/Deliveries";
import PaymentEntry from "./pages/labour/PaymentEntry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAdmin ? "/admin" : "/labour"} replace />} />

      {isAdmin && (
        <>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/customers/:id" element={<CustomerDetail />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/more" element={<AdminMore />} />
          <Route path="/admin/trips" element={<Trips />} />
          <Route path="/admin/billing" element={<Billing />} />
          <Route path="/admin/labour" element={<LabourManagement />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/reports" element={<Reports />} />
        </>
      )}

      {!isAdmin && (
        <>
          <Route path="/labour" element={<LabourHome />} />
          <Route path="/labour/deliveries" element={<Deliveries />} />
          <Route path="/labour/payment" element={<PaymentEntry />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppDataProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppDataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
