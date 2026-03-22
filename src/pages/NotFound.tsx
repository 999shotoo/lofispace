import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import btsJazz from "@/assets/bts_jazz_mix.webp";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden grain-overlay bg-background">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={btsJazz}
          alt="Lofi scene"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-8xl font-bold tracking-tighter text-primary sm:text-9xl" style={{ lineHeight: "1" }}>
            404
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Lost in the beats
          </h1>
          <p className="max-w-xs mx-auto text-muted-foreground">
            This page drifted away like a late-night melody. Let's get you back.
          </p>
        </div>

        <Button
          variant="default"
          onClick={() => navigate("/")}
          className="mt-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Home className="h-5 w-5" />
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
