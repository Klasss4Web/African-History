import { useState } from "react";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Crown,
  Award,
  Target,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

// Mock leaderboard data
const leaderboardData = {
  weekly: [
    {
      id: 1,
      name: "Amara Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=100&h=100&crop=face&fit=crop",
      points: 2850,
      activities: 24,
      streak: 7,
      badges: ["Quiz Master", "Explorer", "History Buff"],
      country: "Kenya",
      change: "+2",
    },
    {
      id: 2,
      name: "Kofi Asante",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&crop=face&fit=crop",
      points: 2740,
      activities: 22,
      streak: 5,
      badges: ["Timeline Expert", "Cultural Scholar"],
      country: "Ghana",
      change: "+1",
    },
    {
      id: 3,
      name: "Zara Ibrahim",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&crop=face&fit=crop",
      points: 2690,
      activities: 20,
      streak: 12,
      badges: ["Virtual Tourist", "Ancient Civilizations"],
      country: "Nigeria",
      change: "-1",
    },
    {
      id: 4,
      name: "Lwazi Mthembu",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&crop=face&fit=crop",
      points: 2580,
      activities: 19,
      streak: 3,
      badges: ["Explorer", "Quiz Master"],
      country: "South Africa",
      change: "+3",
    },
    {
      id: 5,
      name: "Fatouma Diallo",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&crop=face&fit=crop",
      points: 2450,
      activities: 18,
      streak: 8,
      badges: ["History Buff", "Timeline Expert"],
      country: "Mali",
      change: "0",
    },
  ],
  monthly: [
    {
      id: 1,
      name: "Amara Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=100&h=100&crop=face&fit=crop",
      points: 8750,
      activities: 96,
      streak: 28,
      badges: ["Quiz Master", "Explorer", "History Buff", "Scholar"],
      country: "Kenya",
      change: "+0",
    },
    {
      id: 2,
      name: "Chen Wei Liu",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&crop=face&fit=crop",
      points: 8240,
      activities: 89,
      streak: 15,
      badges: ["Cultural Scholar", "Timeline Expert", "Virtual Tourist"],
      country: "China",
      change: "+1",
    },
    {
      id: 3,
      name: "Kofi Asante",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&crop=face&fit=crop",
      points: 7890,
      activities: 84,
      streak: 12,
      badges: ["Timeline Expert", "Cultural Scholar", "Explorer"],
      country: "Ghana",
      change: "-1",
    },
  ],
  allTime: [
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&crop=face&fit=crop",
      points: 15750,
      activities: 156,
      streak: 45,
      badges: [
        "Legend",
        "Quiz Master",
        "Explorer",
        "Scholar",
        "Cultural Expert",
      ],
      country: "United States",
      change: "+0",
    },
    {
      id: 2,
      name: "Amara Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=100&h=100&crop=face&fit=crop",
      points: 14200,
      activities: 142,
      streak: 28,
      badges: ["Quiz Master", "Explorer", "History Buff", "Scholar"],
      country: "Kenya",
      change: "+2",
    },
    {
      id: 3,
      name: "Omar Hassan",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&crop=face&fit=crop",
      points: 13850,
      activities: 138,
      streak: 35,
      badges: ["Cultural Scholar", "Ancient Civilizations", "Timeline Expert"],
      country: "Egypt",
      change: "-1",
    },
  ],
};

const achievements = [
  {
    name: "Quiz Master",
    description: "Complete 50 quizzes with 90% accuracy",
    icon: Star,
    color: "bg-yellow-500",
    rarity: "Epic",
  },
  {
    name: "Explorer",
    description: "Visit 25 different historical sites",
    icon: Target,
    color: "bg-blue-500",
    rarity: "Rare",
  },
  {
    name: "History Buff",
    description: "Spend 100 hours learning",
    icon: Award,
    color: "bg-purple-500",
    rarity: "Legendary",
  },
  {
    name: "Cultural Scholar",
    description: "Complete activities from all 5 regions",
    icon: Crown,
    color: "bg-green-500",
    rarity: "Epic",
  },
  {
    name: "Timeline Expert",
    description: "Master 20 historical timelines",
    icon: TrendingUp,
    color: "bg-orange-500",
    rarity: "Rare",
  },
  {
    name: "Virtual Tourist",
    description: "Take 15 virtual tours",
    icon: Zap,
    color: "bg-pink-500",
    rarity: "Common",
  },
];

function LeaderboardItem({
  user,
  rank,
  showChange = true,
}: {
  user: any;
  rank: number;
  showChange?: boolean;
}) {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-gray-500 text-sm">
            #{rank}
          </div>
        );
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-600 bg-green-50";
    if (change.startsWith("-")) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div
      className={`flex items-center p-4 rounded-lg transition-all hover:bg-gray-50 ${
        rank <= 3
          ? "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200"
          : "bg-white border border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <div className="flex-shrink-0">{getRankIcon()}</div>

        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-gray-900 truncate">{user.name}</h3>
            {rank === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
            <span className="text-sm text-gray-500">{user.country}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {user.badges.slice(0, 3).map((badge: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0"
              >
                {badge}
              </Badge>
            ))}
            {user.badges.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0">
                +{user.badges.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 text-right">
        <div>
          <div className="text-lg text-gray-900">
            {user.points.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">points</div>
        </div>

        <div className="hidden sm:block">
          <div className="text-sm text-gray-900">{user.activities}</div>
          <div className="text-xs text-gray-500">activities</div>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <div className="text-sm text-gray-900">{user.streak}</div>
          <div className="text-xs text-gray-500">day streak</div>
        </div>

        {showChange && (
          <div
            className={`text-xs px-2 py-1 rounded-full ${getChangeColor(
              user.change
            )}`}
          >
            {user.change === "0" ? "—" : user.change}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Leaderboards() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  const currentData =
    leaderboardData[selectedPeriod as keyof typeof leaderboardData];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-amber-100 text-amber-800"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Competitive Learning
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              Student Leaderboards
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Celebrate learning achievements and compete with students
              worldwide. Earn points, unlock badges, and climb the rankings as
              you explore African history.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Active Learners", value: "2,847", icon: Users },
              { label: "This Week's Leader", value: "Amara J.", icon: Crown },
              { label: "Points Earned Today", value: "15,420", icon: Star },
              { label: "Countries Participating", value: "34", icon: Trophy },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-amber-600" />
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

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Top Performers
                  </CardTitle>
                  <Tabs
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                  >
                    <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="allTime">All Time</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentData.slice(0, 10).map((user, index) => (
                    <LeaderboardItem
                      key={user.id}
                      user={user}
                      rank={index + 1}
                      showChange={selectedPeriod !== "allTime"}
                    />
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button variant="outline">View Full Leaderboard</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Rank</span>
                  <Badge className="bg-amber-600">#247</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Points This Week</span>
                  <span className="text-gray-900">1,240</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Learning Streak</span>
                  <span className="text-gray-900">12 days</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Rank</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                  <p className="text-xs text-gray-500">
                    180 points to reach rank #246
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Available Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Available Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.slice(0, 4).map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${achievement.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <achievement.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm text-gray-900 truncate">
                            {achievement.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Weekly Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="text-gray-900">
                    Ancient Egyptian Quiz Marathon
                  </h4>
                  <p className="text-sm text-gray-600">
                    Complete 10 quizzes about Ancient Egypt this week to earn
                    bonus points!
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>3/10 quizzes</span>
                    </div>
                    <Progress value={30} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Reward</span>
                    <Badge className="bg-purple-600">500 bonus points</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
