import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "citizen" | "worker" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<UserRole, User> = {
  citizen: { id: "1", name: "Priya Sharma", email: "priya@example.com", role: "citizen", location: "Sector 15, Chandigarh" },
  worker: { id: "2", name: "Rajesh Kumar", email: "rajesh@example.com", role: "worker", location: "Zone A" },
  admin: { id: "3", name: "Admin Officer", email: "admin@example.com", role: "admin" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (_email: string, _password: string, role: UserRole, name: string) => {
    setUser({ id: crypto.randomUUID(), name, email: _email, role, location: role === "citizen" ? "Sector 15, Chandigarh" : role === "worker" ? "Zone A" : undefined });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
