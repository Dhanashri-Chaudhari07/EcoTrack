import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Recycle, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          <Recycle className="h-7 w-7" />
          <span>EcoTrack</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it works</a>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              {user?.role === "citizen" && (
                <Link to="/report" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Report Issue</Link>
              )}
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground capitalize">{user?.role}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-card px-4 py-4 md:hidden space-y-3">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Sign In</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              {user?.role === "citizen" && (
                <Link to="/report" className="block text-sm font-medium" onClick={() => setMobileOpen(false)}>Report Issue</Link>
              )}
              <Button variant="ghost" size="sm" onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full justify-start">
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
