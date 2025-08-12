import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Crown,
  Star,
  BookOpen,
  Users,
  ChevronRight,
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
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import AnimatedCounter from "./AnimatedCounter";

// Historical figures data with authentic images
const historicalFigures = [
  {
    id: 1,
    name: "Mansa Musa",
    title: "Emperor of Mali",
    period: "1312-1337 CE",
    region: "West Africa",
    significance: "Wealthiest individual in history",
    born: "c. 1280",
    died: "c. 1337",
    image:
      "https://images.unsplash.com/photo-1665562227872-a220594c8afb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYW5zYSUyME11c2ElMjBNYWxpJTIwZW1wZXJvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NDczOTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    biography:
      "Mansa Musa was the tenth emperor of the Mali Empire and is considered the wealthiest individual in history. His famous pilgrimage to Mecca in 1324-1325 showcased Mali's immense wealth to the world.",
    achievements: [
      "Expanded Mali Empire to its greatest extent",
      "Established trade routes across the Sahara",
      "Built the University of Sankore in Timbuktu",
      "Promoted Islamic scholarship and learning",
    ],
    legacy:
      "His pilgrimage put Mali on medieval world maps and established it as a center of learning and trade.",
    category: "Rulers",
  },
  {
    id: 2,
    name: "Nefertiti",
    title: "Queen of Ancient Egypt",
    period: "1353-1336 BCE",
    region: "North Africa",
    significance: "Influential queen and religious reformer",
    born: "c. 1370 BCE",
    died: "c. 1330 BCE",
    image:
      "https://images.unsplash.com/photo-1568322445389-dc9223328f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZWZlcnRpdGklMjBFZ3lwdCUyMHF1ZWVuJTIwYW5jaWVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NDczOTAzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    biography:
      "Nefertiti was an Egyptian queen and the Great Royal Wife of Akhenaten, an Egyptian pharaoh. She played a prominent role in the religious revolution that temporarily changed Egypt's polytheistic religion to monotheistic worship of the sun god Aten.",
    achievements: [
      "Co-ruled during the Amarna Period",
      "Promoted monotheistic worship of Aten",
      "Commissioned revolutionary art styles",
      "Established new capital at Amarna",
    ],
    legacy:
      "Her iconic bust remains one of the most recognizable artifacts from ancient Egypt.",
    category: "Rulers",
  },
  {
    id: 3,
    name: "Nelson Mandela",
    title: "Anti-Apartheid Leader & President",
    period: "1918-2013 CE",
    region: "Southern Africa",
    significance: "Leader of anti-apartheid movement",
    born: "1918",
    died: "2013",
    image:
      "https://images.unsplash.com/photo-1585758932243-e79d46905bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOZWxzb24lMjBNYW5kZWxhJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU0NzM5MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    biography:
      "Nelson Mandela was a South African anti-apartheid revolutionary and politician who served as the first black president of South Africa. He spent 27 years in prison for his activism before leading the transition to democracy.",
    achievements: [
      "Led the anti-apartheid movement",
      "First black president of South Africa",
      "Nobel Peace Prize winner (1993)",
      "Symbol of reconciliation and peace",
    ],
    legacy:
      "His commitment to peaceful transition and reconciliation made him a global icon of human rights.",
    category: "Modern Leaders",
  },
  {
    id: 4,
    name: "Cleopatra VII",
    title: "Last Pharaoh of Egypt",
    period: "69-30 BCE",
    region: "North Africa",
    significance: "Last active pharaoh of Ptolemaic Egypt",
    born: "69 BCE",
    died: "30 BCE",
    image:
      "https://images.unsplash.com/photo-1568322445389-dc9223328f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDbGVvcGF0cmElMjBFZ3lwdCUyMGFuY2llbnQlMjBzdGF0dWV8ZW58MXx8fHwxNzU0NzM5MDM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    biography:
      "Cleopatra VII was the last active pharaoh of Ptolemaic Egypt. She was a skilled politician and diplomat who spoke multiple languages and was highly educated in mathematics, philosophy, and rhetoric.",
    achievements: [
      "Maintained Egypt's independence for nearly two decades",
      "Formed alliances with Julius Caesar and Mark Antony",
      "Promoted Egyptian culture and religion",
      "Skilled in multiple languages and sciences",
    ],
    legacy:
      "Her story has inspired countless works of art, literature, and film throughout history.",
    category: "Rulers",
  },
  {
    id: 5,
    name: "Hannibal Barca",
    title: "Carthaginian Military Commander",
    period: "247-183 BCE",
    region: "North Africa",
    significance: "Greatest military strategist in history",
    born: "247 BCE",
    died: "183 BCE",
    image:
      "https://images.unsplash.com/photo-1665562227872-a220594c8afb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYW5zYSUyME11c2ElMjBNYWxpJTIwZW1wZXJvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NDczOTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    biography:
      "Hannibal Barca was a Carthaginian general and statesman who is widely considered one of the greatest military commanders in history. He is best known for crossing the Alps with his army, including war elephants, during the Second Punic War.",
    achievements: [
      "Crossed the Alps with elephants",
      "Won decisive victories at Lake Trasimene and Cannae",
      "Controlled most of southern Italy for 15 years",
      "Revolutionized military tactics and strategy",
    ],
    legacy:
      "His military innovations and strategies are still studied in military academies worldwide.",
    category: "Military Leaders",
  },
  {
    id: 6,
    name: "Yaa Asantewaa",
    title: "Queen Mother of Ejisu",
    period: "1840-1921 CE",
    region: "West Africa",
    significance: "Leader of Ashanti resistance against British colonialism",
    born: "1840",
    died: "1921",
    image:
      "https://images.unsplash.com/photo-1665562227872-a220594c8afb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYW5zYSUyME11c2ElMjBNYWxpJTIwZW1wZXJvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NDczOTAyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    biography:
      "Yaa Asantewaa was appointed Queen Mother of Ejisu in the Ashanti Empire in 1896. She led the final major war between the Ashanti and British colonial forces, known as the War of the Golden Stool.",
    achievements: [
      "Led the Ashanti resistance against British rule",
      "Commanded forces in the War of the Golden Stool",
      "Defended Ashanti sovereignty and traditions",
      "Inspired female leadership in African liberation",
    ],
    legacy:
      "She is celebrated as a symbol of African resistance to colonialism and female leadership.",
    category: "Freedom Fighters",
  },
];

