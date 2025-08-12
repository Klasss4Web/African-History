// src/components/LeafletMap.jsx

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";

// Fix for default marker icon in react-leaflet
// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const CustomMarkerIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: '<div class="w-6 h-6 rounded-full border-2 border-white shadow-lg bg-red-500 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M12 16.5s-4 4-4 6 4 4 4 4 4-4 4-6-4-6-4-6-4 4-4 6z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -18],
});

interface Site {
  id: number;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
    country: string;
    region: string;
  };
  period: string;
  type:
    | "Archaeological Site"
    | "Historic City"
    | "Religious Site"
    | "Trading City"
    | "Natural Site";
  significance: string;
  description: string;
  image: string;
  features: string[];
  visitInfo: {
    accessibility: string;
    bestTime: string;
    duration: string;
    entrance: string;
  };
  relatedStories: number[];
  virtualTour: boolean;
}

interface TradeRoute {
  id: number;
  name: string;
  description: string;
  path: Array<{ name: string; lat: number; lng: number }>;
  period: string;
  commodities: string[];
}

interface MapData {
  sites: Site[];
  tradeRoutes: TradeRoute[];
}

interface LeafletMapProps {
  sites: Site[];
  selectedSite: Site | null;
  onSiteSelect: (site: Site) => void;
  showTradeRoutes: boolean;
  mapData: MapData;
}

function SiteMarker({
  site,
  onClick,
  isSelected,
}: {
  site: any;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
        isSelected ? "scale-125 z-20" : "z-10"
      }`}
      style={{ left: site?.coordinates?.lat, top: site?.coordinates?.lng }}
      onClick={onClick}
    >
      <div className={`relative ${isSelected ? "animate-pulse" : ""}`}>
        <div
          className={`w-4 h-4 rounded-full ${
            site.category === "Ancient Architecture"
              ? "bg-amber-500"
              : site.category === "Medieval Architecture"
              ? "bg-green-500"
              : site.category === "Religious Architecture"
              ? "bg-blue-500"
              : "bg-purple-500"
          } border-2 border-white shadow-lg`}
        ></div>

        {isSelected && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white px-2 py-1 rounded text-xs">
            {site.name}
          </div>
        )}
      </div>
    </div>
  );
}

export function LeafletMap({
  sites,
  selectedSite,
  onSiteSelect,
  showTradeRoutes,
  mapData,
}: LeafletMapProps) {
  // Center of Africa, a good default
  const africaCenter = [0.2, 18.0];
  const zoomLevel = 3;

  const getMarkerIcon = (site: Site) => {
    let colorClass;
    if (site.type === "Archaeological Site") colorClass = "bg-red-500";
    else if (site.type === "Historic City") colorClass = "bg-blue-500";
    else if (site.type === "Religious Site") colorClass = "bg-blue-500";
    else if (site.type === "Trading City") colorClass = "bg-purple-500";
    else colorClass = "bg-yellow-500";

    const isSelected = selectedSite?.id === site.id;
    const sizeClass = isSelected ? "w-8 h-8" : "w-6 h-6";
    const zIndexClass = isSelected ? "z-[1000]" : "";
    const html = `<div class="${sizeClass} ${colorClass} rounded-full border-2 border-white shadow-lg flex items-center justify-center ${zIndexClass}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M12 16.5s-4 4-4 6 4 4 4 4 4-4 4-6-4-6-4-6-4 4-4 6z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg></div>`;

    return new L.DivIcon({
      className: `custom-div-icon ${isSelected ? "selected" : ""}`,
      html: html,
      iconSize: isSelected ? [32, 32] : [24, 24],
      iconAnchor: isSelected ? [16, 32] : [12, 24],
      popupAnchor: [0, -18],
    });
  };

  return (
    <MapContainer
      center={africaCenter}
      zoom={zoomLevel}
      minZoom={2}
      maxZoom={10}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render site markers */}
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site?.coordinates?.lat, site?.coordinates?.lng]}
          icon={getMarkerIcon(site)}
          eventHandlers={{
            click: () => onSiteSelect(site),
          }}
        >
          <div
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 
             animate-pulse
            `}
            style={{
              left: site?.coordinates?.lat,
              top: site?.coordinates?.lng,
            }}
          >
            <div className="relative">
              <Popup className="w-1000px">
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white px-2 py-3 rounded text-xs animate-pulse rounded-lg px-7 min-w-30 text-center cursor-pointer"
                  onClick={() => onSiteSelect(site)}
                >
                  {site.name}
                </div>
              </Popup>
            </div>
          </div>
        </Marker>
      ))}

      {/* Render trade routes as polylines */}
      {showTradeRoutes &&
        mapData?.tradeRoutes?.map((route: TradeRoute) => (
          <Polyline
            key={route.id}
            positions={route.path.map((p) => [p.lat, p.lng])}
            color="#EAB308" // yellow-500
            weight={2}
            dashArray="5, 10"
            // animate={true}
          />
        ))}
    </MapContainer>
  );
}
