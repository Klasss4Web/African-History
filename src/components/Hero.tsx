import { Play, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import { useNavigation } from "./Navigation";

export default function Hero() {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800"
              >
                🌍 Discover Our Heritage
              </Badge>
              <h1 className="text-4xl lg:text-6xl text-gray-900 leading-tight">
                Journey Through
                <span className="block text-amber-600">African History</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Explore thousands of years of rich African civilization, from
                ancient kingdoms to modern achievements. Discover the stories
                that shaped our world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => navigateTo("timeline")}
              >
                Start Exploring
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-amber-600 text-amber-600 hover:bg-amber-50"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Introduction
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl text-amber-600">5000+</div>
                <div className="text-sm text-gray-600">Years of History</div>
              </div>
              <div>
                <div className="text-2xl text-amber-600">54</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-2xl text-amber-600">1000+</div>
                <div className="text-sm text-gray-600">Stories</div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Ancient African architecture"
                    className="w-full h-48 object-cover"
                    onClick={() => navigateTo("period-detail", { id: 1 })}
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Traditional African textiles"
                    className="w-full h-32 object-cover"
                    onClick={() => navigateTo("regions")}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative overflow-hidden rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="African cultural heritage"
                    className="w-full h-40 object-cover"
                    onClick={() => navigateTo("stories")}
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Ancient African civilization"
                    className="w-full h-40 object-cover"
                    onClick={() => navigateTo("people")}
                  />
                </div>
              </div>
            </div>

            {/* Floating element */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🏛️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
