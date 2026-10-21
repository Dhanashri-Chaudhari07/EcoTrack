import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Sign Up", description: "Register as a citizen, worker, or admin and set your area." },
  { step: "02", title: "Report or Receive", description: "Citizens report issues with photos; workers receive assignments." },
  { step: "03", title: "Track & Resolve", description: "Real-time status updates from pending to resolved." },
  { step: "04", title: "Stay Notified", description: "Get pickup reminders and resolution confirmations." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">How It Works</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Simple 4-Step Process</h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {s.step}
              </div>
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-8 hidden h-0.5 w-[calc(100%-80px)] bg-border md:block" />
              )}
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
