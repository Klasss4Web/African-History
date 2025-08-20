import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { type LatLngExpression } from "leaflet";
import type { Site } from "@/types/shared";

// Fix for default marker icon in react-leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

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

function SetViewOnClick({
  animateRef,
}: {
  animateRef: React.MutableRefObject<boolean>;
}) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

export function LeafletMap({
  sites,
  selectedSite,
  onSiteSelect,
  showTradeRoutes,
  mapData,
}: LeafletMapProps) {
  // Center of Africa, a good default
  const africaCenter: LatLngExpression | undefined = [0.2, 18.0];
  const zoomLevel = 3;
  const animateRef = useRef<boolean>(false);

  const getMarkerIcon = (site: Site) => {
    let colorClass;
    if (site?.type === "Archaeological Site") colorClass = "bg-red-500";
    else if (site?.type === "Historic City") colorClass = "bg-blue-500";
    else if (site?.type === "Religious Site") colorClass = "bg-blue-500";
    else if (site?.type === "Trading City") colorClass = "bg-purple-500";
    else colorClass = "bg-yellow-500";

    const isSelected = selectedSite?.id === site?.id;
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
      center={africaCenter as LatLngExpression | undefined}
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
      <SetViewOnClick animateRef={animateRef} />
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
        mapData?.tradeRoutes &&
        mapData?.tradeRoutes?.map((route: TradeRoute) => (
          <React.Fragment key={route.id}>
            <Polyline
              positions={route.path.map((p) => [p.lat, p.lng])}
              // color="#EAB308"
              weight={3}
              dashArray="5, 10"
              lineJoin="round"
              lineCap="round"
              pathOptions={{
                color: "#000",
                weight: 3,
                dashOffset: "0",
              }}
              className="animated-polyline"
            />

            {/* Start Marker */}
            <Marker position={[route.path[0].lat, route.path[0].lng]}>
              <Popup>{route?.name}</Popup>
            </Marker>

            {/* End Marker */}
            <Marker
              position={[
                route.path[route.path.length - 1].lat,
                route.path[route.path.length - 1].lng,
              ]}
            >
              <Popup>{route?.name}</Popup>
            </Marker>
          </React.Fragment>
        ))}
    </MapContainer>
  );
}
