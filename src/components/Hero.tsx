import { useState, useEffect } from "react";
import {
  Play,
  Users,
  Globe,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage } from "../utils/LanguageContext.tsx";
import { routePreloader, commonRoutes } from "../utils/routePreloader";
import { navigationAnalytics } from "../utils/navigationAnalytics.ts";

// Featured sites data for carousel
const featuredSites = [
  {
    id: "pyramids-giza",
    title: "Pyramids of Giza",
    location: "Egypt",
    description: "The last surviving Wonder of the Ancient World",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    route: "/sites/pyramids-giza",
  },
  {
    id: "great-zimbabwe",
    title: "Great Zimbabwe",
    location: "Zimbabwe",
    description: "Medieval stone city showcasing African engineering",
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    route: "/sites/great-zimbabwe",
  },
  {
    id: "lalibela",
    title: "Rock Churches of Lalibela",
    location: "Ethiopia",
    description: "Remarkable churches carved from solid rock",
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    route: "/sites/lalibela",
  },
  {
    id: "djenne",
    title: "Great Mosque of Djenné",
    location: "Mali",
    description: "World's largest mud-brick building",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    route: "/sites/djenne-mosque",
  },
];

// Featured Sites Carousel Component
function FeaturedSitesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSites.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSites.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredSites.length) % featuredSites.length
    );
  };

  const goToSite = (site: (typeof featuredSites)[0]) => {
    navigationAnalytics.trackNavigation(site.route, "/");
    navigate(site.route);
  };

  const currentSite = featuredSites[currentSlide];

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-[600px]">
        <ImageWithFallback
          src={currentSite.image}
          alt={currentSite.title}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Previous site"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Next site"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
          {featuredSites.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Site Information Card */}
        <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 mr-2"
                >
                  Featured Site
                </Badge>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {currentSite.location}
                </div>
              </div>
              <h3 className="text-xl text-gray-900 mb-1">
                {currentSite.title}
              </h3>
              <p className="text-gray-600 text-sm">{currentSite.description}</p>
            </div>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 ml-4"
              onClick={() => goToSite(currentSite)}
            >
              {t("learnMore")} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Preload common routes when component mounts
  useEffect(() => {
    routePreloader.preloadRoutes(commonRoutes);
  }, []);

  // Track navigation with analytics
  const handleNavigation = (path: string) => {
    navigationAnalytics.trackNavigation(path, "/");
    navigate(path);
  };

  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-amber-400 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-orange-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-red-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 px-4 py-2"
              >
                <Globe className="w-4 h-4 mr-2" />
                {t("welcome")}
              </Badge>

              <h1 className="text-5xl lg:text-7xl text-gray-900 leading-tight">
                {t("heroTitle").split(" ").slice(0, 1)}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  {t("heroTitle").split(" ").slice(1, 3).join(" ")}
                </span>
                {t("heroTitle").split(" ").slice(3).join(" ")}
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* Animated Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl text-amber-600 mb-1">
                  <AnimatedCounter target={5000} suffix="+" />
                </div>
                <div className="text-sm text-gray-600">
                  Historical Artifacts
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-orange-600 mb-1">
                  <AnimatedCounter target={54} />
                </div>
                <div className="text-sm text-gray-600">African Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-red-600 mb-1">
                  <AnimatedCounter target={16} />
                </div>
                <div className="text-sm text-gray-600">Supported Languages</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg"
                onClick={() => handleNavigation("/timeline")}
              >
                <Play className="w-5 h-5 mr-2" />
                {t("exploreNow")}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg"
                onClick={() => handleNavigation("/resources/virtual-tours")}
              >
                <Users className="w-5 h-5 mr-2" />
                Virtual Tours
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">Popular:</span>
              <Link
                to="/regions/1"
                className="text-sm text-amber-600 hover:text-amber-700 underline"
              >
                Ancient Egypt
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/regions/2"
                className="text-sm text-amber-600 hover:text-amber-700 underline"
              >
                Mali Empire
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/regions/5"
                className="text-sm text-amber-600 hover:text-amber-700 underline"
              >
                Great Zimbabwe
              </Link>
            </div>
          </div>

          {/* Featured Sites Carousel */}
          <div className="relative">
            <FeaturedSitesCarousel />

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Featured Learning Paths */}
      <div className="container mx-auto px-4 pb-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "For Students",
              description: "Interactive activities and quizzes",
              icon: BookOpen,
              link: "/resources/student-activities",
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "For Educators",
              description: "Curriculum guides and resources",
              icon: Users,
              link: "/resources/teacher-guides",
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "For Researchers",
              description: "Academic papers and databases",
              icon: Globe,
              link: "/resources/research-papers",
              color: "from-purple-500 to-violet-500",
            },
          ].map((path, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(path.link)}
              className="group block bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left w-full"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <path.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {path.title}
              </h3>
              <p className="text-gray-600 text-sm">{path.description}</p>
              <ArrowRight className="w-4 h-4 text-gray-400 mt-4 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