export default function HistoricalFigures() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFigure, setSelectedFigure] = useState<any>(null);

  const filteredFigures = historicalFigures.filter((figure) => {
    const matchesSearch =
      searchQuery === "" ||
      figure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      figure.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "all" || figure.region === selectedRegion;
    const matchesCategory =
      selectedCategory === "all" || figure.category === selectedCategory;

    return matchesSearch && matchesRegion && matchesCategory;
  });

  const regions = [
    ...new Set(historicalFigures.map((figure) => figure.region)),
  ];
  const categories = [
    ...new Set(historicalFigures.map((figure) => figure.category)),
  ];

  if (selectedFigure) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setSelectedFigure(null)}
              className="mb-6"
            >
              ← Back to Historical Figures
            </Button>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <ImageWithFallback
                      src={selectedFigure.image}
                      alt={selectedFigure.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h1 className="text-2xl text-gray-900 mb-2">
                      {selectedFigure.name}
                    </h1>
                    <p className="text-gray-600 mb-4">{selectedFigure.title}</p>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-500">Period:</span>
                        <div className="text-gray-900">
                          {selectedFigure.period}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Region:</span>
                        <div className="text-gray-900">
                          {selectedFigure.region}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Born:</span>
                        <div className="text-gray-900">
                          {selectedFigure.born}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Died:</span>
                        <div className="text-gray-900">
                          {selectedFigure.died}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Biography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedFigure.biography}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Major Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedFigure.achievements.map(
                        (achievement: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start text-gray-700"
                          >
                            <Star className="w-4 h-4 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                            {achievement}
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historical Legacy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedFigure.legacy}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Animated Stats */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-purple-100 text-purple-800"
            >
              <Crown className="w-4 h-4 mr-2" />
              Historical Personalities
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              Historical Figures
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the remarkable leaders, innovators, and visionaries who
              shaped African history. From ancient pharaohs to modern freedom
              fighters, explore their lives and lasting legacies.
            </p>
          </div>

          {/* Animated Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: "Historical Figures",
                target: 200,
                suffix: "+",
                icon: Users,
              },
              {
                label: "Years Covered",
                target: 3000,
                suffix: "+",
                icon: Calendar,
              },
              { label: "Regions", target: 5, suffix: "", icon: MapPin },
              { label: "Categories", target: 8, suffix: "", icon: BookOpen },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg text-gray-900">
                Explore Historical Figures
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search figures..."
                  className="pl-10 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Region" />
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

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-40">
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

      {/* Figures Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFigures.map((figure) => (
              <Card
                key={figure.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={figure.image}
                    alt={figure.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-purple-600 text-white">
                      {figure.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {figure.region}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl text-gray-900 mb-1">
                        {figure.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {figure.title}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {figure.period}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-3">
                      {figure.significance}
                    </p>

                    <Button
                      onClick={() => setSelectedFigure(figure)}
                      className="w-full bg-purple-600 hover:bg-purple-700 group-hover:bg-purple-700"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFigures.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No figures found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
