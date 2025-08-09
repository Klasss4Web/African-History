import { MapPin, Users, Globe, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

// Country flags mapping
const countryFlags: { [key: string]: string } = {
  // North Africa
  Egypt: "🇪🇬",
  Libya: "🇱🇾",
  Tunisia: "🇹🇳",
  Algeria: "🇩🇿",
  Morocco: "🇲🇦",
  Sudan: "🇸🇩",

  // West Africa
  Nigeria: "🇳🇬",
  Ghana: "🇬🇭",
  Mali: "🇲🇱",
  Senegal: "🇸🇳",
  "Burkina Faso": "🇧🇫",
  "Ivory Coast": "🇨🇮",

  // East Africa
  Kenya: "🇰🇪",
  Tanzania: "🇹🇿",
  Ethiopia: "🇪🇹",
  Uganda: "🇺🇬",
  Rwanda: "🇷🇼",
  Somalia: "🇸🇴",

  // Central Africa
  "Democratic Republic of Congo": "🇨🇩",
  Cameroon: "🇨🇲",
  "Central African Republic": "🇨🇫",
  Chad: "🇹🇩",
  Gabon: "🇬🇦",

  // Southern Africa
  "South Africa": "🇿🇦",
  Zimbabwe: "🇿🇼",
  Botswana: "🇧🇼",
  Namibia: "🇳🇦",
  Zambia: "🇿🇲",
  Mozambique: "🇲🇿",
};

const regions = [
  {
    id: 1,
    name: "North Africa",
    countries: ["Egypt", "Libya", "Tunisia", "Algeria", "Morocco", "Sudan"],
    description:
      "Home to ancient civilizations along the Nile and Mediterranean, featuring the pyramids of Egypt, the ruins of Carthage, and the scholarly centers of Islamic learning.",
    highlights: ["Ancient Egypt", "Islamic Golden Age", "Trans-Saharan Trade"],
    color: "from-yellow-400 to-orange-500",
    icon: "🏺",
    population: "245 million",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "West Africa",
    countries: [
      "Nigeria",
      "Ghana",
      "Mali",
      "Senegal",
      "Burkina Faso",
      "Ivory Coast",
    ],
    description:
      "The birthplace of powerful medieval empires like Mali and Songhai, rich in gold, salt, and cultural traditions that influence the world today.",
    highlights: ["Mali Empire", "Gold Trade", "Griots & Oral History"],
    color: "from-green-400 to-emerald-500",
    icon: "👑",
    population: "381 million",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "East Africa",
    countries: ["Kenya", "Tanzania", "Ethiopia", "Uganda", "Rwanda", "Somalia"],
    description:
      "Cradle of humanity and gateway to ancient trade routes, home to the rock churches of Lalibela, Swahili culture, and diverse kingdoms.",
    highlights: ["Human Origins", "Swahili Coast", "Ancient Christianity"],
    color: "from-blue-400 to-cyan-500",
    icon: "⛪",
    population: "445 million",
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "Central Africa",
    countries: [
      "Democratic Republic of Congo",
      "Cameroon",
      "Central African Republic",
      "Chad",
      "Gabon",
    ],
    description:
      "Dense rainforests and river systems that fostered unique kingdoms and cultures, including the Kongo Empire and diverse Bantu civilizations.",
    highlights: ["Kongo Kingdom", "Bantu Migrations", "River Civilizations"],
    color: "from-emerald-400 to-green-600",
    icon: "🌳",
    population: "179 million",
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    name: "Southern Africa",
    countries: [
      "South Africa",
      "Zimbabwe",
      "Botswana",
      "Namibia",
      "Zambia",
      "Mozambique",
    ],
    description:
      "Land of Great Zimbabwe's stone cities, diverse mineral wealth, and the complex history of apartheid and liberation movements.",
    highlights: ["Great Zimbabwe", "Mining Heritage", "Liberation Struggles"],
    color: "from-purple-400 to-violet-500",
    icon: "🏛️",
    population: "174 million",
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

function RegionCard({ region, index }: { region: any; index: number }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white hover:scale-105">
      <div className="relative">
        <ImageWithFallback
          src={region.image}
          alt={region.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Region icon */}
        <div className="absolute top-4 left-4">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${region.color} flex items-center justify-center shadow-lg text-2xl`}
          >
            {region.icon}
          </div>
        </div>

        {/* Population */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {region.population}
        </div>

        {/* Region name overlay */}
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl text-white mb-1 group-hover:text-amber-200 transition-colors">
            {region.name}
          </h3>
          <div className="flex items-center text-white/80 text-sm">
            <Users className="w-4 h-4 mr-1" />
            {region.countries.length} countries
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          {region.description}
        </p>

        {/* Countries preview with flags */}
        <div className="space-y-2">
          <h4 className="text-sm text-gray-900">Key Countries:</h4>
          <div className="flex flex-wrap gap-1">
            {region.countries
              .slice(0, 4)
              .map((country: string, countryIndex: number) => (
                <Badge
                  key={countryIndex}
                  variant="outline"
                  className="text-xs px-2 py-1 flex items-center gap-1"
                >
                  <span>{countryFlags[country]}</span>
                  {country}
                </Badge>
              ))}
            {region.countries.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-1 flex items-center gap-1"
              >
                <span>🌍</span>+{region.countries.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h4 className="text-sm text-gray-900">Historical Highlights:</h4>
          <div className="space-y-1">
            {region.highlights.map(
              (highlight: string, highlightIndex: number) => (
                <div
                  key={highlightIndex}
                  className="flex items-center text-sm text-gray-600"
                >
                  <Sparkles className="w-3 h-3 mr-2 text-amber-500" />
                  {highlight}
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Explore {region.countries.length} countries and their histories
          </div>
          <Button
            asChild
            size="sm"
            className={`bg-gradient-to-r ${region.color} text-white border-0 hover:opacity-90`}
          >
            <Link to={`/regions/${region.id}`}>
              Explore{" "}
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RegionalExploration() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-100 text-blue-800 px-4 py-2"
          >
            <Globe className="w-4 h-4 mr-2" />
            Regional Discovery
          </Badge>
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6">
            Explore Africa's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Diverse Regions
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Journey across the vast continent of Africa, from the ancient
            pyramids of the north to the stone cities of the south. Each region
            tells its own unique story of civilizations, cultures, and
            connections that shaped human history.
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regions.map((region, index) => (
            <RegionCard key={region.id} region={region} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-2xl mx-auto border border-blue-100">
            <h3 className="text-2xl text-gray-900 mb-4">
              Want to See the Full Picture?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our interactive map to discover historical sites, trade
              routes, and connections between African civilizations across time
              and space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Link to="/interactive-map">
                  <MapPin className="w-4 h-4 mr-2" />
                  Interactive Map
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/regions">
                  <Globe className="w-4 h-4 mr-2" />
                  All Regions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
