import { Globe, BookOpen, Map } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "full" | "compact" | "icon" | "text";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTagline?: boolean;
  linkTo?: string;
}

// African continent SVG path (simplified)
const AfricaPath = () => (
  <svg viewBox="0 0 100 120" className="w-full h-full">
    <path
      d="M50 10 C35 10, 25 20, 25 35 Q20 45, 25 55 L20 70 Q18 80, 25 85 L30 95 Q35 105, 45 105 L55 105 Q65 105, 70 95 L75 85 Q82 80, 80 70 L75 55 Q80 45, 75 35 C75 20, 65 10, 50 10 Z"
      className="fill-current"
    />
    {/* Nile River representation */}
    <path
      d="M52 15 Q55 25, 58 35 Q60 45, 55 55 Q52 65, 50 75"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      className="opacity-40"
    />
  </svg>
);

// Ancient script/hieroglyphic-inspired decorative elements
const Decorative = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <g className="fill-current opacity-60">
      <circle cx="6" cy="6" r="1.5" />
      <rect x="10" y="4" width="8" height="1.5" />
      <circle cx="6" cy="12" r="1.5" />
      <rect x="10" y="10.5" width="6" height="1.5" />
      <circle cx="6" cy="18" r="1.5" />
      <rect x="10" y="17" width="4" height="1.5" />
    </g>
  </svg>
);

// Heritage symbol combining African patterns - EXPORTED
export const HeritageSymbol = ({ className }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full">
      {/* Outer circle with African-inspired pattern */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 2"
        className="opacity-30"
      />

      {/* Inner African continent */}
      <g transform="translate(8, 6) scale(0.6)">
        <AfricaPath />
      </g>

      {/* Decorative dots representing historical sites */}
      <circle cx="20" cy="12" r="1" className="fill-amber-500" />
      <circle cx="26" cy="18" r="1" className="fill-orange-500" />
      <circle cx="20" cy="28" r="1" className="fill-red-500" />
      <circle cx="14" cy="22" r="1" className="fill-yellow-500" />
    </svg>
  </div>
);

export default function Logo({
  variant = "full",
  size = "md",
  className = "",
  showTagline = true,
  linkTo = "/",
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "h-8",
      icon: "w-8 h-8",
      text: "text-lg",
      tagline: "text-xs",
    },
    md: {
      container: "h-10",
      icon: "w-10 h-10",
      text: "text-xl",
      tagline: "text-sm",
    },
    lg: {
      container: "h-12",
      icon: "w-12 h-12",
      text: "text-2xl",
      tagline: "text-base",
    },
    xl: {
      container: "h-16",
      icon: "w-16 h-16",
      text: "text-3xl",
      tagline: "text-lg",
    },
  };

  const sizes = sizeClasses[size];

  // Icon-only variant
  if (variant === "icon") {
    const IconContent = (
      <div className={`${sizes.icon} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-xl shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
            <AfricaPath />
          </div>
        </div>
        {/* Decorative corner elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 text-amber-400">
          <Decorative />
        </div>
      </div>
    );

    return linkTo ? (
      <Link to={linkTo} className={`inline-block ${className}`}>
        {IconContent}
      </Link>
    ) : (
      IconContent
    );
  }

  // Text-only variant
  if (variant === "text") {
    const TextContent = (
      <div className={`flex flex-col ${className}`}>
        <div
          className={`${sizes.text} font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight`}
        >
          AfricanHistory
        </div>
        {showTagline && (
          <div className={`${sizes.tagline} text-gray-600 -mt-1 tracking-wide`}>
            Explore Our Heritage
          </div>
        )}
      </div>
    );

    return linkTo ? (
      <Link to={linkTo} className="inline-block">
        {TextContent}
      </Link>
    ) : (
      TextContent
    );
  }

  // Compact variant (icon + text, horizontal)
  if (variant === "compact") {
    const CompactContent = (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className={`${sizes.icon} relative flex-shrink-0`}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-xl shadow-lg">
            <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
              <AfricaPath />
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <div
            className={`${sizes.text} font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight`}
          >
            AfricanHistory
          </div>
          {showTagline && (
            <div
              className={`${sizes.tagline} text-gray-600 -mt-1 tracking-wide`}
            >
              Explore Our Heritage
            </div>
          )}
        </div>
      </div>
    );

    return linkTo ? (
      <Link to={linkTo} className="inline-block">
        {CompactContent}
      </Link>
    ) : (
      CompactContent
    );
  }

  // Full variant (elaborate design with heritage symbols)
  const FullContent = (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Main logo icon */}
      <div className={`${sizes.icon} relative flex-shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-xl shadow-xl">
          <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
            <AfricaPath />
          </div>
        </div>

        {/* Heritage pattern overlay */}
        <div className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 opacity-60">
          <HeritageSymbol />
        </div>

        {/* Educational symbol */}
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm">
          <BookOpen className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center space-x-2">
          <div
            className={`${sizes.text} font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight`}
          >
            AfricanHistory
          </div>

          {/* Cultural accent */}
          <div className="flex space-x-1 opacity-60">
            <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
            <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {showTagline && (
          <div
            className={`${sizes.tagline} text-gray-600 -mt-1 tracking-wide flex items-center space-x-2`}
          >
            <span>Explore Our Heritage</span>
            <div className="flex space-x-0.5 opacity-40">
              <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} className="inline-block">
      {FullContent}
    </Link>
  ) : (
    FullContent
  );
}

// Logo variants for specific use cases
export function LogoHero() {
  return (
    <div className="text-center">
      <Logo
        variant="full"
        size="xl"
        showTagline={true}
        className="justify-center mb-6"
      />
      <div className="flex justify-center space-x-8 opacity-60">
        <HeritageSymbol className="w-12 h-12 text-amber-500" />
        <HeritageSymbol className="w-12 h-12 text-orange-500" />
        <HeritageSymbol className="w-12 h-12 text-red-500" />
      </div>
    </div>
  );
}

export function LogoFooter() {
  return <Logo variant="compact" size="md" showTagline={true} linkTo="/" />;
}

// Updated LogoHeader to match LogoFooter - now shows tagline
export function LogoHeader() {
  return <Logo variant="compact" size="md" showTagline={true} linkTo="/" />;
}

export function LogoMobile() {
  return <Logo variant="icon" size="sm" linkTo="/" />;
}

// Loading logo with animation
export function LogoLoading() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <Logo variant="icon" size="lg" />
        <div className="absolute inset-0 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
