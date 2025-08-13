export type HotspotType =
  | "chamber"
  | "monument"
  | "pyramid"
  | "structure"
  | "palace";

export interface Hotspot {
  id: number;
  title: string;
  description: string;
  x: number; // percentage or coordinate
  y: number; // percentage or coordinate
  type: HotspotType;
}

export type SceneType = "video" | "image" | "360";

export interface Scene {
  id: number;
  title: string;
  description: string;
  type: SceneType;
  content: string; // URL
}

export interface AudioGuide {
  narrator: string;
  language: string;
  duration: string; // e.g., "15 min"
}

export type TourType = "video" | "image" | "360"; // could extend if you add more

export interface VirtualTour {
  id: number;
  title: string;
  location: string;
  region: string;
  description: string;
  duration: string;
  difficulty: string;
  rating: number;
  participants: string; // e.g., "12.5K"
  type: TourType;
  image: string; // URL
  videoUrl: string; // URL
  hotspots: Hotspot[];
  scenes: Scene[];
  audioGuide: AudioGuide;
}
