import { useState } from "react";
import {
  BookOpen,
  Download,
  Eye,
  Users,
  Clock,
  Star,
  Filter,
  Search,
  FileText,
  Award,
  ChevronRight,
  Lock,
  CreditCard,
  Gift,
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  AnimatedHeading,
  AnimatedParagraph,
  AnimatedText,
} from "./AnimatedText";

// Teacher guides data
const teacherGuides = [
  {
    id: 1,
    title: "Ancient Egyptian Civilization",
    grade: "6-8",
    duration: "3 weeks",
    subject: "World History",
    difficulty: "Intermediate",
    rating: 4.8,
    downloads: 1240,
    price: 0, // Free
    isPremium: false,
    hasSample: true,
    sampleFile: "egypt-sample.pdf",
    description:
      "Comprehensive unit covering Egyptian dynasties, culture, religion, and daily life with interactive activities and assessments.",
    objectives: [
      "Understand the political structure of Ancient Egypt",
      "Analyze the role of the Nile River in Egyptian civilization",
      "Examine Egyptian religious beliefs and practices",
      "Evaluate the legacy of Egyptian innovations",
    ],
    materials: [
      "Interactive timeline activity",
      "Hieroglyphic writing worksheets",
      "Virtual pyramid exploration guide",
      "Assessment rubrics",
    ],
    preview: {
      image:
        "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      content: `
# Ancient Egyptian Civilization Unit Plan

## Week 1: Introduction to Egypt
- Geographic foundations
- The Nile River system
- Early dynastic period

### Day 1: The Gift of the Nile
**Objective:** Students will understand how geography shaped Egyptian civilization

**Activities:**
- Map analysis of Nile River valley
- Compare/contrast with other river civilizations
- Create a geographic advantages chart

**Assessment:** Exit ticket on geographic factors
      `,
      lessons: [
        {
          title: "Lesson 1: The Gift of the Nile",
          duration: "45 minutes",
          activities: ["Map analysis", "Documentary viewing", "Discussion"],
          materials: ["Maps", "Video clips", "Worksheets"],
        },
        {
          title: "Lesson 2: Pharaohs and Government",
          duration: "50 minutes",
          activities: ["Role-play activity", "Primary source analysis"],
          materials: ["Ancient texts", "Government diagrams"],
        },
      ],
    },
    author: "Dr. Sarah Ahmed",
    lastUpdated: "2024-01-15",
    tags: ["Ancient History", "Egypt", "Civilization", "Middle School"],
  },
  {
    id: 2,
    title: "West African Kingdoms and Trade",
    grade: "9-12",
    duration: "4 weeks",
    subject: "African Studies",
    difficulty: "Advanced",
    rating: 4.9,
    downloads: 890,
    price: 29.99, // Premium content
    isPremium: true,
    hasSample: false,
    description:
      "In-depth exploration of Ghana, Mali, and Songhai empires focusing on trade networks, Islamic influence, and cultural achievements.",
    objectives: [
      "Compare and contrast major West African empires",
      "Analyze the impact of trans-Saharan trade",
      "Evaluate the role of Islam in West African society",
      "Assess the legacy of these civilizations",
    ],
    materials: [
      "Trade route mapping activity",
      "Primary source document packets",
      "Mansa Musa biography project",
      "Research paper guidelines",
    ],
    preview: {
      image:
        "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      content: `
# West African Kingdoms Unit Plan

## Week 1: Ghana Empire (300-1200 CE)
- Origins and geographic advantages
- Gold and salt trade
- Social structure and governance

### Lesson 1: The Land of Gold
**Essential Question:** How did Ghana become the first great trading empire of West Africa?

**Objectives:**
- Identify key geographic features that enabled Ghana's rise
- Explain the importance of gold and salt trade
- Analyze Ghana's political structure

**Activities:**
1. Trade simulation activity (20 min)
2. Map analysis of trade routes (15 min)  
3. Primary source reading - Al-Bakri's account (10 min)

**Assessment:** Students create a trading post advertisement for medieval Ghana
      `,
      lessons: [
        {
          title: "The Land of Gold - Ghana Empire",
          duration: "50 minutes",
          activities: ["Trade simulation", "Map analysis", "Primary sources"],
          materials: [
            "Trade goods props",
            "Historical maps",
            "Al-Bakri excerpts",
          ],
        },
        {
          title: "Mansa Musa and the Mali Empire",
          duration: "45 minutes",
          activities: ["Biography research", "Hajj journey mapping"],
          materials: ["Research packets", "Pilgrimage route maps"],
        },
      ],
    },
    author: "Prof. Kwame Nkrumah",
    lastUpdated: "2024-01-20",
    tags: ["West Africa", "Trade", "Islam", "High School", "Empires"],
  },
  {
    id: 3,
    title: "Great Zimbabwe and Southern African States",
    grade: "7-9",
    duration: "2 weeks",
    subject: "World History",
    difficulty: "Intermediate",
    rating: 4.6,
    downloads: 567,
    price: 19.99, // Premium content
    isPremium: true,
    hasSample: true,
    sampleFile: "zimbabwe-sample.pdf",
    description:
      "Study of Great Zimbabwe, Mapungubwe, and other southern African civilizations, focusing on architecture, trade, and social organization.",
    objectives: [
      "Describe the rise of Great Zimbabwe",
      "Explain the significance of stone architecture",
      "Analyze trade connections with the Indian Ocean",
      "Evaluate archaeological evidence",
    ],
    materials: [
      "Virtual site tours",
      "Archaeological evidence analysis",
      "Trade goods identification activity",
      "Timeline creation project",
    ],
    preview: {
      image:
        "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      content: `
# Great Zimbabwe Unit Plan

## Week 1: Rise of Zimbabwe
- Archaeological discoveries
- Stone architecture techniques
- Trade and prosperity

### Lesson 1: Stones Tell Stories
**Focus:** How do archaeologists piece together the past?

**Materials Needed:**
- Artifact replicas
- Site photographs
- Excavation simulation materials

**Procedure:**
1. Archaeology warm-up activity (10 min)
2. Virtual tour of Great Zimbabwe (20 min)
3. Artifact analysis in groups (15 min)
4. Conclusions and theories discussion (10 min)

**Extension:** Students design their own archaeological dig
      `,
      lessons: [
        {
          title: "Stones Tell Stories - Archaeological Methods",
          duration: "45 minutes",
          activities: [
            "Virtual site tour",
            "Artifact analysis",
            "Theory building",
          ],
          materials: ["Artifact replicas", "Site photos", "Analysis sheets"],
        },
        {
          title: "Trade Networks of the Indian Ocean",
          duration: "50 minutes",
          activities: ["Trade route mapping", "Goods identification"],
          materials: ["Ocean maps", "Trade good samples"],
        },
      ],
    },
    author: "Dr. Nomsa Dlamini",
    lastUpdated: "2024-01-10",
    tags: ["Southern Africa", "Archaeology", "Trade", "Middle School"],
  },
  {
    id: 4,
    title: "Ethiopian Highlands and Ancient Kingdoms",
    grade: "6-8",
    duration: "2 weeks",
    subject: "World History",
    difficulty: "Intermediate",
    rating: 4.7,
    downloads: 423,
    price: 24.99, // Premium content
    isPremium: true,
    hasSample: false,
    description:
      "Explore the Kingdom of Aksum, Ethiopian Orthodox Christianity, and the unique cultural heritage of the Ethiopian highlands.",
    objectives: [
      "Understand the rise of the Aksumite Empire",
      "Analyze the adoption of Christianity in Ethiopia",
      "Examine the rock churches of Lalibela",
      "Evaluate Ethiopia's resistance to colonization",
    ],
    materials: [
      "Virtual tour of Lalibela churches",
      "Timeline of Ethiopian dynasties",
      "Primary source readings from travelers",
      "Cultural comparison activities",
    ],
    preview: {
      image:
        "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      content: `
# Ethiopian Highlands Unit Plan

## Week 1: The Aksumite Empire
- Geographic advantages of the highlands
- Trade connections with Rome and India
- Religious transformation

### Lesson 1: Crossroads of Civilizations
**Essential Question:** How did Ethiopia become a major trading power?

**Preview Content Only - Full lesson plans available with purchase**
      `,
      lessons: [
        {
          title: "Crossroads of Civilizations - Aksum's Rise",
          duration: "45 minutes",
          activities: ["Trade route analysis", "Archaeological evidence"],
          materials: ["Maps", "Artifact photos"],
        },
      ],
    },
    author: "Dr. Tekle Haile",
    lastUpdated: "2024-01-08",
    tags: ["Ethiopia", "Christianity", "Aksum", "Middle School"],
  },
];

// Access Request Dialog Component
function AccessRequestDialog({
  guide,
  isOpen,
  onClose,
}: {
  guide: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handlePurchase = () => {
    // Simulate payment process
    alert(`Redirecting to payment for ${guide.title} - $${guide.price}`);
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-green-600">
              <Award className="w-5 h-5" />
              <span>Request Submitted!</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-700">
                Your access request has been submitted successfully. We'll
                review your request and get back to you within 24-48 hours.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• We'll verify your educator status</li>
                <li>• You'll receive access credentials via email</li>
                <li>• Download and start using the materials immediately</li>
              </ul>
            </div>

            <Button onClick={onClose} className="w-full">
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Request Access</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h4 className="text-amber-900 mb-2">{guide.title}</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-700">Premium Content</span>
              <span className="text-amber-900 font-medium">${guide.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handlePurchase}
              className="bg-green-600 hover:bg-green-700 flex items-center justify-center"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Purchase Now
            </Button>
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Request Educator Access
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>Educators can request free access with verification</p>
          </div>

          {/* Educator Access Form (hidden by default, can be shown by clicking Request Access) */}
          <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@school.edu"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                School/Institution
              </label>
              <Input
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Your school name"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                How will you use this resource?
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly describe your teaching context and how you plan to use this resource..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                rows={3}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GuidePreview({
  guide,
  isOpen,
  onClose,
}: {
  guide: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Preview: {guide.title}</span>
            {guide.isPremium && (
              <Badge className="bg-amber-600 text-white ml-2">
                <Lock className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <ImageWithFallback
              src={guide.preview.image}
              alt={guide.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-600">Grade {guide.grade}</Badge>
            </div>
            {guide.isPremium && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-600 text-white">
                  <Lock className="w-3 h-3 mr-1" />${guide.price}
                </Badge>
              </div>
            )}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Sample</TabsTrigger>
              <TabsTrigger value="lessons">Lesson Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Learning Objectives
                </h3>
                <ul className="space-y-1">
                  {guide.objectives.map((objective: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-start"
                    >
                      <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Included Materials
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {guide.materials.map((material: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{material}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {guide.preview.content}
                </pre>
                {guide.isPremium && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center text-amber-700">
                      <Lock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        Full content available with purchase or educator access
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lessons" className="space-y-4">
              {guide.preview.lessons.map((lesson: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-gray-900">{lesson.title}</h4>
                      <Badge variant="outline">{lesson.duration}</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="text-gray-700 mb-1">Activities</h5>
                        <ul className="space-y-1">
                          {lesson.activities.map(
                            (activity: string, actIndex: number) => (
                              <li key={actIndex} className="text-gray-600">
                                • {activity}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-gray-700 mb-1">Materials</h5>
                        <ul className="space-y-1">
                          {lesson.materials.map(
                            (material: string, matIndex: number) => (
                              <li key={matIndex} className="text-gray-600">
                                • {material}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {guide.isPremium && guide.preview.lessons.length < 3 && (
                <div className="text-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    Additional lesson plans available with full access
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close Preview
            </Button>
            {guide.isPremium ? (
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Lock className="w-4 h-4 mr-2" />
                Get Access - ${guide.price}
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Free
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TeacherGuides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [previewGuide, setPreviewGuide] = useState<any>(null);
  const [accessRequestGuide, setAccessRequestGuide] = useState<any>(null);

  const filteredGuides = teacherGuides.filter((guide) => {
    const matchesSearch =
      searchQuery === "" ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade =
      selectedGrade === "all" || guide.grade === selectedGrade;
    const matchesSubject =
      selectedSubject === "all" || guide.subject === selectedSubject;

    return matchesSearch && matchesGrade && matchesSubject;
  });

  const handleDownload = (guide: any) => {
    if (guide.isPremium) {
      setAccessRequestGuide(guide);
    } else {
      // Handle free download
      const fileName = `${guide.title.toLowerCase().replace(/\s+/g, "-")}.pdf`;
      // Simulate download
      const link = document.createElement("a");
      link.href = "/sample-files/" + fileName;
      link.download = fileName;
      link.click();

      // Show success message
      alert(`Downloaded: ${guide.title} 📚`);
    }
  };

  const handleSampleDownload = (guide: any) => {
    if (guide.hasSample && guide.sampleFile) {
      // Simulate sample download
      const link = document.createElement("a");
      link.href = "/sample-files/" + guide.sampleFile;
      link.download = guide.sampleFile;
      link.click();

      alert(`Sample downloaded: ${guide.sampleFile} 📄`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-green-100 text-green-800"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Educator Resources
            </Badge>
            <AnimatedHeading
              className="text-4xl lg:text-5xl text-gray-900 mb-4"
              delay={0}
            >
              Teacher Guides
            </AnimatedHeading>
            <AnimatedParagraph
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              delay={0.3}
            >
              Comprehensive curriculum guides designed by education experts to
              bring African history to life in your classroom. Complete with
              lesson plans, activities, and assessments.
            </AnimatedParagraph>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Curriculum Units", value: "24", icon: BookOpen },
              { label: "Grade Levels", value: "K-12", icon: Users },
              { label: "Total Downloads", value: "8.2K", icon: Download },
              { label: "Avg Rating", value: "4.8★", icon: Star },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg text-gray-900">
                Find Your Perfect Curriculum
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search guides..."
                  className="pl-10 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Grade Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="K-2">K-2</SelectItem>
                  <SelectItem value="3-5">3-5</SelectItem>
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
                  <SelectItem value="World History">World History</SelectItem>
                  <SelectItem value="African Studies">
                    African Studies
                  </SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Guides Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatedText className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <Card
                key={guide.id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={guide.preview.image}
                    alt={guide.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-600 text-white">
                      Grade {guide.grade}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {guide.duration}
                    </Badge>
                  </div>
                  {guide.isPremium && (
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-amber-600 text-white">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl text-gray-900 mb-1">
                          {guide.title}
                        </h3>
                        {guide.isPremium && (
                          <span className="text-lg text-amber-600 font-medium">
                            ${guide.price}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{guide.subject}</p>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-3">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {guide.duration}
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            guide.difficulty === "Beginner"
                              ? "border-green-500 text-green-700"
                              : guide.difficulty === "Intermediate"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-red-500 text-red-700"
                          }`}
                        >
                          {guide.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center text-amber-600">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {guide.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {guide.downloads.toLocaleString()} downloads
                      </div>
                      <div>By {guide.author}</div>
                    </div>

                    {/* Sample Download Button for Premium Content */}
                    {guide.hasSample && guide.isPremium && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-green-500 text-green-700 hover:bg-green-50"
                        onClick={() => handleSampleDownload(guide)}
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Download Free Sample
                      </Button>
                    )}

                    <div
                      className={`flex space-x-2 ${
                        guide.hasSample && guide.isPremium ? "pt-2" : ""
                      }`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setPreviewGuide(guide)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className={`flex-1 ${
                          guide.isPremium
                            ? "bg-amber-600 hover:bg-amber-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                        onClick={() => handleDownload(guide)}
                      >
                        {guide.isPremium ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Get Access
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AnimatedText>

          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Use Our Guides */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl text-gray-900 mb-4">
              Why Teachers Love Our Guides
            </h2>
            <p className="text-gray-600">
              Developed by education experts and African history scholars, our
              curriculum guides make it easy to bring authentic African history
              into your classroom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Expert Developed",
                description:
                  "Created by historians, educators, and subject matter experts with decades of experience.",
              },
              {
                icon: Users,
                title: "Classroom Tested",
                description:
                  "All materials have been tested in real classrooms with feedback from teachers and students.",
              },
              {
                icon: FileText,
                title: "Complete Resources",
                description:
                  "Everything you need including lesson plans, activities, assessments, and multimedia resources.",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {previewGuide && (
        <GuidePreview
          guide={previewGuide}
          isOpen={!!previewGuide}
          onClose={() => setPreviewGuide(null)}
        />
      )}

      {/* Access Request Modal */}
      {accessRequestGuide && (
        <AccessRequestDialog
          guide={accessRequestGuide}
          isOpen={!!accessRequestGuide}
          onClose={() => setAccessRequestGuide(null)}
        />
      )}
    </div>
  );
}
