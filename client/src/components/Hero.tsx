import {
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Map,
  Calendar,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "./ui/carousel";
import { Link } from "react-router-dom";
import { LogoHero, HeritageSymbol } from "./Logo";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import AnimatedCounter from "./AnimatedCounter";
import { useState, useEffect } from "react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
  theme: "amber" | "orange" | "red" | "green" | "blue";
}

const heroSlides: HeroSlide[] = [
  {
    id: "ancient-kingdoms",
    title: "Ancient African Kingdoms",
    subtitle: "Discover Lost Civilizations",
    description:
      "Journey through the magnificent kingdoms of Kush, Aksum, and Great Zimbabwe. Explore architectural marvels and uncover the secrets of powerful dynasties that ruled for millennia.",
    imageUrl:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGtpbmdkb20lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ctaText: "Explore Kingdoms",
    ctaLink: "/timeline?period=ancient",
    badge: "Featured Collection",
    theme: "amber",
  },
  {
    id: "cultural-heritage",
    title: "Rich Cultural Heritage",
    subtitle: "Traditions Across Generations",
    description:
      "Immerse yourself in vibrant traditions, art forms, and cultural practices that have shaped African societies. From ancient rituals to modern expressions of identity.",
    imageUrl:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBjdWx0dXJlJTIwYXJ0fGVufDF8fHx8MTc1NDQ2OTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    ctaText: "Discover Culture",
    ctaLink: "/stories?category=culture",
    badge: "Popular Stories",
    theme: "orange",
  },
  {
    id: "historical-figures",
    title: "Legendary Leaders",
    subtitle: "Heroes Who Shaped History",
    description:
      "Meet extraordinary leaders like Queen Nzinga, Hannibal, and Mansa Musa. Learn about their achievements and lasting impact on African and world history.",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaGlzdG9yaWNhbCUyMGxlYWRlcnN8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ctaText: "Meet Heroes",
    ctaLink: "/people",
    badge: "Inspiring Figures",
    theme: "red",
  },
  {
    id: "natural-wonders",
    title: "Geographic Wonders",
    subtitle: "Landscapes That Tell Stories",
    description:
      "From the Sahara Desert to Victoria Falls, explore how Africa's diverse geography influenced civilizations, trade routes, and cultural development.",
    imageUrl:
      "https://images.unsplash.com/photo-1484318571209-661cf29a69ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbGFuZHNjYXBlJTIwc2FoYXJhfGVufDF8fHx8MTc1NDQ2OTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    ctaText: "Explore Geography",
    ctaLink: "/regions",
    badge: "Natural Heritage",
    theme: "green",
  },
  {
    id: "modern-africa",
    title: "Modern African Renaissance",
    subtitle: "Contemporary Achievements",
    description:
      "Discover modern African innovations, scientific contributions, and cultural influence on the global stage. See how ancient wisdom meets modern progress.",
    imageUrl:
      "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZnJpY2FuJTIwY2l0eXxlbnwxfHx8fDE3NTQ0Njk4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ctaText: "See Progress",
    ctaLink: "/timeline?period=modern",
    badge: "Current Era",
    theme: "blue",
  },
];

// Popular fields/statistics with real engagement data
const popularStats = [
  {
    label: "Most Visited",
    value: "Ancient Egypt",
    count: "15,247",
    icon: Heart,
    color: "text-red-600",
  },
  {
    label: "Trending Topic",
    value: "Great Zimbabwe",
    count: "8,934",
    icon: Sparkles,
    color: "text-amber-600",
  },
  {
    label: "Popular Era",
    value: "Medieval Period",
    count: "12,156",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    label: "Top Region",
    value: "West Africa",
    count: "21,087",
    icon: Map,
    color: "text-green-600",
  },
];

