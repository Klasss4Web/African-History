import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Camera,
  ArrowLeft,
  ExternalLink,
  Heart,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

// Site details data
const siteData: { [key: string]: any } = {
  "pyramids-giza": {
    name: "Pyramids of Giza",
    location: "Giza, Egypt",
    region: "North Africa",
    period: "c. 2580-2510 BCE",
    civilization: "Old Kingdom Egypt",
    type: "Funerary Complex",
    significance: "Last surviving Wonder of the Ancient World",
    description:
      "The Giza pyramid complex consists of the Great Pyramid of Giza, the Pyramid of Khafre, and the Pyramid of Menkaure, along with their associated pyramid complexes and the Great Sphinx of Giza.",
    heroImage:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    overview:
      "The Pyramids of Giza represent the pinnacle of ancient Egyptian architectural achievement. Built during the Fourth Dynasty of the Old Kingdom, these monuments served as eternal resting places for the pharaohs Khufu, Khafre, and Menkaure.",
    history: {
      construction:
        "The Great Pyramid was built around 2580-2560 BCE for Pharaoh Khufu. It was the tallest man-made structure in the world for over 3,800 years.",
      purpose:
        "These pyramids served as tombs for the pharaohs and were designed to help them ascend to the afterlife.",
      discovery:
        "While never truly 'lost,' serious archaeological study began in the 19th century with expeditions by Napoleon and later European archaeologists.",
    },
    architecture: {
      greatPyramid: {
        height: "146.5 meters (originally)",
        base: "230.4 meters per side",
        blocks: "Approximately 2.3 million stone blocks",
        weight: "Average block weight: 2.5-3 tons",
      },
      construction:
        "Built using limestone blocks quarried locally, with some granite chambers. The precise methods remain debated.",
      alignment:
        "Precisely aligned with cardinal directions and astronomical phenomena",
    },
    artifacts: [
      {
        name: "Solar Boat of Khufu",
        description:
          "Cedar wood boat found in 1954, likely used for the pharaoh's journey to the afterlife",
        significance: "Demonstrates advanced shipbuilding techniques",
      },
      {
        name: "Pyramid Texts",
        description:
          "Ancient religious texts found in later pyramids, describing the pharaoh's journey to the afterlife",
        significance: "Earliest known religious writings",
      },
    ],
    visitInfo: {
      hours: "8:00 AM - 5:00 PM (Winter), 7:00 AM - 7:00 PM (Summer)",
      tickets: "Required for site entry and individual pyramid interiors",
      accessibility: "Limited access inside pyramids due to narrow passages",
      bestTime:
        "Early morning or late afternoon for better lighting and fewer crowds",
    },
    multimedia: [
      {
        type: "virtual-tour",
        title: "360° Virtual Tour",
        description: "Explore the pyramids and chambers in immersive detail",
      },
      {
        type: "documentary",
        title: "Building the Pyramids",
        description: "20-minute documentary on construction techniques",
      },
    ],
  },
  "great-zimbabwe": {
    name: "Great Zimbabwe",
    location: "Zimbabwe",
    region: "Southern Africa",
    period: "c. 1100-1450 CE",
    civilization: "Shona People",
    type: "Urban Settlement",
    significance: "Largest ancient structure south of the Sahara Desert",
    description:
      "Great Zimbabwe was a medieval city and the capital of the Kingdom of Zimbabwe. The stone city spans an area of 7.22 square kilometers and was built entirely without mortar.",
    heroImage:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    overview:
      "Great Zimbabwe represents the height of medieval African civilization in Southern Africa. This remarkable stone city served as the political and religious center of the Kingdom of Zimbabwe.",
    history: {
      construction:
        "Built between the 11th and 15th centuries by the ancestral Shona people",
      purpose:
        "Served as the capital of the Kingdom of Zimbabwe, controlling gold and ivory trade",
      discovery:
        "Brought to European attention in 1871 by Karl Mauch, though local people always knew of its existence",
    },
    architecture: {
      walls: {
        height: "Up to 11 meters high",
        length: "Over 250 meters of wall in the Great Enclosure",
        construction: "Dry stone walling without mortar",
        technique: "Precisely fitted granite blocks",
      },
      areas: "Divided into Hill Complex, Valley Complex, and Great Enclosure",
      features:
        "Conical tower, intricate stone patterns, and sophisticated drainage",
    },
    artifacts: [
      {
        name: "Zimbabwe Birds",
        description:
          "Carved soapstone birds found at the site, now national symbols",
        significance: "Likely represent ancestral spirits or royal totems",
      },
      {
        name: "Chinese Ceramics",
        description: "Ming dynasty porcelain found at the site",
        significance: "Evidence of long-distance trade connections",
      },
    ],
    visitInfo: {
      hours: "8:00 AM - 5:00 PM daily",
      tickets: "Entry fee required, guided tours available",
      accessibility: "Walking trails with moderate difficulty",
      bestTime: "Dry season (May-October) for best weather conditions",
    },
  },
};

