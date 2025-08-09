// import { useState, useEffect } from "react";
// import {
//   MapPin,
//   Info,
//   Clock,
//   Camera,
//   Navigation,
//   Filter,
//   Search,
//   Globe,
//   Star,
//   Eye,
//   Plus,
//   Minus,
//   Layers,
// } from "lucide-react";
// import { Card, CardContent } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
// import { useNavigation } from "./Navigation";
// import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
// import { LeafletMap } from "./LeafletMap";

// // Map data for African historical sites
// const mapData = {
//   sites: [
//     {
//       id: 1,
//       name: "Pyramids of Giza",
//       location: {
//         lat: 29.9792,
//         lng: 31.1342,
//         country: "Egypt",
//         region: "North Africa",
//       },
//       period: "Old Kingdom (2580-2510 BCE)",
//       type: "Archaeological Site",
//       significance: "Last surviving Wonder of the Ancient World",
//       description:
//         "The Giza pyramid complex consists of the Great Pyramid of Giza, the Pyramid of Khafre, and the Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx of Giza.",
//       image:
//         "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
//       features: [
//         "Great Pyramid",
//         "Sphinx",
//         "Pyramid of Khafre",
//         "Pyramid of Menkaure",
//       ],
//       visitInfo: {
//         accessibility: "High",
//         bestTime: "October to April",
//         duration: "Half day",
//         entrance: "Ticketed",
//       },
//       relatedStories: [1, 2],
//       virtualTour: true,
//     },
//     {
//       id: 2,
//       name: "Great Zimbabwe",
//       location: {
//         lat: -20.2666,
//         lng: 30.9333,
//         country: "Zimbabwe",
//         region: "Southern Africa",
//       },
//       period: "Medieval (1100-1450 CE)",
//       type: "Archaeological Site",
//       significance: "Largest ancient structure south of Sahara Desert",
//       description:
//         "Great Zimbabwe is a ruined city in the southeastern hills of Zimbabwe near Lake Mutirikwi and the town of Masvingo. It was the capital of the Kingdom of Zimbabwe during the country's Late Iron Age.",
//       image:
//         "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
//       features: [
//         "Great Enclosure",
//         "Hill Complex",
//         "Valley Ruins",
//         "Stone Walls",
//       ],
//       visitInfo: {
//         accessibility: "Medium",
//         bestTime: "April to October",
//         duration: "Full day",
//         entrance: "Ticketed",
//       },
//       relatedStories: [3, 4],
//       virtualTour: true,
//     },
//     {
//       id: 3,
//       name: "Timbuktu",
//       location: {
//         lat: 16.7666,
//         lng: -3.0026,
//         country: "Mali",
//         region: "West Africa",
//       },
//       period: "Medieval (1100-1600 CE)",
//       type: "Historic City",
//       significance: "Center of Islamic learning and trade",
//       description:
//         "Timbuktu was a major trading post and center of Islamic culture and learning during the Mali Empire. The city was home to the prestigious Sankore University and numerous Islamic schools.",
//       image:
//         "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
//       features: [
//         "Sankore Mosque",
//         "Djinguereber Mosque",
//         "Ancient Libraries",
//         "Manuscript Collections",
//       ],
//       visitInfo: {
//         accessibility: "Low",
//         bestTime: "November to February",
//         duration: "2-3 days",
//         entrance: "Guided tours required",
//       },
//       relatedStories: [1, 5],
//       virtualTour: true,
//     },
//     {
//       id: 4,
//       name: "Rock Churches of Lalibela",
//       location: {
//         lat: 12.0336,
//         lng: 39.0479,
//         country: "Ethiopia",
//         region: "East Africa",
//       },
//       period: "Medieval (12th-13th century CE)",
//       type: "Religious Site",
//       significance: "Remarkable rock-hewn churches",
//       description:
//         "Lalibela is a town in northern Ethiopia famous for its rock-cut monolithic churches. These churches were carved directly into the rock and are still active places of worship today.",
//       image:
//         "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
//       features: [
//         "Church of St. George",
//         "Church of St. Mary",
//         "Underground tunnels",
//         "Ceremonial pools",
//       ],
//       visitInfo: {
//         accessibility: "Medium",
//         bestTime: "October to March",
//         duration: "2-3 days",
//         entrance: "Ticketed",
//       },
//       relatedStories: [6, 7],
//       virtualTour: true,
//     },
//     {
//       id: 5,
//       name: "Carthage",
//       location: {
//         lat: 36.8531,
//         lng: 10.3247,
//         country: "Tunisia",
//         region: "North Africa",
//       },
//       period: "Ancient (814-146 BCE)",
//       type: "Archaeological Site",
//       significance: "Capital of the Carthaginian Empire",
//       description:
//         "Carthage was the center of the Carthaginian Empire, a major power that rivaled Rome in the ancient Mediterranean. The site contains extensive ruins from both Punic and Roman periods.",
//       image:
//         "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
//       features: [
//         "Punic Ports",
//         "Roman Thermae",
//         "Punic Tophet",
//         "Archaeological Museum",
//       ],
//       visitInfo: {
//         accessibility: "High",
//         bestTime: "March to May, October to November",
//         duration: "Half day",
//         entrance: "Ticketed",
//       },
//       relatedStories: [8, 9],
//       virtualTour: false,
//     },
//     {
//       id: 6,
//       name: "Aksum",
//       location: {
//         lat: 14.1306,
//         lng: 38.7167,
//         country: "Ethiopia",
//         region: "East Africa",
//       },
//       period: "Ancient (100-960 CE)",
//       type: "Archaeological Site",
//       significance: "Capital of the ancient Aksumite Empire",
//       description:
//         "Aksum was the original capital of the kingdom of Aksum. The town has a population of 66,900 residents (as of 2015). Aksum is in the Tigray Region of northern Ethiopia.",
//       image:
//         "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
//       features: [
//         "Aksum Obelisks",
//         "Church of Our Lady Mary of Zion",
//         "Queen of Sheba's Palace",
//         "Tombs of Kaleb and Gebre Meskel",
//       ],
//       visitInfo: {
//         accessibility: "Medium",
//         bestTime: "October to March",
//         duration: "Full day",
//         entrance: "Ticketed",
//       },
//       relatedStories: [10, 11],
//       virtualTour: true,
//     },
//   ],
//   tradeRoutes: [
//     {
//       id: 1,
//       name: "Trans-Saharan Gold Route",
//       description:
//         "Ancient trade route connecting West African gold fields to Mediterranean markets",
//       path: [
//         { name: "Bambuk Goldfields", lat: 13.5, lng: -11.5 },
//         { name: "Walata", lat: 17.25, lng: -7.03 },
//         { name: "Timbuktu", lat: 16.77, lng: -3.0 },
//         { name: "Gao", lat: 16.27, lng: -0.04 },
//         { name: "Taghaza", lat: 23.15, lng: -5.25 },
//         { name: "Sijilmasa", lat: 31.28, lng: -4.27 },
//         { name: "Fez", lat: 34.04, lng: -5.0 },
//       ],
//       period: "8th-16th centuries CE",
//       commodities: ["Gold", "Salt", "Ivory", "Slaves", "Copper"],
//     },
//     {
//       id: 2,
//       name: "East African Coast Route",
//       description:
//         "Maritime trade network connecting East Africa to India and the Middle East",
//       path: [
//         { name: "Mogadishu", lat: 2.04, lng: 45.34 },
//         { name: "Kilwa", lat: -8.95, lng: 39.51 },
//         { name: "Zanzibar", lat: -6.16, lng: 39.2 },
//         { name: "Mombasa", lat: -4.04, lng: 39.67 },
//         { name: "Malindi", lat: -3.22, lng: 40.12 },
//       ],
//       period: "8th-15th centuries CE",
//       commodities: [
//         "Gold",
//         "Ivory",
//         "Rhinoceros horn",
//         "Tortoiseshell",
//         "Mangrove poles",
//       ],
//     },
//   ],
// };

