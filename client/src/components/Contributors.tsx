import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Github,
  Twitter,
  Globe,
  Calendar,
  Gift,
  Star,
  Users,
  Code,
  BookOpen,
  MapPin,
} from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AnimatedCounter from "./AnimatedCounter";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Enhanced Contributors data with real sample contributors
const contributors = [
  {
    id: 1,
    name: "Dr. Kwame Asante",
    role: "Lead Historian & Content Curator",
    bio: "Specializes in West African history with 20+ years of research experience. PhD in African Studies from University of Ghana.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&crop=face&fit=crop",
    country: "Ghana",
    flag: "🇬🇭",
    expertise: [
      "West African Empires",
      "Oral History",
      "Archaeological Research",
    ],
    contributions: 124,
    joinedDate: "Jan 2023",
    birthday: "March 15",
    achievements: [
      "Published 15 research papers on Mali Empire",
      "Led excavation team at Kumbi Saleh",
      "Consulted for UNESCO World Heritage sites",
    ],
    currentProjects: [
      "Digital Archive of Ashanti Oral Traditions",
      "Trans-Saharan Trade Routes Database",
    ],
    social: {
      github: "kwameasante",
      twitter: "drkas_historian",
      website: "kwameasante.edu",
    },
    recentWork: [
      "Mali Empire Interactive Timeline",
      "Timbuktu Virtual Tour Development",
      "Akan Cultural Artifacts Database",
    ],
    featuredPost: {
      title: "The Golden Trade Routes of Ancient Ghana",
      excerpt:
        "Exploring how the trans-Saharan trade networks shaped West African civilization...",
      date: "2 days ago",
    },
  },
  {
    id: 2,
    name: "Prof. Amina Hassan",
    role: "Ancient Egyptian Specialist",
    bio: "Leading Egyptologist and archaeologist with extensive fieldwork experience. Professor at Cairo University.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&crop=face&fit=crop",
    country: "Egypt",
    flag: "🇪🇬",
    expertise: ["Ancient Egypt", "Hieroglyphics", "Archaeological Methods"],
    contributions: 98,
    joinedDate: "Feb 2023",
    birthday: "July 8",
    achievements: [
      "Discovered 3 previously unknown tombs in Valley of Kings",
      "Translated over 500 hieroglyphic texts",
      "Received International Egyptology Award 2023",
    ],
    currentProjects: [
      "Digital Hieroglyphic Dictionary",
      "3D Pyramid Interior Mapping",
    ],
    social: {
      github: "",
      twitter: "profaminah",
      website: "aminahassan.academia.edu",
    },
    recentWork: [
      "Pyramid Construction Methodology Guide",
      "Hieroglyphic Writing System Tutorial",
      "Valley of the Kings Virtual Experience",
    ],
    featuredPost: {
      title: "Recent Discoveries in Saqqara Necropolis",
      excerpt:
        "New findings are reshaping our understanding of Old Kingdom burial practices...",
      date: "3 days ago",
    },
  },
  {
    id: 3,
    name: "Dr. Sarah Mitchell",
    role: "Educational Technology Developer",
    bio: "Full-stack developer passionate about making history accessible through technology. MS in Computer Science from MIT.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=150&h=150&crop=face&fit=crop",
    country: "United States",
    flag: "🇺🇸",
    expertise: ["React Development", "Educational UX", "3D Visualization"],
    contributions: 87,
    joinedDate: "Mar 2023",
    birthday: "December 3",
    achievements: [
      "Built award-winning VR historical experiences",
      "Increased platform accessibility by 400%",
      "Open-sourced 12 educational tools",
    ],
    currentProjects: [
      "AI-Powered Historical Q&A System",
      "Mobile AR Archaeological Tours",
    ],
    social: {
      github: "sarahmitchell",
      twitter: "sarahcodes",
      website: "sarahmitchell.dev",
    },
    recentWork: [
      "Student Activities Platform",
      "Virtual Tour 360° Interface",
      "Mobile Responsive Redesign",
    ],
    featuredPost: {
      title: "Building Immersive Historical Experiences",
      excerpt:
        "How modern web technologies can bring ancient civilizations to life...",
      date: "1 week ago",
    },
  },
  {
    id: 4,
    name: "Dr. Fatima Al-Zahra",
    role: "Islamic History & Culture Expert",
    bio: "Islamic scholar and historian focusing on African Islamic civilizations. PhD from Al-Azhar University.",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&crop=face&fit=crop",
    country: "Morocco",
    flag: "🇲🇦",
    expertise: [
      "Islamic Civilization",
      "Medieval Africa",
      "Manuscript Studies",
    ],
    contributions: 73,
    joinedDate: "May 2023",
    birthday: "November 18",
    achievements: [
      "Digitized 1,000+ medieval manuscripts",
      "Expert advisor to Al-Andalus Museum",
      "Published definitive work on Islamic architecture",
    ],
    currentProjects: [
      "Timbuktu Manuscripts Preservation Project",
      "Islamic Trade Routes Interactive Map",
    ],
    social: {
      github: "",
      twitter: "fatima_historian",
      website: "fatimaalzahra.research.org",
    },
    recentWork: [
      "Islamic Architecture in Africa Guide",
      "Timbuktu Manuscripts Digital Archive",
      "Swahili Coast Trade Networks Analysis",
    ],
    featuredPost: {
      title: "The Scholars of Timbuktu: Preserving Knowledge",
      excerpt:
        "How medieval African scholars contributed to global intellectual heritage...",
      date: "1 week ago",
    },
  },
  {
    id: 5,
    name: "Marcus Johnson",
    role: "Content Creator & Video Producer",
    bio: "Award-winning documentary filmmaker specializing in African history and culture. Based in Johannesburg.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&crop=face&fit=crop",
    country: "South Africa",
    flag: "🇿🇦",
    expertise: [
      "Documentary Production",
      "Oral History",
      "Cultural Preservation",
    ],
    contributions: 56,
    joinedDate: "Apr 2023",
    birthday: "September 22",
    achievements: [
      "Emmy-nominated for African Heritage series",
      "Documented 50+ oral history interviews",
      "Created viral educational content (2M+ views)",
    ],
    currentProjects: [
      "African Diaspora Documentary Series",
      "Youth Heritage Education Program",
    ],
    social: {
      github: "",
      twitter: "marcusjfilms",
      website: "marcusjohnsonfilms.com",
    },
    recentWork: [
      "Great Zimbabwe Documentary Series",
      "San People Oral History Project",
      "Ubuntu Philosophy Explainer Videos",
    ],
    featuredPost: {
      title: "Preserving African Oral Traditions in Digital Age",
      excerpt:
        "How technology can help safeguard centuries-old storytelling traditions...",
      date: "5 days ago",
    },
  },
  {
    id: 6,
    name: "Dr. Nomsa Dlamini",
    role: "Southern African Archaeology",
    bio: "Archaeologist specializing in Iron Age civilizations of Southern Africa. University of the Witwatersrand.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&crop=face&fit=crop",
    country: "Zimbabwe",
    flag: "🇿🇼",
    expertise: ["Iron Age Africa", "Stone Age Art", "Cultural Heritage"],
    contributions: 91,
    joinedDate: "Jun 2023",
    birthday: "April 12",
    achievements: [
      "Discovered oldest iron smelting site in region",
      "UNESCO consultant for rock art preservation",
      "Leading researcher on Great Zimbabwe origins",
    ],
    currentProjects: [
      "Rock Art Digital Preservation Initiative",
      "Iron Age Settlement Patterns Study",
    ],
    social: {
      github: "",
      twitter: "nomsa_archaeo",
      website: "nomsadlamini.academia.edu",
    },
    recentWork: [
      "Great Zimbabwe Archaeological Survey",
      "San Rock Art Documentation",
      "Mapungubwe Cultural Landscape Analysis",
    ],
    featuredPost: {
      title: "Hidden Stories in Southern African Rock Art",
      excerpt:
        "Recent discoveries reveal sophisticated astronomical knowledge in ancient art...",
      date: "4 days ago",
    },
  },
];

