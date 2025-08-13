import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Users,
  FileText,
  Play,
  Search,
  Download,
  Star,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import AnimatedCounter from "./AnimatedCounter";
import {
  AnimatedHeading,
  AnimatedParagraph,
  AnimatedText,
} from "./AnimatedText";

const resourceCategories = [
  {
    id: "teacher-guides",
    title: "Teacher Guides",
    description:
      "Comprehensive curriculum guides and lesson plans for educators",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    count: 24,
    featured: true,
    path: "/resources/teacher-guides",
  },
  {
    id: "student-activities",
    title: "Student Activities",
    description: "Interactive activities, quizzes, and projects for students",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    count: 45,
    featured: true,
    path: "/resources/student-activities",
  },
  {
    id: "virtual-tours",
    title: "Virtual Tours",
    description: "Immersive 360° experiences of historical sites",
    icon: Play,
    color: "from-purple-500 to-violet-500",
    count: 18,
    featured: true,
    path: "/resources/virtual-tours",
  },
  {
    id: "research-papers",
    title: "Research Papers",
    description: "Academic papers and scholarly articles",
    icon: FileText,
    color: "from-amber-500 to-orange-500",
    count: 156,
    featured: false,
    path: "/resources/research-papers",
  },
];

const featuredResources = [
  {
    id: 1,
    title: "Ancient Egyptian Civilization Complete Unit",
    type: "Teacher Guide",
    description:
      "3-week curriculum covering Egyptian dynasties, culture, religion, and daily life",
    author: "Dr. Sarah Ahmed",
    grade: "6-8",
    rating: 4.8,
    downloads: 1240,
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Ancient Egypt", "Curriculum", "Activities"],
    path: "/resources/teacher-guides",
  },
  {
    id: 2,
    title: "Great Zimbabwe Virtual Experience",
    type: "Virtual Tour",
    description:
      "Explore the medieval stone city with 360° views and interactive hotspots",
    author: "VR Education Team",
    grade: "All Ages",
    rating: 4.9,
    downloads: 890,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Virtual Tour", "Southern Africa", "Medieval"],
    path: "/resources/virtual-tours",
  },
  {
    id: 3,
    title: "African Kingdoms Timeline Builder",
    type: "Student Activity",
    description:
      "Interactive timeline creation tool for exploring African empires",
    author: "Interactive Learning Lab",
    grade: "5-9",
    rating: 4.7,
    downloads: 2100,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Interactive", "Timeline", "Empires"],
    path: "/resources/student-activities",
  },
];

const recentUpdates = [
  {
    id: 1,
    title: "New Swahili Coast Trading Posts Tour",
    type: "Virtual Tour",
    date: "2024-01-15",
    description:
      "Explore the historic trading cities of the East African coast",
    path: "/resources/virtual-tours",
  },
  {
    id: 2,
    title: "Updated Mali Empire Lesson Plans",
    type: "Teacher Guide",
    date: "2024-01-10",
    description: "Enhanced curriculum with new archaeological discoveries",
    path: "/resources/teacher-guides",
  },
  {
    id: 3,
    title: "Benin Bronzes Art Activity",
    type: "Student Activity",
    date: "2024-01-05",
    description: "Create and analyze West African bronze art techniques",
    path: "/resources/student-activities",
  },
];

function ResourceCard({ resource }: { resource: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative">
        <ImageWithFallback
          src={resource.image}
          alt={resource.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-blue-600 text-white">{resource.type}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">Grade {resource.grade}</Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm">{resource.description}</p>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <span>By {resource.author}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />
                {resource.rating}
              </div>
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                <AnimatedCounter target={resource.downloads} />
              </div>
            </div>
            <Button asChild size="sm">
              <Link to={resource.path}>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ category }: { category: any }) {
  const IconComponent = category.icon;

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${
        category.featured ? "ring-2 ring-blue-200" : ""
      }`}
    >
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            {category.featured && (
              <Badge className="bg-amber-600">Featured</Badge>
            )}
          </div>

          <div>
            <h3 className="text-2xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {category.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {category.description}
            </p>
            <div className="text-sm text-gray-500">
              <AnimatedCounter target={category.count} /> resources available
            </div>
          </div>

          <Button
            asChild
            className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
          >
            <Link to={category.path}>
              Explore {category.title}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentUpdateCard({ update }: { update: any }) {
  const navigate = useNavigate();

  const handleViewUpdate = () => {
    navigate(update.path);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline">{update.type}</Badge>
              <span className="text-sm text-gray-500">{update.date}</span>
            </div>
            <h4
              className="text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={handleViewUpdate}
            >
              {update.title}
            </h4>
            <p className="text-gray-600 text-sm">{update.description}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewUpdate}
            className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors flex-shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EducationalResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Animated Stats */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 text-blue-800"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Educational Hub
            </Badge>
            <AnimatedHeading
              className="text-4xl lg:text-5xl text-gray-900 mb-4"
              delay={0}
            >
              Educational Resources
            </AnimatedHeading>
            <AnimatedParagraph
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              delay={0.3}
            >
              Comprehensive educational materials designed to bring African
              history to life. From teacher guides to virtual tours, discover
              resources for every learning style and level.
            </AnimatedParagraph>
          </div>

          {/* Quick Stats with Animation */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Teacher Guides", target: 24, icon: GraduationCap },
              { label: "Student Activities", target: 45, icon: Users },
              { label: "Virtual Tours", target: 18, icon: Play },
              { label: "Research Papers", target: 156, icon: FileText },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">
                    <AnimatedCounter target={stat.target} />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search educational resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full grid-cols-3 max-w-lg">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="updates">Recent</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-12">
              {/* Resource Categories */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl text-gray-900 mb-4">
                    Resource Categories
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore our comprehensive collection of educational
                    materials organized by type and audience.
                  </p>
                </div>

                <AnimatedText className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {resourceCategories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </AnimatedText>
              </div>

              {/* Learning Paths */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl text-gray-900 mb-4">
                    Guided Learning Paths
                  </h3>
                  <p className="text-gray-600">
                    Structured learning journeys designed for different
                    audiences and learning objectives.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Educator's Journey",
                      description:
                        "Complete teaching toolkit from beginner to advanced",
                      steps: 4,
                      duration: "2-3 weeks",
                      path: "/resources/teacher-guides",
                    },
                    {
                      title: "Student Explorer",
                      description:
                        "Interactive activities building historical knowledge",
                      steps: 6,
                      duration: "4-6 weeks",
                      path: "/resources/student-activities",
                    },
                    {
                      title: "Virtual Traveler",
                      description:
                        "Immersive tours of African historical sites",
                      steps: 8,
                      duration: "Self-paced",
                      path: "/resources/virtual-tours",
                    },
                  ].map((path, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Award className="w-8 h-8 text-blue-600" />
                            <Badge variant="outline">
                              <AnimatedCounter target={path.steps} /> steps
                            </Badge>
                          </div>
                          <div>
                            <h4 className="text-lg text-gray-900 mb-2">
                              {path.title}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              {path.description}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {path.duration}
                            </div>
                          </div>
                          <Button asChild size="sm" className="w-full">
                            <Link to={path.path}>Start Learning Path</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-gray-900 mb-4">
                  Featured Resources
                </h2>
                <p className="text-gray-600">
                  Hand-picked educational materials that showcase the best of
                  African history learning.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="updates" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl text-gray-900 mb-4">Recent Updates</h2>
                <p className="text-gray-600">
                  Stay up-to-date with the latest additions and improvements to
                  our resource library.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                {recentUpdates.map((update) => (
                  <RecentUpdateCard key={update.id} update={update} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
