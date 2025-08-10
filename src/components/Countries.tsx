import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Users,
  Flag,
  Star,
  Globe,
  ArrowRight,
  Filter,
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
import AnimatedCounter from "./AnimatedCounter";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

// Comprehensive country data
const countriesData = [
  // North Africa
  {
    id: "egypt",
    name: "Egypt",
    flag: "🇪🇬",
    region: "North Africa",
    regionId: 1,
    population: "104.2M",
    sites: 7,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Pyramids of Giza", "Ancient Pharaohs", "Nile Civilization"],
    capital: "Cairo",
  },
  {
    id: "libya",
    name: "Libya",
    flag: "🇱🇾",
    region: "North Africa",
    regionId: 1,
    population: "6.9M",
    sites: 2,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGVzZXJ0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NDQ2OTg3NXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Sahara Desert", "Ancient Cyrenaica", "Roman Ruins"],
    capital: "Tripoli",
  },
  {
    id: "tunisia",
    name: "Tunisia",
    flag: "🇹🇳",
    region: "North Africa",
    regionId: 1,
    population: "11.9M",
    sites: 3,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYXJjaGl0ZWN0dXJlJTIwdHVuaXNpYXxlbnwxfHx8fDE3NTQ0Njk4ODJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Carthage Ruins", "Medina of Tunis", "Berber Heritage"],
    capital: "Tunis",
  },
  {
    id: "algeria",
    name: "Algeria",
    flag: "🇩🇿",
    region: "North Africa",
    regionId: 1,
    population: "44.6M",
    sites: 4,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGVzZXJ0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NDQ2OTg3NXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Tassili n'Ajjer", "Kasbah of Algiers", "Saharan Culture"],
    capital: "Algiers",
  },
  {
    id: "morocco",
    name: "Morocco",
    flag: "🇲🇦",
    region: "North Africa",
    regionId: 1,
    population: "37.3M",
    sites: 5,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Marrakech Medina", "Atlas Mountains", "Berber Traditions"],
    capital: "Rabat",
  },
  {
    id: "sudan",
    name: "Sudan",
    flag: "🇸🇩",
    region: "North Africa",
    regionId: 1,
    population: "45.7M",
    sites: 3,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGVzZXJ0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NDQ2OTg3NXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Nubian Pyramids", "Nile Confluence", "Ancient Kush"],
    capital: "Khartoum",
  },

  // West Africa
  {
    id: "nigeria",
    name: "Nigeria",
    flag: "🇳🇬",
    region: "West Africa",
    regionId: 2,
    population: "218.5M",
    sites: 6,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Nok Culture", "Benin Bronzes", "Yoruba Traditions"],
    capital: "Abuja",
  },
  {
    id: "ghana",
    name: "Ghana",
    flag: "🇬🇭",
    region: "West Africa",
    regionId: 2,
    population: "32.8M",
    sites: 4,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Ashanti Kingdom", "Cape Coast Castle", "Gold Trade"],
    capital: "Accra",
  },
  {
    id: "mali",
    name: "Mali",
    flag: "🇲🇱",
    region: "West Africa",
    regionId: 2,
    population: "21.9M",
    sites: 3,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Timbuktu", "Mali Empire", "Dogon Culture"],
    capital: "Bamako",
  },
  {
    id: "senegal",
    name: "Senegal",
    flag: "🇸🇳",
    region: "West Africa",
    regionId: 2,
    population: "17.2M",
    sites: 2,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Gorée Island", "Wolof Culture", "Senegambian Stones"],
    capital: "Dakar",
  },
  {
    id: "burkina-faso",
    name: "Burkina Faso",
    flag: "🇧🇫",
    region: "West Africa",
    regionId: 2,
    population: "22.7M",
    sites: 1,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Mossi Kingdoms", "Traditional Masks", "Sahel Culture"],
    capital: "Ouagadougou",
  },
  {
    id: "ivory-coast",
    name: "Ivory Coast",
    flag: "🇨🇮",
    region: "West Africa",
    regionId: 2,
    population: "27.5M",
    sites: 2,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Baoulé Art", "Grand-Bassam", "Forest Kingdoms"],
    capital: "Yamoussoukro",
  },

  // East Africa
  {
    id: "kenya",
    name: "Kenya",
    flag: "🇰🇪",
    region: "East Africa",
    regionId: 3,
    population: "54.9M",
    sites: 4,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Great Rift Valley", "Swahili Coast", "Maasai Culture"],
    capital: "Nairobi",
  },
  {
    id: "tanzania",
    name: "Tanzania",
    flag: "🇹🇿",
    region: "East Africa",
    regionId: 3,
    population: "61.5M",
    sites: 5,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Stone Town", "Kilwa", "Olduvai Gorge"],
    capital: "Dodoma",
  },
  {
    id: "ethiopia",
    name: "Ethiopia",
    flag: "🇪🇹",
    region: "East Africa",
    regionId: 3,
    population: "120.8M",
    sites: 6,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Lalibela Churches", "Aksum Empire", "Lucy Fossil"],
    capital: "Addis Ababa",
  },
  {
    id: "uganda",
    name: "Uganda",
    flag: "🇺🇬",
    region: "East Africa",
    regionId: 3,
    population: "47.1M",
    sites: 2,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Buganda Kingdom", "Source of Nile", "Traditional Cultures"],
    capital: "Kampala",
  },
  {
    id: "rwanda",
    name: "Rwanda",
    flag: "🇷🇼",
    region: "East Africa",
    regionId: 3,
    population: "13.3M",
    sites: 1,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Nyungwe Forest", "Traditional Dance", "Tutsi Culture"],
    capital: "Kigali",
  },
  {
    id: "somalia",
    name: "Somalia",
    flag: "🇸🇴",
    region: "East Africa",
    regionId: 3,
    population: "16.4M",
    sites: 2,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Ancient Punt", "Somali Poetry", "Indian Ocean Trade"],
    capital: "Mogadishu",
  },

  // Central Africa
  {
    id: "drc",
    name: "Democratic Republic of Congo",
    flag: "🇨🇩",
    region: "Central Africa",
    regionId: 4,
    population: "95.9M",
    sites: 3,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Kongo Kingdom", "Congo Basin", "Luba Empire"],
    capital: "Kinshasa",
  },
  {
    id: "cameroon",
    name: "Cameroon",
    flag: "🇨🇲",
    region: "Central Africa",
    regionId: 4,
    population: "27.2M",
    sites: 2,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Bamum Culture", "Mount Cameroon", "Forest Peoples"],
    capital: "Yaoundé",
  },
  {
    id: "car",
    name: "Central African Republic",
    flag: "🇨🇫",
    region: "Central Africa",
    regionId: 4,
    population: "4.8M",
    sites: 1,
    rating: 3.9,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Sangha River", "Aka Pygmies", "Traditional Hunting"],
    capital: "Bangui",
  },
  {
    id: "chad",
    name: "Chad",
    flag: "🇹🇩",
    region: "Central Africa",
    regionId: 4,
    population: "17.2M",
    sites: 2,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Sahelian Kingdoms", "Lake Chad", "Sao Culture"],
    capital: "N'Djamena",
  },
  {
    id: "gabon",
    name: "Gabon",
    flag: "🇬🇦",
    region: "Central Africa",
    regionId: 4,
    population: "2.3M",
    sites: 1,
    rating: 4.1,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Fang Art", "Equatorial Rainforest", "Traditional Masks"],
    capital: "Libreville",
  },

  // Southern Africa
  {
    id: "south-africa",
    name: "South Africa",
    flag: "🇿🇦",
    region: "Southern Africa",
    regionId: 5,
    population: "60.4M",
    sites: 8,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaWE5YWZyaWNhbiUyMGNpdmlsaXphdGlviUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Cradle of Humankind", "Robben Island", "San Rock Art"],
    capital: "Cape Town",
  },
  {
    id: "zimbabwe",
    name: "Zimbabwe",
    flag: "🇿🇼",
    region: "Southern Africa",
    regionId: 5,
    population: "15.1M",
    sites: 3,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Great Zimbabwe", "Shona Culture", "Victoria Falls"],
    capital: "Harare",
  },
  {
    id: "botswana",
    name: "Botswana",
    flag: "🇧🇼",
    region: "Southern Africa",
    regionId: 5,
    population: "2.4M",
    sites: 2,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Kalahari Desert", "Tswana Culture", "Diamond Mining"],
    capital: "Gaborone",
  },
  {
    id: "namibia",
    name: "Namibia",
    flag: "🇳🇦",
    region: "Southern Africa",
    regionId: 5,
    population: "2.5M",
    sites: 2,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Himba Culture", "Namib Desert", "Rock Engravings"],
    capital: "Windhoek",
  },
  {
    id: "zambia",
    name: "Zambia",
    flag: "🇿🇲",
    region: "Southern Africa",
    regionId: 5,
    population: "19.0M",
    sites: 1,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: ["Copper Mining", "Bemba Kingdom", "Victoria Falls"],
    capital: "Lusaka",
  },
  {
    id: "mozambique",
    name: "Mozambique",
    flag: "🇲🇿",
    region: "Southern Africa",
    regionId: 5,
    population: "32.2M",
    sites: 2,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    highlights: [
      "Island of Mozambique",
      "Swahili Culture",
      "Indian Ocean Trade",
    ],
    capital: "Maputo",
  },
];

