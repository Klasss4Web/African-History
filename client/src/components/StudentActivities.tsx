import { useState } from "react";
import {
  Play,
  Trophy,
  Star,
  Clock,
  BookOpen,
  MapPin,
  Lightbulb,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  Gamepad2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
import AnimatedCounter from "./AnimatedCounter";
import { AnimatedHeading, AnimatedParagraph } from "./AnimatedText";

// Activity data with artifact matcher included
const activities = [
  {
    id: 1,
    title: "Ancient Egyptian Quiz",
    description:
      "Test your knowledge about the fascinating world of Ancient Egypt",
    type: "quiz",
    difficulty: "Beginner",
    duration: "10 min",
    points: 100,
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    questions: [
      {
        question: "What is the largest pyramid in Egypt?",
        options: [
          "Pyramid of Khafre",
          "Great Pyramid of Giza",
          "Pyramid of Menkaure",
          "Step Pyramid of Djoser",
        ],
        correct: 1,
        explanation:
          "The Great Pyramid of Giza, built for Pharaoh Khufu, is the largest and oldest of the Giza pyramid complex.",
      },
      {
        question: "Which river was crucial to Ancient Egyptian civilization?",
        options: ["Congo River", "Niger River", "Zambezi River", "Nile River"],
        correct: 3,
        explanation:
          "The Nile River was the lifeline of Ancient Egypt, providing water, fertile soil, and transportation.",
      },
      {
        question: "What writing system did Ancient Egyptians use?",
        options: ["Cuneiform", "Hieroglyphics", "Linear A", "Phoenician"],
        correct: 1,
        explanation:
          "Hieroglyphics were the formal writing system of Ancient Egypt, using pictographic and ideographic symbols.",
      },
    ],
  },
  {
    id: 2,
    title: "African Kingdoms Timeline",
    description: "Build a timeline of major African kingdoms and empires",
    type: "timeline",
    difficulty: "Intermediate",
    duration: "15 min",
    points: 150,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    events: [
      {
        name: "Kingdom of Kush",
        period: "1070 BCE - 350 CE",
        description: "Nubian kingdom that ruled Egypt",
      },
      {
        name: "Kingdom of Aksum",
        period: "100 - 960 CE",
        description: "Ancient trading empire in Ethiopia",
      },
      {
        name: "Mali Empire",
        period: "1230 - 1600 CE",
        description: "West African empire known for wealth",
      },
      {
        name: "Great Zimbabwe",
        period: "1100 - 1450 CE",
        description: "Medieval city in Southern Africa",
      },
      {
        name: "Songhai Empire",
        period: "1464 - 1591 CE",
        description: "Largest empire in African history",
      },
    ],
  },
  {
    id: 3,
    title: "Cultural Artifacts Matcher",
    description:
      "Match African cultural artifacts to their regions of origin - Interactive game",
    type: "game",
    difficulty: "Advanced",
    duration: "12 min",
    points: 200,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    isExternal: true,
    externalLink: "/games/artifact-matcher",
  },
  {
    id: 4,
    title: "West African Kingdoms",
    description:
      "Learn about the great empires of West Africa through interactive content",
    type: "exploration",
    difficulty: "Intermediate",
    duration: "20 min",
    points: 180,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: {
      sections: [
        {
          title: "Mali Empire",
          description: "The wealthiest empire in medieval Africa",
          facts: [
            "Founded by Sundiata Keita",
            "Mansa Musa was the richest person in history",
            "Timbuktu was a center of learning",
          ],
        },
        {
          title: "Songhai Empire",
          description: "The largest empire in African history",
          facts: [
            "Controlled the Niger River trade routes",
            "Had a professional army",
            "Fell to Moroccan invasion in 1591",
          ],
        },
      ],
    },
  },
];

// Quiz Component
function QuizActivity({
  activity,
  onComplete,
}: {
  activity: any;
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    const answerIndex = parseInt(selectedAnswer);
    const isCorrect =
      answerIndex === activity.questions[currentQuestion].correct;

    setAnswers([...answers, answerIndex]);
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < activity.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
      onComplete(
        Math.round(
          ((score + (isCorrect ? 1 : 0)) / activity.questions.length) * 100
        )
      );
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (showResult) {
    const finalScore = Math.round(
      ((score +
        (answers[answers.length - 1] ===
        activity.questions[activity.questions.length - 1].correct
          ? 1
          : 0)) /
        activity.questions.length) *
        100
    );
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-2">Quiz Complete!</h3>
          <p className="text-gray-600 mb-4">
            You scored <AnimatedCounter target={score} /> out of{" "}
            {activity.questions.length} questions correctly
          </p>
          <div className="text-3xl text-amber-600 mb-4">
            <AnimatedCounter target={finalScore} suffix="%" />
          </div>
          <Progress value={finalScore} className="max-w-xs mx-auto mb-6" />
        </div>

        <div className="space-y-4">
          {activity.questions.map((q: any, index: number) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  {answers[index] === q.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2">{q.question}</h4>
                    <p className="text-sm text-gray-600">{q.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex space-x-4 justify-center">
          <Button onClick={resetQuiz} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button onClick={() => onComplete(finalScore)}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </div>
      </div>
    );
  }

  const question = activity.questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          Question {currentQuestion + 1} of {activity.questions.length}
        </Badge>
        <Progress
          value={(currentQuestion / activity.questions.length) * 100}
          className="w-32"
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl text-gray-900 mb-6">{question.question}</h3>

          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {question.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer py-2"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="bg-amber-600 hover:bg-amber-700"
        >
          {currentQuestion < activity.questions.length - 1
            ? "Next Question"
            : "Finish Quiz"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Timeline Activity Component
function TimelineActivity({
  activity,
  onComplete,
}: {
  activity: any;
  onComplete: (score: number) => void;
}) {
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [availableEvents, setAvailableEvents] = useState(
    [...activity.events].sort(() => Math.random() - 0.5)
  );
  const [showResult, setShowResult] = useState(false);

  const handleDragStart = (
    _event: React.DragEvent<HTMLDivElement>,
    item: any
  ) => {
    setDraggedItem(item);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    position: number
  ) => {
    event.preventDefault();
    if (draggedItem) {
      const newTimeline = [...timeline];
      newTimeline.splice(position, 0, draggedItem);
      setTimeline(newTimeline);
      setAvailableEvents(
        availableEvents.filter((item) => item !== draggedItem)
      );
      setDraggedItem(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const checkAnswer = () => {
    const correctOrder = [...activity.events].sort((a, b) => {
      const aYear = parseInt(a.period.split(" ")[0]);
      const bYear = parseInt(b.period.split(" ")[0]);
      return aYear - bYear;
    });

    const userOrder = timeline.map((item) => item.name);
    const correctNames = correctOrder.map((item) => item.name);

    let correctCount = 0;
    userOrder.forEach((name, index) => {
      if (name === correctNames[index]) correctCount++;
    });

    const score = Math.round((correctCount / correctOrder.length) * 100);
    setShowResult(true);
    onComplete(score);
  };

  const reset = () => {
    setTimeline([]);
    setAvailableEvents([...activity.events].sort(() => Math.random() - 0.5));
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl text-gray-900 mb-2">Timeline Complete!</h3>
          <p className="text-gray-600">
            Great job building the historical timeline!
          </p>
        </div>

        <div className="flex space-x-4 justify-center">
          <Button onClick={reset} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button onClick={() => onComplete(85)}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Available Events</h3>
          <div className="space-y-2">
            {availableEvents.map((event, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, event)}
                className="p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-shadow"
              >
                <h4 className="text-gray-900">{event.name}</h4>
                <p className="text-sm text-gray-600">{event.period}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg text-gray-900 mb-4">
            Timeline (Earliest to Latest)
          </h3>
          <div className="space-y-2 min-h-64">
            {timeline.map((event, index) => (
              <div
                key={index}
                className="p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <h4 className="text-gray-900">{event.name}</h4>
                <p className="text-sm text-gray-600">{event.period}</p>
              </div>
            ))}
            <div
              onDrop={(e) => handleDrop(e, timeline.length)}
              onDragOver={handleDragOver}
              className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500"
            >
              Drop events here to build timeline
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={checkAnswer}
          disabled={timeline.length !== activity.events.length}
          className="bg-amber-600 hover:bg-amber-700"
        >
          Check Timeline
        </Button>
      </div>
    </div>
  );
}

// Exploration Activity Component
function ExplorationActivity({
  activity,
  onComplete,
}: {
  activity: any;
  onComplete: (score: number) => void;
}) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<boolean[]>([]);

  const markSectionComplete = (sectionIndex: number) => {
    const newCompleted = [...completedSections];
    newCompleted[sectionIndex] = true;
    setCompletedSections(newCompleted);

    if (newCompleted.every((completed) => completed)) {
      onComplete(100);
    }
  };

  const section = activity.content.sections[currentSection];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          Section {currentSection + 1} of {activity.content.sections.length}
        </Badge>
        <Progress
          value={
            ((currentSection + 1) / activity.content.sections.length) * 100
          }
          className="w-32"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{section.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{section.description}</p>

          <div>
            <h4 className="text-sm text-gray-900 mb-2">Key Facts:</h4>
            <ul className="space-y-2">
              {section.facts.map((fact: string, index: number) => (
                <li key={index} className="flex items-start text-sm">
                  <Star className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              disabled={currentSection === 0}
              onClick={() => setCurrentSection(currentSection - 1)}
            >
              Previous
            </Button>

            <Button
              onClick={() => {
                markSectionComplete(currentSection);
                if (currentSection < activity.content.sections.length - 1) {
                  setCurrentSection(currentSection + 1);
                }
              }}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {currentSection < activity.content.sections.length - 1
                ? "Next Section"
                : "Complete"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StudentActivities() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleActivityComplete = (activityId: number, score: number) => {
    setCompletedActivities([...completedActivities, activityId]);
    const activity = activities.find((a) => a.id === activityId);
    if (activity) {
      setTotalPoints(totalPoints + Math.round(activity.points * (score / 100)));
    }
    setSelectedActivity(null);
  };

  const startActivity = (activity: any) => {
    if (activity.isExternal) {
      // For external activities like the artifact matcher, redirect
      window.location.href = activity.externalLink;
      return;
    }
    setSelectedActivity(activity);
  };

  if (selectedActivity) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl text-gray-900">
                  {selectedActivity.title}
                </h1>
                <p className="text-gray-600">{selectedActivity.description}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedActivity(null)}
              >
                Back to Activities
              </Button>
            </div>

            {selectedActivity.type === "quiz" && (
              <QuizActivity
                activity={selectedActivity}
                onComplete={(score) =>
                  handleActivityComplete(selectedActivity.id, score)
                }
              />
            )}

            {selectedActivity.type === "timeline" && (
              <TimelineActivity
                activity={selectedActivity}
                onComplete={(score) =>
                  handleActivityComplete(selectedActivity.id, score)
                }
              />
            )}

            {selectedActivity.type === "exploration" && (
              <ExplorationActivity
                activity={selectedActivity}
                onComplete={(score) =>
                  handleActivityComplete(selectedActivity.id, score)
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }

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
              <Play className="w-4 h-4 mr-2" />
              Interactive Learning
            </Badge>
            <AnimatedHeading
              className="text-4xl lg:text-5xl text-gray-900 mb-4"
              delay={0}
            >
              Student Activities
            </AnimatedHeading>
            <AnimatedParagraph
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              delay={0.3}
            >
              Learn African history through fun, interactive activities and
              games. Test your knowledge, build timelines, and explore cultural
              artifacts.
            </AnimatedParagraph>
          </div>

          {/* Enhanced Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl text-purple-600 mb-1">
                <AnimatedCounter target={activities.length} />
              </div>
              <div className="text-sm text-gray-600">Total Activities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-blue-600 mb-1">
                <AnimatedCounter target={completedActivities.length} />
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-amber-600 mb-1">
                <AnimatedCounter target={totalPoints} />
              </div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-green-600 mb-1">
                <AnimatedCounter
                  target={activities.reduce(
                    (total, activity) => total + activity.points,
                    0
                  )}
                />
              </div>
              <div className="text-sm text-gray-600">Max Points</div>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="max-w-md mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-2xl text-purple-600 mb-1">
                      <AnimatedCounter target={completedActivities.length} />
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-amber-600 mb-1">
                      <AnimatedCounter target={totalPoints} />
                    </div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-green-600 mb-1">
                      <AnimatedCounter target={activities.length} />
                    </div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => {
              const isCompleted = completedActivities.includes(activity.id);

              return (
                <Card
                  key={activity.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {isCompleted && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="bg-white/90">
                        {activity.type === "quiz" && (
                          <Lightbulb className="w-3 h-3 mr-1" />
                        )}
                        {activity.type === "timeline" && (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {activity.type === "game" && (
                          <Gamepad2 className="w-3 h-3 mr-1" />
                        )}
                        {activity.type === "exploration" && (
                          <MapPin className="w-3 h-3 mr-1" />
                        )}
                        {activity.type.charAt(0).toUpperCase() +
                          activity.type.slice(1)}
                      </Badge>
                    </div>
                    {activity.isExternal && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-600 text-white">
                          Interactive Game
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg text-gray-900">
                          {activity.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {activity.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {activity.duration}
                          </div>
                          <Badge
                            variant="outline"
                            className={`${
                              activity.difficulty === "Beginner"
                                ? "border-green-500 text-green-700"
                                : activity.difficulty === "Intermediate"
                                ? "border-yellow-500 text-yellow-700"
                                : "border-red-500 text-red-700"
                            }`}
                          >
                            {activity.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center text-amber-600">
                          <Trophy className="w-4 h-4 mr-1" />
                          <AnimatedCounter target={activity.points} /> pts
                        </div>
                      </div>

                      {activity.isExternal ? (
                        <Button
                          asChild
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <Link to={activity.externalLink}>
                            <Gamepad2 className="w-4 h-4 mr-2" />
                            Play Game
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => startActivity(activity)}
                          className="w-full bg-amber-600 hover:bg-amber-700"
                          disabled={isCompleted}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Activity
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievement Section */}
      {completedActivities.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Badge
                variant="secondary"
                className="mb-4 bg-amber-100 text-amber-800"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </Badge>
              <h2 className="text-2xl text-gray-900 mb-4">Great Progress!</h2>
              <p className="text-gray-600 mb-6">
                You've completed{" "}
                <AnimatedCounter target={completedActivities.length} />{" "}
                activities and earned <AnimatedCounter target={totalPoints} />{" "}
                points. Keep exploring African history!
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Scholar</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