export default function Hero() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Track current slide
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Auto-advance carousel
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % heroSlides.length;
      carouselApi.scrollTo(nextIndex);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [carouselApi, currentSlide]);

  const getThemeClasses = (theme: string) => {
    const themes = {
      amber: {
        gradient: "from-amber-50 via-orange-50 to-red-50",
        badge: "from-amber-100 to-orange-100 text-amber-800 border-amber-200",
        button:
          "from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700",
        accent: "border-amber-300 text-amber-700 hover:bg-amber-50",
      },
      orange: {
        gradient: "from-orange-50 via-red-50 to-pink-50",
        badge: "from-orange-100 to-red-100 text-orange-800 border-orange-200",
        button:
          "from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700",
        accent: "border-orange-300 text-orange-700 hover:bg-orange-50",
      },
      red: {
        gradient: "from-red-50 via-pink-50 to-rose-50",
        badge: "from-red-100 to-pink-100 text-red-800 border-red-200",
        button: "from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700",
        accent: "border-red-300 text-red-700 hover:bg-red-50",
      },
      green: {
        gradient: "from-green-50 via-emerald-50 to-teal-50",
        badge: "from-green-100 to-emerald-100 text-green-800 border-green-200",
        button:
          "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
        accent: "border-green-300 text-green-700 hover:bg-green-50",
      },
      blue: {
        gradient: "from-blue-50 via-indigo-50 to-purple-50",
        badge: "from-blue-100 to-indigo-100 text-blue-800 border-blue-200",
        button:
          "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
        accent: "border-blue-300 text-blue-700 hover:bg-blue-50",
      },
    };
    return themes[theme as keyof typeof themes] || themes.amber;
  };

  const currentTheme = getThemeClasses(
    heroSlides[currentSlide]?.theme || "amber"
  );

  return (
    <section
      className={`relative min-h-screen bg-gradient-to-br ${currentTheme.gradient} overflow-hidden transition-all duration-1000`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 transform rotate-12">
          <HeritageSymbol className="w-32 h-32 text-amber-600" />
        </div>
        <div className="absolute top-40 right-20 transform -rotate-12">
          <HeritageSymbol className="w-24 h-24 text-orange-600" />
        </div>
        <div className="absolute bottom-32 left-20 transform rotate-45">
          <HeritageSymbol className="w-28 h-28 text-red-600" />
        </div>
        <div className="absolute bottom-20 right-10 transform -rotate-45">
          <HeritageSymbol className="w-20 h-20 text-yellow-600" />
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-16">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Main Logo Display - Always Visible */}
            <div className="flex justify-center lg:justify-start">
              <LogoHero />
            </div>

            {/* Dynamic Content from Carousel */}
            <Carousel
              setApi={setCarouselApi}
              className="w-full max-w-2xl mx-auto lg:mx-0"
            >
              <CarouselContent>
                {heroSlides.map((slide, index) => (
                  <CarouselItem key={slide.id}>
                    <div className="space-y-6">
                      {/* Featured Badge */}
                      <div className="flex justify-center lg:justify-start">
                        <Badge
                          className={`bg-gradient-to-r ${currentTheme.badge} px-4 py-2 transition-all duration-500`}
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          {slide.badge}
                        </Badge>
                      </div>

                      {/* Title and Subtitle */}
                      <div className="space-y-2">
                        <h1 className="text-4xl lg:text-5xl text-gray-900 leading-tight">
                          {slide.title}
                        </h1>
                        <h2 className="text-xl text-gray-700">
                          {slide.subtitle}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button
                          asChild
                          size="lg"
                          className={`bg-gradient-to-r ${currentTheme.button} shadow-lg hover:shadow-xl transition-all duration-200`}
                        >
                          <Link to={slide.ctaLink}>
                            <BookOpen className="w-5 h-5 mr-2" />
                            {slide.ctaText}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className={currentTheme.accent}
                        >
                          <Link to="/regions">
                            <Globe className="w-5 h-5 mr-2" />
                            Browse Regions
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Popular/Trending Stats - Restored */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-4 text-center lg:text-left">
                Popular Right Now
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {popularStats.map((stat, index) => (
                  <div key={stat.label} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {stat.label} • {stat.count} views
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl text-amber-600 mb-1">
                  <AnimatedCounter target={54} />
                </div>
                <div className="text-xs text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-orange-600 mb-1">
                  <AnimatedCounter target={500} suffix="+" />
                </div>
                <div className="text-xs text-gray-600">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-red-600 mb-1">
                  <AnimatedCounter target={16} />
                </div>
                <div className="text-xs text-gray-600">Languages</div>
              </div>
            </div>

            {/* Educational Focus */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-amber-600" />
                <span>For Educators</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-orange-600" />
                <span>Interactive Learning</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-amber-50">
              <CardContent className="p-0">
                <Carousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {heroSlides.map((slide, index) => (
                      <CarouselItem key={slide.id}>
                        <div className="relative">
                          <ImageWithFallback
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-96 object-cover transition-all duration-500"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                          {/* Featured Content */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                              <h3 className="text-lg text-gray-900 mb-2">
                                {slide.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {slide.description}
                              </p>
                              <Button
                                asChild
                                size="sm"
                                className={`bg-gradient-to-r ${currentTheme.button}`}
                              >
                                <Link to={slide.ctaLink}>
                                  Discover More
                                  <ArrowRight className="w-3 h-3 ml-2" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Custom Navigation */}
                  <CarouselPrevious className="left-4 bg-white/90 border-white/50 hover:bg-white" />
                  <CarouselNext className="right-4 bg-white/90 border-white/50 hover:bg-white" />
                </Carousel>

                {/* Slide Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => carouselApi?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentSlide === index ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Floating action cards */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-lg shadow-lg">
              <div className="text-xs">Virtual Tours</div>
              <div className="text-lg font-bold">Available</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-500 to-orange-500 text-white p-3 rounded-lg shadow-lg">
              <div className="text-xs">Free Access</div>
              <div className="text-lg font-bold">Always</div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2 opacity-60">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
