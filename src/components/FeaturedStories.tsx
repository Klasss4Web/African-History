import {
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import { useNavigation } from "./Navigation";

const stories = [
  {
    id: 1,
    title: "The Wealth of Mansa Musa: Richest Person in History",
    excerpt:
      "Discover how the ruler of the Mali Empire became the wealthiest person who ever lived and changed the course of African and world history.",
    author: "Dr. Amina Hassan",
    readTime: "8 min read",
    category: "Biography",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 245,
    comments: 18,
    publishedDate: "2023-11-15",
  },
  {
    id: 2,
    title: "Queen Nzinga: The Warrior Queen of Angola",
    excerpt:
      "Learn about the brilliant military strategist who resisted Portuguese colonization for over 30 years and became one of Africa's greatest leaders.",
    author: "Dr. Fatima Mbeki",
    readTime: "10 min read",
    category: "Biography",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 189,
    comments: 12,
    publishedDate: "2023-10-28",
  },
  {
    id: 3,
    title: "The Great Libraries of Timbuktu: Africa's Intellectual Legacy",
    excerpt:
      "Explore the magnificent manuscript collections that made Timbuktu a world center of learning during the medieval period.",
    author: "Prof. Omar Diallo",
    readTime: "12 min read",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 156,
    comments: 8,
    publishedDate: "2023-11-02",
  },
  {
    id: 4,
    title: "Rock Art of the Sahara: Windows into Prehistoric Africa",
    excerpt:
      "Journey through thousands of years of Saharan rock art that reveals the rich cultural heritage of ancient African peoples.",
    author: "Dr. Sarah Mitchell",
    readTime: "9 min read",
    category: "Art & Culture",
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 134,
    comments: 15,
    publishedDate: "2023-09-20",
  },
];

export default function FeaturedStories() {
  const { navigateTo } = useNavigation();

  const getCategoryColor = (category: string) => {
    const colors = {
      Biography: "bg-purple-100 text-purple-700",
      "Art & Culture": "bg-green-100 text-green-700",
      Education: "bg-blue-100 text-blue-700",
      Politics: "bg-red-100 text-red-700",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Featured Stories
          </Badge>
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Discover African Heritage
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore fascinating stories of African civilizations, leaders, and
            cultural achievements that have shaped our world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigateTo("story-detail", { id: story.id })}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getCategoryColor(story.category)}>
                    {story.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                      <Heart className="w-3 h-3" />
                      <span>{story.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{story.comments}</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg group-hover:text-amber-600 transition-colors mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">
                        {story.author}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {story.readTime}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-amber-50 group-hover:text-amber-600 p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo("story-detail", { id: story.id });
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-amber-600 text-amber-600 hover:bg-amber-50"
            onClick={() => navigateTo("stories")}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            View All Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
