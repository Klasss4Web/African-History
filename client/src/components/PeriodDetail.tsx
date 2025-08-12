import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Lightbulb,
  MapPin,
  Crown,
  Scroll,
  ArrowLeft,
  BookOpen,
  Star,
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Period data (same as before)
const periodData: { [key: number]: any } = {
  1: {
    title: "Ancient Kingdoms",
    subtitle: "3000 BCE - 500 CE",
    description:
      "The rise of Africa's first great civilizations, from the pharaohs of Egypt to the kingdoms of Nubia and Aksum.",
    overview:
      "This period saw the emergence of some of the world's most influential ancient civilizations. Ancient Egypt developed along the Nile River, creating monuments that still inspire awe today. Meanwhile, the Kingdom of Kush controlled trade routes and even ruled Egypt for a period, while the Kingdom of Aksum became a major trading power connecting Africa with the Mediterranean and Indian Ocean worlds.",
    keyDevelopments: [
      "Development of hieroglyphic writing systems",
      "Construction of pyramids and monumental architecture",
      "Establishment of complex trade networks",
      "Advancement in mathematics, astronomy, and medicine",
      "Development of sophisticated political systems",
    ],
    majorCivilizations: [
      {
        name: "Ancient Egypt",
        period: "3100-30 BCE",
        region: "North Africa",
        achievements: [
          "Pyramid construction",
          "Hieroglyphic writing",
          "Medical advances",
          "Calendar system",
        ],
        legacy:
          "Influenced art, architecture, and culture across the Mediterranean world",
      },
      {
        name: "Kingdom of Kush",
        period: "1070 BCE-350 CE",
        region: "North Africa",
        achievements: [
          "Iron working",
          "Pyramid building",
          "Trade networks",
          "Conquest of Egypt",
        ],
        legacy:
          "Preserved Egyptian traditions and spread ironworking technology",
      },
      {
        name: "Kingdom of Aksum",
        period: "100-960 CE",
        region: "East Africa",
        achievements: [
          "International trade",
          "Coinage system",
          "Monumental obelisks",
          "Early Christianity",
        ],
        legacy:
          "Connected Africa to global trade networks and preserved ancient Ethiopian traditions",
      },
    ],
    timeline: [
      { year: "3100 BCE", event: "Unification of Egypt under Pharaoh Menes" },
      { year: "2580 BCE", event: "Great Pyramid of Giza constructed" },
      {
        year: "1070 BCE",
        event: "Kingdom of Kush gains independence from Egypt",
      },
      { year: "750 BCE", event: "Kushite pharaohs conquer and rule Egypt" },
      {
        year: "100 CE",
        event: "Kingdom of Aksum emerges as major trading power",
      },
      { year: "330 CE", event: "Aksum adopts Christianity" },
    ],
    culturalAspects: [
      "Religious beliefs centered on divine kingship",
      "Monumental architecture as symbols of power",
      "Complex burial practices and afterlife beliefs",
      "Advanced artistic traditions in sculpture and painting",
      "Development of written languages and literature",
    ],
    modernLegacy:
      "These ancient kingdoms laid the foundation for African civilization and continue to influence modern African identity, art, and culture.",
    color: "from-amber-400 to-orange-500",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  2: {
    title: "Medieval Empires",
    subtitle: "500-1500 CE",
    description:
      "The golden age of African empires, featuring the wealth of Mali, the scholarship of Timbuktu, and the stone cities of Zimbabwe.",
    overview:
      "The medieval period marked the height of African political and economic power. Great trading empires like Ghana, Mali, and Songhai controlled trans-Saharan trade routes, accumulating immense wealth from gold and salt. Meanwhile, the Swahili coast flourished with Indian Ocean trade, and Great Zimbabwe became the largest ancient structure south of the Sahara.",
    keyDevelopments: [
      "Control of trans-Saharan and Indian Ocean trade",
      "Development of Islamic scholarship centers",
      "Construction of impressive stone architecture",
      "Emergence of sophisticated urban centers",
      "Cultural synthesis between African and Islamic traditions",
    ],
    majorCivilizations: [
      {
        name: "Mali Empire",
        period: "1230-1600 CE",
        region: "West Africa",
        achievements: [
          "Gold trade monopoly",
          "Islamic scholarship",
          "Timbuktu university",
          "Architectural marvels",
        ],
        legacy: "Established enduring trade networks and centers of learning",
      },
      {
        name: "Songhai Empire",
        period: "1464-1591 CE",
        region: "West Africa",
        achievements: [
          "Largest African empire",
          "Military innovations",
          "Administrative systems",
          "Cultural preservation",
        ],
        legacy:
          "Advanced government structures that influenced regional politics",
      },
      {
        name: "Great Zimbabwe",
        period: "1100-1450 CE",
        region: "Southern Africa",
        achievements: [
          "Stone architecture",
          "Gold trade",
          "Urban planning",
          "Artistic traditions",
        ],
        legacy:
          "Demonstrated sophisticated African engineering and urban design",
      },
    ],
    timeline: [
      { year: "800 CE", event: "Swahili city-states begin to flourish" },
      { year: "1100 CE", event: "Great Zimbabwe construction begins" },
      { year: "1235 CE", event: "Mali Empire founded by Sundiata Keita" },
      { year: "1324 CE", event: "Mansa Musa's famous pilgrimage to Mecca" },
      { year: "1464 CE", event: "Songhai Empire rises to power" },
      { year: "1591 CE", event: "Moroccan invasion ends Songhai Empire" },
    ],
    culturalAspects: [
      "Synthesis of Islamic and traditional African cultures",
      "Development of centers of learning and scholarship",
      "Growth of long-distance trade networks",
      "Architectural innovations in stone and mud-brick",
      "Oral traditions and griots preserving history",
    ],
    modernLegacy:
      "These empires demonstrated Africa's central role in medieval global trade and scholarship, influencing education, architecture, and governance across the continent.",
    color: "from-emerald-400 to-green-500",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  3: {
    title: "Colonial Period",
    subtitle: "1500-1960 CE",
    description:
      "The era of European colonization, resistance movements, and the eventual struggle for independence across Africa.",
    overview:
      "The colonial period fundamentally transformed African societies through European imperialism. Despite facing immense challenges, African communities showed remarkable resilience, maintaining cultural traditions while adapting to new realities. This period also saw the rise of influential resistance leaders and independence movements that would ultimately lead to decolonization.",
    keyDevelopments: [
      "European colonization and partition of Africa",
      "Introduction of new technologies and systems",
      "Resistance movements and independence struggles",
      "Cultural preservation amidst change",
      "Development of pan-African consciousness",
    ],
    majorCivilizations: [
      {
        name: "Ethiopian Empire",
        period: "1270-1974 CE",
        region: "East Africa",
        achievements: [
          "Maintained independence",
          "Victory at Adwa",
          "Ancient traditions",
          "Diplomatic relations",
        ],
        legacy: "Symbol of African independence and resistance to colonialism",
      },
      {
        name: "Ashanti Empire",
        period: "1670-1902 CE",
        region: "West Africa",
        achievements: [
          "Military resistance",
          "Golden Stool traditions",
          "Trade networks",
          "Cultural preservation",
        ],
        legacy: "Inspired later independence movements across West Africa",
      },
      {
        name: "Zulu Kingdom",
        period: "1816-1897 CE",
        region: "Southern Africa",
        achievements: [
          "Military innovations",
          "Resistance to colonialism",
          "Cultural unity",
          "Leadership traditions",
        ],
        legacy: "Influenced South African nationalism and cultural identity",
      },
    ],
    timeline: [
      { year: "1652 CE", event: "Dutch establish Cape Colony in South Africa" },
      { year: "1884 CE", event: "Berlin Conference partitions Africa" },
      { year: "1896 CE", event: "Ethiopia defeats Italy at Battle of Adwa" },
      {
        year: "1957 CE",
        event: "Ghana becomes first African nation to gain independence",
      },
      {
        year: "1960 CE",
        event: "Year of Africa - 17 nations gain independence",
      },
      { year: "1994 CE", event: "End of apartheid in South Africa" },
    ],
    culturalAspects: [
      "Preservation of traditional languages and customs",
      "Adaptation and resistance to colonial rule",
      "Development of new forms of artistic expression",
      "Growth of educational and religious movements",
      "Pan-African cultural and political consciousness",
    ],
    modernLegacy:
      "The colonial period shaped modern African borders and institutions while also fostering unity and independence movements that continue to influence contemporary African politics and culture.",
    color: "from-red-400 to-rose-500",
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
};

export default function PeriodDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState("overview");

  const periodId = id ? parseInt(id) : null;
  const period = periodId ? periodData[periodId] : null;

  if (!period) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-2">Period Not Found</h2>
          <p className="text-gray-600 mb-4">
            The requested historical period could not be found.
          </p>
          <Link to="/timeline">
            <Button>Back to Timeline</Button>
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
            src={period.image}
            alt={period.title}
            className="w-full h-96 lg:h-[500px] object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-16">
              <div className="max-w-4xl">
                <Link to="/timeline">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Timeline
                  </Button>
                </Link>

                <Badge
                  className={`mb-4 bg-gradient-to-r ${period.color} text-white border-0`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Historical Period
                </Badge>

                <h1 className="text-5xl lg:text-7xl text-white mb-4">
                  {period.title}
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 mb-6">
                  {period.subtitle}
                </p>
                <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
                  {period.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="max-w-6xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="civilizations">Civilizations</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Period Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {period.overview}
                  </p>

                  <div>
                    <h3 className="text-xl text-gray-900 mb-4">
                      Key Developments
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {period.keyDevelopments.map(
                        (development: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">{development}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl text-gray-900 mb-4">
                      Modern Legacy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {period.modernLegacy}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="civilizations" className="space-y-8">
              <div className="grid gap-8">
                <h2 className="text-3xl text-gray-900 text-center">
                  Major Civilizations
                </h2>
                {period.majorCivilizations.map((civ: any, index: number) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl text-gray-900 mb-2">
                              {civ.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {civ.period}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {civ.region}
                              </div>
                            </div>
                          </div>
                          <Crown className="w-8 h-8 text-amber-500" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg text-gray-900 mb-3">
                              Major Achievements
                            </h4>
                            <div className="space-y-2">
                              {civ.achievements.map(
                                (achievement: string, achIndex: number) => (
                                  <div
                                    key={achIndex}
                                    className="flex items-center space-x-2"
                                  >
                                    <Star className="w-4 h-4 text-amber-500" />
                                    <span className="text-gray-700">
                                      {achievement}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg text-gray-900 mb-3">
                              Historical Legacy
                            </h4>
                            <p className="text-gray-700">{civ.legacy}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scroll className="w-6 h-6 mr-3" />
                    Historical Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {period.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-amber-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-lg text-amber-600 mb-1">
                            {event.year}
                          </div>
                          <p className="text-gray-900">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="culture" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-3" />
                    Cultural Aspects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {period.culturalAspects.map(
                      (aspect: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                        >
                          <Lightbulb className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">{aspect}</p>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
