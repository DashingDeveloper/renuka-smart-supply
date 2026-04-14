import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "labour";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: (User & { password: string })[] = [
  { id: "1", name: "Renuka Admin", phone: "9876543210", role: "admin", password: "1234" },
  { id: "2", name: "Ramesh", phone: "9876543211", role: "labour", password: "1111" },
  { id: "3", name: "Suresh", phone: "9876543212", role: "labour", password: "1111" },
  { id: "4", name: "Mahesh", phone: "9876543213", role: "labour", password: "1111" },
  { id: "5", name: "Ganesh", phone: "9876543214", role: "labour", password: "1111" },
  { id: "6", name: "Dinesh", phone: "9876543215", role: "labour", password: "1111" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (phone: string, password: string): boolean => {
    const found = MOCK_USERS.find((u) => u.phone === phone && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
