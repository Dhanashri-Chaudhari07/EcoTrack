import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Recycle, User, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";

const roles: { value: UserRole; label: string; icon: typeof User; description: string }[] = [
  { value: "citizen", label: "Citizen", icon: User, description: "Report issues & get reminders" },
  { value: "worker", label: "Worker", icon: Truck, description: "View & resolve assigned tasks" },
  { value: "admin", label: "Admin", icon: Shield, description: "Manage & oversee operations" },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole, name);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Recycle className="mx-auto mb-3 h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold">Welcome to EcoTrack</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Role selector */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setSelectedRole(r.value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all ${
                selectedRole === r.value
                  ? "border-primary bg-primary/5 shadow-card"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <r.icon className={`h-6 w-6 ${selectedRole === r.value ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs font-semibold">{r.label}</span>
            </button>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In as {roles.find(r => r.value === selectedRole)?.label}</CardTitle>
            <CardDescription>{roles.find(r => r.value === selectedRole)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
              <p className="text-center text-xs text-muted-foreground">
                Demo mode — any email/password works
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
