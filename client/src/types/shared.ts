export type Coordinates = { lat: number; lng: number };

export type Site = {
  id: number;
  name: string;
  location: string;
  coordinates: Coordinates;
  period: string;
  type:
    | "Archaeological Site"
    | "Historic City"
    | "Religious Site"
    | "Trading City"
    | "Natural Site"
    | "Funerary Complex";
  significance: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  visitors: string;
  region: string;
  era?: string;
  features?: string[];
  visitInfo?: {
    accessibility: string;
    bestTime: string;
    duration: string;
    entrance: string;
  };
  relatedStories?: number[];
  virtualTour?: boolean;
};

export type TradeRoute = {
  id: number;
  name: string;
  description: string;
  path: (Coordinates & { name: string })[];
  period: string;
  commodities: string[];
  cities: string[];
};

export type HistoricalSites = {
  sites: Site[];
  tradeRoutes: TradeRoute[];
};
