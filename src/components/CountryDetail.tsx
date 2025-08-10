import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  Globe,
  Star,
  Camera,
  Play,
  BookOpen,
  TrendingUp,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import AnimatedCounter from "./AnimatedCounter";
import { countryData } from "../data/countryData";

// SEO optimized metadata for each country
const countryMetadata = {
  egypt: {
    title: "Egypt - Ancient Land of Pharaohs | African History",
    description:
      "Explore ancient Egypt's pyramids, pharaohs, and Nile civilization. Discover tour guides, historical sites, and cultural heritage.",
    keywords:
      "Egypt, Ancient Egypt, Pyramids, Pharaohs, Nile River, Cairo, Giza, African History",
  },
  ethiopia: {
    title: "Ethiopia - Cradle of Humanity | African History",
    description:
      "Discover Ethiopia's ancient kingdoms, rock churches of Lalibela, and rich cultural heritage. Find expert tour guides and historical insights.",
    keywords:
      "Ethiopia, Lalibela, Aksum, Ethiopian Orthodox, African Christianity, Haile Selassie, African History",
  },
};

// Tour guides data integrated into country details
const tourGuidesPreview = {
  egypt: [
    {
      id: 1,
      name: "Ahmed Hassan",
      specialty: "Ancient Egyptian History",
      rating: 4.9,
      experience: "15 years",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&crop=face&fit=crop",
      tours: 450,
      languages: ["Arabic", "English", "French"],
    },
    {
      id: 2,
      name: "Fatima Al-Rashid",
      specialty: "Islamic Cairo & Coptic Heritage",
      rating: 4.8,
      experience: "12 years",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=100&h=100&crop=face&fit=crop",
      tours: 320,
      languages: ["Arabic", "English", "German"],
    },
  ],
  ethiopia: [
    {
      id: 3,
      name: "Tekle Wolde",
      specialty: "Ancient Ethiopian Kingdoms",
      rating: 4.9,
      experience: "18 years",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&crop=face&fit=crop",
      tours: 380,
      languages: ["Amharic", "English", "Italian"],
    },
  ],
};

