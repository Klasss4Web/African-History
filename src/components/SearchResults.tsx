import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigation } from "./Navigation";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

// Mock search data
const searchData = {
  periods: [
    {
      id: 1,
      title: "Ancient Egypt",
      period: "3100-30 BCE",
      description:
        "The civilization that built the pyramids and developed hieroglyphics along the Nile River.",
      region: "North Africa",
      relevance: 95,
    },
    {
      id: 2,
      title: "Kingdom of Kush",
      period: "1070 BCE - 350 CE",
      description:
        "A powerful kingdom that ruled over Egypt and established trade networks across Africa.",
      region: "East Africa",
      relevance: 87,
    },
  ],
  stories: [
    {
      id: 1,
      title: "The Wealth of Mansa Musa: Richest Person in History",
      excerpt:
        "Discover how the ruler of the Mali Empire became the wealthiest person who ever lived...",
      category: "Biography",
      readTime: "8 min read",
      author: "Dr. Amina Hassan",
      relevance: 92,
      image:
        "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      title: "Queen Nzinga: The Warrior Queen of Angola",
      excerpt:
        "Learn about the brilliant military strategist who resisted Portuguese colonization...",
      category: "Biography",
      readTime: "10 min read",
      author: "Dr. Fatima Mbeki",
      relevance: 89,
      image:
        "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
  people: [
    {
      id: 1,
      name: "Mansa Musa",
      title: "Emperor of Mali",
      period: "1280-1337 CE",
      description:
        "Wealthiest person in history, made famous pilgrimage to Mecca",
      relevance: 94,
    },
    {
      id: 2,
      name: "Queen Nzinga",
      title: "Queen of Ndongo and Matamba",
      period: "1583-1663 CE",
      description:
        "Brilliant military strategist who resisted Portuguese colonization",
      relevance: 91,
    },
    {
      id: 3,
      name: "Hatshepsut",
      title: "Pharaoh of Egypt",
      period: "1479-1458 BCE",
      description:
        "One of the most successful female pharaohs, ruled for 22 years",
      relevance: 88,
    },
  ],
  regions: [
    {
      id: 1,
      name: "West Africa",
      description:
        "Birthplace of powerful trading empires and rich cultural traditions",
      countries: 16,
      featuredCivilization: "Mali Empire",
      relevance: 85,
    },
  ],
};

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const { navigateTo } = useNavigation();
  const [sortBy, setSortBy] = useState("relevance");
  const [filterType, setFilterType] = useState("all");

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

  const totalResults =
    searchData.periods.length +
    searchData.stories.length +
    searchData.people.length +
    searchData.regions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            <Search className="w-5 h-5" />
            <span>Search results for:</span>
          </div>
          <h1 className="text-3xl lg:text-4xl text-gray-900 mb-2">"{query}"</h1>
          <p className="text-gray-600">{totalResults} results found</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-600" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="date">Most Recent</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Content</SelectItem>
                <SelectItem value="periods">Historical Periods</SelectItem>
                <SelectItem value="stories">Stories</SelectItem>
                <SelectItem value="people">People</SelectItem>
                <SelectItem value="regions">Regions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
            <TabsTrigger value="periods">
              Periods ({searchData.periods.length})
            </TabsTrigger>
            <TabsTrigger value="stories">
              Stories ({searchData.stories.length})
            </TabsTrigger>
            <TabsTrigger value="people">
              People ({searchData.people.length})
            </TabsTrigger>
            <TabsTrigger value="regions">
              Regions ({searchData.regions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Top Results */}
            <div className="space-y-4">
              <h2 className="text-xl text-gray-900">Top Results</h2>
              <div className="grid gap-4">
                {searchData.stories.slice(0, 2).map((story) => (
                  <Card
                    key={story.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                          <ImageWithFallback
                            src={story.image}
                            alt={story.title}
                            className="w-24 h-24 object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge className={getCategoryColor(story.category)}>
                              {story.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {story.relevance}% match
                            </Badge>
                          </div>
                          <h3 className="text-lg text-gray-900 hover:text-amber-600 transition-colors">
                            {story.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {story.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{story.author}</span>
                            <span>{story.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Results by Category */}
            <div className="space-y-8">
              {/* Historical Periods */}
              <div className="space-y-4">
                <h2 className="text-xl text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Historical Periods
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {searchData.periods.map((period) => (
                    <Card
                      key={period.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent
                        className="p-6"
                        onClick={() =>
                          navigateTo("period-detail", { id: period.id })
                        }
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg text-gray-900 hover:text-amber-600 transition-colors">
                              {period.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {period.relevance}% match
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {period.period}
                            <span className="mx-2">•</span>
                            <MapPin className="w-4 h-4 mr-1" />
                            {period.region}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {period.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* People */}
              <div className="space-y-4">
                <h2 className="text-xl text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Historical Figures
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {searchData.people.map((person) => (
                    <Card
                      key={person.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {person.relevance}% match
                            </Badge>
                          </div>
                          <div>
                            <h3 className="text-lg text-gray-900 hover:text-amber-600 transition-colors">
                              {person.name}
                            </h3>
                            <p className="text-sm text-amber-600">
                              {person.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {person.period}
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {person.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="periods" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {searchData.periods.map((period) => (
                <Card
                  key={period.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent
                    className="p-6"
                    onClick={() =>
                      navigateTo("period-detail", { id: period.id })
                    }
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl text-gray-900 hover:text-amber-600 transition-colors">
                          {period.title}
                        </h3>
                        <Badge variant="outline">
                          {period.relevance}% match
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {period.period}
                        <span className="mx-2">•</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        {period.region}
                      </div>
                      <p className="text-gray-600">{period.description}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:bg-amber-50 p-0"
                      >
                        Learn more →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="space-y-4">
              {searchData.stories.map((story) => (
                <Card
                  key={story.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="w-32 h-32 object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(story.category)}>
                            {story.category}
                          </Badge>
                          <Badge variant="outline">
                            {story.relevance}% match
                          </Badge>
                        </div>
                        <h3 className="text-xl text-gray-900 hover:text-amber-600 transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-gray-600">{story.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>By {story.author}</span>
                          <span>{story.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="people" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchData.people.map((person) => (
                <Card
                  key={person.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <Badge variant="outline">
                          {person.relevance}% match
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-xl text-gray-900 hover:text-amber-600 transition-colors">
                          {person.name}
                        </h3>
                        <p className="text-amber-600 mb-1">{person.title}</p>
                        <p className="text-sm text-gray-500">{person.period}</p>
                      </div>
                      <p className="text-gray-600">{person.description}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:bg-amber-50 p-0"
                      >
                        View biography →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {searchData.regions.map((region) => (
                <Card
                  key={region.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl text-gray-900 hover:text-amber-600 transition-colors">
                          {region.name}
                        </h3>
                        <Badge variant="outline">
                          {region.relevance}% match
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {region.countries} countries
                        <span className="mx-2">•</span>
                        <span className="text-sm">
                          Featured: {region.featuredCivilization}
                        </span>
                      </div>
                      <p className="text-gray-600">{region.description}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:bg-amber-50 p-0"
                      >
                        Explore region →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {totalResults === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl text-gray-900 mb-2">
                No results found for "{query}"
              </h2>
              <p className="text-gray-600 mb-6">
                Try using different keywords or check your spelling.
              </p>
              <Button
                onClick={() => navigateTo("home")}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
