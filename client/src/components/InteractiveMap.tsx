import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
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
  Clock,
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

import { LeafletMap } from "./LeafletMap";
import AnimatedCounter from "./AnimatedCounter";
import type { Site, TradeRoute } from "@/types/shared";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

type HistoricalSites = {
  sites: Site[];
  tradeRoutes: TradeRoute[];
};

// Historical sites data with coordinates
const historicalSites: HistoricalSites = {
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
      era: "2686-2181 BCE",
    },
    {
      id: 2,
      name: "Great Zimbabwe",
      location: "Zimbabwe",
      coordinates: { lat: -20.2666, lng: 30.9333 },
      period: "Medieval (1100-1450 CE)",
      type: "Historic City",
      significance: "Largest ancient structure south of the Sahara",
      description:
        "Medieval city built of stone without mortar, capital of the Kingdom of Zimbabwe.",
      image:
        "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Medieval Architecture",
      rating: 4.7,
      visitors: "500K annually",
      region: "Southern Africa",
      era: "11th-15th Century",
    },
    {
      id: 3,
      name: "Lalibela Rock Churches",
      location: "Ethiopia",
      coordinates: { lat: 12.0336, lng: 39.0479 },
      period: "Medieval (12th-13th century)",
      type: "Religious Site",
      significance: "Monolithic rock-cut churches",
      description:
        "Eleven medieval monolithic cave churches carved directly into volcanic rock.",
      image:
        "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Religious Architecture",
      rating: 4.8,
      visitors: "200K annually",
      region: "East Africa",
      era: "12th-13th Century",
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
      era: "11th-16th Century",
    },
    {
      id: 5,
      name: "Valley of the Kings",
      location: "Egypt",
      coordinates: { lat: 525, lng: 190 },
      period: "Ancient (1550-1077 BCE)",
      type: "Funerary Complex",
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
      type: "Funerary Complex",
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
      era: "10th-19th Century",
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
      era: "100-960 CE",
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
      cities: ["Cairo", "Timbuktu", "Gao", "Walata", "Taghaza"],
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
      cities: ["Kilwa", "Mogadishu", "Malindi", "Stone Town"],
    },
  ],
};

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
  const [regionFilter, setRegionFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [viewMode, setViewMode] = useState("sites");

  useScrollToTop();

  const regions = [
    ...new Set(historicalSites.sites.map((site) => site.region)),
  ];
  const periods = [
    ...new Set(historicalSites.sites.map((site) => site.period)),
  ];

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
      <section className="container mx-auto px-4 py-8">
        <div className="">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search historical sites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Periods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  {periods.map((period) => (
                    <SelectItem key={period} value={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border">
              {[
                { key: "sites", label: "Historical Sites", icon: MapPin },
                { key: "routes", label: "Trade Routes", icon: Compass },
                { key: "timeline", label: "Timeline View", icon: Clock },
              ].map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => setViewMode(mode.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    viewMode === mode.key
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        {/* Sites Grid */}
        {viewMode === "sites" && (
          <div>
            <h2 className="text-2xl text-gray-900 mb-6">
              Historical Sites ({filteredSites.length})
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSites.map((site) => (
                <Card
                  key={site.id}
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    selectedSite?.id === site.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedSite(site)}
                >
                  <div className="aspect-video rounded-t-lg overflow-hidden">
                    <ImageWithFallback
                      src={site.image}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg text-gray-900">{site.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {site.type}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600">
                        {site.significance}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {site.location}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {site.era}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Trade Routes */}
        {viewMode === "routes" && (
          <div>
            <h2 className="text-2xl text-gray-900 mb-6">
              Historical Trade Routes
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {historicalSites.tradeRoutes.map((route) => (
                <Card
                  key={route.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg text-gray-900">{route.name}</h3>
                        <Badge variant="outline">{route.period}</Badge>
                      </div>

                      <p className="text-gray-600">{route.description}</p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm text-gray-900 mb-2">
                            Key Commodities
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {route.commodities.map((commodity, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {commodity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm text-gray-900 mb-2">
                            Major Cities
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {route.cities.map((city, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {city}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Timeline View */}
        {viewMode === "timeline" && (
          <div>
            <h2 className="text-2xl text-gray-900 mb-6">Historical Timeline</h2>

            <div className="space-y-6">
              {filteredSites
                .sort((a, b) => {
                  // Simple chronological sorting by era start year
                  // const aYear = parseInt(a?.era?.match(/\d+/) || [0]);
                  // const bYear = parseInt(b?.era?.match(/\d+/) || [0]);
                  // return aYear - bYear;
                  const aYear = parseInt(a?.era?.match(/\d+/)?.[0] ?? "0", 10);
                  const bYear = parseInt(b?.era?.match(/\d+/)?.[0] ?? "0", 10);
                  return aYear - bYear;
                })
                .map((site) => (
                  <div key={site.id} className="flex gap-6">
                    <div className="flex-shrink-0 w-24 text-right">
                      <Badge variant="outline" className="text-xs">
                        {site.era}
                      </Badge>
                    </div>

                    <div className="flex-shrink-0 w-4 flex justify-center">
                      <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                    </div>

                    <Card
                      className="flex-1 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedSite(site)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            <ImageWithFallback
                              src={site.image}
                              alt={site.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg text-gray-900 mb-1">
                              {site.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {site.significance}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{site.location}</span>
                              <span>{site.region}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      <SiteDetailModal
        site={selectedSite}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
