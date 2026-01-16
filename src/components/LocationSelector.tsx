import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPin, ChevronDown, Locate, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const popularLocations = [
  { name: "Koramangala, Bangalore", pincode: "560034" },
  { name: "Indiranagar, Bangalore", pincode: "560038" },
  { name: "HSR Layout, Bangalore", pincode: "560102" },
  { name: "Whitefield, Bangalore", pincode: "560066" },
  { name: "BTM Layout, Bangalore", pincode: "560076" },
  { name: "Jayanagar, Bangalore", pincode: "560041" },
  { name: "Marathahalli, Bangalore", pincode: "560037" },
  { name: "Electronic City, Bangalore", pincode: "560100" },
  { name: "MG Road, Bangalore", pincode: "560001" },
  { name: "Connaught Place, Delhi", pincode: "110001" },
  { name: "Bandra West, Mumbai", pincode: "400050" },
  { name: "Andheri East, Mumbai", pincode: "400069" },
];

interface LocationSelectorProps {
  className?: string;
  variant?: "full" | "compact";
}

export function LocationSelector({ className, variant = "full" }: LocationSelectorProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<string>("Koramangala, Bangalore");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);

  const filteredLocations = popularLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.pincode.includes(searchQuery)
  );

  const handleDetectLocation = () => {
    setIsDetecting(true);
    // Simulate location detection
    setTimeout(() => {
      setLocation("Indiranagar, Bangalore");
      setIsDetecting(false);
      setOpen(false);
    }, 1500);
  };

  const handleSelectLocation = (locName: string) => {
    setLocation(locName);
    setOpen(false);
  };

  if (variant === "compact") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 gap-1 text-xs font-normal", className)}
          >
            <MapPin className="h-3 w-3 text-primary" />
            <span className="truncate max-w-[120px]">{location.split(",")[0]}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Location</DialogTitle>
          </DialogHeader>
          <LocationDialogContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredLocations={filteredLocations}
            location={location}
            handleDetectLocation={handleDetectLocation}
            handleSelectLocation={handleSelectLocation}
            isDetecting={isDetecting}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border px-3 py-2 text-left transition-all hover:bg-card hover:shadow-sm w-full max-w-md",
            className
          )}
        >
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Deliver to</p>
            <p className="font-medium text-foreground truncate">{location}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Delivery Location</DialogTitle>
        </DialogHeader>
        <LocationDialogContent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredLocations={filteredLocations}
          location={location}
          handleDetectLocation={handleDetectLocation}
          handleSelectLocation={handleSelectLocation}
          isDetecting={isDetecting}
        />
      </DialogContent>
    </Dialog>
  );
}

function LocationDialogContent({
  searchQuery,
  setSearchQuery,
  filteredLocations,
  location,
  handleDetectLocation,
  handleSelectLocation,
  isDetecting,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filteredLocations: typeof popularLocations;
  location: string;
  handleDetectLocation: () => void;
  handleSelectLocation: (name: string) => void;
  isDetecting: boolean;
}) {
  return (
    <div className="space-y-4">
      {/* Auto Detect */}
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={handleDetectLocation}
        disabled={isDetecting}
      >
        <Locate className={cn("h-4 w-4 text-primary", isDetecting && "animate-pulse")} />
        {isDetecting ? "Detecting location..." : "Use current location"}
      </Button>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by area or pincode"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Popular Locations */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Popular Locations</p>
        <div className="max-h-64 space-y-1 overflow-y-auto">
          {filteredLocations.map((loc) => (
            <button
              key={loc.pincode}
              onClick={() => handleSelectLocation(loc.name)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-secondary",
                location === loc.name && "bg-primary/10"
              )}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground text-sm">{loc.name}</p>
                  <p className="text-xs text-muted-foreground">{loc.pincode}</p>
                </div>
              </div>
              {location === loc.name && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
