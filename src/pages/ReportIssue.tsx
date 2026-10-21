import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useReports } from "@/contexts/ReportsContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ReportIssue() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addReport } = useReports();
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; city: string } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`
      );
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        data.display_name?.split(",")[0] ||
        "Unknown Location";
      return city;
    } catch {
      return "Unknown Location";
    }
  };

  const getLocation = async () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const city = await reverseGeocode(lat, lng);
          setLocation({ lat, lng, city });
          setLoadingLocation(false);
          toast.success(`Location captured: ${city}`);
        },
        async () => {
          const lat = 30.7333;
          const lng = 76.7794;
          const city = await reverseGeocode(lat, lng);
          setLocation({ lat, lng, city });
          setLoadingLocation(false);
          toast.info("Using default location (GPS unavailable)");
        }
      );
    } else {
      setLocation({ lat: 30.7333, lng: 76.7794, city: "Chandigarh" });
      setLoadingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) { toast.error("Please add a description"); return; }
    if (!imagePreview) { toast.error("Please capture a photo"); return; }
    if (!location) { toast.error("Please capture your location"); return; }

    addReport({
      id: `C${Date.now()}`,
      userId: user?.id || "unknown",
      userName: user?.name || "Anonymous",
      description,
      imageUrl: imagePreview,
      latitude: location.lat,
      longitude: location.lng,
      status: "Pending",
      timestamp: new Date().toISOString(),
      area: location.city,
    });

    setSubmitted(true);
    toast.success("Report submitted successfully!");
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-success" />
          <h2 className="text-2xl font-bold">Report Submitted!</h2>
          <p className="mt-2 text-muted-foreground">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 text-2xl font-bold">Report an Issue 📸</h1>
        <p className="mb-6 text-muted-foreground">Capture a photo with your camera and we'll get your location automatically.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Camera capture */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Camera className="h-5 w-5 text-primary" /> Capture Photo
              </CardTitle>
              <CardDescription>Take a photo of the waste issue using your camera</CardDescription>
            </CardHeader>
            <CardContent>
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
                  <Button type="button" size="sm" variant="secondary" className="absolute bottom-2 right-2" onClick={() => setImagePreview(null)}>
                    Retake
                  </Button>
                </div>
              ) : (
                <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/30 transition-colors hover:bg-secondary/50">
                  <Camera className="mb-2 h-10 w-10 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tap to open camera & capture photo</span>
                  <Input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5 text-primary" /> Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {location ? (
                <div className="rounded-lg bg-secondary/50 p-4">
                  <p className="text-sm font-medium">📍 {location.city}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                  </p>
                </div>
              ) : (
                <Button type="button" variant="outline" onClick={getLocation} disabled={loadingLocation}>
                  {loadingLocation ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                  Capture My Location
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the waste issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Send className="mr-2 h-4 w-4" /> Submit Report
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
