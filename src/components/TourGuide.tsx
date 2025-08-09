import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Play,
  Camera,
  Info,
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AnimatedCounter from "./AnimatedCounter";
import { Card, CardContent, CardHeader } from "./ui/card";

// Tour guides data for different countries
const tourGuidesData = {
  egypt: {
    name: "Egypt",
    flag: "🇪🇬",
    guides: [
      {
        id: 1,
        name: "Ahmed Hassan",
        specialty: "Ancient Egyptian History",
        rating: 4.9,
        experience: "15 years",
        languages: ["Arabic", "English", "French"],
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&crop=face&fit=crop",
        bio: "Expert Egyptologist with PhD from Cairo University. Specializes in pharaonic history and hieroglyphic interpretation.",
        tours: [
          "Pyramids of Giza",
          "Valley of the Kings",
          "Karnak Temple",
          "Egyptian Museum",
        ],
        price: "$45/hour",
        totalTours: 450,
        languages_spoken: 3,
        certifications: [
          "Licensed Tourist Guide",
          "Egyptology PhD",
          "UNESCO Heritage Expert",
        ],
      },
      {
        id: 2,
        name: "Fatima Al-Rashid",
        specialty: "Islamic Cairo & Coptic Heritage",
        rating: 4.8,
        experience: "12 years",
        languages: ["Arabic", "English", "German"],
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=150&h=150&crop=face&fit=crop",
        bio: "Specialist in Islamic architecture and Coptic Christian heritage. Expert on medieval Cairo and religious monuments.",
        tours: [
          "Islamic Cairo",
          "Coptic Quarter",
          "Al-Azhar Mosque",
          "Citadel of Saladin",
        ],
        price: "$40/hour",
        totalTours: 320,
        languages_spoken: 3,
        certifications: [
          "Islamic Architecture Expert",
          "Tourism Ministry License",
          "Religious Heritage Specialist",
        ],
      },
    ],
  },
  ethiopia: {
    name: "Ethiopia",
    flag: "🇪🇹",
    guides: [
      {
        id: 3,
        name: "Tekle Wolde",
        specialty: "Ancient Ethiopian Kingdoms",
        rating: 4.9,
        experience: "18 years",
        languages: ["Amharic", "English", "Italian"],
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&crop=face&fit=crop",
        bio: "Expert on Aksumite civilization and Ethiopian Orthodox heritage. Fluent in ancient Ge'ez script and traditions.",
        tours: [
          "Lalibela Rock Churches",
          "Aksum Obelisks",
          "Gondar Castles",
          "Blue Nile Falls",
        ],
        price: "$35/hour",
        totalTours: 380,
        languages_spoken: 3,
        certifications: [
          "Ethiopian Heritage Expert",
          "Orthodox History Specialist",
          "UNESCO Guide",
        ],
      },
      {
        id: 4,
        name: "Meron Tadesse",
        specialty: "Cultural Anthropology",
        rating: 4.7,
        experience: "10 years",
        languages: ["Amharic", "English", "Oromo"],
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&crop=face&fit=crop",
        bio: "Cultural anthropologist specializing in Ethiopian tribal customs and traditional practices across different ethnic groups.",
        tours: [
          "Omo Valley Tribes",
          "Coffee Ceremony Experience",
          "Traditional Markets",
          "Harar Old Town",
        ],
        price: "$30/hour",
        totalTours: 200,
        languages_spoken: 3,
        certifications: [
          "Cultural Anthropology Degree",
          "Tribal Heritage Expert",
          "Coffee Culture Specialist",
        ],
      },
    ],
  },
  ghana: {
    name: "Ghana",
    flag: "🇬🇭",
    guides: [
      {
        id: 5,
        name: "Kwame Osei",
        specialty: "Colonial History & Independence",
        rating: 4.8,
        experience: "14 years",
        languages: ["English", "Twi", "French"],
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&crop=face&fit=crop",
        bio: "Expert on Ghana's independence movement and colonial period. Specialized knowledge of Ashanti Kingdom and gold trade.",
        tours: [
          "Cape Coast Castle",
          "Elmina Castle",
          "Ashanti Kingdom Sites",
          "Independence Arch",
        ],
        price: "$25/hour",
        totalTours: 290,
        languages_spoken: 3,
        certifications: [
          "Ghana Museums Board Certified",
          "Colonial History Expert",
          "Heritage Tourism License",
        ],
      },
    ],
  },
};

