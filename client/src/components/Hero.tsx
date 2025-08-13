import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  Globe,
  Sparkles,
  Map,
  Calendar,
  Heart,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import AnimatedCounter from "./AnimatedCounter";
import { LogoHero, HeritageSymbol } from "./Logo";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

import {
  AnimatedHeading,
  AnimatedParagraph,
  AnimatedContainer,
  AnimatedItem,
  AnimatedText,
} from "./AnimatedText";
import { motion } from "motion/react";

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
        <motion.div
          className="absolute top-20 left-10 transform rotate-12"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 0.05, scale: 1, rotate: 12 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <HeritageSymbol className="w-32 h-32 text-amber-600" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 transform -rotate-12"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 0.05, scale: 1, rotate: -12 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <HeritageSymbol className="w-24 h-24 text-orange-600" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 transform rotate-45"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 0.05, scale: 1, rotate: 45 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <HeritageSymbol className="w-28 h-28 text-red-600" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 transform -rotate-45"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 0.05, scale: 1, rotate: -45 }}
          transition={{ duration: 2, delay: 2.5 }}
        >
          <HeritageSymbol className="w-20 h-20 text-yellow-600" />
        </motion.div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6 }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-16">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Main Logo Display - Always Visible with Animation */}
            <AnimatedText
              className="flex justify-center lg:justify-start"
              delay={0}
              duration={1}
              direction="fade"
            >
              <LogoHero />
            </AnimatedText>

            {/* Dynamic Content from Carousel */}
            <Carousel
              setApi={setCarouselApi}
              className="w-full max-w-2xl mx-auto lg:mx-0"
            >
              <CarouselContent>
                {heroSlides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <AnimatedContainer staggerDelay={0.15} initialDelay={0.3}>
                      <div className="space-y-6">
                        {/* Featured Badge */}
                        <AnimatedItem
                          className="flex justify-center lg:justify-start"
                          direction="fade"
                        >
                          <Badge
                            className={`bg-gradient-to-r ${currentTheme.badge} px-4 py-2 transition-all duration-500`}
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            {slide.badge}
                          </Badge>
                        </AnimatedItem>

                        {/* Title and Subtitle */}
                        <div className="space-y-2">
                          <AnimatedItem direction="up">
                            <AnimatedHeading className="text-4xl lg:text-5xl text-gray-900 leading-tight">
                              {slide.title}
                            </AnimatedHeading>
                          </AnimatedItem>
                          <AnimatedItem direction="up">
                            <AnimatedText
                              className="text-xl text-gray-700"
                              delay={0.2}
                              stagger={true}
                            >
                              {slide.subtitle}
                            </AnimatedText>
                          </AnimatedItem>
                        </div>

                        {/* Description */}
                        <AnimatedItem direction="up">
                          <AnimatedParagraph className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {slide.description}
                          </AnimatedParagraph>
                        </AnimatedItem>

                        {/* CTA Buttons */}
                        <AnimatedItem direction="up">
                          <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: {
                                  staggerChildren: 0.1,
                                  delayChildren: 0.8,
                                },
                              },
                            }}
                          >
                            <motion.div
                              variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                              }}
                            >
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
                            </motion.div>
                            <motion.div
                              variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                              }}
                            >
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
                            </motion.div>
                          </motion.div>
                        </AnimatedItem>
                      </div>
                    </AnimatedContainer>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Popular/Trending Stats - Restored with Animation */}
            <AnimatedText
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              delay={1.2}
              direction="up"
            >
              <AnimatedHeading
                className="text-sm font-medium text-gray-500 mb-4 text-center lg:text-left"
                delay={1.4}
              >
                Popular Right Now
              </AnimatedHeading>
              <AnimatedContainer
                className="grid grid-cols-2 gap-4"
                staggerDelay={0.1}
                initialDelay={1.6}
              >
                {popularStats.map((stat) => (
                  <AnimatedItem
                    key={stat.label}
                    className="flex items-center space-x-3"
                    direction="left"
                  >
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
                  </AnimatedItem>
                ))}
              </AnimatedContainer>
            </AnimatedText>

            {/* Core Stats */}
            <AnimatedContainer
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              staggerDelay={0.2}
              initialDelay={1.8}
            >
              <AnimatedItem className="text-center" direction="up">
                <div className="text-2xl text-amber-600 mb-1">
                  <AnimatedCounter target={54} />
                </div>
                <div className="text-xs text-gray-600">Countries</div>
              </AnimatedItem>
              <AnimatedItem className="text-center" direction="up">
                <div className="text-2xl text-orange-600 mb-1">
                  <AnimatedCounter target={500} suffix="+" />
                </div>
                <div className="text-xs text-gray-600">Stories</div>
              </AnimatedItem>
              <AnimatedItem className="text-center" direction="up">
                <div className="text-2xl text-red-600 mb-1">
                  <AnimatedCounter target={16} />
                </div>
                <div className="text-xs text-gray-600">Languages</div>
              </AnimatedItem>
            </AnimatedContainer>

            {/* Educational Focus */}
            <AnimatedText
              className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600"
              delay={2.2}
              direction="fade"
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-amber-600" />
                <span>For Educators</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-orange-600" />
                <span>Interactive Learning</span>
              </div>
            </AnimatedText>
          </div>

          {/* Right Content - Image Carousel with Animation */}
          <AnimatedText
            className="relative"
            delay={0.5}
            direction="right"
            duration={0.8}
          >
            <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-amber-50">
              <CardContent className="p-0">
                <Carousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {heroSlides.map((slide) => (
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
                          <motion.div
                            className="absolute bottom-6 left-6 right-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                          >
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                              <AnimatedHeading
                                className="text-lg text-gray-900 mb-2"
                                delay={1.2}
                              >
                                {slide.title}
                              </AnimatedHeading>
                              <AnimatedParagraph
                                className="text-sm text-gray-600 mb-3 line-clamp-2"
                                delay={1.4}
                              >
                                {slide.description}
                              </AnimatedParagraph>
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.6, duration: 0.3 }}
                              >
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
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Custom Navigation */}
                  <CarouselPrevious className="left-4 bg-white/90 border-white/50 hover:bg-white" />
                  <CarouselNext className="right-4 bg-white/90 border-white/50 hover:bg-white" />
                </Carousel>

                {/* Slide Indicators */}
                <motion.div
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => carouselApi?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentSlide === index ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </motion.div>
              </CardContent>
            </Card>

            {/* Floating action cards with Animation */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
            >
              <div className="text-xs">Virtual Tours</div>
              <div className="text-lg font-bold">Available</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-500 to-orange-500 text-white p-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
            >
              <div className="text-xs">Free Access</div>
              <div className="text-lg font-bold">Always</div>
            </motion.div>
          </AnimatedText>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <div className="flex space-x-2">
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
}
