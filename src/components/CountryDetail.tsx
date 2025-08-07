import { MapPin, Flag, Users, Globe, BookOpen, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigation } from "./Navigation";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

interface CountryDetailProps {
  countryCode: string;
}

const simpleCountryData: { [key: string]: any } = {
  egypt: {
    name: "Egypt",
    officialName: "Arab Republic of Egypt",
    region: "North Africa",
    capital: "Cairo",
    population: "104.3 million",
    area: "1,010,408 km²",
    languages: ["Arabic", "English", "French"],
    currency: "Egyptian Pound (EGP)",
    overview:
      "Egypt is a transcontinental country spanning the northeast corner of Africa and southwest corner of Asia. It is home to one of the world's oldest civilizations and contains numerous archaeological treasures.",
    flag: "🇪🇬",
    heroImage:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  ethiopia: {
    name: "Ethiopia",
    officialName: "Federal Democratic Republic of Ethiopia",
    region: "East Africa",
    capital: "Addis Ababa",
    population: "120.3 million",
    area: "1,104,300 km²",
    languages: ["Amharic", "Oromo", "Tigrinya", "English"],
    currency: "Ethiopian Birr (ETB)",
    overview:
      "Ethiopia is a landlocked country in the Horn of Africa. It is one of the few African countries never to have been fully colonized and is home to ancient civilizations and the source of the Blue Nile.",
    flag: "🇪🇹",
    heroImage:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
};

export default function CountryDetail({ countryCode }: CountryDetailProps) {
  const { navigateTo } = useNavigation();
  const country = simpleCountryData[countryCode];

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-2">Country Not Found</h2>
          <p className="text-gray-600 mb-4">
            The requested country could not be found.
          </p>
          <Button onClick={() => navigateTo("regions")}>Back to Regions</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{country.flag}</div>
                <div>
                  <h1 className="text-4xl lg:text-5xl text-gray-900">
                    {country.name}
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    {country.officialName}
                  </p>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    {country.region} • Capital: {country.capital}
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {country.overview}
              </p>

              <div className="grid grid-cols-2 gap-6 py-6 border-t border-gray-200">
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">Population</span>
                  </div>
                  <div className="text-xl text-gray-900">
                    {country.population}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="text-sm">Area</span>
                  </div>
                  <div className="text-xl text-gray-900">{country.area}</div>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Flag className="w-4 h-4 mr-2" />
                    <span className="text-sm">Languages</span>
                  </div>
                  <div className="text-gray-900">
                    {country.languages.slice(0, 2).join(", ")}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="text-sm">Currency</span>
                  </div>
                  <div className="text-gray-900">{country.currency}</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore History
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigateTo("virtual-tours")}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Button>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src={country.heroImage}
                alt={`${country.name} landscape`}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-center">
                  <div className="text-2xl text-blue-600">4</div>
                  <div className="text-xs text-gray-600">UNESCO Sites</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Country Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-center">
                  {country.overview}
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-600 mb-2">Population</h4>
                    <div className="text-xl text-gray-900">
                      {country.population}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-600 mb-2">Area</h4>
                    <div className="text-xl text-gray-900">{country.area}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm text-gray-600 mb-2">Capital</h4>
                    <div className="text-xl text-gray-900">
                      {country.capital}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-lg text-gray-900 mb-3">
                    Languages Spoken
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {country.languages.map(
                      (language: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    onClick={() => navigateTo("interactive-map")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Interactive Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