export default function TourGuide() {
  const { countryCode } = useParams();
  const countryData =
    tourGuidesData[countryCode as keyof typeof tourGuidesData];

  if (!countryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">
            Tour Guides Not Available
          </h1>
          <p className="text-gray-600 mb-6">
            Tour guides for this country are coming soon!
          </p>
          <Button asChild>
            <Link to="/regions">Back to Regions</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/regions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Regions
            </Link>
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{countryData.flag}</span>
            <div>
              <h1 className="text-3xl text-gray-900">
                Tour Guides in {countryData.name}
              </h1>
              <p className="text-gray-600">
                Expert local guides to enhance your historical journey
              </p>
            </div>
          </div>
        </div>

        {/* Guides Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl text-amber-600 mb-1">
                  <AnimatedCounter target={countryData.guides.length} />
                </div>
                <div className="text-sm text-gray-600">Expert Guides</div>
              </div>
              <div>
                <div className="text-2xl text-green-600 mb-1">
                  <AnimatedCounter
                    target={countryData.guides.reduce(
                      (sum, guide) => sum + guide.totalTours,
                      0
                    )}
                  />
                </div>
                <div className="text-sm text-gray-600">Total Tours</div>
              </div>
              <div>
                <div className="text-2xl text-blue-600 mb-1">
                  <AnimatedCounter
                    target={Math.max(
                      ...countryData.guides.map((g) => g.languages_spoken)
                    )}
                  />
                </div>
                <div className="text-sm text-gray-600">Languages Spoken</div>
              </div>
              <div>
                <div className="text-2xl text-purple-600 mb-1">
                  {Math.max(...countryData.guides.map((g) => g.rating)).toFixed(
                    1
                  )}
                </div>
                <div className="text-sm text-gray-600">Highest Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guides List */}
        <div className="grid lg:grid-cols-2 gap-8">
          {countryData.guides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={guide.avatar}
                      alt={guide.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg text-gray-900 mb-1">
                          {guide.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {guide.specialty}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            {guide.rating}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {guide.experience}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg text-amber-600 mb-1">
                          {guide.price}
                        </div>
                        <div className="text-xs text-gray-500">per hour</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{guide.bio}</p>

                {/* Languages */}
                <div>
                  <h4 className="text-sm text-gray-900 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h4 className="text-sm text-gray-900 mb-2">
                    Tour Specializations
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.tours.slice(0, 3).map((tour, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-amber-100 text-amber-800"
                      >
                        {tour}
                      </Badge>
                    ))}
                    {guide.tours.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600"
                      >
                        +{guide.tours.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-sm text-gray-900 mb-2">Certifications</h4>
                  <div className="space-y-1">
                    {guide.certifications.slice(0, 2).map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <AnimatedCounter target={guide.totalTours} /> tours
                    </div>
                    <div className="flex items-center">
                      <Camera className="w-4 h-4 mr-1" />
                      {guide.languages_spoken} languages
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Info className="w-4 h-4 mr-1" />
                      Profile
                    </Button>
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Book Tour
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl text-gray-900 mb-4">
              Ready to Explore {countryData.name}?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our expert guides will take you on an unforgettable journey
              through {countryData.name}'s rich history and cultural heritage.
              Book your personalized historical tour today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Play className="w-4 h-4 mr-2" />
                Start Planning Your Tour
              </Button>
              <Button size="lg" variant="outline">
                <Info className="w-4 h-4 mr-2" />
                Learn More About {countryData.name}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
