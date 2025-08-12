import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Clock,
  BookOpen,
  Users,
  MapPin,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

// Mock search data - in a real app this would come from an API
const searchData = [
  {
    id: 1,
    type: "story",
    title:
      "The Great Library of Alexandria: Africa's Ancient Center of Learning",
    excerpt:
      "Discover how Alexandria became the intellectual heart of the ancient world, attracting scholars from across Africa and beyond to its legendary library and museum.",
    category: "Ancient Learning",
    author: "Dr. Amara Okonkwo",
    date: "2024-01-15",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "/stories/1",
    tags: ["Ancient Egypt", "Education", "Library", "Scholarship"],
  },
  {
    id: 2,
    type: "person",
    title: "Queen Nzinga of Ndongo and Matamba",
    excerpt:
      "The remarkable story of Queen Nzinga, who led resistance against Portuguese colonization for over 30 years in 17th-century Angola.",
    category: "Historical Figures",
    period: "1583-1663",
    date: "17th Century",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "/people/nzinga",
    tags: ["Angola", "Leadership", "Resistance", "Women in History"],
  },
  {
    id: 3,
    type: "region",
    title: "Ancient Egypt",
    excerpt:
      "Home to one of the world's oldest civilizations, featuring the pyramids, pharaohs, and the mighty Nile River that sustained this remarkable culture for millennia.",
    category: "North Africa",
    countries: "Egypt, Sudan",
    date: "3100 BCE - 641 CE",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "/regions/1",
    tags: ["Pyramids", "Pharaohs", "Nile River", "Hieroglyphs"],
  },
  {
    id: 4,
    type: "resource",
    title: "Mali Empire Educational Guide",
    excerpt:
      "Comprehensive teaching resource about the Mali Empire, including interactive timelines, primary sources, and classroom activities.",
    category: "Teacher Guides",
    author: "Education Team",
    date: "2024-01-10",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "/resources/teacher-guides",
    tags: ["Mali Empire", "Teaching", "Interactive", "Primary Sources"],
  },
  {
    id: 5,
    type: "site",
    title: "Great Zimbabwe",
    excerpt:
      "Medieval stone city that showcases the advanced engineering and architectural skills of African civilizations in the 11th-15th centuries.",
    category: "Archaeological Sites",
    location: "Zimbabwe",
    date: "11th-15th Century",
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "/sites/great-zimbabwe",
    tags: ["Architecture", "Medieval", "Stone City", "Trade"],
  },
  {
    id: 6,
    type: "story",
    title: "Mansa Musa's Legendary Pilgrimage",
    excerpt:
      "Follow the epic journey of Mansa Musa to Mecca in 1324-1325, a pilgrimage so lavish it put the Mali Empire on medieval world maps.",
    category: "Medieval Empires",
    author: "Dr. Bakary Traore",
    date: "2024-01-01",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    url: "/stories/4",
    tags: ["Mali Empire", "Pilgrimage", "Trade", "Mansa Musa"],
  },
];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [localQuery, setLocalQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Simulate search functionality
  useEffect(() => {
    if (query) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );
      setResults(filtered);
      setFilteredResults(filtered);
    } else {
      setResults([]);
      setFilteredResults([]);
    }
  }, [query]);

  // Apply filters
  useEffect(() => {
    let filtered = results;

    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((item) => item.type === typeFilter);
    }

    setFilteredResults(filtered);
  }, [results, categoryFilter, typeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "story":
        return BookOpen;
      case "person":
        return Users;
      case "region":
        return MapPin;
      case "resource":
        return BookOpen;
      case "site":
        return MapPin;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "story":
        return "bg-blue-100 text-blue-800";
      case "person":
        return "bg-green-100 text-green-800";
      case "region":
        return "bg-purple-100 text-purple-800";
      case "resource":
        return "bg-amber-100 text-amber-800";
      case "site":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const categories = [...new Set(results.map((item) => item.category))];
  const types = [...new Set(results.map((item) => item.type))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search African history..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg w-full border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 bg-amber-600 hover:bg-amber-700"
              >
                Search
              </Button>
            </div>
          </form>

          {query && (
            <div className="text-center">
              <h1 className="text-2xl text-gray-900 mb-2">
                Search Results for "{query}"
              </h1>
              <p className="text-gray-600">
                Found {filteredResults.length} result
                {filteredResults.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        {results.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Filter by:</span>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}s
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(typeFilter !== "all" || categoryFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTypeFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Results */}
        {query && filteredResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
            <Button asChild variant="outline">
              <Link to="/">Explore Homepage</Link>
            </Button>
          </div>
        )}

        {filteredResults.length > 0 && (
          <div className="space-y-6">
            {filteredResults.map((result) => {
              const TypeIcon = getTypeIcon(result.type);

              return (
                <Card
                  key={result.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image */}
                      <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        <ImageWithFallback
                          src={result.image}
                          alt={result.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(result.type)}>
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {result.type.charAt(0).toUpperCase() +
                                result.type.slice(1)}
                            </Badge>
                            <Badge variant="outline">{result.category}</Badge>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg text-gray-900 mb-2 hover:text-amber-600 transition-colors">
                            <Link to={result.url}>{result.title}</Link>
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {result.excerpt}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {result.tags
                            .slice(0, 4)
                            .map((tag: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          {result.tags.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{result.tags.length - 4} more
                            </Badge>
                          )}
                        </div>

                        {/* Meta info */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {result.author && (
                              <div className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {result.author}
                              </div>
                            )}
                            {result.location && (
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {result.location}
                              </div>
                            )}
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {result.date}
                            </div>
                          </div>

                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="hover:bg-amber-50 hover:border-amber-600"
                          >
                            <Link to={result.url}>
                              View <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!query && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl text-gray-900 mb-2">
              Search African History
            </h2>
            <p className="text-gray-600 mb-6">
              Search through our extensive collection of stories, historical
              figures, regions, and educational resources.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "Ancient Egypt",
                "Mali Empire",
                "Queen Nzinga",
                "Great Zimbabwe",
                "Lalibela",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLocalQuery(suggestion);
                    setSearchParams({ q: suggestion });
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