// Birthday/Appreciation posts
const appreciationPosts = [
  {
    id: 1,
    type: "birthday",
    contributor: contributors[1], // Prof. Amina Hassan - birthday July 8
    title: "🎉 Happy Birthday Prof. Amina Hassan!",
    content:
      "Today we celebrate our incredible Ancient Egyptian specialist! Prof. Hassan has revolutionized our understanding of hieroglyphics and made Egyptian history accessible to thousands of learners. Her virtual pyramid tours have been experienced by over 50,000 students worldwide!",
    date: "July 8, 2024",
    likes: 456,
    comments: 78,
    achievements: [
      "Translated 500+ hieroglyphic texts for our database",
      "Created the most comprehensive pyramid interior guide",
      "Mentored 25+ graduate students in Egyptology",
    ],
  },
  {
    id: 2,
    type: "appreciation",
    contributor: contributors[0], // Dr. Kwame Asante
    title: "🌟 Contributor Spotlight: Dr. Kwame Asante",
    content:
      "This month we're highlighting Dr. Asante's incredible contributions to our West African history content. His expertise has made our Mali Empire section the most comprehensive resource available online, with over 100,000 annual visitors!",
    date: "January 15, 2024",
    likes: 289,
    comments: 52,
    achievements: [
      "Authored 50+ historical articles with 98% accuracy rating",
      "Curated 300+ artifacts with detailed cultural context",
      "Led 5 collaborative research projects with international teams",
    ],
  },
  {
    id: 3,
    type: "milestone",
    contributor: contributors[2], // Dr. Sarah Mitchell
    title: "🏆 1 Year Anniversary: Dr. Sarah Mitchell",
    content:
      "Celebrating Sarah's first year as our Educational Technology Developer! Her innovative coding work has transformed how students engage with African history. The platform's interactivity has increased by 400% thanks to her contributions!",
    date: "March 20, 2024",
    likes: 334,
    comments: 67,
    achievements: [
      "Built 15+ interactive learning modules",
      "Improved site performance by 250%",
      "Open-sourced educational tools used by 50+ institutions",
    ],
  },
];

