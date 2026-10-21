import { Badge } from "@/components/ui/badge";

type Status = "Pending" | "In Progress" | "Resolved";

const statusStyles: Record<Status, string> = {
  "Pending": "bg-accent/15 text-accent-foreground border-accent/30",
  "In Progress": "bg-info/15 text-info border-info/30",
  "Resolved": "bg-primary/15 text-primary border-primary/30",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="outline" className={`${statusStyles[status]} font-medium`}>
      {status}
    </Badge>
  );
}
