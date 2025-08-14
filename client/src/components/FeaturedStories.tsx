import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Star,
  Eye,
  Filter,
  Search,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import AnimatedCounter from "./AnimatedCounter";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

const stories = [
  {
    id: 1,
    title:
      "The Great Library of Alexandria: Africa's Ancient Center of Learning",
    excerpt:
      "Discover how Alexandria became the intellectual heart of the ancient world, attracting scholars from across Africa and beyond to its legendary library and museum.",
    category: "Ancient Learning",
    author: "Dr. Amara Okonkwo",
    readTime: "8 min read",
    publishedAt: "2024-01-15",
    likes: 1240,
    comments: 89,
    views: 15600,
    featured: true,
    tags: ["Ancient Egypt", "Education", "Library", "Scholarship"],
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    title: "Queen Nzinga: The Warrior Queen Who Defied Colonial Powers",
    excerpt:
      "The remarkable story of Queen Nzinga of Ndongo and Matamba, who led resistance against Portuguese colonization for over 30 years in 17th-century Angola.",
    category: "Resistance & Leadership",
    author: "Prof. Kofi Mensah",
    readTime: "12 min read",
    publishedAt: "2024-01-10",
    likes: 2100,
    comments: 156,
    views: 28900,
    featured: true,
    tags: ["Angola", "Leadership", "Resistance", "Women in History"],
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "The Bronzes of Benin: Masterpieces of African Art and Diplomacy",
    excerpt:
      "Explore the extraordinary bronze plaques of the Kingdom of Benin, which documented royal history and impressed European visitors with their sophisticated artistry.",
    category: "Art & Culture",
    author: "Dr. Fatima Al-Rashid",
    readTime: "10 min read",
    publishedAt: "2024-01-05",
    likes: 1850,
    comments: 201,
    views: 22400,
    featured: false,
    tags: ["Nigeria", "Art", "Kingdom of Benin", "Bronze Casting"],
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    title: "Mansa Musa's Legendary Pilgrimage: When Mali Met the World",
    excerpt:
      "Follow the epic journey of Mansa Musa to Mecca in 1324-1325, a pilgrimage so lavish it put the Mali Empire on medieval world maps and crashed gold prices in Egypt.",
    category: "Medieval Empires",
    author: "Dr. Bakary Traore",
    readTime: "15 min read",
    publishedAt: "2024-01-01",
    likes: 3200,
    comments: 298,
    views: 45600,
    featured: true,
    tags: ["Mali Empire", "Pilgrimage", "Trade", "Mansa Musa"],
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: 5,
    title:
      "The Great Pyramid's Hidden Chambers: New Archaeological Discoveries",
    excerpt:
      "Recent technological breakthroughs have revealed previously unknown chambers within the Great Pyramid of Giza, offering new insights into ancient Egyptian construction techniques.",
    category: "Modern Discoveries",
    author: "Dr. Sarah Mitchell",
    readTime: "6 min read",
    publishedAt: "2023-12-28",
    likes: 890,
    comments: 67,
    views: 12300,
    featured: false,
    tags: ["Egypt", "Archaeology", "Pyramids", "Technology"],
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 6,
    title: "Ubuntu Philosophy: The African Concept That's Changing the World",
    excerpt:
      "Discover how the Southern African philosophy of Ubuntu - 'I am because we are' - is influencing modern approaches to community building, leadership, and social justice globally.",
    category: "Philosophy & Culture",
    author: "Prof. Nomsa Dlamini",
    readTime: "11 min read",
    publishedAt: "2023-12-22",
    likes: 1560,
    comments: 134,
    views: 19800,
    featured: false,
    tags: ["South Africa", "Philosophy", "Ubuntu", "Community"],
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-indigo-400 to-purple-500",
  },
  {
    id: 7,
    title: "The Kingdom of Kush: Nubia's Golden Age",
    excerpt:
      "Explore the powerful Kingdom of Kush that ruled over Nubia and even Egypt for nearly a century, leaving behind magnificent pyramids and a rich cultural legacy.",
    category: "Ancient Learning",
    author: "Dr. Ahmed Hassan",
    readTime: "14 min read",
    publishedAt: "2023-12-15",
    likes: 1290,
    comments: 95,
    views: 18700,
    featured: false,
    tags: ["Sudan", "Ancient Nubia", "Pyramids", "Kingdom of Kush"],
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 8,
    title: "Shaka Zulu: Military Genius and Nation Builder",
    excerpt:
      "The story of Shaka Zulu, who revolutionized military tactics and united the Zulu nation into one of the most powerful kingdoms in Southern Africa.",
    category: "Resistance & Leadership",
    author: "Prof. Thabo Mofokeng",
    readTime: "13 min read",
    publishedAt: "2023-12-10",
    likes: 2450,
    comments: 178,
    views: 31200,
    featured: false,
    tags: ["South Africa", "Zulu Kingdom", "Military History", "Leadership"],
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "from-purple-400 to-pink-500",
  },
];