// // Simple Map Component (Leaflet alternative implementation)
// function SimpleMap({
//   sites,
//   selectedSite,
//   onSiteSelect,
//   showTradeRoutes,
//   center,
//   zoom,
// }: any) {
//   const [mapCenter, setMapCenter] = useState(center);
//   const [mapZoom, setMapZoom] = useState(zoom);

//   useEffect(() => {
//     if (selectedSite) {
//       setMapCenter([selectedSite.location.lat, selectedSite.location.lng]);
//       setMapZoom(8);
//     }
//   }, [selectedSite]);

//   // Calculate position percentages for Africa bounds
//   const getPositionOnMap = (lat: number, lng: number) => {
//     // Africa rough bounds: North: 37°, South: -35°, West: -25°, East: 52°
//     const northBound = 37;
//     const southBound = -35;
//     const westBound = -25;
//     const eastBound = 52;

//     const x = ((lng - westBound) / (eastBound - westBound)) * 100;
//     const y = ((northBound - lat) / (northBound - southBound)) * 100;

//     return {
//       x: Math.max(0, Math.min(100, x)),
//       y: Math.max(0, Math.min(100, y)),
//     };
//   };

//   return (
//     <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden rounded-lg">
//       {/* Map Background with Africa shape */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {/* <svg
//           viewBox="0 0 100 120"
//           className="w-full h-full opacity-20"
//           style={{ maxWidth: "400px", maxHeight: "480px" }}
//         >
//           <path
//             d="M50 5 C52 5, 55 6, 58 8 C62 10, 65 12, 67 15 C70 18, 72 22, 73 26 C74 30, 73 34, 72 38 C71 42, 69 45, 67 48 C66 50, 65 52, 66 54 C67 56, 69 58, 71 60 C73 62, 75 64, 76 67 C77 70, 76 73, 75 76 C74 79, 72 82, 70 85 C68 88, 65 90, 62 92 C59 94, 55 95, 52 96 C49 97, 46 96, 43 95 C40 94, 37 92, 35 90 C33 88, 32 85, 31 82 C30 79, 30 76, 31 73 C32 70, 34 67, 35 64 C36 61, 36 58, 35 55 C34 52, 32 49, 30 46 C28 43, 26 40, 25 37 C24 34, 24 31, 25 28 C26 25, 28 22, 30 19 C32 16, 35 13, 38 11 C41 9, 44 7, 47 6 C48 5.5, 49 5, 50 5 Z"
//             fill="currentColor"
//             className="text-green-300"
//           />
//           <ellipse
//             cx="78"
//             cy="85"
//             rx="3"
//             ry="8"
//             fill="currentColor"
//             className="text-green-300"
//           />
//         </svg> */}
//       </div>

