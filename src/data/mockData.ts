export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  status: "Pending" | "In Progress" | "Resolved";
  timestamp: string;
  area: string;
  assignedWorker?: string;
}

export interface PickupSchedule {
  id: string;
  area: string;
  time: string;
  date: string;
  day: string;
}

export const mockComplaints: Complaint[] = [
  {
    id: "C001",
    userId: "1",
    userName: "Priya Sharma",
    description: "Overflowing garbage bin near park entrance",
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&h=300&fit=crop",
    latitude: 30.7333,
    longitude: 76.7794,
    status: "Pending",
    timestamp: "2026-03-23T08:30:00",
    area: "Sector 15",
  },
  {
    id: "C002",
    userId: "1",
    userName: "Amit Verma",
    description: "Waste dumped on roadside near school",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    latitude: 30.7350,
    longitude: 76.7810,
    status: "In Progress",
    timestamp: "2026-03-22T14:15:00",
    area: "Sector 22",
    assignedWorker: "Rajesh Kumar",
  },
  {
    id: "C003",
    userId: "1",
    userName: "Sita Devi",
    description: "Broken waste bin needs replacement",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    latitude: 30.7290,
    longitude: 76.7750,
    status: "Resolved",
    timestamp: "2026-03-20T10:00:00",
    area: "Sector 8",
    assignedWorker: "Rajesh Kumar",
  },
  {
    id: "C004",
    userId: "1",
    userName: "Ravi Patel",
    description: "Construction debris blocking drainage",
    imageUrl: "https://images.unsplash.com/photo-1567393528677-d6adae7d4e0a?w=400&h=300&fit=crop",
    latitude: 30.7400,
    longitude: 76.7850,
    status: "Pending",
    timestamp: "2026-03-23T06:45:00",
    area: "Sector 35",
  },
];

export const mockSchedules: PickupSchedule[] = [
  { id: "S1", area: "Sector 15", time: "08:00 AM", date: "2026-03-24", day: "Monday" },
  { id: "S2", area: "Sector 22", time: "09:30 AM", date: "2026-03-24", day: "Monday" },
  { id: "S3", area: "Sector 8", time: "07:00 AM", date: "2026-03-25", day: "Tuesday" },
  { id: "S4", area: "Sector 35", time: "10:00 AM", date: "2026-03-25", day: "Tuesday" },
  { id: "S5", area: "Sector 15", time: "08:00 AM", date: "2026-03-26", day: "Wednesday" },
];
