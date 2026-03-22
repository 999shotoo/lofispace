import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Headphones, Globe, Download } from "lucide-react";
import jazzMix from "@/assets/jazz_mix.webp";

const Index = () => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleConsoleClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      navigate("/console");
    }, 350);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden grain-overlay">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadingOut ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-0 z-50 bg-background"
      />
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-radial from-amber-900/35 via-background/80 to-background transition-opacity duration-700 ${
            isImageLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={jazzMix}
          alt="Cozy lofi café scene"
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
          decoding="async"
          onLoad={() => setIsImageLoaded(true)}
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-background/60" />
        {/* Warm glow bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-8 sm:py-12">
        {/* Top: Logo / brand */}
        <div className="flex items-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
            <Headphones className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            lofiSpace
          </span>
        </div>

        {/* Center: Hero text */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance opacity-0 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Your calm corner
            <br />
            <span className="text-primary">of the internet</span>
          </h1>
          <p
            className="max-w-md text-base text-muted-foreground sm:text-lg opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            24/7 lofi beats to relax, study, and drift away. No ads. No interruptions. Just vibes.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col gap-3 sm:flex-row sm:gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            <Button 
              variant="default" 
              className="w-full sm:w-auto"
              onClick={handleConsoleClick}
              disabled={isFadingOut}
            >
              <Globe className="h-5 w-5 text-accent" />
              Open in Browser
            </Button>
            <Link to="/download" className="w-full sm:w-auto">
              <Button variant="outline">
                <Download className="h-5 w-5" />
                Download App
              </Button>
            </Link> 
          </div>
        </div>

        {/* Bottom: Subtle equalizer bars */}
        <div
          className="flex items-end gap-1 opacity-0 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          {[3, 5, 2, 6, 4, 3, 5, 2, 4, 6, 3, 5].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-primary/40 animate-pulse-glow"
              style={{
                height: `${h * 4}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
