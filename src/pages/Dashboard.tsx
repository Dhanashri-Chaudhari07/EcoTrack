import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import CitizenDashboard from "./CitizenDashboard";
import WorkerDashboard from "./WorkerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  switch (user?.role) {
    case "citizen": return <CitizenDashboard />;
    case "worker": return <WorkerDashboard />;
    case "admin": return <AdminDashboard />;
    default: return <Navigate to="/login" replace />;
  }
}
