import { MapPin, ArrowRight, Globe, Compass } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigation } from "./Navigation";

const regions = [
  {
    id: 1,
    name: "North Africa",
    countries: 7,
    featured: "Ancient Egypt & Carthage",
    description:
      "Home to the oldest civilizations and the mighty Sahara Desert",
    color: "from-yellow-400 to-orange-500",
    icon: "🏺",
    highlights: ["Pyramids", "Sahara", "Mediterranean Trade"],
  },
  {
    id: 2,
    name: "West Africa",
    countries: 16,
    featured: "Mali & Songhai Empires",
    description:
      "Birthplace of powerful trading empires and rich cultural traditions",
    color: "from-green-400 to-emerald-500",
    icon: "👑",
    highlights: ["Gold Trade", "Timbuktu", "Oral Traditions"],
  },
  {
    id: 3,
    name: "East Africa",
    countries: 12,
    featured: "Ethiopia & Swahili Coast",
    description: "Cradle of humanity and ancient trading civilizations",
    color: "from-blue-400 to-cyan-500",
    icon: "🌍",
    highlights: ["Human Origins", "Trade Routes", "Rock Churches"],
  },
  {
    id: 4,
    name: "Central Africa",
    countries: 9,
    featured: "Kongo Kingdom",
    description: "Dense rainforests and sophisticated political systems",
    color: "from-emerald-400 to-green-600",
    icon: "🌳",
    highlights: ["Rainforests", "Kingdoms", "Art & Crafts"],
  },
  {
    id: 5,
    name: "Southern Africa",
    countries: 10,
    featured: "Great Zimbabwe",
    description: "Stone cities and mineral wealth that shaped civilizations",
    color: "from-purple-400 to-violet-500",
    icon: "🏔️",
    highlights: ["Stone Architecture", "Mining", "San People"],
  },
];

export default function RegionalExploration() {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Regional Discovery
          </Badge>
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Explore Africa by Region
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the unique histories, cultures, and civilizations that
            flourished across different regions of Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {regions.map((region) => (
            <Card
              key={region.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden"
              onClick={() => navigateTo("region-detail", { id: region.id })}
            >
              <div className={`h-2 bg-gradient-to-r ${region.color}`}></div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{region.icon}</span>
                      <h3 className="text-xl group-hover:text-amber-600 transition-colors">
                        {region.name}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {region.countries} countries
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-amber-600 mb-1">
                      Featured Civilization:
                    </div>
                    <div className="text-sm text-gray-700">
                      {region.featured}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {region.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 flex items-center">
                      <Compass className="w-3 h-3 mr-1" />
                      Key Features:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {region.highlights.map((highlight, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 group-hover:bg-amber-50 group-hover:text-amber-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo("region-detail", { id: region.id });
                  }}
                >
                  Explore Region
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Map Placeholder */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900">
                Interactive Map Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Explore Africa with our interactive map featuring historical
                sites, trade routes, and cultural landmarks.
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700">
                Preview Map Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
