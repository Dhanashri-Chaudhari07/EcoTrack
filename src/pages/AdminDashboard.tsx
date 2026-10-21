import { useReports } from "@/contexts/ReportsContext";
import { mockSchedules } from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Truck, AlertTriangle, MapPin, Calendar, FileX } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { reports, updateReportStatus } = useReports();

  const assignWorker = (id: string) => {
    updateReportStatus(id, "In Progress", "Rajesh Kumar");
  };

  const stats = [
    { label: "Total Complaints", value: reports.length, icon: AlertTriangle, color: "text-destructive" },
    { label: "Pending", value: reports.filter(c => c.status === "Pending").length, icon: BarChart3, color: "text-accent" },
    { label: "In Progress", value: reports.filter(c => c.status === "In Progress").length, icon: Truck, color: "text-info" },
    { label: "Resolved", value: reports.filter(c => c.status === "Resolved").length, icon: Users, color: "text-success" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard 📊</h1>
        <p className="text-muted-foreground">Overview of all waste management operations</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileX className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">No complaints reported yet</p>
                <p className="mt-1 text-xs text-muted-foreground/70">Complaints will appear here when citizens report issues</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Reporter</th>
                      <th className="pb-3 font-medium">Area</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Worker</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((c) => (
                      <tr key={c.id} className="border-b last:border-0">
                        <td className="py-3 font-mono text-xs">{c.id.slice(-6)}</td>
                        <td className="py-3">{c.userName}</td>
                        <td className="py-3">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.area}</span>
                        </td>
                        <td className="py-3"><StatusBadge status={c.status} /></td>
                        <td className="py-3 text-xs">{c.assignedWorker || "—"}</td>
                        <td className="py-3">
                          {c.status === "Pending" && (
                            <Button size="sm" variant="outline" onClick={() => assignWorker(c.id)}>
                              Assign Worker
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Pickup Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSchedules.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                <div>
                  <p className="text-sm font-medium">{s.area}</p>
                  <p className="text-xs text-muted-foreground">{s.day}, {s.date}</p>
                </div>
                <span className="text-sm font-medium text-primary">{s.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