function CountryCard({ country }: { country: any }) {
  const navigate = useNavigate();

  const handleCountryClick = () => {
    navigate(`/regions/${country.regionId}/countries/${country.id}`);
  };

  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleCountryClick}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={country.image}
          alt={country.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Country flag and name */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <h3 className="text-lg text-white group-hover:text-amber-200 transition-colors">
                {country.name}
              </h3>
              <p className="text-sm text-white/80">{country.capital}</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm flex items-center">
          <Star className="w-3 h-3 text-yellow-400 mr-1" />
          {country.rating}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {country.region}
          </Badge>
          <div className="text-sm text-gray-500 flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {country.population}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Heritage Sites:</span>
            <span className="text-gray-900 font-medium">{country.sites}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h4 className="text-sm text-gray-900">Highlights:</h4>
          <div className="flex flex-wrap gap-1">
            {country.highlights
              .slice(0, 2)
              .map((highlight: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-amber-100 text-amber-800"
                >
                  {highlight}
                </Badge>
              ))}
            {country.highlights.length > 2 && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-600"
              >
                +{country.highlights.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">Click to explore history</div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Countries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const regions = [...new Set(countriesData.map((country) => country.region))];

  const filteredCountries = countriesData
    .filter((country) => {
      const matchesSearch =
        searchQuery === "" ||
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.highlights.some((highlight) =>
          highlight.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesRegion =
        selectedRegion === "all" || country.region === selectedRegion;

      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "population":
          return parseFloat(b.population) - parseFloat(a.population);
        case "rating":
          return b.rating - a.rating;
        case "sites":
          return b.sites - a.sites;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-purple-100 text-purple-800"
            >
              <Globe className="w-4 h-4 mr-2" />
              Continental Explorer
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              African Countries
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the rich histories, diverse cultures, and fascinating
              heritage of all African nations. From ancient kingdoms to modern
              republics, explore the continent's incredible diversity.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Countries", target: countriesData.length, icon: Flag },
              { label: "Regions", target: regions.length, icon: MapPin },
              {
                label: "Heritage Sites",
                target: countriesData.reduce((sum, c) => sum + c.sites, 0),
                icon: Star,
              },
              {
                label: "Population",
                target: Math.round(
                  countriesData.reduce(
                    (sum, c) => sum + parseFloat(c.population),
                    0
                  )
                ),
                suffix: "B+",
                icon: Users,
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">
                    <AnimatedCounter target={stat.target} />
                    {stat.suffix}
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
              <h3 className="text-lg text-gray-900">Explore Countries</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search countries..."
                  className="pl-10 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="population">Population</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="sites">Heritage Sites</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No countries found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Regional Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-gray-900 mb-4">Explore by Region</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Africa's five major regions each offer unique historical
              perspectives, cultural traditions, and archaeological treasures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {regions.map((region) => {
              const regionCountries = countriesData.filter(
                (c) => c.region === region
              );
              const totalSites = regionCountries.reduce(
                (sum, c) => sum + c.sites,
                0
              );

              return (
                <Card
                  key={region}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2">{region}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{regionCountries.length} countries</p>
                      <p>{totalSites} heritage sites</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setSelectedRegion(region)}
                    >
                      Explore Region
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
