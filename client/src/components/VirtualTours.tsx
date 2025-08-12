import { useState } from "react";
import {
  Play,
  Eye,
  Volume2,
  VolumeX,
  RotateCw,
  MapPin,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Info,
  Video,
  Image as ImageIcon,
  Headphones,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import AnimatedCounter from "./AnimatedCounter";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

// Enhanced Virtual Tours Data with real video content
const virtualTours = [
  {
    id: 1,
    title: "Pyramids of Giza",
    location: "Egypt",
    region: "North Africa",
    description:
      "Explore the last surviving Wonder of the Ancient World in stunning detail",
    duration: "25 min",
    difficulty: "Beginner",
    rating: 4.9,
    participants: "12.5K",
    type: "video", // This is our real video tour
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Real sample video
    hotspots: [
      {
        id: 1,
        title: "Great Pyramid Interior",
        description:
          "Journey inside the Great Pyramid to explore the King's Chamber and Grand Gallery",
        x: 45,
        y: 30,
        type: "chamber",
      },
      {
        id: 2,
        title: "The Great Sphinx",
        description: "Discover the mysteries of this ancient limestone statue",
        x: 65,
        y: 70,
        type: "monument",
      },
      {
        id: 3,
        title: "Pyramid of Khafre",
        description:
          "Learn about the second-largest pyramid in the Giza complex",
        x: 25,
        y: 45,
        type: "pyramid",
      },
    ],
    scenes: [
      {
        id: 1,
        title: "Giza Plateau Overview",
        description: "Cinematic aerial view of all three pyramids",
        type: "video",
        content:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 2,
        title: "Base of Great Pyramid",
        description: "Up close with the massive limestone blocks",
        type: "image",
        content:
          "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 3,
        title: "Inside the Great Pyramid",
        description: "Virtual walk through the internal chambers",
        type: "360",
        content:
          "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
    audioGuide: {
      narrator: "Dr. Sarah Mitchell, Egyptologist",
      language: "English",
      duration: "15 min",
    },
  },
  {
    id: 2,
    title: "Great Zimbabwe Ruins",
    location: "Zimbabwe",
    region: "Southern Africa",
    description:
      "Walk through the stone ruins of Africa's most impressive medieval city",
    duration: "20 min",
    difficulty: "Intermediate",
    rating: 4.7,
    participants: "8.2K",
    type: "360",
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hotspots: [
      {
        id: 1,
        title: "Great Enclosure",
        description: "Massive stone walls built without mortar",
        x: 40,
        y: 60,
        type: "structure",
      },
      {
        id: 2,
        title: "Hill Complex",
        description: "Royal residence on the granite hill",
        x: 20,
        y: 25,
        type: "palace",
      },
    ],
    scenes: [
      {
        id: 1,
        title: "Great Enclosure Wall",
        description: "The impressive curved wall of the Great Enclosure",
        type: "image",
        content:
          "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 2,
        title: "Hill Complex Ruins",
        description: "Panoramic view from the royal hill",
        type: "360",
        content:
          "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
    audioGuide: {
      narrator: "Prof. David Matamba, Archaeologist",
      language: "English",
      duration: "18 min",
    },
  },
  {
    id: 3,
    title: "Rock Churches of Lalibela",
    location: "Ethiopia",
    region: "East Africa",
    description:
      "Experience these remarkable churches carved from solid volcanic rock",
    duration: "30 min",
    difficulty: "Advanced",
    rating: 4.8,
    participants: "9.7K",
    type: "immersive",
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    hotspots: [
      {
        id: 1,
        title: "Church of St. George",
        description: "The most famous cross-shaped church",
        x: 50,
        y: 40,
        type: "church",
      },
      {
        id: 2,
        title: "Underground Tunnels",
        description: "Network of tunnels connecting the churches",
        x: 30,
        y: 65,
        type: "tunnel",
      },
    ],
    scenes: [
      {
        id: 1,
        title: "Church of St. George",
        description: "Aerial view of the perfectly carved cross",
        type: "image",
        content:
          "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 2,
        title: "Interior Chamber",
        description: "Inside the carved church chambers",
        type: "360",
        content:
          "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
    audioGuide: {
      narrator: "Father Tekle Mariam, Local Guide",
      language: "English",
      duration: "25 min",
    },
  },
];

// Enhanced Virtual Tour Viewer Component with real video support
function VirtualTourViewer({
  tour,
  onExit,
}: {
  tour: any;
  onExit: () => void;
}) {
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHotspotClick = (hotspot: any) => {
    setSelectedHotspot(hotspot);
  };

  const nextScene = () => {
    if (currentScene < tour.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      setProgress(((currentScene + 1) / tour.scenes.length) * 100);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
      setProgress(((currentScene - 1) / tour.scenes.length) * 100);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const scene = tour.scenes[currentScene];

  const renderSceneContent = () => {
    switch (scene.type) {
      case "video":
        return (
          <div className="relative">
            <video
              src={scene.content}
              className="w-full h-full object-cover"
              controls={true}
              autoPlay={false}
              muted={!audioEnabled}
              poster={tour.image}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-600 text-white">
                <Video className="w-3 h-3 mr-1" />
                HD Video Tour
              </Badge>
            </div>
          </div>
        );
      case "360":
        return (
          <div className="relative">
            <ImageWithFallback
              src={scene.content}
              alt={scene.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-600 text-white">
                <RotateCw className="w-3 h-3 mr-1" />
                360° View
              </Badge>
            </div>
          </div>
        );
      default:
        return (
          <ImageWithFallback
            src={scene.content}
            alt={scene.title}
            className="w-full h-full object-cover"
          />
        );
    }
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50" : "relative"} bg-black`}
    >
      {/* Tour Viewer */}
      <div className="relative h-[70vh]">
        {renderSceneContent()}

        {/* Hotspots - only show for 360 and image scenes */}
        {scene.type !== "video" &&
          tour.hotspots.map((hotspot: any) => (
            <button
              key={hotspot.id}
              className="absolute w-8 h-8 bg-blue-500 bg-opacity-80 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-all duration-200 animate-pulse"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={() => handleHotspotClick(hotspot)}
            >
              <Info className="w-4 h-4" />
            </button>
          ))}

        {/* Navigation Controls */}
        <div className="absolute top-4 left-4 flex space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={onExit}
            className="bg-black/50 text-white border-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
            Exit Tour
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-black/50 text-white border-white/20"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Audio Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="bg-black/50 text-white border-white/20"
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Scene Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={prevScene}
            disabled={currentScene === 0}
            className="bg-black/50 text-white border-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="bg-black/50 text-white px-3 py-1 rounded text-sm flex items-center space-x-2">
            {scene.type === "video" && (
              <Video className="w-3 h-3 text-red-400" />
            )}
            {scene.type === "360" && (
              <RotateCw className="w-3 h-3 text-blue-400" />
            )}
            {scene.type === "image" && (
              <ImageIcon className="w-3 h-3 text-green-400" />
            )}
            <span>
              {currentScene + 1} / {tour.scenes.length}
            </span>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={nextScene}
            disabled={currentScene === tour.scenes.length - 1}
            className="bg-black/50 text-white border-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Scene Title */}
        <div className="absolute bottom-16 left-4">
          <div className="bg-black/70 text-white p-4 rounded-lg">
            <div className="flex items-center mb-1">
              {scene.type === "video" && (
                <Video className="w-4 h-4 mr-2 text-red-400" />
              )}
              {scene.type === "360" && (
                <RotateCw className="w-4 h-4 mr-2 text-blue-400" />
              )}
              {scene.type === "image" && (
                <ImageIcon className="w-4 h-4 mr-2 text-green-400" />
              )}
              <h3 className="text-lg">{scene.title}</h3>
            </div>
            <p className="text-sm text-gray-300">{scene.description}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900 px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm">Tour Progress</span>
          <span className="text-white text-sm">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Tour Information */}
      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl mb-1">{tour.title}</h2>
            <p className="text-gray-300 text-sm">{tour.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300 flex items-center">
              <Headphones className="w-3 h-3 mr-1" />
              Audio Guide
            </div>
            <div className="text-sm">{tour.audioGuide.narrator}</div>
          </div>
        </div>
      </div>

      {/* Hotspot Detail Modal */}
      {selectedHotspot && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>{selectedHotspot.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {selectedHotspot.description}
              </p>
              <Button onClick={() => setSelectedHotspot(null)}>Close</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function VirtualTours() {
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  const startTour = (tour: any) => {
    setSelectedTour(tour);
  };

  const exitTour = () => {
    setSelectedTour(null);
  };

  if (selectedTour) {
    return <VirtualTourViewer tour={selectedTour} onExit={exitTour} />;
  }

  const filteredTours =
    filter === "all"
      ? virtualTours
      : virtualTours.filter((tour) => tour.region === filter);

  // Get tour type icon
  const getTourTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-3 h-3 mr-1 text-red-500" />;
      case "360":
        return <RotateCw className="w-3 h-3 mr-1 text-blue-500" />;
      case "immersive":
        return <Eye className="w-3 h-3 mr-1 text-purple-500" />;
      default:
        return <ImageIcon className="w-3 h-3 mr-1 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Enhanced Stats */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 text-blue-800"
            >
              <Eye className="w-4 h-4 mr-2" />
              360° Virtual Experience
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              Virtual Tours
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore Africa's most significant historical sites from anywhere
              in the world. Experience immersive tours with expert narration,
              interactive hotspots, and multimedia content.
            </p>
          </div>

          {/* Enhanced Stats with Animation */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl text-blue-600 mb-1">
                <AnimatedCounter target={virtualTours.length} />
              </div>
              <div className="text-sm text-gray-600">Available Tours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-green-600 mb-1">
                <AnimatedCounter
                  target={virtualTours.filter((t) => t.type === "video").length}
                />
              </div>
              <div className="text-sm text-gray-600">HD Video Tours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-purple-600 mb-1">
                <AnimatedCounter target={30} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Total Scenes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-amber-600 mb-1">
                <AnimatedCounter target={5} />
              </div>
              <div className="text-sm text-gray-600">African Regions</div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Video,
                label: "HD Video Tours",
                desc: "Professional cinematography",
                color: "text-red-500",
              },
              {
                icon: RotateCw,
                label: "360° Views",
                desc: "Immersive experience",
                color: "text-blue-500",
              },
              {
                icon: Volume2,
                label: "Expert Audio",
                desc: "Professional guides",
                color: "text-green-500",
              },
              {
                icon: Info,
                label: "Interactive",
                desc: "Clickable hotspots",
                color: "text-purple-500",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-gray-900 mb-1">{feature.label}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 flex-wrap gap-2">
            {[
              { key: "all", label: "All Tours" },
              { key: "North Africa", label: "North Africa" },
              { key: "West Africa", label: "West Africa" },
              { key: "East Africa", label: "East Africa" },
              { key: "Southern Africa", label: "Southern Africa" },
              { key: "Central Africa", label: "Central Africa" },
            ].map((region) => (
              <Button
                key={region.key}
                variant={filter === region.key ? "default" : "outline"}
                onClick={() => setFilter(region.key)}
                className={
                  filter === region.key ? "bg-blue-600 hover:bg-blue-700" : ""
                }
              >
                {region.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <Card
                key={tour.id}
                className="hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <Badge className="bg-blue-600 text-white">
                      {getTourTypeIcon(tour.type)}
                      {tour.type === "video"
                        ? "HD Video Tour"
                        : tour.type === "360"
                        ? "360° Tour"
                        : tour.type === "immersive"
                        ? "Immersive"
                        : "Photo Tour"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {tour.duration}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      onClick={() => startTour(tour)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Tour
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl text-gray-900 mb-1">
                        {tour.title}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tour.location}, {tour.region}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {tour.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {tour.duration}
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            tour.difficulty === "Beginner"
                              ? "border-green-500 text-green-700"
                              : tour.difficulty === "Intermediate"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-red-500 text-red-700"
                          }`}
                        >
                          {tour.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center text-amber-600">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {tour.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <AnimatedCounter
                          target={
                            parseFloat(tour.participants.replace("K", "")) *
                            1000
                          }
                        />{" "}
                        participants
                      </div>
                      <Button
                        onClick={() => startTour(tour)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Tour
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-gray-900 mb-4">
                Multimedia Learning Experience
              </h2>
              <p className="text-gray-600">
                Our virtual tours combine cutting-edge technology with expert
                knowledge to bring African history to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-2">
                        HD Video Tours
                      </h3>
                      <p className="text-gray-600">
                        Experience sites through professionally filmed video
                        content with cinematic quality and expert commentary.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <RotateCw className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-2">
                        360° Immersive Views
                      </h3>
                      <p className="text-gray-600">
                        Navigate freely through historical sites with
                        interactive 360-degree panoramic photography.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-2">
                        Expert Audio Guides
                      </h3>
                      <p className="text-gray-600">
                        Learn from archaeologists, historians, and local experts
                        with professional audio narration.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Info className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-2">
                        Interactive Hotspots
                      </h3>
                      <p className="text-gray-600">
                        Discover detailed information through clickable hotspots
                        and contextual overlays throughout each tour.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
