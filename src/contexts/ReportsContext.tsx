import { createContext, useContext, useState, ReactNode } from "react";
import { Complaint } from "@/data/mockData";

interface ReportsContextType {
  reports: Complaint[];
  addReport: (report: Complaint) => void;
  updateReportStatus: (id: string, status: Complaint["status"], assignedWorker?: string) => void;
}

const ReportsContext = createContext<ReportsContextType | null>(null);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Complaint[]>([]);

  const addReport = (report: Complaint) => {
    setReports((prev) => [report, ...prev]);
  };

  const updateReportStatus = (id: string, status: Complaint["status"], assignedWorker?: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status, assignedWorker: assignedWorker ?? r.assignedWorker } : r
      )
    );
  };

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReportStatus }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used within ReportsProvider");
  return ctx;
}
