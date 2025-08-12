import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Filter,
  Search,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
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
import { Slider } from "./ui/slider";

const timelineData = [
  {
    year: -3100,
    title: "Unification of Egypt",
    region: "North Africa",
    type: "political",
    description: "Upper and Lower Egypt united under first pharaoh",
    periodId: 1,
  },
  {
    year: -2686,
    title: "Old Kingdom Begins",
    region: "North Africa",
    type: "cultural",
    description: "Age of pyramid building in Egypt",
    periodId: 1,
  },
  {
    year: -2000,
    title: "Kingdom of Kush Emerges",
    region: "East Africa",
    type: "political",
    description: "Nubian civilization develops along the Nile",
    periodId: 2,
  },
  {
    year: -1070,
    title: "Kushite Independence",
    region: "East Africa",
    type: "political",
    description: "Kush breaks free from Egyptian control",
    periodId: 2,
  },
  {
    year: -760,
    title: "Kushite Conquest of Egypt",
    region: "North Africa",
    type: "expansion",
    description: "Black pharaohs rule Egypt for a century",
    periodId: 2,
  },
  {
    year: -500,
    title: "Nok Culture Flourishes",
    region: "West Africa",
    type: "cultural",
    description: "Iron age civilization in Nigeria",
    periodId: 3,
  },
  {
    year: 100,
    title: "Kingdom of Aksum",
    region: "East Africa",
    type: "political",
    description: "Ethiopian trading empire emerges",
    periodId: 1,
  },
  {
    year: 300,
    title: "Trans-Saharan Trade",
    region: "West Africa",
    type: "economic",
    description: "Gold and salt trade routes established",
    periodId: 2,
  },
  {
    year: 700,
    title: "Swahili City-States",
    region: "East Africa",
    type: "cultural",
    description: "Trading cities along East African coast",
    periodId: 2,
  },
  {
    year: 1000,
    title: "Great Zimbabwe Founded",
    region: "Southern Africa",
    type: "political",
    description: "Stone city becomes trade center",
    periodId: 2,
  },
  {
    year: 1235,
    title: "Mali Empire",
    region: "West Africa",
    type: "political",
    description: "Sundiata founds the Mali Empire",
    periodId: 2,
  },
  {
    year: 1324,
    title: "Mansa Musa's Hajj",
    region: "West Africa",
    type: "cultural",
    description: "Legendary pilgrimage displays Mali's wealth",
    periodId: 2,
  },
  {
    year: 1400,
    title: "Songhai Empire",
    region: "West Africa",
    type: "political",
    description: "Last great West African empire",
    periodId: 2,
  },
  {
    year: 1450,
    title: "Portuguese Exploration",
    region: "All Regions",
    type: "contact",
    description: "European contact begins",
    periodId: 3,
  },
];

export default function InteractiveTimeline() {
  const [yearRange, setYearRange] = useState([-3500, 1500]);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = timelineData.filter((event) => {
    const matchesYear =
      event.year >= yearRange[0] && event.year <= yearRange[1];
    const matchesRegion =
      selectedRegion === "all" || event.region === selectedRegion;
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesYear && matchesRegion && matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    const colors = {
      political: "bg-blue-100 text-blue-700 border-blue-200",
      cultural: "bg-purple-100 text-purple-700 border-purple-200",
      expansion: "bg-green-100 text-green-700 border-green-200",
      economic: "bg-yellow-100 text-yellow-700 border-yellow-200",
      contact: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-700 border-gray-200"
    );
  };

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Interactive Timeline
          </Badge>
          <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            African History Timeline
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore 5,000 years of African civilization through an interactive
            timeline of major events, kingdoms, and cultural achievements.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg text-gray-900">Filter Timeline</h3>
            </div>

            {/* Search */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="North Africa">North Africa</SelectItem>
                  <SelectItem value="West Africa">West Africa</SelectItem>
                  <SelectItem value="East Africa">East Africa</SelectItem>
                  <SelectItem value="Southern Africa">
                    Southern Africa
                  </SelectItem>
                  <SelectItem value="Central Africa">Central Africa</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="political">Political</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="expansion">Expansion</SelectItem>
                  <SelectItem value="economic">Economic</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year Range Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time Period:</span>
                <span className="text-sm text-gray-900">
                  {formatYear(yearRange[0])} - {formatYear(yearRange[1])}
                </span>
              </div>
              <Slider
                value={yearRange}
                onValueChange={setYearRange}
                min={-3500}
                max={1500}
                step={100}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} events from{" "}
            {formatYear(yearRange[0])} to {formatYear(yearRange[1])}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-200"></div>

          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <div key={index} className="relative flex items-start space-x-8">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-16 flex flex-col items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <span className="text-xs text-gray-500 mt-2 text-center">
                    {formatYear(event.year)}
                  </span>
                </div>

                {/* Event card */}
                <Card className="flex-1 hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl text-gray-900 group-hover:text-amber-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex space-x-2">
                          <Badge className={getTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.region}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600">{event.description}</p>

                      {event.periodId && (
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-amber-600 hover:bg-amber-50 p-0"
                        >
                          <Link to={`/timeline/period/${event.periodId}`}>
                            Learn more about this period{" "}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms to find historical
                events.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setYearRange([-3500, 1500]);
                  setSelectedRegion("all");
                  setSelectedType("all");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
