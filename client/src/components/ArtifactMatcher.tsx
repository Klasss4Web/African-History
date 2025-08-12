import { useState } from "react";
import { CheckCircle, X, RotateCcw, Star, Trophy, MapPin } from "lucide-react";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import AnimatedCounter from "./AnimatedCounter";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Artifact {
  id: string;
  name: string;
  image: string;
  description: string;
  correctRegion: string;
  period: string;
  funFact: string;
}

interface Region {
  id: string;
  name: string;
  color: string;
}

const artifacts: Artifact[] = [
  {
    id: "tutankhamun-mask",
    name: "Tutankhamun's Golden Mask",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Exquisite golden funeral mask of the young pharaoh",
    correctRegion: "North Africa",
    period: "1332-1323 BCE",
    funFact: "Made of 11 kg of solid gold!",
  },
  {
    id: "benin-bronze",
    name: "Benin Bronze Plaque",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Intricate bronze artwork depicting royal court scenes",
    correctRegion: "West Africa",
    period: "13th-19th centuries",
    funFact: "Over 3,000 plaques decorated the royal palace!",
  },
  {
    id: "great-zimbabwe-bird",
    name: "Zimbabwe Bird Sculpture",
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Soapstone bird sculpture symbolizing royal power",
    correctRegion: "Southern Africa",
    period: "11th-15th centuries",
    funFact: "It's now featured on Zimbabwe's flag and currency!",
  },
  {
    id: "aksum-obelisk",
    name: "Aksum Obelisk",
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Towering granite monuments marking royal graves",
    correctRegion: "East Africa",
    period: "1st-8th centuries CE",
    funFact: "Some obelisks are over 80 feet tall!",
  },
  {
    id: "nok-terracotta",
    name: "Nok Terracotta Head",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    description: "Ancient terracotta sculpture with distinctive features",
    correctRegion: "West Africa",
    period: "1500 BCE-500 CE",
    funFact: "Represents Africa's oldest known sculptural tradition!",
  },
  {
    id: "congo-mask",
    name: "Kongo Power Figure",
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    description: "Wooden sculpture embedded with nails and metal",
    correctRegion: "Central Africa",
    period: "19th-20th centuries",
    funFact: "Each nail represents a resolved conflict or agreement!",
  },
];

const regions: Region[] = [
  { id: "north", name: "North Africa", color: "bg-amber-500" },
  { id: "west", name: "West Africa", color: "bg-green-500" },
  { id: "east", name: "East Africa", color: "bg-blue-500" },
  { id: "central", name: "Central Africa", color: "bg-purple-500" },
  { id: "southern", name: "Southern Africa", color: "bg-red-500" },
];

export default function ArtifactMatcher() {
  const [currentArtifact, setCurrentArtifact] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const artifact = artifacts[currentArtifact];

  const handleRegionSelect = (regionName: string) => {
    if (showFeedback) return;

    setSelectedRegion(regionName);
    setAttempts((prev) => prev + 1);

    const correct = regionName === artifact.correctRegion;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextArtifact = () => {
    if (currentArtifact >= artifacts.length - 1) {
      setGameComplete(true);
      if (streak > bestStreak) {
        setBestStreak(streak);
      }
    } else {
      setCurrentArtifact((prev) => prev + 1);
      setSelectedRegion(null);
      setShowFeedback(false);
    }
  };

  const resetGame = () => {
    setCurrentArtifact(0);
    setSelectedRegion(null);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setShowFeedback(false);
    setStreak(0);
  };

  const progress = (currentArtifact / artifacts.length) * 100;

  if (gameComplete) {
    const accuracy =
      attempts > 0 ? Math.round((score / 10 / attempts) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl">Game Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl text-amber-600 mb-1">
                    <AnimatedCounter target={score} />
                  </div>
                  <div className="text-sm text-gray-600">Total Score</div>
                </div>
                <div>
                  <div className="text-3xl text-green-600 mb-1">
                    <AnimatedCounter target={accuracy} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Best Streak:</span>
                  <span className="text-blue-600">{bestStreak} correct</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Attempts:</span>
                  <span>{attempts}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-gray-600 mb-4">
                  {accuracy >= 80
                    ? "Excellent work! You're a true African history expert!"
                    : accuracy >= 60
                    ? "Good job! Keep exploring to learn more."
                    : "Keep learning! Every expert started as a beginner."}
                </p>
                <Button
                  onClick={resetGame}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-gray-900 mb-2">
            Artifact Origin Matcher
          </h1>
          <p className="text-gray-600">
            Can you match these African artifacts to their regions of origin?
          </p>
        </div>

        {/* Progress & Stats */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl text-amber-600">
                    <AnimatedCounter target={score} />
                  </div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-blue-600">{streak}</div>
                  <div className="text-xs text-gray-500">Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg text-gray-700">
                    {currentArtifact + 1}/{artifacts.length}
                  </div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {streak >= 3 && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1" />
                    Hot Streak!
                  </Badge>
                )}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Game Area */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Artifact Card */}
            <Card className="overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={artifact.image}
                  alt={artifact.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-600 text-white">
                    Artifact #{currentArtifact + 1}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl text-gray-900 mb-2">{artifact.name}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {artifact.description}
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Period:</strong> {artifact.period}
                </div>

                {showFeedback && (
                  <div
                    className={`mt-4 p-3 rounded-lg ${
                      isCorrect ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span
                        className={`font-medium ${
                          isCorrect ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </span>
                    </div>
                    {!isCorrect && (
                      <p className="text-sm text-red-700 mb-2">
                        The correct answer is{" "}
                        <strong>{artifact.correctRegion}</strong>
                      </p>
                    )}
                    <p className="text-sm text-gray-700">
                      <strong>Fun Fact:</strong> {artifact.funFact}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Regions */}
            <div className="space-y-4">
              <h3 className="text-lg text-gray-900 mb-4">
                Select the region where this artifact originates:
              </h3>
              <div className="space-y-3">
                {regions.map((region) => (
                  <Button
                    key={region.id}
                    variant={
                      selectedRegion === region.name ? "default" : "outline"
                    }
                    className={`w-full justify-start h-auto p-4 ${
                      selectedRegion === region.name
                        ? showFeedback
                          ? isCorrect
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-700"
                        : showFeedback && region.name === artifact.correctRegion
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                    onClick={() => handleRegionSelect(region.name)}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${region.color} mr-3`}
                      ></div>
                      <div className="text-left">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {region.name}
                        </div>
                      </div>
                      {selectedRegion === region.name && showFeedback && (
                        <div className="ml-auto">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <X className="w-5 h-5" />
                          )}
                        </div>
                      )}
                    </div>
                  </Button>
                ))}
              </div>

              {showFeedback && (
                <div className="pt-4">
                  <Button
                    onClick={nextArtifact}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    {currentArtifact >= artifacts.length - 1
                      ? "Complete Game"
                      : "Next Artifact"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