export default function CountryDetail() {
  const { countryCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");

  const country = countryData[countryCode as keyof typeof countryData];
  const metadata = countryMetadata[countryCode as keyof typeof countryMetadata];
  const guides =
    tourGuidesPreview[countryCode as keyof typeof tourGuidesPreview] || [];

  // SEO optimization: Update document metadata
  useEffect(() => {
    if (metadata && country) {
      document.title = metadata.title;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", metadata.description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = metadata.description;
        document.head.appendChild(meta);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", metadata.keywords);
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = metadata.keywords;
        document.head.appendChild(meta);
      }

      // Structured data for SEO
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Place",
        name: country.name,
        description: country.overview,
        geo: {
          "@type": "GeoCoordinates",
          latitude: country.coordinates.lat,
          longitude: country.coordinates.lng,
        },
        hasMap: `https://maps.google.com?q=${country.coordinates.lat},${country.coordinates.lng}`,
        touristType: ["Culture", "History", "Education"],
        knowsAbout: country.culture?.traditions || [],
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        const existingScript = document.querySelector(
          'script[type="application/ld+json"]'
        );
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [country, metadata]);

  // Performance optimization: Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [countryCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Country Not Found</h1>
          <p className="text-gray-600 mb-6">
            The requested country details are not available.
          </p>
          <Button asChild>
            <Link to="/regions">Back to Regions</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/regions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Regions
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 overflow-hidden">
          <ImageWithFallback
            src={country.images.hero}
            alt={`${country.name} landscape`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl">{country.flag}</span>
                  <div>
                    <h1 className="text-4xl lg:text-5xl text-white mb-2">
                      {country.name}
                    </h1>
                    <p className="text-lg text-white/90">
                      {country.officialName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex gap-4">
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-gray-900 mb-1">
                      <AnimatedCounter
                        target={parseInt(
                          country.population.replace(/[^\d.]/g, "")
                        )}
                      />
                      M
                    </div>
                    <div className="text-sm text-gray-600">Population</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl text-gray-900 mb-1">
                      {country.sites?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Heritage Sites</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Capital", value: country.capital, icon: MapPin },
              {
                label: "Languages",
                value: country.languages.length,
                icon: Globe,
                suffix: " spoken",
              },
              { label: "Area", value: country.area, icon: TrendingUp },
              {
                label: "Currency",
                value: country.currency.split(" ")[0],
                icon: Award,
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-lg text-gray-900">
                    {typeof stat.value === "number" ? (
                      <>
                        <AnimatedCounter target={stat.value} />
                        {stat.suffix}
                      </>
                    ) : (
                      stat.value
                    )}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-12">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="sites">Sites</TabsTrigger>
            <TabsTrigger value="guides">Tour Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About {country.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {country.overview}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg text-gray-900 mb-3">
                          Geography
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Climate:</span>
                            <span className="text-gray-900">
                              {country.geography?.climate}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">
                              Natural Features:
                            </span>
                            <div className="mt-1">
                              {country.geography?.naturalFeatures
                                ?.slice(0, 3)
                                .map((feature: string, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="mr-1 mb-1 text-xs"
                                  >
                                    {feature}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg text-gray-900 mb-3">
                          Demographics
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Urban Population:
                            </span>
                            <span className="text-gray-900">
                              {country.demographics?.urbanPopulation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Literacy Rate:
                            </span>
                            <span className="text-gray-900">
                              {country.demographics?.literacyRate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Life Expectancy:
                            </span>
                            <span className="text-gray-900">
                              {country.demographics?.lifeExpectancy}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Modern Challenges */}
                <Card>
                  <CardHeader>
                    <CardTitle>Modern Challenges & Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {country.modernChallenges?.map(
                        (challenge: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <TrendingUp className="w-4 h-4 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{challenge}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Languages Spoken
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {country.languages.map(
                        (language: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="mr-1 mb-1"
                          >
                            {language}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Economic Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">GDP:</span>
                        <span className="text-gray-900">
                          {country.economy?.gdp}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">GDP per Capita:</span>
                        <span className="text-gray-900">
                          {country.economy?.gdpPerCapita}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-2">
                          Major Industries:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {country.economy?.majorIndustries
                            ?.slice(0, 4)
                            .map((industry: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {industry}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ancient History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {country.history?.ancient?.periods?.map(
                      (period: any, index: number) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-500 pl-6"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg text-gray-900">
                              {period.name}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {period.dates}
                            </Badge>
                          </div>
                          <p className="text-gray-700">{period.description}</p>
                        </div>
                      )
                    )}

                    <div className="mt-8">
                      <h4 className="text-lg text-gray-900 mb-4">
                        Key Achievements
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {country.history?.ancient?.achievements?.map(
                          (achievement: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <Award className="w-4 h-4 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">
                                {achievement}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Modern History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {country.history?.modern?.keyEvents?.map(
                      (event: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-16 text-center flex-shrink-0">
                            <Badge variant="secondary" className="text-xs">
                              {event.year}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900">{event.event}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="culture">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Traditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {country.culture?.traditions?.map(
                      (tradition: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{tradition}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Arts & Literature</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-gray-900 mb-2">Artistic Forms</h5>
                      <div className="flex flex-wrap gap-1">
                        {country.culture?.arts?.map(
                          (art: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {art}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-gray-900 mb-2">
                        Literary Traditions
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {country.culture?.literature?.map(
                          (lit: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {lit}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Traditional Cuisine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {country.culture?.cuisine
                      ?.slice(0, 6)
                      .map((dish: string, index: number) => (
                        <div
                          key={index}
                          className="text-center p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="text-2xl mb-2">🍽️</div>
                          <div className="text-sm text-gray-900">{dish}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sites">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.sites?.map((site: any, index: number) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg text-gray-900">{site.name}</h3>
                        <Badge
                          variant={site.unescoSite ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {site.unescoSite ? "UNESCO" : site.type}
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {site.significance}
                      </p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Location:</span>
                          <span className="text-gray-900">{site.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            Annual Visitors:
                          </span>
                          <span className="text-gray-900">
                            {site.visitorsPerYear}
                          </span>
                        </div>
                      </div>

                      <Button asChild size="sm" className="w-full">
                        <Link
                          to={`/sites/${site.name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl text-gray-900 mb-4">
                  Expert Tour Guides
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Connect with experienced local guides who bring {country.name}
                  's history to life through personalized tours and deep
                  cultural insights.
                </p>
              </div>

              {guides.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {guides.map((guide) => (
                      <Card
                        key={guide.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                              <img
                                src={guide.avatar}
                                alt={guide.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg text-gray-900 mb-1">
                                {guide.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                {guide.specialty}
                              </p>
                              <div className="flex items-center gap-3 text-sm">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                  {guide.rating}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 text-gray-500 mr-1" />
                                  {guide.tours} tours
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                                  {guide.experience}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm text-gray-900 mb-1">
                                Languages
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {guide.languages.map((lang, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-3">
                              <Button asChild size="sm" className="flex-1">
                                <Link
                                  to={`/regions/1/countries/${countryCode}/tour-guide`}
                                >
                                  View All Guides
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline">
                                <Play className="w-4 h-4 mr-1" />
                                Book Tour
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-xl text-gray-900 mb-4">
                        Ready to Explore {country.name}?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Our expert guides offer personalized historical tours
                        that bring the past to life. From ancient monuments to
                        cultural experiences, discover {country.name} with
                        knowledgeable locals.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                          <Link
                            to={`/regions/1/countries/${countryCode}/tour-guide`}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Browse All Tour Guides
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                          <Link to="/resources/virtual-tours">
                            <Camera className="w-4 h-4 mr-2" />
                            Virtual Tours
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl text-gray-900 mb-2">
                      Tour Guides Coming Soon
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We're working on connecting you with expert local guides
                      for {country.name}. In the meantime, explore our virtual
                      tours and educational resources.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild>
                        <Link to="/resources/virtual-tours">
                          <Camera className="w-4 h-4 mr-2" />
                          Virtual Tours
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/resources">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Educational Resources
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
