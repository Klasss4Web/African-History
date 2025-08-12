import {
  Calendar,
  ArrowRight,
  Sparkles,
  Users,
  Crown,
  Scroll,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import AnimatedCounter from "./AnimatedCounter";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

const periods = [
  {
    id: 1,
    title: "Ancient Kingdoms",
    subtitle: "3000 BCE - 500 CE",
    description:
      "The rise of Africa's first great civilizations, from the pharaohs of Egypt to the kingdoms of Nubia and Aksum.",
    color: "from-amber-400 to-orange-500",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Egyptian Dynasties", "Kingdom of Kush", "Aksum Empire"],
    artifactCount: 1200,
  },
  {
    id: 2,
    title: "Medieval Empires",
    subtitle: "500-1500 CE",
    description:
      "The golden age of African empires, featuring the wealth of Mali, the scholarship of Timbuktu, and the stone cities of Zimbabwe.",
    color: "from-emerald-400 to-green-500",
    icon: Scroll,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: ["Mali Empire", "Great Zimbabwe", "Swahili Coast"],
    artifactCount: 890,
  },
  {
    id: 3,
    title: "Colonial Period",
    subtitle: "1500-1960 CE",
    description:
      "The era of European colonization, resistance movements, and the eventual struggle for independence across Africa.",
    color: "from-red-400 to-rose-500",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    highlights: [
      "Resistance Movements",
      "Independence Struggles",
      "Cultural Preservation",
    ],
    artifactCount: 650,
  },
];

function PeriodCard({ period, index }: { period: any; index: number }) {
  const IconComponent = period.icon;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border-0 shadow-md hover:scale-105">
      <div className="relative">
        <ImageWithFallback
          src={period.image}
          alt={period.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Period number badge */}
        <div className="absolute top-4 left-4">
          <Badge
            className={`bg-gradient-to-r ${period.color} text-white border-0`}
          >
            <Calendar className="w-3 h-3 mr-1" />
            Period {index + 1}
          </Badge>
        </div>

        {/* Animated artifact count */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          <AnimatedCounter target={period.artifactCount} /> artifacts
        </div>

        {/* Period icon */}
        <div className="absolute bottom-4 left-4">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${period.color} flex items-center justify-center shadow-lg`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl text-gray-900 group-hover:text-amber-600 transition-colors">
              {period.title}
            </h3>
            <Sparkles className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform" />
          </div>
          <p className="text-sm text-gray-600">{period.subtitle}</p>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          {period.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2">
          <h4 className="text-sm text-gray-900">Key Highlights:</h4>
          <div className="flex flex-wrap gap-1">
            {period.highlights.map(
              (highlight: string, highlightIndex: number) => (
                <Badge
                  key={highlightIndex}
                  variant="outline"
                  className="text-xs px-2 py-1"
                >
                  {highlight}
                </Badge>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Click to explore this period in detail
          </div>
          <Button
            asChild
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 group-hover:bg-amber-700"
          >
            <Link to={`/timeline/period/${period.id}`}>
              Explore{" "}
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedPeriods() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header with animated stats */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-amber-100 text-amber-800 px-4 py-2"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Historical Timeline
          </Badge>
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6">
            Journey Through
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              African History
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the rich tapestry of African civilization through three
            defining periods. From ancient kingdoms to medieval empires and the
            modern era, explore the stories that shaped a continent.
          </p>

          {/* Summary Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl text-amber-600 mb-1">
                <AnimatedCounter
                  target={periods.reduce(
                    (total, period) => total + period.artifactCount,
                    0
                  )}
                />
              </div>
              <div className="text-sm text-gray-600">Total Artifacts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-600 mb-1">
                <AnimatedCounter target={periods.length} />
              </div>
              <div className="text-sm text-gray-600">Historical Periods</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-600 mb-1">
                <AnimatedCounter target={4500} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Years Covered</div>
            </div>
          </div>
        </div>

        {/* Periods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {periods.map((period, index) => (
            <PeriodCard key={period.id} period={period} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl text-gray-900 mb-4">
              Ready to Explore the Full Timeline?
            </h3>
            <p className="text-gray-600 mb-6">
              Dive deeper into African history with our interactive timeline
              featuring detailed stories, artifacts, and connections between
              periods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Link to="/timeline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Interactive Timeline
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-700 hover:bg-amber-50"
              >
                <Link to="/games/artifact-matcher">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Play Artifact Matcher
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
