import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import AnimatedCounter from "./AnimatedCounter";

// Mock tour packages data
const tourPackages = {
  egypt: [
    {
      id: 1,
      name: "Ancient Wonders Discovery",
      duration: "Full Day (8 hours)",
      price: 120,
      includes: [
        "Pyramids of Giza",
        "Sphinx",
        "Egyptian Museum",
        "Lunch",
        "Transportation",
      ],
      maxGuests: 8,
      difficulty: "Easy",
      languages: ["English", "Arabic", "French"],
    },
    {
      id: 2,
      name: "Pharaohs & Tombs Experience",
      duration: "2 Days",
      price: 280,
      includes: [
        "Valley of Kings",
        "Luxor Temple",
        "Karnak Complex",
        "Hotel",
        "All meals",
      ],
      maxGuests: 6,
      difficulty: "Moderate",
      languages: ["English", "Arabic"],
    },
    {
      id: 3,
      name: "Islamic Cairo Walking Tour",
      duration: "Half Day (4 hours)",
      price: 65,
      includes: [
        "Al-Azhar Mosque",
        "Khan el-Khalili",
        "Citadel",
        "Traditional tea",
      ],
      maxGuests: 12,
      difficulty: "Easy",
      languages: ["Arabic", "English", "German"],
    },
  ],
  ethiopia: [
    {
      id: 4,
      name: "Lalibela Rock Churches Pilgrimage",
      duration: "2 Days",
      price: 200,
      includes: [
        "11 Rock Churches",
        "Traditional ceremonies",
        "Local homestay",
        "All meals",
      ],
      maxGuests: 6,
      difficulty: "Moderate",
      languages: ["Amharic", "English"],
    },
    {
      id: 5,
      name: "Aksum Historical Discovery",
      duration: "Full Day (6 hours)",
      price: 85,
      includes: [
        "Aksum Obelisks",
        "Queen of Sheba Palace",
        "Church of Mary",
        "Lunch",
      ],
      maxGuests: 10,
      difficulty: "Easy",
      languages: ["Amharic", "English", "Italian"],
    },
  ],
};

const guides = {
  1: {
    name: "Ahmed Hassan",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&crop=face&fit=crop",
    rating: 4.9,
  },
  2: {
    name: "Fatima Al-Rashid",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=100&h=100&crop=face&fit=crop",
    rating: 4.8,
  },
  3: {
    name: "Tekle Wolde",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&crop=face&fit=crop",
    rating: 4.9,
  },
};

export default function TourBooking() {
  const { countryCode, guideId } = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select, 2: Details, 3: Payment, 4: Confirmation
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    guests: 1,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packages = tourPackages[countryCode as keyof typeof tourPackages] || [];
  const guide = guides[parseInt(guideId || "1") as keyof typeof guides];

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
    setBookingStep(2);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setBookingStep(4);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  if (bookingStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your tour has been successfully booked. You'll receive a
                confirmation email shortly.
              </p>

              <Card className="bg-white/80 backdrop-blur-sm mb-8">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tour:</span>
                      <span className="text-gray-900">
                        {selectedPackage?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guide:</span>
                      <span className="text-gray-900">{guide?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="text-gray-900">{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guests:</span>
                      <span className="text-gray-900">
                        {bookingData.guests}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900">
                        ${selectedPackage?.price * bookingData.guests}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() =>
                    navigate(`/regions/1/countries/${countryCode}`)
                  }
                >
                  Back to Country
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={() =>
              bookingStep > 1 ? setBookingStep(bookingStep - 1) : navigate(-1)
            }
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {bookingStep > 1 ? "Back" : "Back to Tours"}
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900 mb-2">Book Your Tour</h1>
              <p className="text-gray-600">
                Choose your perfect historical adventure
              </p>
            </div>

            {guide && (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right">
                  <div className="text-gray-900">{guide.name}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    {guide.rating}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, label: "Select Tour" },
              { step: 2, label: "Details" },
              { step: 3, label: "Payment" },
              { step: 4, label: "Confirmation" },
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    bookingStep >= item.step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {item.step}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    bookingStep >= item.step ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
                {item.step < 4 && <div className="w-8 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Package Selection */}
        {bookingStep === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePackageSelect(pkg)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <Badge variant="secondary">${pkg.price}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Max {pkg.maxGuests}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h5 className="text-sm text-gray-900 mb-2">Includes:</h5>
                    <div className="space-y-1">
                      {pkg.includes.slice(0, 4).map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {item}
                        </div>
                      ))}
                      {pkg.includes.length > 4 && (
                        <div className="text-xs text-gray-500">
                          +{pkg.includes.length - 4} more included
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {pkg.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {pkg.languages.length} languages
                      </Badge>
                    </div>
                    <Button size="sm">Select Tour</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Booking Details */}
        {bookingStep === 2 && selectedPackage && (
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      {/* Date and Time */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Preferred Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={bookingData.date}
                            onChange={(e) =>
                              handleInputChange("date", e.target.value)
                            }
                            min={new Date().toISOString().split("T")[0]}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">Preferred Time</Label>
                          <Select
                            value={bookingData.time}
                            onValueChange={(value) =>
                              handleInputChange("time", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">
                                Morning (9:00 AM)
                              </SelectItem>
                              <SelectItem value="afternoon">
                                Afternoon (2:00 PM)
                              </SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select
                          value={bookingData.guests.toString()}
                          onValueChange={(value) =>
                            handleInputChange("guests", parseInt(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(selectedPackage.maxGuests)].map(
                              (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h4 className="text-lg text-gray-900">
                          Contact Information
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={bookingData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={bookingData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={bookingData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={bookingData.phone}
                              onChange={(e) =>
                                handleInputChange("phone", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div>
                        <Label htmlFor="requests">
                          Special Requests (Optional)
                        </Label>
                        <Textarea
                          id="requests"
                          placeholder="Dietary restrictions, accessibility needs, special interests..."
                          value={bookingData.specialRequests}
                          onChange={(e) =>
                            handleInputChange("specialRequests", e.target.value)
                          }
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setBookingStep(1)}
                        >
                          Back to Tours
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting
                            ? "Processing..."
                            : "Continue to Payment"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary */}
              <div>
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-gray-900 mb-2">
                        {selectedPackage.name}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="text-gray-900">
                            {selectedPackage.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Price per person:
                          </span>
                          <span className="text-gray-900">
                            ${selectedPackage.price}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span className="text-gray-900">
                            {bookingData.guests}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-gray-900">
                        $
                        <AnimatedCounter
                          target={selectedPackage.price * bookingData.guests}
                        />
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">
                      * Includes all mentioned services and guide fees
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
