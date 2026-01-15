import { cn } from "@/lib/utils";

interface PlatformLogoProps {
  platform: "blinkit" | "zepto" | "instamart";
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

export function PlatformLogo({ platform, size = "md", showName = true, className }: PlatformLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };

  const platformConfig = {
    blinkit: {
      name: "Blinkit",
      bgColor: "bg-[#F8CB46]",
      textColor: "text-[#0C831F]",
      initial: "B",
    },
    zepto: {
      name: "Zepto",
      bgColor: "bg-[#8025FB]",
      textColor: "text-primary-foreground",
      initial: "Z",
    },
    instamart: {
      name: "Smart",
      bgColor: "bg-[#FF6600]",
      textColor: "text-primary-foreground",
      initial: "S",
    },
  };

  const config = platformConfig[platform];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl font-bold",
          sizeClasses[size],
          config.bgColor,
          config.textColor
        )}
      >
        {config.initial}
      </div>
      {showName && (
        <span className="font-medium text-foreground">{config.name}</span>
      )}
    </div>
  );
}

export function PlatformLogosRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-6", className)}>
      <PlatformLogo platform="blinkit" size="lg" />
      <PlatformLogo platform="zepto" size="lg" />
      <PlatformLogo platform="instamart" size="lg" />
    </div>
  );
}
