import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Bell, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero py-24 md:py-32">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-foreground/5 animate-pulse-glow" />
      <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-foreground/5 animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-block rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground/90">
              🌿 Smart City Initiative
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-6xl">
              Clean Streets,{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
                Smarter Cities
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
              Report waste issues instantly with photo & GPS. Get pickup reminders. 
              Track resolution in real-time. Together, we build cleaner communities.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/login">
              <Button size="lg" className="gradient-accent text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-shadow px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {[
              { icon: MapPin, label: "GPS Reports", value: "12K+" },
              { icon: Bell, label: "Reminders Sent", value: "45K+" },
              { icon: Shield, label: "Issues Resolved", value: "9.8K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-amber-300" />
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
