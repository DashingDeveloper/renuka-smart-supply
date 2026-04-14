import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  size: string;
  price: number;
  stock: number;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  pending: number;
  address?: string;
}

export interface Order {
  id: string;
  customerId: number;
  customer: string;
  items: { productId: number; name: string; qty: number; price: number }[];
  status: "Pending" | "Delivered";
  amount: number;
  date: string;
}

export interface Trip {
  id: number;
  vehicle: string;
  labour: string;
  products: number;
  route: string;
  status: "Ongoing" | "Completed" | "Not Started";
  deliveries: { customerId: number; customer: string; items: string; delivered: boolean }[];
}

export interface Transaction {
  id: number;
  desc: string;
  amount: number;
  type: string;
  category: "Income" | "Expenses" | "Pending";
  date: string;
}

export interface Labour {
  id: number;
  name: string;
  phone: string;
  salary: string;
  present: boolean;
  paid: number;
  pending: number;
}

interface AppDataContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  labours: Labour[];
  setLabours: React.Dispatch<React.SetStateAction<Labour[]>>;
}

const AppDataContext = createContext<AppDataContextType | null>(null);

const initialProducts: Product[] = [
  { id: 1, name: "Bisleri", size: "1L", price: 20, stock: 120 },
  { id: 2, name: "Bisleri", size: "500ml", price: 10, stock: 85 },
  { id: 3, name: "Bisleri", size: "250ml", price: 5, stock: 200 },
  { id: 4, name: "Mazza", size: "600ml", price: 40, stock: 45 },
  { id: 5, name: "Sprite", size: "250ml", price: 20, stock: 60 },
  { id: 6, name: "Sprite", size: "750ml", price: 40, stock: 30 },
  { id: 7, name: "Coca-Cola", size: "750ml", price: 40, stock: 8 },
  { id: 8, name: "Thums Up", size: "750ml", price: 40, stock: 15 },
];

const initialCustomers: Customer[] = [
  { id: 1, name: "Sharma General Store", phone: "9876543001", pending: 2400 },
  { id: 2, name: "Patel Kirana", phone: "9876543002", pending: 800 },
  { id: 3, name: "Krishna Mart", phone: "9876543003", pending: 0 },
  { id: 4, name: "Balaji Traders", phone: "9876543004", pending: 1500 },
  { id: 5, name: "Mahalaxmi Store", phone: "9876543005", pending: 3200 },
  { id: 6, name: "Sai Provision", phone: "9876543006", pending: 0 },
];

const initialOrders: Order[] = [
  { id: "ORD-001", customerId: 1, customer: "Sharma General Store", items: [{ productId: 1, name: "Bisleri 1L", qty: 10, price: 20 }, { productId: 4, name: "Mazza 600ml", qty: 5, price: 40 }], status: "Delivered", amount: 400, date: "14 Apr" },
  { id: "ORD-002", customerId: 2, customer: "Patel Kirana", items: [{ productId: 5, name: "Sprite 250ml", qty: 20, price: 20 }], status: "Pending", amount: 400, date: "14 Apr" },
  { id: "ORD-003", customerId: 3, customer: "Krishna Mart", items: [{ productId: 2, name: "Bisleri 500ml", qty: 15, price: 10 }], status: "Pending", amount: 150, date: "14 Apr" },
  { id: "ORD-004", customerId: 4, customer: "Balaji Traders", items: [{ productId: 8, name: "Thums Up 750ml", qty: 10, price: 40 }], status: "Delivered", amount: 400, date: "13 Apr" },
  { id: "ORD-005", customerId: 5, customer: "Mahalaxmi Store", items: [{ productId: 3, name: "Bisleri 250ml", qty: 30, price: 5 }], status: "Pending", amount: 150, date: "13 Apr" },
];

const initialTrips: Trip[] = [
  { id: 1, vehicle: "Tempo - MH12 AB 1234", labour: "Ramesh", products: 45, route: "Market Area", status: "Ongoing", deliveries: [
    { customerId: 1, customer: "Sharma General Store", items: "10x Bisleri 1L, 5x Mazza", delivered: false },
    { customerId: 2, customer: "Patel Kirana", items: "20x Sprite 250ml", delivered: false },
    { customerId: 3, customer: "Krishna Mart", items: "15x Bisleri 500ml", delivered: true },
  ]},
  { id: 2, vehicle: "Mini Van - MH12 CD 5678", labour: "Suresh", products: 30, route: "Station Road", status: "Completed", deliveries: [
    { customerId: 4, customer: "Balaji Traders", items: "10x Thums Up 750ml", delivered: true },
    { customerId: 5, customer: "Mahalaxmi Store", items: "30x Bisleri 250ml", delivered: true },
  ]},
  { id: 3, vehicle: "Auto - MH12 EF 9012", labour: "Mahesh", products: 20, route: "Industrial Area", status: "Not Started", deliveries: [] },
];

const initialTransactions: Transaction[] = [
  { id: 1, desc: "Sharma Store Payment", amount: 2400, type: "Cash", category: "Income", date: "14 Apr" },
  { id: 2, desc: "Patel Kirana Payment", amount: 800, type: "UPI", category: "Income", date: "14 Apr" },
  { id: 3, desc: "Krishna Mart Payment", amount: 1200, type: "Cash", category: "Income", date: "13 Apr" },
  { id: 4, desc: "Fuel - Tempo", amount: 500, type: "Fuel", category: "Expenses", date: "14 Apr" },
  { id: 5, desc: "Labour - Ramesh", amount: 400, type: "Labour", category: "Expenses", date: "14 Apr" },
  { id: 6, desc: "Vehicle Repair", amount: 1200, type: "Maintenance", category: "Expenses", date: "13 Apr" },
  { id: 7, desc: "Balaji Traders", amount: 1500, type: "Pending", category: "Pending", date: "12 Apr" },
  { id: 8, desc: "Mahalaxmi Store", amount: 3200, type: "Pending", category: "Pending", date: "10 Apr" },
];

const initialLabours: Labour[] = [
  { id: 1, name: "Ramesh", phone: "9876543211", salary: "Monthly", present: true, paid: 8000, pending: 4000 },
  { id: 2, name: "Suresh", phone: "9876543212", salary: "Weekly", present: true, paid: 3000, pending: 1500 },
  { id: 3, name: "Mahesh", phone: "9876543213", salary: "Daily", present: false, paid: 6000, pending: 0 },
  { id: 4, name: "Ganesh", phone: "9876543214", salary: "Monthly", present: true, paid: 7000, pending: 5000 },
  { id: 5, name: "Dinesh", phone: "9876543215", salary: "Weekly", present: true, paid: 2500, pending: 1000 },
];

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [labours, setLabours] = useState<Labour[]>(initialLabours);

  return (
    <AppDataContext.Provider value={{ products, setProducts, customers, setCustomers, orders, setOrders, trips, setTrips, transactions, setTransactions, labours, setLabours }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be inside AppDataProvider");
  return ctx;
};
