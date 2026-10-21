import { useAuth } from "@/contexts/AuthContext";
import { useReports } from "@/contexts/ReportsContext";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle, Clock, Navigation, FileX } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkerDashboard() {
  const { user } = useAuth();
  const { reports, updateReportStatus } = useReports();

  const assigned = reports.filter(c => c.status !== "Resolved");
  const resolved = reports.filter(c => c.status === "Resolved");

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Worker Dashboard 🚛</h1>
        <p className="text-muted-foreground">Welcome, {user?.name} — {user?.location}</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Assigned Tasks", value: assigned.length, icon: Clock, color: "text-accent" },
          { label: "Completed", value: resolved.length, icon: CheckCircle, color: "text-success" },
          { label: "Total", value: reports.length, icon: MapPin, color: "text-primary" },
        ].map((s, i) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Assigned Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileX className="mb-3 h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">No tasks assigned yet</p>
              <p className="mt-1 text-xs text-muted-foreground/70">Tasks will appear when admin assigns complaints</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((c) => (
                <div key={c.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center">
                  <img src={c.imageUrl} alt="" className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{c.description}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {c.area}</span>
                      <span>{c.timestamp.split("T")[0]}</span>
                      <span>By: {c.userName}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={c.status} />
                    {c.status === "Pending" && (
                      <Button size="sm" variant="outline" onClick={() => updateReportStatus(c.id, "In Progress")}>
                        Start
                      </Button>
                    )}
                    {c.status === "In Progress" && (
                      <Button size="sm" onClick={() => updateReportStatus(c.id, "Resolved")}>
                        <CheckCircle className="mr-1 h-4 w-4" /> Complete
                      </Button>
                    )}
                    {c.status !== "Resolved" && (
                      <Button size="sm" variant="ghost" title="Navigate">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