function ContributorCard({ contributor }: { contributor: any }) {
  const navigate = useNavigate();

  const isRecentBirthday = () => {
    const today = new Date();
    const birthday = new Date(
      today.getFullYear(),
      new Date(Date.parse(contributor.birthday + " 1, 2000")).getMonth(),
      new Date(Date.parse(contributor.birthday + " 1, 2000")).getDate()
    );
    const daysDiff =
      Math.abs(today.getTime() - birthday.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 7; // Within a week
  };

  const handleViewProfile = () => {
    navigate(`/contributors/${contributor.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {isRecentBirthday() && (
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 text-center text-sm rounded-t-lg">
          🎉 Recent Birthday - {contributor.birthday}!
        </div>
      )}
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg text-gray-900 mb-1">{contributor.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{contributor.role}</p>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <span>{contributor.flag}</span>
              <MapPin className="w-3 h-3" />
              {contributor.country}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{contributor.bio}</p>

        <div>
          <h4 className="text-sm text-gray-900 mb-2">Expertise</h4>
          <div className="flex flex-wrap gap-1">
            {contributor.expertise.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Contributions:</span>
            <div className="text-gray-900">
              <AnimatedCounter target={contributor.contributions} />
            </div>
          </div>
          <div>
            <span className="text-gray-500">Joined:</span>
            <div className="text-gray-900">{contributor.joinedDate}</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm text-gray-900 mb-2">Recent Work</h4>
          <ul className="space-y-1">
            {contributor.recentWork
              .slice(0, 2)
              .map((work: string, index: number) => (
                <li
                  key={index}
                  className="text-xs text-gray-600 flex items-start"
                >
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  {work}
                </li>
              ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            {contributor.social.github && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => navigate("/coming-soon")}
              >
                <Github className="w-4 h-4" />
              </Button>
            )}
            {contributor.social.twitter && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => navigate("/coming-soon")}
              >
                <Twitter className="w-4 h-4" />
              </Button>
            )}
            {contributor.social.website && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => navigate("/coming-soon")}
              >
                <Globe className="w-4 h-4" />
              </Button>
            )}
          </div>
          <Button size="sm" variant="outline" onClick={handleViewProfile}>
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AppreciationPost({ post }: { post: any }) {
  const getPostIcon = () => {
    switch (post.type) {
      case "birthday":
        return <Gift className="w-5 h-5" />;
      case "appreciation":
        return <Star className="w-5 h-5" />;
      case "milestone":
        return <Calendar className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  const getPostColor = () => {
    switch (post.type) {
      case "birthday":
        return "from-pink-500 to-purple-600";
      case "appreciation":
        return "from-amber-500 to-orange-600";
      case "milestone":
        return "from-blue-500 to-cyan-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const handleSendWishes = () => {
    if (post.type === "birthday") {
      alert(`Birthday wishes sent to ${post.contributor.name}! 🎉`);
    } else {
      alert(`Appreciation message sent to ${post.contributor.name}! ⭐`);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className={`bg-gradient-to-r ${getPostColor()} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              {getPostIcon()}
            </div>
            <div className="text-white">
              <h3 className="text-lg">{post.title}</h3>
              <p className="text-sm opacity-90">{post.date}</p>
            </div>
          </div>
          {post.type === "birthday" && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={handleSendWishes}
            >
              <Gift className="w-4 h-4 mr-1" />
              Send Wishes
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={post.contributor.avatar}
              alt={post.contributor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 mb-1">{post.contributor.name}</h4>
            <p className="text-sm text-gray-600">{post.contributor.role}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{post.content}</p>

        <div className="space-y-3">
          <h5 className="text-sm text-gray-900">Key Achievements:</h5>
          <ul className="space-y-1">
            {post.achievements.map((achievement: string, index: number) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start"
              >
                <Star className="w-3 h-3 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-6 pt-4 border-t text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>
              <AnimatedCounter target={post.likes} />
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>
              <AnimatedCounter target={post.comments} /> comments
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Contributors() {
  const [selectedTab, setSelectedTab] = useState("all");
  const navigate = useNavigate();

  const handleBecomeContributor = () => {
    navigate("/coming-soon");
  };

  const handleViewGitHub = () => {
    navigate("/coming-soon");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Animated Stats */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-purple-100 text-purple-800"
            >
              <Heart className="w-4 h-4 mr-2" />
              Community Champions
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              Our Contributors
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the passionate historians, educators, developers, and
              creators who make AfricanHistory.org a world-class educational
              platform. Their expertise and dedication bring African heritage to
              life for learners worldwide.
            </p>
          </div>

          {/* Platform Stats with Animation */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Active Contributors", target: 47, icon: Users },
              { label: "Countries Represented", target: 12, icon: Globe },
              { label: "Total Contributions", target: 1248, icon: Code },
              { label: "Content Pieces Created", target: 3456, icon: BookOpen },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-purple-600" />
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

      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="all">All Contributors</TabsTrigger>
            <TabsTrigger value="appreciation">Appreciation</TabsTrigger>
            <TabsTrigger value="birthdays">Celebrations</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributors.map((contributor) => (
                <ContributorCard
                  key={contributor.id}
                  contributor={contributor}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <h3 className="text-2xl text-gray-900 mb-4">
                Want to Contribute?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our community of passionate educators and historians.
                Whether you're an expert in African history, a developer, or
                simply passionate about education, there's a place for you.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleBecomeContributor}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Become a Contributor
                </Button>
                <Button variant="outline" onClick={handleViewGitHub}>
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appreciation">
            <div className="max-w-4xl mx-auto space-y-8">
              {appreciationPosts.map((post) => (
                <AppreciationPost key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="birthdays">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-gray-900 mb-4">
                  🎉 Upcoming Celebrations
                </h2>
                <p className="text-gray-600">
                  Join us in celebrating our amazing contributors!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {contributors.slice(0, 4).map((contributor) => (
                  <Card
                    key={contributor.id}
                    className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={contributor.avatar}
                            alt={contributor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-gray-900">{contributor.name}</h3>
                          <p className="text-sm text-gray-600">
                            {contributor.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-pink-600">
                          <Gift className="w-4 h-4" />
                          <span className="text-sm">
                            Birthday: {contributor.birthday}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-pink-600 hover:bg-pink-700"
                          onClick={() =>
                            alert(
                              `Birthday wishes sent to ${contributor.name}! 🎉`
                            )
                          }
                        >
                          Send Wishes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                {appreciationPosts
                  .filter((post) => post.type === "birthday")
                  .map((post) => (
                    <AppreciationPost key={post.id} post={post} />
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
