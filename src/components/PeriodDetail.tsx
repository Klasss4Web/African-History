import {
  Calendar,
  MapPin,
  Users,
  Scroll,
  BookOpen,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import { useNavigation } from "./Navigation";

const periodData: { [key: number]: any } = {
  1: {
    title: "Ancient Egypt",
    period: "3100 - 30 BCE",
    location: "Northeast Africa (Nile River Valley)",
    description:
      "One of the world's earliest and most enduring civilizations, Ancient Egypt flourished along the Nile River for over 3,000 years. Known for monumental architecture, sophisticated writing systems, and complex religious beliefs.",
    icon: "🏛️",
    color: "from-yellow-400 to-orange-500",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    timeline: [
      {
        year: "3100 BCE",
        event: "Unification of Upper and Lower Egypt by Menes",
        type: "political",
      },
      {
        year: "2686-2181 BCE",
        event: "Old Kingdom - Age of Pyramid Building",
        type: "cultural",
      },
      {
        year: "2055-1650 BCE",
        event: "Middle Kingdom - Classical Period",
        type: "political",
      },
      {
        year: "1550-1077 BCE",
        event: "New Kingdom - Egyptian Empire",
        type: "expansion",
      },
      {
        year: "30 BCE",
        event: "Roman conquest ends Ptolemaic rule",
        type: "decline",
      },
    ],
    achievements: [
      {
        title: "Hieroglyphic Writing",
        description:
          "Complex writing system using pictographs and phonetic symbols",
        impact: "Foundation for later writing systems",
      },
      {
        title: "Pyramid Construction",
        description:
          "Monumental architecture including the Great Pyramid of Giza",
        impact: "Engineering marvels that still inspire today",
      },
      {
        title: "Mummification",
        description: "Sophisticated preservation techniques for the afterlife",
        impact: "Advanced understanding of anatomy and chemistry",
      },
      {
        title: "Mathematical Advances",
        description: "Decimal system, geometry, and engineering mathematics",
        impact: "Influenced Greek and Roman mathematics",
      },
    ],
    keyFigures: [
      {
        name: "Imhotep",
        role: "Architect & Physician",
        contribution: "Designer of first pyramid",
      },
      {
        name: "Hatshepsut",
        role: "Female Pharaoh",
        contribution: "Peaceful reign and trade expansion",
      },
      {
        name: "Akhenaten",
        role: "Pharaoh",
        contribution: "Religious revolutionary",
      },
      {
        name: "Tutankhamun",
        role: "Boy King",
        contribution: "Restored traditional religion",
      },
    ],
    relatedStories: [
      {
        id: 1,
        title: "The Mystery of the Great Pyramid's Construction",
        readTime: "12 min",
      },
      {
        id: 2,
        title: "Cleopatra: The Last Pharaoh of Egypt",
        readTime: "15 min",
      },
      {
        id: 3,
        title: "Deciphering Hieroglyphs: The Rosetta Stone",
        readTime: "8 min",
      },
    ],
  },
  2: {
    title: "Kingdom of Kush",
    period: "1070 BCE - 350 CE",
    location: "Sudan (Ancient Nubia)",
    description:
      "A powerful African kingdom that conquered and ruled Egypt, establishing a rich tradition of learning, trade, and monumental architecture in the heart of Africa.",
    icon: "👑",
    color: "from-purple-400 to-pink-500",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    timeline: [
      {
        year: "1070 BCE",
        event: "Emergence of independent Kushite kingdom",
        type: "political",
      },
      {
        year: "760-656 BCE",
        event: "Kushite conquest and rule of Egypt",
        type: "expansion",
      },
      {
        year: "591 BCE",
        event: "Capital moved from Napata to Meroë",
        type: "political",
      },
      {
        year: "100-300 CE",
        event: "Golden age of Meroitic civilization",
        type: "cultural",
      },
      {
        year: "350 CE",
        event: "Conquest by Kingdom of Aksum",
        type: "decline",
      },
    ],
    achievements: [
      {
        title: "Iron Technology",
        description: "Advanced metallurgy and iron working techniques",
        impact: "Spread ironworking throughout Africa",
      },
      {
        title: "Meroitic Script",
        description: "Unique writing system adapted from hieroglyphs",
        impact: "Independent African writing tradition",
      },
      {
        title: "Trade Networks",
        description: "Connected Africa to Mediterranean and India",
        impact: "Economic prosperity and cultural exchange",
      },
      {
        title: "Pyramid Building",
        description: "Over 200 pyramids built at Nuri and Meroë",
        impact: "Architectural legacy in Sudan",
      },
    ],
    keyFigures: [
      {
        name: "Piye",
        role: "Kushite King",
        contribution: "Conquered Egypt, founded 25th Dynasty",
      },
      {
        name: "Taharqa",
        role: "Pharaoh of Egypt",
        contribution: "Greatest of the Kushite pharaohs",
      },
      {
        name: "Amanitore",
        role: "Queen Mother",
        contribution: "Powerful female ruler of Meroë",
      },
      {
        name: "Natakamani",
        role: "King",
        contribution: "Builder of temples and monuments",
      },
    ],
    relatedStories: [
      {
        id: 4,
        title: "The Black Pharaohs: Kushite Rulers of Egypt",
        readTime: "14 min",
      },
      {
        id: 5,
        title: "Meroë: Africa's Iron Age Metropolis",
        readTime: "10 min",
      },
      {
        id: 6,
        title: "Queen Amanitore: Warrior Queen of Kush",
        readTime: "12 min",
      },
    ],
  },
};

interface PeriodDetailProps {
  periodId: number;
}

export default function PeriodDetail({ periodId }: PeriodDetailProps) {
  const { navigateTo } = useNavigation();
  const period = periodData[periodId];

  if (!period) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-2">Period Not Found</h2>
          <p className="text-gray-600 mb-4">
            The requested historical period could not be found.
          </p>
          <Button onClick={() => navigateTo("home")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      political: "bg-blue-100 text-blue-700",
      cultural: "bg-purple-100 text-purple-700",
      expansion: "bg-green-100 text-green-700",
      decline: "bg-red-100 text-red-700",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${period.color} flex items-center justify-center text-3xl`}
                >
                  {period.icon}
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl text-gray-900">
                    {period.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    {period.period}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                {period.location}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {period.description}
              </p>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Stories
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-4 h-4 mr-2" />
                  Bookmark
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src={period.image}
                alt={period.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="timeline" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="people">Key Figures</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl text-gray-900 mb-8 text-center">
                  Historical Timeline
                </h2>
                <div className="space-y-6">
                  {period.timeline.map((event: any, index: number) => (
                    <Card key={index} className="relative">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.year}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg text-gray-900 mb-2">
                              {event.event}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl text-gray-900 mb-8 text-center">
                  Major Achievements
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {period.achievements.map(
                    (achievement: any, index: number) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {achievement.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600">
                            {achievement.description}
                          </p>
                          <div className="border-t pt-4">
                            <h4 className="text-sm text-amber-600 mb-2">
                              Historical Impact:
                            </h4>
                            <p className="text-sm text-gray-700">
                              {achievement.impact}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="people" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl text-gray-900 mb-8 text-center">
                  Key Historical Figures
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {period.keyFigures.map((figure: any, index: number) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg text-gray-900 mb-1">
                              {figure.name}
                            </h3>
                            <Badge variant="outline" className="mb-2 text-xs">
                              {figure.role}
                            </Badge>
                            <p className="text-sm text-gray-600">
                              {figure.contribution}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl text-gray-900 mb-8 text-center">
                  Related Stories
                </h2>
                <div className="space-y-4">
                  {period.relatedStories.map((story: any, index: number) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg text-gray-900 hover:text-amber-600 transition-colors">
                              {story.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Scroll className="w-4 h-4 mr-1" />
                              {story.readTime} read
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Button
                    onClick={() =>
                      navigateTo("stories", {
                        filters: { period: period.title },
                      })
                    }
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    View All Stories
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