//       {/* Site Markers */}
//       {sites.map((site: any) => {
//         const position = getPositionOnMap(site.location.lat, site.location.lng);
//         const isSelected = selectedSite?.id === site.id;

//         return (
//           <button
//             key={site.id}
//             className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-125 ${
//               isSelected ? "scale-150 z-20" : "z-10"
//             } ${
//               site.type === "Archaeological Site"
//                 ? "bg-red-500"
//                 : site.type === "Historic City"
//                 ? "bg-blue-500"
//                 : site.type === "Religious Site"
//                 ? "bg-purple-500"
//                 : "bg-yellow-500"
//             }`}
//             style={{
//               left: `${position.x}%`,
//               top: `${position.y}%`,
//             }}
//             onClick={() => onSiteSelect(site)}
//             title={site.name}
//           >
//             {isSelected && (
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-32 text-xs text-gray-900 whitespace-nowrap z-30">
//                 {site.name}
//               </div>
//             )}
//           </button>
//         );
//       })}

//       {/* Trade Routes */}
//       {showTradeRoutes && (
//         <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
//           {mapData.tradeRoutes.map((route) => {
//             const pathPoints = route.path.map((point) =>
//               getPositionOnMap(point.lat, point.lng)
//             );
//             const pathString = pathPoints
//               .map(
//                 (point, index) =>
//                   `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
//               )
//               .join(" ");

//             return (
//               <path
//                 key={route.id}
//                 d={pathString}
//                 stroke="rgba(234, 179, 8, 0.7)"
//                 strokeWidth="2"
//                 strokeDasharray="5,5"
//                 fill="none"
//                 className="animate-pulse"
//               />
//             );
//           })}
//         </svg>
//       )}

//       {/* Zoom Controls */}
//       <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20">
//         <Button
//           size="sm"
//           variant="secondary"
//           className="w-8 h-8 p-0"
//           onClick={() => setMapZoom(Math.min(mapZoom + 1, 10))}
//         >
//           <Plus className="w-4 h-4" />
//         </Button>
//         <Button
//           size="sm"
//           variant="secondary"
//           className="w-8 h-8 p-0"
//           onClick={() => setMapZoom(Math.max(mapZoom - 1, 1))}
//         >
//           <Minus className="w-4 h-4" />
//         </Button>
//       </div>

//       {/* Map Legend */}
//       <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 z-20">
//         <h4 className="text-sm text-gray-900 mb-2">Legend</h4>
//         <div className="grid grid-cols-2 gap-2 text-xs">
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//             Archaeological
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//             Historic Cities
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
//             Religious Sites
//           </div>
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//             Trade Routes
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const getPositionOnMap = (lat: number, lng: number) => {
//   // Africa rough bounds: North: 37°, South: -35°, West: -25°, East: 52°
//   const northBound = 37;
//   const southBound = -35;
//   const westBound = -25;
//   const eastBound = 52;

//   const x = ((lng - westBound) / (eastBound - westBound)) * 100;
//   const y = ((northBound - lat) / (northBound - southBound)) * 100;

//   return {
//     x: Math.max(0, Math.min(100, x)),
//     y: Math.max(0, Math.min(100, y)),
//   };
// };

// export default function InteractiveMap() {
//   const { navigateTo } = useNavigation();
//   const [selectedSite, setSelectedSite] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRegion, setSelectedRegion] = useState("all");
//   const [selectedType, setSelectedType] = useState("all");
//   const [showTradeRoutes, setShowTradeRoutes] = useState(false);

//   const filteredSites = mapData.sites.filter((site) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       site.location.country.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRegion =
//       selectedRegion === "all" || site.location.region === selectedRegion;
//     const matchesType = selectedType === "all" || site.type === selectedType;

//     return matchesSearch && matchesRegion && matchesType;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-green-50 to-blue-100 py-12">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <Badge
//               variant="secondary"
//               className="mb-4 bg-green-100 text-green-800"
//             >
//               <Globe className="w-4 h-4 mr-2" />
//               Interactive Map
//             </Badge>
//             <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
//               Explore African Historical Sites
//             </h1>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//               Discover the locations of Africa's most significant historical
//               sites, ancient trade routes, and archaeological treasures through
//               our interactive mapping platform.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Controls */}
//       <section className="py-6 bg-white border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Filter className="w-5 h-5 text-gray-600" />
//               <h3 className="text-lg text-gray-900">Explore Map</h3>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search sites or countries..."
//                   className="pl-10 w-full sm:w-64"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <Select value={selectedRegion} onValueChange={setSelectedRegion}>
//                 <SelectTrigger className="w-full sm:w-40">
//                   <SelectValue placeholder="Region" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Regions</SelectItem>
//                   <SelectItem value="North Africa">North Africa</SelectItem>
//                   <SelectItem value="West Africa">West Africa</SelectItem>
//                   <SelectItem value="East Africa">East Africa</SelectItem>
//                   <SelectItem value="Central Africa">Central Africa</SelectItem>
//                   <SelectItem value="Southern Africa">
//                     Southern Africa
//                   </SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select value={selectedType} onValueChange={setSelectedType}>
//                 <SelectTrigger className="w-full sm:w-40">
//                   <SelectValue placeholder="Site Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Types</SelectItem>
//                   <SelectItem value="Archaeological Site">
//                     Archaeological
//                   </SelectItem>
//                   <SelectItem value="Historic City">Historic City</SelectItem>
//                   <SelectItem value="Religious Site">Religious</SelectItem>
//                   <SelectItem value="Natural Site">Natural</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Button
//                 variant={showTradeRoutes ? "default" : "outline"}
//                 onClick={() => setShowTradeRoutes(!showTradeRoutes)}
//               >
//                 <Navigation className="w-4 h-4 mr-2" />
//                 Trade Routes
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Map Area */}
//           <div className="lg:col-span-2">
//             <Card className="h-[600px] overflow-hidden">
//               <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden rounded-lg">
//                 <div className="absolute inset-0 flex items-center justify-center z-1">
//                   <LeafletMap
//                     sites={filteredSites}
//                     selectedSite={selectedSite}
//                     onSiteSelect={setSelectedSite}
//                     showTradeRoutes={showTradeRoutes}
//                     mapData={mapData}
//                   />
//                 </div>

