import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useReports } from "@/contexts/ReportsContext";
import { mockSchedules } from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Bell, Clock, MapPin, Plus, FileX } from "lucide-react";
import { motion } from "framer-motion";

export default function CitizenDashboard() {
  const { user } = useAuth();
  const { reports } = useReports();

  const myReports = reports.filter((r) => r.userId === user?.id);

  const stats = [
    { label: "My Reports", value: myReports.length, icon: Camera, color: "text-primary" },
    { label: "Pending", value: myReports.filter((c) => c.status === "Pending").length, icon: Clock, color: "text-accent" },
    { label: "Resolved", value: myReports.filter((c) => c.status === "Resolved").length, icon: Bell, color: "text-success" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name} 👋</h1>
          <p className="text-muted-foreground">{user?.location}</p>
        </div>
        <Link to="/report">
          <Button><Plus className="mr-2 h-4 w-4" /> Report Issue</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-secondary ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Pickups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5 text-primary" /> Upcoming Pickups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSchedules.slice(0, 3).map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                <div>
                  <p className="font-medium">{s.area}</p>
                  <p className="text-xs text-muted-foreground">{s.day}, {s.date}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{s.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Camera className="h-5 w-5 text-primary" /> My Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileX className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">No reports yet</p>
                <p className="mt-1 text-xs text-muted-foreground/70">Submit your first report to see it here</p>
                <Link to="/report">
                  <Button size="sm" variant="outline" className="mt-4">
                    <Plus className="mr-1 h-3 w-3" /> Report Issue
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myReports.map((c) => (
                  <div key={c.id} className="flex items-start gap-3 rounded-lg border p-3">
                    <img src={c.imageUrl} alt="" className="h-14 w-14 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.description}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {c.area}
                      </div>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
