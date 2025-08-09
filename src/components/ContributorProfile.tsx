import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Github,
  Twitter,
  Globe,
  Star,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link } from "react-router-dom";
import AnimatedCounter from "./AnimatedCounter";

// Sample contributor data - in a real app this would come from an API
const contributorData = {
  1: {
    id: 1,
    name: "Dr. Kwame Asante",
    role: "Lead Historian & Content Curator",
    bio: "Dr. Asante is a renowned historian specializing in West African history with over 20 years of research experience. He holds a PhD in African Studies from the University of Ghana and has led numerous archaeological expeditions across the Sahel region.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&crop=face&fit=crop",
    country: "Ghana",
    location: "Accra, Ghana",
    joinedDate: "January 2023",
    expertise: [
      "West African Empires",
      "Oral History",
      "Archaeological Research",
      "Mali Empire",
      "Trans-Saharan Trade",
    ],
    contributions: 124,
    articlesWritten: 45,
    projectsLed: 8,
    citationsReceived: 1250,
    social: {
      github: "kwameasante",
      twitter: "drkas_historian",
      website: "kwameasante.edu",
    },
    achievements: [
      "Published 15 research papers on Mali Empire",
      "Led excavation team at Kumbi Saleh archaeological site",
      "Consulted for UNESCO World Heritage sites",
      "Featured in National Geographic documentary",
      "Recipient of Ghana Historical Society Award 2023",
    ],
    currentProjects: [
      "Digital Archive of Ashanti Oral Traditions",
      "Trans-Saharan Trade Routes Database",
      "Mali Empire Interactive Timeline",
      "Community Heritage Documentation Project",
    ],
    recentPublications: [
      {
        title: "The Golden Trade Routes of Ancient Ghana",
        journal: "African Historical Review",
        date: "2024-01-15",
        type: "Research Article",
      },
      {
        title: "Oral Traditions of the Mande People",
        journal: "Journal of African Cultural Studies",
        date: "2023-11-20",
        type: "Research Article",
      },
      {
        title: "Archaeological Evidence from Kumbi Saleh",
        journal: "West African Archaeological Bulletin",
        date: "2023-09-10",
        type: "Field Report",
      },
    ],
    stats: {
      totalContributions: 124,
      articlesWritten: 45,
      projectsLed: 8,
      yearsActive: 2,
      collaborations: 23,
    },
  },
  2: {
    id: 2,
    name: "Prof. Amina Hassan",
    role: "Ancient Egyptian Specialist",
    bio: "Prof. Hassan is a leading Egyptologist and archaeologist with extensive fieldwork experience across Egypt and Sudan. She is a Professor at Cairo University and has discovered several important archaeological sites.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&crop=face&fit=crop",
    country: "Egypt",
    location: "Cairo, Egypt",
    joinedDate: "February 2023",
    expertise: [
      "Ancient Egypt",
      "Hieroglyphics",
      "Archaeological Methods",
      "Nubian Civilization",
      "Religious Studies",
    ],
    contributions: 98,
    articlesWritten: 32,
    projectsLed: 6,
    citationsReceived: 890,
    social: {
      github: "",
      twitter: "profaminah",
      website: "aminahassan.academia.edu",
    },
    achievements: [
      "Discovered 3 previously unknown tombs in Valley of Kings",
      "Translated over 500 hieroglyphic texts for digital archive",
      "Received International Egyptology Award 2023",
      "Led restoration of Saqqara temple complex",
      "Authored definitive guide to Egyptian burial practices",
    ],
    currentProjects: [
      "Digital Hieroglyphic Dictionary",
      "3D Pyramid Interior Mapping",
      "Nubian Kingdom Documentation",
      "Ancient Egyptian Women's History Project",
    ],
    recentPublications: [
      {
        title: "Recent Discoveries in Saqqara Necropolis",
        journal: "Journal of Egyptian Archaeology",
        date: "2024-01-10",
        type: "Research Article",
      },
      {
        title: "Hieroglyphic Inscriptions from Dynasty XVIII",
        journal: "Egyptian Studies Quarterly",
        date: "2023-12-05",
        type: "Translation Study",
      },
      {
        title: "Women in Ancient Egyptian Society",
        journal: "Gender & History in Africa",
        date: "2023-10-15",
        type: "Review Article",
      },
    ],
    stats: {
      totalContributions: 98,
      articlesWritten: 32,
      projectsLed: 6,
      yearsActive: 2,
      collaborations: 18,
    },
  },
};

export default function ContributorProfile() {
  const { id } = useParams();
  const contributor = contributorData[id as keyof typeof contributorData];

  if (!contributor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Contributor Not Found</h1>
          <Button asChild>
            <Link to="/contributors">Back to Contributors</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4">
            <Link to="/contributors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contributors
            </Link>
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl text-gray-900 mb-2">
                      {contributor.name}
                    </h1>
                    <p className="text-lg text-gray-600 mb-3">
                      {contributor.role}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {contributor.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {contributor.joinedDate}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {contributor.bio}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Social Links */}
                    <div className="flex gap-2">
                      {contributor.social.github && (
                        <Button size="sm" variant="outline">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {contributor.social.twitter && (
                        <Button size="sm" variant="outline">
                          <Twitter className="w-4 h-4" />
                        </Button>
                      )}
                      {contributor.social.website && (
                        <Button size="sm" variant="outline">
                          <Globe className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <Button className="bg-amber-600 hover:bg-amber-700">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Total Contributions",
              value: contributor.stats.totalContributions,
              icon: BookOpen,
            },
            {
              label: "Articles Written",
              value: contributor.stats.articlesWritten,
              icon: Star,
            },
            {
              label: "Projects Led",
              value: contributor.stats.projectsLed,
              icon: Trophy,
            },
            {
              label: "Years Active",
              value: contributor.stats.yearsActive,
              icon: Calendar,
            },
            {
              label: "Collaborations",
              value: contributor.stats.collaborations,
              icon: MapPin,
            },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-2xl text-gray-900 mb-1">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="expertise" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="expertise">
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {contributor.expertise.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-amber-100 text-amber-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributor.currentProjects.map((project, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="text-gray-900 mb-1">{project}</h4>
                        <p className="text-sm text-gray-600">Active project</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications">
            <Card>
              <CardHeader>
                <CardTitle>Recent Publications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributor.recentPublications.map((pub, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-amber-500 pl-4 py-2"
                    >
                      <h4 className="text-gray-900 mb-1">{pub.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {pub.journal}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {pub.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {pub.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Major Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contributor.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Trophy className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
