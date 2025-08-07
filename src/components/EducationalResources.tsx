import { useState } from "react";
import {
  BookOpen,
  Users,
  MapPin,
  FileText,
  Download,
  Play,
  Clock,
  Star,
  Filter,
  Search,
  GraduationCap,
  School,
  Globe,
  Library,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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

const educationalContent = {
  teacherGuides: [
    {
      id: 1,
      title: "Ancient Egyptian Civilization - Complete Teaching Guide",
      description:
        "Comprehensive 30-lesson guide covering pharaohs, pyramids, and daily life in ancient Egypt",
      level: "Grade 6-8",
      duration: "6 weeks",
      subjects: ["History", "Geography", "Art"],
      downloads: 1247,
      rating: 4.8,
      preview:
        "Includes lesson plans, worksheets, assessments, and multimedia resources",
      resources: [
        "32 lesson plans",
        "Student worksheets",
        "Assessment rubrics",
        "PowerPoint presentations",
      ],
    },
    {
      id: 2,
      title: "West African Empires Study Unit",
      description:
        "Explore the Mali, Songhai, and Ghana empires through interactive lessons and projects",
      level: "Grade 9-12",
      duration: "4 weeks",
      subjects: ["World History", "Economics", "Geography"],
      downloads: 892,
      rating: 4.6,
      preview: "Project-based learning approach with primary source materials",
      resources: [
        "16 lesson plans",
        "Primary source documents",
        "Group project guides",
        "Research templates",
      ],
    },
    {
      id: 3,
      title: "African Art and Culture Curriculum",
      description:
        "Interdisciplinary unit connecting African art, history, and cultural traditions",
      level: "Grade K-5",
      duration: "3 weeks",
      subjects: ["Art", "Social Studies", "Music"],
      downloads: 2103,
      rating: 4.9,
      preview: "Hands-on activities and art projects for elementary students",
      resources: [
        "12 lesson plans",
        "Art project guides",
        "Cultural fact sheets",
        "Music and dance activities",
      ],
    },
  ],
  studentActivities: [
    {
      id: 1,
      title: "Build Your Own Egyptian Pyramid",
      description:
        "Interactive 3D modeling activity where students design and construct virtual pyramids",
      level: "Grade 4-8",
      duration: "2-3 hours",
      type: "Interactive Simulation",
      skills: ["Problem Solving", "Geometry", "History"],
      preview:
        "Students learn about Egyptian engineering while building pyramids",
      features: [
        "3D modeling tools",
        "Historical facts",
        "Engineering challenges",
        "Peer sharing",
      ],
    },
    {
      id: 2,
      title: "African Trading Post Game",
      description:
        "Role-playing game where students manage medieval African trade routes",
      level: "Grade 6-12",
      duration: "1-2 hours",
      type: "Educational Game",
      skills: ["Economics", "Geography", "Critical Thinking"],
      preview: "Experience the complexity of trans-Saharan trade networks",
      features: [
        "Multi-player support",
        "Historical scenarios",
        "Economic calculations",
        "Cultural interactions",
      ],
    },
    {
      id: 3,
      title: "Create African Kingdom Timeline",
      description:
        "Interactive timeline builder for exploring African civilizations",
      level: "Grade 3-8",
      duration: "1 hour",
      type: "Digital Tool",
      skills: ["Research", "Timeline Creation", "Digital Literacy"],
      preview: "Drag-and-drop timeline creation with multimedia elements",
      features: [
        "Timeline templates",
        "Image gallery",
        "Fact database",
        "Export options",
      ],
    },
    {
      id: 4,
      title: "African Languages Explorer",
      description:
        "Learn basic phrases and writing systems from various African languages",
      level: "All Ages",
      duration: "30-60 minutes",
      type: "Language Learning",
      skills: ["Language", "Cultural Awareness", "Communication"],
      preview: "Interactive introduction to African linguistic diversity",
      features: [
        "Audio pronunciation",
        "Writing practice",
        "Cultural context",
        "Progress tracking",
      ],
    },
  ],
  virtualTours: [
    {
      id: 1,
      title: "Inside the Great Pyramid of Giza",
      description:
        "Explore the internal chambers and passages of the last wonder of the ancient world",
      duration: "45 minutes",
      locations: [
        "King's Chamber",
        "Queen's Chamber",
        "Grand Gallery",
        "Entrance Tunnel",
      ],
      features: [
        "360° views",
        "Historical narration",
        "Archaeological insights",
        "Interactive hotspots",
      ],
      guide: "Dr. Sarah Mitchell, Egyptologist",
      language: "English, Arabic, French",
      preview:
        "Walk through passages that have remained unchanged for 4,500 years",
    },
    {
      id: 2,
      title: "Great Zimbabwe: City of Stone",
      description:
        "Discover the medieval African city that challenged European assumptions about African civilization",
      duration: "30 minutes",
      locations: [
        "Great Enclosure",
        "Hill Complex",
        "Valley Ruins",
        "Museum Exhibits",
      ],
      features: [
        "Drone footage",
        "Archaeological reconstruction",
        "Expert commentary",
        "Cultural context",
      ],
      guide: "Prof. Tendai Mukamuri, Archaeologist",
      language: "English, Shona",
      preview:
        "Experience the grandeur of medieval African architecture and urban planning",
    },
    {
      id: 3,
      title: "Timbuktu: Medieval Center of Learning",
      description:
        "Visit the legendary city of gold and books in medieval Mali",
      duration: "40 minutes",
      locations: [
        "Sankore University",
        "Djinguereber Mosque",
        "Ancient Libraries",
        "Manuscript Collections",
      ],
      features: [
        "Historical recreation",
        "Manuscript viewing",
        "Scholar interviews",
        "Islamic architecture",
      ],
      guide: "Dr. Abdel Kader Haidara, Manuscript Specialist",
      language: "English, French, Arabic",
      preview:
        "Explore the intellectual heart of medieval Africa where 25,000 students once studied",
    },
    {
      id: 4,
      title: "Rock Churches of Lalibela",
      description:
        "Marvel at Ethiopia's incredible rock-hewn churches carved from solid stone",
      duration: "35 minutes",
      locations: [
        "Church of St. George",
        "House of Emmanuel",
        "Church of the Saviour",
        "Ceremonial areas",
      ],
      features: [
        "Underground exploration",
        "Religious ceremonies",
        "Architectural details",
        "Pilgrimage context",
      ],
      guide: "Father Desta Tekle, Orthodox Priest",
      language: "English, Amharic",
      preview:
        "Witness one of the world's most remarkable architectural achievements",
    },
  ],
  researchPapers: [
    {
      id: 1,
      title:
        "New Archaeological Evidence from Great Zimbabwe: Implications for Trade Network Understanding",
      authors: ["Dr. Innocent Pikirayi", "Prof. Shadreck Chirikure"],
      journal: "Journal of African Archaeology",
      year: 2023,
      abstract:
        "Recent excavations at Great Zimbabwe have revealed new evidence about the extent and sophistication of medieval African trade networks...",
      topics: [
        "Archaeology",
        "Medieval Africa",
        "Trade Networks",
        "Urban Planning",
      ],
      pages: 24,
      citations: 18,
      downloadCount: 456,
      openAccess: true,
    },
    {
      id: 2,
      title:
        "Reassessing the Economic Impact of Mansa Musa's Pilgrimage on Medieval Islamic World",
      authors: ["Dr. Amina Hassan", "Prof. Michael Gomez"],
      journal: "African Economic History",
      year: 2023,
      abstract:
        "This paper examines new sources regarding the economic disruption caused by Mansa Musa's gold distribution during his hajj...",
      topics: [
        "Economic History",
        "Medieval Islam",
        "Mali Empire",
        "Trans-Saharan Trade",
      ],
      pages: 32,
      citations: 27,
      downloadCount: 892,
      openAccess: true,
    },
    {
      id: 3,
      title:
        "Climate Change and the Decline of the Aksumite Empire: A Multi-disciplinary Analysis",
      authors: ["Dr. Tekle Hagos", "Prof. Andrea Manzo", "Dr. Sarah Brewer"],
      journal: "Environmental Archaeology",
      year: 2022,
      abstract:
        "Combining archaeological, climate, and textual evidence to understand the role of environmental factors in Aksum's decline...",
      topics: [
        "Climate History",
        "Environmental Archaeology",
        "Ethiopian History",
        "Empire Collapse",
      ],
      pages: 28,
      citations: 34,
      downloadCount: 723,
      openAccess: false,
    },
    {
      id: 4,
      title:
        "Women's Political Power in Pre-Colonial African Societies: A Comparative Study",
      authors: ["Prof. Nwando Achebe", "Dr. Fatima Mbeki"],
      journal: "Gender and History in Africa",
      year: 2023,
      abstract:
        "Comparative analysis of women's political roles across different African societies before European colonization...",
      topics: [
        "Gender Studies",
        "Political History",
        "Pre-Colonial Africa",
        "Leadership",
      ],
      pages: 45,
      citations: 52,
      downloadCount: 1247,
      openAccess: true,
    },
  ],
};

export default function EducationalResources() {
  const { navigateTo } = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 text-blue-800"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Educational Resources
            </Badge>
            <h1 className="text-4xl lg:text-6xl text-gray-900 mb-4">
              Teach African History
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational resources for teachers and students.
              Discover curricula, activities, virtual tours, and cutting-edge
              research to bring African history to life in your classroom.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card>
              <CardContent className="text-center p-4">
                <div className="text-2xl text-blue-600 mb-1">
                  {educationalContent.teacherGuides.length}
                </div>
                <div className="text-sm text-gray-600">Teacher Guides</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center p-4">
                <div className="text-2xl text-green-600 mb-1">
                  {educationalContent.studentActivities.length}
                </div>
                <div className="text-sm text-gray-600">Student Activities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center p-4">
                <div className="text-2xl text-purple-600 mb-1">
                  {educationalContent.virtualTours.length}
                </div>
                <div className="text-sm text-gray-600">Virtual Tours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center p-4">
                <div className="text-2xl text-orange-600 mb-1">
                  {educationalContent.researchPapers.length}
                </div>
                <div className="text-sm text-gray-600">Research Papers</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg text-gray-900">Find Resources</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Grade Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="K-5">K-5</SelectItem>
                  <SelectItem value="6-8">6-8</SelectItem>
                  <SelectItem value="9-12">9-12</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="economics">Economics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="teacher-guides" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto">
              <TabsTrigger
                value="teacher-guides"
                className="flex items-center space-x-2"
              >
                <School className="w-4 h-4" />
                <span className="hidden sm:inline">Teacher Guides</span>
                <span className="sm:hidden">Guides</span>
              </TabsTrigger>
              <TabsTrigger
                value="student-activities"
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Student Activities</span>
                <span className="sm:hidden">Activities</span>
              </TabsTrigger>
              <TabsTrigger
                value="virtual-tours"
                className="flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Virtual Tours</span>
                <span className="sm:hidden">Tours</span>
              </TabsTrigger>
              <TabsTrigger
                value="research-papers"
                className="flex items-center space-x-2"
              >
                <Library className="w-4 h-4" />
                <span className="hidden sm:inline">Research Papers</span>
                <span className="sm:hidden">Papers</span>
              </TabsTrigger>
            </TabsList>

            {/* Teacher Guides */}
            <TabsContent value="teacher-guides" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">Teacher Guides</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Comprehensive curriculum guides developed by education
                  specialists and African history experts.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {educationalContent.teacherGuides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg pr-4">
                          {guide.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-amber-600">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          {guide.rating}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{guide.level}</Badge>
                        <Badge variant="outline">{guide.duration}</Badge>
                        {guide.subjects.map((subject, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-100 text-blue-700"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{guide.description}</p>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm text-gray-900 mb-2">
                          Included Resources:
                        </h4>
                        <div className="grid grid-cols-2 gap-1">
                          {guide.resources.map((resource, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                              {resource}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="w-4 h-4 mr-1" />
                          {guide.downloads.toLocaleString()} downloads
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() =>
                              navigateTo("teacher-guides", { id: guide.id })
                            }
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Student Activities */}
            <TabsContent value="student-activities" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">
                  Student Activities
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Interactive activities and games that engage students in
                  African history learning.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {educationalContent.studentActivities.map((activity) => (
                  <Card
                    key={activity.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg text-gray-900 pr-4">
                            {activity.title}
                          </h3>
                          <Badge className="bg-green-100 text-green-700">
                            {activity.type}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{activity.level}</Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.duration}
                          </Badge>
                        </div>

                        <p className="text-gray-600">{activity.description}</p>

                        <div>
                          <h4 className="text-sm text-gray-900 mb-2">
                            Skills Developed:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activity.skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-green-800 mb-2">
                            Features:
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {activity.features.map((feature, index) => (
                              <div
                                key={index}
                                className="text-sm text-green-700 flex items-center"
                              >
                                <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-3 pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              navigateTo("student-activities", {
                                id: activity.id,
                              })
                            }
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Try Activity
                          </Button>
                          <Button variant="ghost" size="sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Virtual Tours */}
            <TabsContent value="virtual-tours" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">Virtual Tours</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Immersive virtual experiences of Africa's most significant
                  historical sites and monuments.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {educationalContent.virtualTours.map((tour) => (
                  <Card
                    key={tour.id}
                    className="overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/photo-${
                          1568366515672 + tour.id
                        }?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080`}
                        alt={tour.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-purple-600 text-white">
                          <Play className="w-3 h-3 mr-1" />
                          Virtual Tour
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-gray-900"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {tour.duration}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl text-gray-900 mb-2">
                          {tour.title}
                        </h3>
                        <p className="text-gray-600">{tour.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">
                          Tour Guide:
                        </h4>
                        <p className="text-sm text-gray-600">{tour.guide}</p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">
                          Locations Visited:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tour.locations.map((location, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              <MapPin className="w-3 h-3 mr-1" />
                              {location}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">
                          Features:
                        </h4>
                        <div className="grid grid-cols-2 gap-1">
                          {tour.features.map((feature, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <div className="w-1 h-1 bg-purple-500 rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={() =>
                            navigateTo("virtual-tours", { id: tour.id })
                          }
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Tour
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Research Papers */}
            <TabsContent value="research-papers" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">Latest Research</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Access cutting-edge research papers from leading scholars in
                  African history and archaeology.
                </p>
              </div>

              <div className="space-y-6">
                {educationalContent.researchPapers.map((paper) => (
                  <Card
                    key={paper.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 pr-4">
                            <h3 className="text-lg text-gray-900 mb-2">
                              {paper.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <span>{paper.authors.join(", ")}</span>
                              <span className="mx-2">•</span>
                              <span>{paper.journal}</span>
                              <span className="mx-2">•</span>
                              <span>{paper.year}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            {paper.openAccess && (
                              <Badge className="bg-green-100 text-green-700">
                                Open Access
                              </Badge>
                            )}
                            <div className="text-sm text-gray-500">
                              {paper.citations} citations
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {paper.topics.map((topic, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                          {paper.abstract}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              {paper.pages} pages
                            </div>
                            <div className="flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {paper.downloadCount.toLocaleString()} downloads
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Abstract
                            </Button>
                            <Button
                              size="sm"
                              className="bg-orange-600 hover:bg-orange-700"
                              onClick={() =>
                                navigateTo("research-papers", { id: paper.id })
                              }
                            >
                              <Download className="w-4 h-4 mr-2" />
                              {paper.openAccess
                                ? "Download PDF"
                                : "Request Access"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl text-white">
              Need Custom Educational Resources?
            </h2>
            <p className="text-lg text-blue-100">
              Our team of educators and historians can create custom curricula,
              activities, and resources tailored to your specific needs and
              learning objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Users className="w-4 h-4 mr-2" />
                Contact Our Education Team
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse All Resources
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
