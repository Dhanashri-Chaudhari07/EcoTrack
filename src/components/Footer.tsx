import { Recycle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
            <Recycle className="h-5 w-5" />
            EcoTrack
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 EcoTrack Smart Waste Management. Building cleaner cities together.
          </p>
        </div>
      </div>
    </footer>
  );
}