function StoryCard({ story }: { story: any; index: number }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white ${
        story.featured ? "ring-2 ring-amber-200 shadow-lg" : "hover:scale-105"
      }`}
    >
      <div className="relative">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            className={`bg-gradient-to-r ${story.color} text-white border-0 shadow-lg`}
          >
            {story.category}
          </Badge>
        </div>

        {/* Featured Badge */}
        {story.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-amber-600 text-white border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Read time */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {story.readTime}
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <h3 className="text-lg text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
            {story.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {story.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {story.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
            <Badge
              key={tagIndex}
              variant="outline"
              className="text-xs px-2 py-1"
            >
              {tag}
            </Badge>
          ))}
          {story.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{story.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Author & Date */}
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-3 h-3 mr-1" />
          <span>{story.author}</span>
          <span className="mx-2">•</span>
          <Calendar className="w-3 h-3 mr-1" />
          <span>{formatDate(story.publishedAt)}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>
                <AnimatedCounter target={story.views} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>
                <AnimatedCounter target={story.likes} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>
                <AnimatedCounter target={story.comments} />
              </span>
            </div>
          </div>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600"
          >
            <Link to={`/stories/${story.id}`}>
              Read{" "}
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedStories() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(stories.map((story) => story.category))),
  ];

  // Filter stories based on category and search
  const filteredStories = stories.filter((story) => {
    const matchesCategory =
      selectedCategory === "all" || story.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const featuredStories = filteredStories
    .filter((story) => story.featured)
    .slice(0, 3);
  const regularStories = filteredStories
    .filter((story) => !story.featured)
    .slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-100 text-blue-800 px-4 py-2"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Historical Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6">
            Stories That
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Shape Africa
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dive into captivating narratives from across African history. From
            ancient civilizations to modern discoveries, these stories bring the
            past to life through engaging storytelling and scholarly research.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-12 p-6 bg-gray-50 rounded-2xl">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg text-gray-900">
              Explore Stories by Category
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search stories..."
                className="pl-10 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Stories */}
        {featuredStories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl text-gray-900">Featured Stories</h3>
              <div className="flex items-center text-amber-600 text-sm">
                <Star className="w-4 h-4 mr-1 fill-current" />
                Editor's Picks
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* All Stories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl text-gray-900">
              {selectedCategory === "all"
                ? "All Stories"
                : `${selectedCategory} Stories`}
              <span className="text-lg text-gray-500 ml-2">
                (<AnimatedCounter target={filteredStories.length} />)
              </span>
            </h3>
            <Button asChild variant="outline">
              <Link to="/stories">
                View All Stories <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {filteredStories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {regularStories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Categories Summary */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl text-gray-900 mb-4">Story Categories</h3>
            <p className="text-gray-600">
              Discover stories organized by historical themes and time periods
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              {
                name: "Ancient Learning",
                count: stories.filter((s) => s.category === "Ancient Learning")
                  .length,
                color: "bg-blue-100 text-blue-800",
              },
              {
                name: "Medieval Empires",
                count: stories.filter((s) => s.category === "Medieval Empires")
                  .length,
                color: "bg-green-100 text-green-800",
              },
              {
                name: "Art & Culture",
                count: stories.filter((s) => s.category === "Art & Culture")
                  .length,
                color: "bg-purple-100 text-purple-800",
              },
              {
                name: "Modern Discoveries",
                count: stories.filter(
                  (s) => s.category === "Modern Discoveries"
                ).length,
                color: "bg-amber-100 text-amber-800",
              },
            ].map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left w-full"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 mb-1">{category.name}</h4>
                    <p className="text-gray-500 text-sm">
                      <AnimatedCounter target={category.count} /> stories
                    </p>
                  </div>
                  <Badge className={category.color}>Explore</Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
