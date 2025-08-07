import { Calendar, MapPin, Users, Scroll } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigation } from "./Navigation";

const periods = [
  {
    id: 1,
    title: "Ancient Egypt",
    period: "3100 - 30 BCE",
    description:
      "The civilization that built the pyramids and developed hieroglyphics along the Nile River.",
    icon: "🏛️",
    color: "from-yellow-400 to-orange-500",
    highlights: ["Pyramids of Giza", "Valley of Kings", "Hieroglyphics"],
    location: "Northeast Africa",
  },
  {
    id: 2,
    title: "Kingdom of Kush",
    period: "1070 BCE - 350 CE",
    description:
      "A powerful kingdom that ruled over Egypt and established trade networks across Africa.",
    icon: "👑",
    color: "from-purple-400 to-pink-500",
    highlights: ["Nubian Pyramids", "Iron Working", "Trade Routes"],
    location: "Sudan",
  },
  {
    id: 3,
    title: "Great Zimbabwe",
    period: "1100 - 1450 CE",
    description:
      "A medieval African city that was the center of a vast trading empire.",
    icon: "🏰",
    color: "from-green-400 to-blue-500",
    highlights: ["Stone Architecture", "Gold Trade", "Shona Culture"],
    location: "Southern Africa",
  },
  {
    id: 4,
    title: "Mali Empire",
    period: "1235 - 1600 CE",
    description:
      "One of the richest empires in history, famous for Mansa Musa's legendary wealth.",
    icon: "💰",
    color: "from-amber-400 to-yellow-500",
    highlights: ["Timbuktu", "Salt & Gold Trade", "Islamic Learning"],
    location: "West Africa",
  },
];

export default function FeaturedPeriods() {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Historical Periods
          </Badge>
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Explore African Civilizations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Journey through millennia of African history, from ancient kingdoms
            to powerful empires that shaped the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {periods.map((period) => (
            <Card
              key={period.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white cursor-pointer"
              onClick={() => navigateTo("period-detail", { id: period.id })}
            >
              <CardHeader className="space-y-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${period.color} flex items-center justify-center text-2xl mb-2`}
                >
                  {period.icon}
                </div>
                <div>
                  <CardTitle className="text-lg group-hover:text-amber-600 transition-colors">
                    {period.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {period.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {period.description}
                </p>

                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {period.location}
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-500 flex items-center">
                    <Scroll className="w-3 h-3 mr-1" />
                    Key Highlights:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {period.highlights.map((highlight, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-0.5 border-amber-200 text-amber-700"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-amber-600 hover:bg-amber-50 group-hover:bg-amber-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo("period-detail", { id: period.id });
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-amber-600 text-amber-600 hover:bg-amber-50"
            onClick={() => navigateTo("timeline")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            View Full Timeline
          </Button>
        </div>
      </div>
    </section>
  );
}