export default function SiteDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  const site = id ? siteData[id] : null;

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-2">Site Not Found</h2>
          <p className="text-gray-600 mb-4">
            The requested historical site could not be found.
          </p>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-black">
        <div className="relative">
          <ImageWithFallback
            src={site.heroImage}
            alt={site.name}
            className="w-full h-96 lg:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <Link to="/">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </Link>
                  <Badge className="bg-amber-600 text-white">{site.type}</Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {site.region}
                  </Badge>
                </div>

                <h1 className="text-4xl lg:text-6xl text-white mb-4">
                  {site.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {site.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {site.period}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {site.civilization}
                  </div>
                </div>
                <p className="text-lg text-white/90 max-w-3xl">
                  {site.description}
                </p>

                <div className="flex space-x-4 mt-6">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save Site
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-6xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="visit">Visit Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Site Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    {site.overview}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg text-gray-900 mb-3">
                        Historical Significance
                      </h4>
                      <p className="text-gray-700">{site.significance}</p>
                    </div>

                    <div>
                      <h4 className="text-lg text-gray-900 mb-3">Key Facts</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Period:</span>
                          <span className="text-gray-900">{site.period}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Civilization:</span>
                          <span className="text-gray-900">
                            {site.civilization}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Type:</span>
                          <span className="text-gray-900">{site.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {site.artifacts && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notable Artifacts & Discoveries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {site.artifacts.map((artifact: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <h4 className="text-gray-900">{artifact.name}</h4>
                          <p className="text-sm text-gray-700">
                            {artifact.description}
                          </p>
                          <p className="text-xs text-amber-600">
                            {artifact.significance}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(site.history).map(([key, value], index) => (
                    <div
                      key={index}
                      className="border-l-2 border-amber-500 pl-6"
                    >
                      <h4 className="text-lg text-gray-900 capitalize mb-2">
                        {key.replace(/([A-Z])/g, " $1")}
                      </h4>
                      <p className="text-gray-700">{value as string}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="architecture" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Architectural Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(site.architecture).map(
                    ([key, value], index) => (
                      <div key={index}>
                        <h4 className="text-lg text-gray-900 capitalize mb-3">
                          {key.replace(/([A-Z])/g, " $1")}
                        </h4>
                        {typeof value === "object" ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(value).map(
                              ([subKey, subValue], subIndex) => (
                                <div
                                  key={subIndex}
                                  className="flex justify-between text-sm"
                                >
                                  <span className="text-gray-500 capitalize">
                                    {subKey.replace(/([A-Z])/g, " $1")}:
                                  </span>
                                  <span className="text-gray-900">
                                    {subValue as string}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-700">{value as string}</p>
                        )}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visit" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Visitor Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(site.visitInfo).map(
                      ([key, value], index) => (
                        <div key={index}>
                          <h4 className="text-gray-900 capitalize mb-1">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h4>
                          <p className="text-gray-700 text-sm">
                            {value as string}
                          </p>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>

                {site.multimedia && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Multimedia Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {site.multimedia.map((item: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h4 className="text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-700 text-sm mb-3">
                            {item.description}
                          </p>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Access{" "}
                            {item.type === "virtual-tour" ? "Tour" : "Video"}
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