//                 {/* Trade Routes */}
//                 {showTradeRoutes && (
//                   <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
//                     {mapData.tradeRoutes.map((route) => {
//                       const pathPoints = route.path.map((point) =>
//                         getPositionOnMap(point.lat, point.lng)
//                       );
//                       const pathString = pathPoints
//                         .map(
//                           (point, index) =>
//                             `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
//                         )
//                         .join(" ");

//                       return (
//                         <path
//                           key={route.id}
//                           d={pathString}
//                           stroke="rgba(234, 179, 8, 0.7)"
//                           strokeWidth="2"
//                           strokeDasharray="5,5"
//                           fill="none"
//                           className="animate-pulse"
//                         />
//                       );
//                     })}
//                   </svg>
//                 )}

//                 {/* Map Legend */}
//                 <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 z-20">
//                   <h4 className="text-sm text-gray-900 mb-2">Legend</h4>
//                   <div className="grid grid-cols-2 gap-2 text-xs">
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
//                       Archaeological
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                       Historic Cities
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
//                       Religious Sites
//                     </div>
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//                       Trade Routes
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* Site Information Panel */}
//           <div className="space-y-6">
//             {selectedSite ? (
//               <Card>
//                 <CardContent className="p-6">
//                   <div className="space-y-4">
//                     <div className="relative">
//                       <ImageWithFallback
//                         src={selectedSite.image}
//                         alt={selectedSite.name}
//                         className="w-full h-32 object-cover rounded-lg"
//                       />
//                       <div className="absolute top-2 right-2">
//                         {selectedSite.virtualTour && (
//                           <Badge className="bg-purple-600 text-white">
//                             <Camera className="w-3 h-3 mr-1" />
//                             Virtual Tour
//                           </Badge>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-xl text-gray-900 mb-1">
//                         {selectedSite.name}
//                       </h3>
//                       <div className="flex items-center text-sm text-gray-500 mb-2">
//                         <MapPin className="w-3 h-3 mr-1" />
//                         {selectedSite.location.country},{" "}
//                         {selectedSite.location.region}
//                       </div>
//                       <Badge variant="outline">{selectedSite.type}</Badge>
//                     </div>

//                     <p className="text-gray-600 text-sm">
//                       {selectedSite.description}
//                     </p>

