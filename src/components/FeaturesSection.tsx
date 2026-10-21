import { motion } from "framer-motion";
import { Camera, MapPin, Bell, Users, BarChart3, Truck } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Photo Reporting",
    description: "Snap a photo of waste issues and submit instantly with automatic GPS tagging.",
  },
  {
    icon: MapPin,
    title: "GPS Location",
    description: "Exact coordinates captured automatically so workers can navigate directly to the issue.",
  },
  {
    icon: Bell,
    title: "Pickup Reminders",
    description: "Area-wise scheduled notifications via SMS and email so you never miss a collection.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Citizens report, workers resolve, admins oversee — everyone on the same platform.",
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    description: "Real-time analytics, complaint tracking, and worker assignment in one view.",
  },
  {
    icon: Truck,
    title: "Worker Navigation",
    description: "Workers get location-based task lists and can update status on the go.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Everything You Need for Clean Streets</h2>
          <p className="mt-4 text-muted-foreground">
            A complete ecosystem connecting citizens, workers, and authorities for efficient waste management.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
