import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import AnimatedCounter from "./AnimatedCounter";
import { ArrowLeft, Clock, Star, Save, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Mock tour planning data
const availableSites = {
  egypt: [
    {
      id: 1,
      name: "Pyramids of Giza",
      duration: "3-4 hours",
      priority: "Must-see",
      price: 45,
    },
    {
      id: 2,
      name: "Egyptian Museum",
      duration: "2-3 hours",
      priority: "Recommended",
      price: 25,
    },
    {
      id: 3,
      name: "Valley of the Kings",
      duration: "4-5 hours",
      priority: "Must-see",
      price: 65,
    },
    {
      id: 4,
      name: "Karnak Temple",
      duration: "2-3 hours",
      priority: "Recommended",
      price: 35,
    },
    {
      id: 5,
      name: "Islamic Cairo",
      duration: "3-4 hours",
      priority: "Optional",
      price: 30,
    },
    {
      id: 6,
      name: "Citadel of Saladin",
      duration: "2 hours",
      priority: "Optional",
      price: 20,
    },
  ],
  ethiopia: [
    {
      id: 7,
      name: "Rock Churches of Lalibela",
      duration: "Full Day",
      priority: "Must-see",
      price: 80,
    },
    {
      id: 8,
      name: "Aksum Obelisks",
      duration: "Half Day",
      priority: "Must-see",
      price: 40,
    },
    {
      id: 9,
      name: "Blue Nile Falls",
      duration: "Half Day",
      priority: "Recommended",
      price: 35,
    },
    {
      id: 10,
      name: "Gondar Castles",
      duration: "Half Day",
      priority: "Recommended",
      price: 30,
    },
  ],
};

const transportOptions = [
  { id: 1, name: "Private Car with Driver", price: 80, capacity: 4 },
  { id: 2, name: "Tour Van", price: 120, capacity: 8 },
  { id: 3, name: "Luxury Coach", price: 200, capacity: 16 },
  { id: 4, name: "Walking Tour", price: 0, capacity: 20 },
];

const accommodationOptions = [
  { id: 1, name: "Luxury Hotel", price: 150, stars: 5 },
  { id: 2, name: "Boutique Hotel", price: 100, stars: 4 },
  { id: 3, name: "Standard Hotel", price: 60, stars: 3 },
  { id: 4, name: "Budget Accommodation", price: 25, stars: 2 },
];

export default function TourPlanning() {
  const { countryCode } = useParams();
  const navigate = useNavigate();

  const [planData, setPlanData] = useState({
    name: "",
    duration: "",
    travelers: 2,
    budget: "medium",
    interests: [] as string[],
    selectedSites: [] as number[],
    transport: "",
    accommodation: "",
    specialRequests: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const sites =
    availableSites[countryCode as keyof typeof availableSites] || [];
  const selectedSitesData = sites.filter((site) =>
    planData.selectedSites.includes(site.id)
  );

  const calculateTotalCost = () => {
    const sitesCost =
      selectedSitesData.reduce((sum, site) => sum + site.price, 0) *
      planData.travelers;
    const transportCost =
      transportOptions.find((t) => t.id.toString() === planData.transport)
        ?.price || 0;
    const accommodationCost =
      accommodationOptions.find(
        (a) => a.id.toString() === planData.accommodation
      )?.price || 0;
    const days = parseInt(planData.duration) || 1;

    return sitesCost + transportCost + accommodationCost * days;
  };

  const handleSiteToggle = (siteId: number) => {
    setPlanData((prev) => ({
      ...prev,
      selectedSites: prev.selectedSites.includes(siteId)
        ? prev.selectedSites.filter((id) => id !== siteId)
        : [...prev.selectedSites, siteId],
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setPlanData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSavePlan = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("Tour plan saved successfully! 🎉");
  };

  const handleSharePlan = () => {
    const planSummary = `
My ${countryCode?.toUpperCase()} Tour Plan: "${planData.name}"
Duration: ${planData.duration} days
Travelers: ${planData.travelers}
Sites: ${selectedSitesData.map((s) => s.name).join(", ")}
Estimated Cost: $${calculateTotalCost()}
    `.trim();

    if (navigator.share) {
      navigator.share({
        title: `${planData.name} - Tour Plan`,
        text: planSummary,
      });
    } else {
      navigator.clipboard.writeText(planSummary);
      alert("Plan copied to clipboard! 📋");
    }
  };

  const interests = [
    "Ancient History",
    "Architecture",
    "Religion & Spirituality",
    "Art & Culture",
    "Photography",
    "Adventure",
    "Local Cuisine",
    "Museums",
    "Nature",
    "Shopping",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-center">
            <h1 className="text-4xl text-gray-900 mb-4">
              Plan Your Perfect Tour
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create a personalized itinerary for your{" "}
              {countryCode?.charAt(0).toUpperCase()}
              {countryCode?.slice(1)} adventure
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, label: "Basics" },
              { step: 2, label: "Sites" },
              { step: 3, label: "Logistics" },
              { step: 4, label: "Review" },
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= item.step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {item.step}
                </div>
                <span
                  className={`ml-2 ${
                    currentStep >= item.step ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
                {item.step < 4 && (
                  <div className="w-12 h-px bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Tell us about your trip</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="planName">Trip Name</Label>
                  <Input
                    id="planName"
                    placeholder="e.g., My Egyptian Adventure"
                    value={planData.name}
                    onChange={(e) =>
                      setPlanData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Select
                      value={planData.duration}
                      onValueChange={(value) =>
                        setPlanData((prev) => ({ ...prev, duration: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Day</SelectItem>
                        <SelectItem value="2">2 Days</SelectItem>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="5">5 Days</SelectItem>
                        <SelectItem value="7">1 Week</SelectItem>
                        <SelectItem value="14">2 Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="travelers">Number of Travelers</Label>
                    <Select
                      value={planData.travelers.toString()}
                      onValueChange={(value) =>
                        setPlanData((prev) => ({
                          ...prev,
                          travelers: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Traveler" : "Travelers"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Budget Range</Label>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    {[
                      {
                        key: "budget",
                        label: "Budget",
                        desc: "Under $100/day",
                      },
                      { key: "medium", label: "Medium", desc: "$100-300/day" },
                      { key: "luxury", label: "Luxury", desc: "$300+/day" },
                    ].map((option) => (
                      <div
                        key={option.key}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          planData.budget === option.key
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200"
                        }`}
                        onClick={() =>
                          setPlanData((prev) => ({
                            ...prev,
                            budget: option.key,
                          }))
                        }
                      >
                        <div className="text-gray-900 mb-1">{option.label}</div>
                        <div className="text-sm text-gray-600">
                          {option.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Your Interests</Label>
                  <div className="grid md:grid-cols-3 gap-3 mt-3">
                    {interests.map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={interest}
                          checked={planData.interests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                        />
                        <Label htmlFor={interest} className="text-sm">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setCurrentStep(2)} className="w-full">
                  Continue to Sites
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Sites */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Sites</CardTitle>
                <p className="text-gray-600">
                  Select the places you'd like to visit
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {sites.map((site) => (
                    <div
                      key={site.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        planData.selectedSites.includes(site.id)
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleSiteToggle(site.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-900">{site.name}</h4>
                        <Badge
                          variant={
                            site.priority === "Must-see"
                              ? "default"
                              : site.priority === "Recommended"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {site.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          {site.duration}
                        </div>
                        <div className="text-gray-900">
                          ${site.price}/person
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={planData.selectedSites.length === 0}
                  >
                    Continue to Logistics
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Logistics */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Transportation & Accommodation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Transportation</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    {transportOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          planData.transport === option.id.toString()
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200"
                        }`}
                        onClick={() =>
                          setPlanData((prev) => ({
                            ...prev,
                            transport: option.id.toString(),
                          }))
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-gray-900">{option.name}</div>
                            <div className="text-sm text-gray-600">
                              Up to {option.capacity} people
                            </div>
                          </div>
                          <div className="text-gray-900">
                            ${option.price}/day
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Accommodation</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    {accommodationOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          planData.accommodation === option.id.toString()
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200"
                        }`}
                        onClick={() =>
                          setPlanData((prev) => ({
                            ...prev,
                            accommodation: option.id.toString(),
                          }))
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-gray-900">{option.name}</div>
                            <div className="flex">
                              {[...Array(option.stars)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3 h-3 text-yellow-500 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-gray-900">
                            ${option.price}/night
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    placeholder="Dietary restrictions, accessibility needs, special interests..."
                    value={planData.specialRequests}
                    onChange={(e) =>
                      setPlanData((prev) => ({
                        ...prev,
                        specialRequests: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)}>Review Plan</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {planData.name || "Your Tour Plan"}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSharePlan}
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSavePlan}
                        disabled={isSaving}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-lg text-gray-900 mb-3">
                          Trip Overview
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="text-gray-900">
                              {planData.duration} days
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Travelers:</span>
                            <span className="text-gray-900">
                              {planData.travelers}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Budget:</span>
                            <span className="text-gray-900 capitalize">
                              {planData.budget}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sites:</span>
                            <span className="text-gray-900">
                              {selectedSitesData.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg text-gray-900 mb-3">
                          Selected Sites
                        </h4>
                        <div className="space-y-2">
                          {selectedSitesData.map((site) => (
                            <div
                              key={site.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div>
                                <div className="text-gray-900">{site.name}</div>
                                <div className="text-sm text-gray-600">
                                  {site.duration}
                                </div>
                              </div>
                              <div className="text-gray-900">
                                ${site.price}/person
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Cost Estimate
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sites:</span>
                              <span className="text-gray-900">
                                $
                                {selectedSitesData.reduce(
                                  (sum, site) => sum + site.price,
                                  0
                                ) * planData.travelers}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transport:</span>
                              <span className="text-gray-900">
                                $
                                {transportOptions.find(
                                  (t) => t.id.toString() === planData.transport
                                )?.price || 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Accommodation:
                              </span>
                              <span className="text-gray-900">
                                $
                                {(accommodationOptions.find(
                                  (a) =>
                                    a.id.toString() === planData.accommodation
                                )?.price || 0) *
                                  parseInt(planData.duration || "1")}
                              </span>
                            </div>
                          </div>

                          <Separator />

                          <div className="flex justify-between text-xl">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-blue-600">
                              $<AnimatedCounter target={calculateTotalCost()} />
                            </span>
                          </div>

                          <div className="text-xs text-gray-500 text-center">
                            *Estimated cost for {planData.travelers} travelers
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      Back to Edit
                    </Button>
                    <Button
                      onClick={() =>
                        navigate(`/tour-booking/${countryCode}/plan`)
                      }
                    >
                      Book This Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