//                     <div>
//                       <h4 className="text-sm text-gray-900 mb-2">
//                         Key Features:
//                       </h4>
//                       <div className="flex flex-wrap gap-1">
//                         {selectedSite.features.map(
//                           (feature: string, index: number) => (
//                             <Badge
//                               key={index}
//                               variant="outline"
//                               className="text-xs"
//                             >
//                               {feature}
//                             </Badge>
//                           )
//                         )}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 text-xs">
//                       <div>
//                         <span className="text-gray-500">Best time:</span>
//                         <div className="text-gray-900">
//                           {selectedSite.visitInfo.bestTime}
//                         </div>
//                       </div>
//                       <div>
//                         <span className="text-gray-500">Duration:</span>
//                         <div className="text-gray-900">
//                           {selectedSite.visitInfo.duration}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex space-x-2">
//                       <Button size="sm" className="flex-1">
//                         <Info className="w-3 h-3 mr-1" />
//                         Learn More
//                       </Button>
//                       {selectedSite.virtualTour && (
//                         <Button variant="outline" size="sm">
//                           <Eye className="w-3 h-3 mr-1" />
//                           Virtual Tour
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ) : (
//               <Card>
//                 <CardContent className="p-6 text-center">
//                   <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                   <h3 className="text-lg text-gray-900 mb-2">Select a Site</h3>
//                   <p className="text-gray-600 text-sm">
//                     Click on a location on the map or from the list below to
//                     learn more about African historical sites.
//                   </p>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Quick Stats */}
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="text-lg text-gray-900 mb-4">Map Statistics</h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Historical Sites</span>
//                     <span className="text-gray-900">
//                       {filteredSites.length}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Trade Routes</span>
//                     <span className="text-gray-900">
//                       {mapData.tradeRoutes.length}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Virtual Tours</span>
//                     <span className="text-gray-900">
//                       {mapData.sites.filter((site) => site.virtualTour).length}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Countries</span>
//                     <span className="text-gray-900">
//                       {
//                         new Set(
//                           mapData.sites.map((site) => site.location.country)
//                         ).size
//                       }
//                     </span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Sites Grid */}
//         <div className="mt-12">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl text-gray-900">
//               Historical Sites ({filteredSites.length})
//             </h2>
//             <div className="text-sm text-gray-500">
//               {selectedRegion !== "all" && `${selectedRegion} • `}
//               {selectedType !== "all" && `${selectedType} • `}
//               Click to explore on map
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredSites.map((site) => (
//               <Card
//                 key={site.id}
//                 className={`hover:shadow-lg transition-shadow cursor-pointer ${
//                   selectedSite?.id === site.id ? "ring-2 ring-blue-500" : ""
//                 }`}
//                 onClick={() => setSelectedSite(site)}
//               >
//                 <div className="relative">
//                   <ImageWithFallback
//                     src={site.image}
//                     alt={site.name}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
//                   <div className="absolute top-3 right-3">
//                     {site.virtualTour && (
//                       <Badge className="bg-purple-600 text-white">
//                         <Camera className="w-3 h-3 mr-1" />
//                         VR
//                       </Badge>
//                     )}
//                   </div>
//                   <div className="absolute bottom-3 left-3">
//                     <Badge variant="secondary" className="bg-white/90">
//                       {site.type}
//                     </Badge>
//                   </div>
//                 </div>

//                 <CardContent className="p-4 space-y-3">
//                   <div>
//                     <h3 className="text-lg text-gray-900 hover:text-blue-600 transition-colors">
//                       {site.name}
//                     </h3>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <MapPin className="w-3 h-3 mr-1" />
//                       {site.location.country}
//                     </div>
//                   </div>

//                   <p className="text-gray-600 text-sm line-clamp-2">
//                     {site.description}
//                   </p>

//                   <div className="flex items-center justify-between pt-2">
//                     <div className="text-xs text-gray-500">{site.period}</div>
//                     <div className="flex space-x-1">
//                       <Button variant="ghost" size="sm" className="h-8 px-2">
//                         <Info className="w-3 h-3" />
//                       </Button>
//                       {site.virtualTour && (
//                         <Button variant="ghost" size="sm" className="h-8 px-2">
//                           <Eye className="w-3 h-3" />
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Trade Routes Section */}
//         {showTradeRoutes && (
//           <div className="mt-12">
//             <h2 className="text-2xl text-gray-900 mb-6">
//               Historic Trade Routes
//             </h2>
//             <div className="grid lg:grid-cols-2 gap-6">
//               {mapData?.tradeRoutes?.map((route) => (
//                 <Card key={route.id}>
//                   <CardContent className="p-6">
//                     <div className="space-y-4">
//                       <div>
//                         <h3 className="text-lg text-gray-900 mb-2">
//                           {route.name}
//                         </h3>
//                         <Badge variant="outline">{route.period}</Badge>
//                       </div>

//                       <p className="text-gray-600 text-sm">
//                         {route.description}
//                       </p>

//                       <div>
//                         <h4 className="text-sm text-gray-900 mb-2">
//                           Key Commodities:
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {route.commodities.map((commodity, index) => (
//                             <Badge
//                               key={index}
//                               className="bg-yellow-100 text-yellow-700 text-xs"
//                             >
//                               {commodity}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>

//                       <div>
//                         <h4 className="text-sm text-gray-900 mb-2">
//                           Route Stops:
//                         </h4>
//                         <div className="text-xs text-gray-600">
//                           {route.path.map((stop, index) => (
//                             <span key={index}>
//                               {stop.name}
//                               {index < route.path.length - 1 && " → "}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <Button variant="outline" size="sm" className="w-full">
//                         <Navigation className="w-3 h-3 mr-2" />
//                         Explore Route
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Filter,
  Eye,
  Navigation2,
  Compass,
  Star,
  Calendar,
  Users,
  ArrowRight,
  Info,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import AnimatedCounter from "./AnimatedCounter";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import { LeafletMap } from "./LeafletMap";

// Historical sites data with coordinates
const historicalSites = {
  sites: [
    {
      id: 1,
      name: "Pyramids of Giza",
      location: "Egypt",
      coordinates: { lat: 29.9773, lng: 31.1325 },
      period: "Ancient (2580-2510 BCE)",
      type: "Funerary Complex",
      significance: "Last surviving Wonder of the Ancient World",
      description:
        "The Giza pyramid complex consists of the Great Pyramid, Pyramid of Khafre, and Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx of Giza.",
      image:
        "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Ancient Architecture",
      rating: 4.9,
      visitors: "14M annually",
      region: "North Africa",
    },
    {
      id: 2,
      name: "Great Zimbabwe",
      location: "Zimbabwe",
      coordinates: { lat: -20.2666, lng: 30.9333 },
      period: "Medieval (1100-1450 CE)",
      type: "Stone City",
      significance: "Largest ancient structure south of the Sahara",
      description:
        "Medieval city built of stone without mortar, capital of the Kingdom of Zimbabwe.",
      image:
        "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Medieval Architecture",
      rating: 4.7,
      visitors: "500K annually",
      region: "Southern Africa",
    },
    {
      id: 3,
      name: "Lalibela Rock Churches",
      location: "Ethiopia",
      coordinates: { lat: 12.0336, lng: 39.0479 },
      period: "Medieval (12th-13th century)",
      type: "Religious Complex",
      significance: "Monolithic rock-cut churches",
      description:
        "Eleven medieval monolithic cave churches carved directly into volcanic rock.",
      image:
        "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Religious Architecture",
      rating: 4.8,
      visitors: "200K annually",
      region: "East Africa",
    },
    {
      id: 4,
      name: "Timbuktu",
      location: "Mali",
      coordinates: { lat: 16.7666, lng: -3.0026 },
      period: "Medieval (1100-1600 CE)",
      type: "Trading City",
      significance: "Center of Islamic learning and trade",
      description:
        "Historic city on the Niger River, famous for its university and manuscripts.",
      image:
        "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Trading Centers",
      rating: 4.6,
      visitors: "150K annually",
      region: "West Africa",
    },
    {
      id: 5,
      name: "Valley of the Kings",
      location: "Egypt",
      coordinates: { lat: 525, lng: 190 },
      period: "Ancient (1550-1077 BCE)",
      type: "Royal Necropolis",
      significance: "Burial place of Egyptian pharaohs",
      description:
        "Valley containing tombs of pharaohs and nobles from the New Kingdom period.",
      image:
        "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Ancient Architecture",
      rating: 4.8,
      visitors: "8M annually",
      region: "North Africa",
    },
    {
      id: 6,
      name: "Meroe Pyramids",
      location: "Sudan",
      coordinates: { lat: 570, lng: 250 },
      period: "Ancient (300 BCE - 350 CE)",
      type: "Royal Cemetery",
      significance: "Pyramids of the Kingdom of Kush",
      description:
        "Royal cemetery of the Kushite rulers with over 200 pyramids.",
      image:
        "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Ancient Architecture",
      rating: 4.5,
      visitors: "50K annually",
      region: "North Africa",
    },
    {
      id: 7,
      name: "Stone Town",
      location: "Tanzania",
      coordinates: { lat: 6.1622, lng: 39.1921 },
      period: "Medieval-Modern (10th-19th century)",
      type: "Historic City",
      significance: "Swahili trading center",
      description:
        "Historic center of Zanzibar City, showcasing Swahili coastal trading culture.",
      image:
        "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Trading Centers",
      rating: 4.6,
      visitors: "400K annually",
      region: "East Africa",
    },
    {
      id: 8,
      name: "Djenné",
      location: "Mali",
      coordinates: { lat: 13.9054, lng: 4.556 },
      period: "Medieval (9th-16th century)",
      type: "Trading City",
      significance: "Oldest known city in sub-Saharan Africa",
      description:
        "Ancient trading city famous for its Great Mosque and archaeological significance.",
      image:
        "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Trading Centers",
      rating: 4.4,
      visitors: "80K annually",
      region: "West Africa",
    },
    {
      id: 9,
      name: "Aksum",
      location: "Ethiopia",
      coordinates: {
        lat: 14.1239,
        lng: 38.7167,
      },
      period: "Ancient (100-960 CE)",
      type: "Trading City",
      category: "Trading Centers",
      significance: "Capital of the ancient Aksumite Empire",
      description:
        "Aksum was the original capital of the kingdom of Aksum. The town has a population of 66,900 residents (as of 2015). Aksum is in the Tigray Region of northern Ethiopia.",
      image:
        "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "Aksum Obelisks",
        "Church of Our Lady Mary of Zion",
        "Queen of Sheba's Palace",
        "Tombs of Kaleb and Gebre Meskel",
      ],
      visitInfo: {
        accessibility: "Medium",
        bestTime: "October to March",
        duration: "Full day",
        entrance: "Ticketed",
      },
      relatedStories: [10, 11],
      virtualTour: true,
      rating: 4.4,
      visitors: "80K annually",
      region: "East Africa",
    },
  ],
  tradeRoutes: [
    {
      id: 1,
      name: "Trans-Saharan Gold Route",
      description:
        "Ancient trade route connecting West African gold fields to Mediterranean markets",
      path: [
        { name: "Bambuk Goldfields", lat: 13.5, lng: -11.5 },
        { name: "Walata", lat: 17.25, lng: -7.03 },
        { name: "Timbuktu", lat: 16.77, lng: -3.0 },
        { name: "Gao", lat: 16.27, lng: -0.04 },
        { name: "Taghaza", lat: 23.15, lng: -5.25 },
        { name: "Sijilmasa", lat: 31.28, lng: -4.27 },
        { name: "Fez", lat: 34.04, lng: -5.0 },
      ],
      period: "8th-16th centuries CE",
      commodities: ["Gold", "Salt", "Ivory", "Slaves", "Copper"],
    },
    {
      id: 2,
      name: "East African Coast Route",
      description:
        "Maritime trade network connecting East Africa to India and the Middle East",
      path: [
        { name: "Mogadishu", lat: 2.04, lng: 45.34 },
        { name: "Kilwa", lat: -8.95, lng: 39.51 },
        { name: "Zanzibar", lat: -6.16, lng: 39.2 },
        { name: "Mombasa", lat: -4.04, lng: 39.67 },
        { name: "Malindi", lat: -3.22, lng: 40.12 },
      ],
      period: "8th-15th centuries CE",
      commodities: [
        "Gold",
        "Ivory",
        "Rhinoceros horn",
        "Tortoiseshell",
        "Mangrove poles",
      ],
    },
  ],
};

// Trade routes data
// const tradeRoutes = [
//   {
//     id: 1,
//     name: "Trans-Saharan Trade Route",
//     description: "Connected North and West Africa through the Sahara Desert",
//     period: "800-1600 CE",
//     path: [
//       { lat: 450, lng: 150 },
//       { lat: 420, lng: 200 },
//       { lat: 380, lng: 280 },
//       { lat: 350, lng: 320 },
//     ],
//     color: "#f59e0b",
//     traded: ["Gold", "Salt", "Ivory", "Slaves"],
//   },
//   {
//     id: 2,
//     name: "Indian Ocean Trade",
//     description: "Maritime trade connecting East Africa with Asia",
//     period: "1000-1500 CE",
//     path: [
//       { lat: 630, lng: 300 },
//       { lat: 650, lng: 420 },
//       { lat: 680, lng: 450 },
//       { lat: 750, lng: 400 },
//     ],
//     color: "#3b82f6",
//     traded: ["Spices", "Gold", "Ivory", "Textiles"],
//   },
//   {
//     id: 3,
//     name: "Nile River Trade",
//     description: "Trade route along the Nile River",
//     period: "3000 BCE - 1500 CE",
//     path: [
//       { lat: 520, lng: 180 },
//       { lat: 530, lng: 220 },
//       { lat: 570, lng: 250 },
//       { lat: 600, lng: 280 },
//     ],
//     color: "#10b981",
//     traded: ["Grain", "Papyrus", "Gold", "Incense"],
//   },
// ];

const getPositionOnMap = (lat: number, lng: number) => {
  // Africa rough bounds: North: 37°, South: -35°, West: -25°, East: 52°
  const northBound = 37;
  const southBound = -35;
  const westBound = -25;
  const eastBound = 52;

  const x = ((lng - westBound) / (eastBound - westBound)) * 100;
  const y = ((northBound - lat) / (northBound - southBound)) * 100;

  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
};

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

function TradeRoute({ route, isVisible }: { route: any; isVisible: boolean }) {
  if (!isVisible) return null;
  const pathString = route.path
    .map(
      (point: any, index: number) =>
        `${index === 0 ? "M" : "L"} ${point.lat} ${point.lng}`
    )
    .join(" ");

  return (
    <g>
      <path
        d={pathString}
        stroke={route.color}
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        className="animate-pulse"
      />
      {route.path.map((point: any, index: number) => (
        <circle
          key={index}
          cx={point.lat}
          cy={point.lng}
          r="3"
          fill={route.color}
          className="animate-pulse"
        />
      ))}
    </g>
  );
}

function SiteDetailModal({
  site,
  isOpen,
  onClose,
}: {
  site: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  if (!site) return null;

  const handleVisitSite = () => {
    onClose();
    navigate(`/sites/${site.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <span>{site.name}</span>
          </DialogTitle>
          <DialogDescription>
            Detailed information about {site.name}, a {site.type.toLowerCase()}{" "}
            located in {site.location}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <ImageWithFallback
              src={site.image}
              alt={site.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-amber-600">{site.type}</Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="secondary">{site.region}</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-900 mb-1">Period</h4>
                <p className="text-gray-700">{site.period}</p>
              </div>

              <div>
                <h4 className="text-sm text-gray-900 mb-1">Location</h4>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-1" />
                  {site.location}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-900 mb-1">Significance</h4>
                <p className="text-gray-700">{site.significance}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-900 mb-1">Rating</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="ml-1 text-gray-700">{site.rating}/5</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-900 mb-1">Annual Visitors</h4>
                <div className="flex items-center text-gray-700">
                  <Users className="w-4 h-4 mr-1" />
                  {site.visitors}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-900 mb-1">Category</h4>
                <Badge variant="outline">{site.category}</Badge>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 leading-relaxed">{site.description}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleVisitSite}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Visit Site
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function InteractiveMap() {
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showTradeRoutes, setShowTradeRoutes] = useState(false);
  const [mapScale, setMapScale] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });

  const filteredSites = historicalSites.sites?.filter((site) => {
    const matchesSearch =
      searchQuery === "" ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPeriod =
      selectedPeriod === "all" ||
      site.period.toLowerCase().includes(selectedPeriod.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || site.category === selectedCategory;

    return matchesSearch && matchesPeriod && matchesCategory;
  });

  const handleSiteClick = (site: any) => {
    setSelectedSite(site);
    setShowModal(true);
  };

  const handleZoomIn = () => {
    setMapScale((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setMapScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleResetView = () => {
    setMapScale(1);
    setMapPosition({ x: 0, y: 0 });
  };

  const categories = [
    ...new Set(historicalSites.sites.map((site) => site.category)),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Animated Stats */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 text-blue-800"
            >
              <Navigation2 className="w-4 h-4 mr-2" />
              Interactive Exploration
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              Interactive Map of African History
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore historical sites, trade routes, and civilizations across
              Africa. Click on markers to learn more about each location and its
              significance in African history.
            </p>
          </div>

          {/* Quick Stats with Animation */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: "Historical Sites",
                target: historicalSites.sites.length,
                icon: MapPin,
              },
              { label: "Trade Routes", target: 3, icon: Navigation2 },
              {
                label: "Years Covered",
                target: 3000,
                suffix: "+",
                icon: Calendar,
              },
              { label: "Civilizations", target: 15, suffix: "+", icon: Users },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix || ""}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg text-gray-900">
                Explore Historical Africa
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search sites..."
                  className="pl-10 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="ancient">Ancient</SelectItem>
                  <SelectItem value="medieval">Medieval</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Map */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      African Historical Sites Map
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTradeRoutes(!showTradeRoutes)}
                        className={
                          showTradeRoutes ? "bg-blue-100 text-blue-700" : ""
                        }
                      >
                        <Layers className="w-4 h-4 mr-1" />
                        Trade Routes
                      </Button>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleZoomOut}
                        >
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleZoomIn}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleResetView}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div
                    className="relative w-full h-96 lg:h-[600px] bg-gradient-to-br from-amber-50 to-green-50 overflow-hidden"
                    style={{
                      transform: `scale(${mapScale}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
                      transformOrigin: "center center",
                    }}
                  >
                    {/* Simplified Africa outline */}{" "}
                    <Card className="h-[600px] overflow-hidden">
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden rounded-lg">
                        <div className="absolute inset-0 flex items-center justify-center z-1">
                          <LeafletMap
                            sites={filteredSites}
                            selectedSite={selectedSite}
                            onSiteSelect={handleSiteClick}
                            showTradeRoutes={showTradeRoutes}
                            mapData={historicalSites}
                          />
                        </div>
                        {/* Trade routes */}
                        {historicalSites.tradeRoutes.map((route) => (
                          <TradeRoute
                            key={route.id}
                            route={route}
                            isVisible={showTradeRoutes}
                          />
                        ))}
                        {/* Site markers */}
                        {/* {filteredSites.map((site, index) => (
                          <SiteMarker
                            key={site.id}
                            site={site}
                            onClick={() => handleSiteClick(site)}
                            isSelected={selectedSite?.id === site.id}
                          />
                        ))} */}
                      </div>
                    </Card>
                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20">
                      <h4 className="text-sm text-gray-900 mb-2">Legend</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                          <span>Ancient Architecture</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span>Medieval Architecture</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span>Religious Sites</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span>Trading Centers</span>
                        </div>
                      </div>
                    </div>
                    {/* Scale indicator */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
                      Zoom:{" "}
                      <AnimatedCounter target={Math.round(mapScale * 100)} />%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Selected Site Info */}
              {selectedSite && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Site</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-gray-900 mb-1">
                        {selectedSite.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedSite.location}
                      </p>
                    </div>

                    <div>
                      <Badge variant="outline">{selectedSite.category}</Badge>
                    </div>

                    <p className="text-sm text-gray-700">
                      {selectedSite.description}
                    </p>

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => setShowModal(true)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Sites List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Historical Sites (
                    <AnimatedCounter target={filteredSites.length} />)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredSites.map((site) => (
                      <div
                        key={site.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedSite?.id === site.id
                            ? "bg-amber-50 border border-amber-200"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleSiteClick(site)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm text-gray-900 truncate">
                              {site.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {site.location}
                            </p>
                            <div className="flex items-center mt-1">
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  site.category === "Ancient Architecture"
                                    ? "bg-amber-500"
                                    : site.category === "Medieval Architecture"
                                    ? "bg-green-500"
                                    : site.category === "Religious Architecture"
                                    ? "bg-blue-500"
                                    : "bg-purple-500"
                                }`}
                              ></div>
                              <span className="text-xs text-gray-500">
                                {site.period}
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <SiteDetailModal
        site={selectedSite}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
