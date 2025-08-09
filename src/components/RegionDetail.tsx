import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Globe,
  BookOpen,
  ArrowRight,
  Heart,
  Share2,
  Filter,
  Landmark,
  Mountain,
  Waves,
  TreePine,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

// [Keep the existing regionData object exactly as it was - I'll abbreviate here for space]
const regionData: { [key: number]: any } = {
  1: {
    name: "North Africa",
    description:
      "North Africa has been the crossroads of civilizations for millennia, home to some of the world's most ancient and sophisticated societies. From the pharaohs of Egypt to the merchants of Carthage, this region has shaped human history.",
    overview:
      "Stretching across the northern edge of Africa, this region encompasses the Sahara Desert, the Nile River valley, and the Mediterranean coastline. It has been a bridge between Africa, Europe, and Asia for thousands of years.",
    countries: [
      "Egypt",
      "Libya",
      "Tunisia",
      "Algeria",
      "Morocco",
      "Sudan",
      "Chad",
    ],
    population: "245 million",
    area: "11.6 million km²",
    languages: ["Arabic", "Berber", "French", "English"],
    geography: {
      landscapes: [
        "Sahara Desert",
        "Nile River Valley",
        "Atlas Mountains",
        "Mediterranean Coast",
      ],
      climate: "Arid and semi-arid, with Mediterranean climate along the coast",
      features: [
        "World's largest desert",
        "Longest river (Nile)",
        "Strategic waterways",
      ],
    },
    history: {
      ancient: "Home to Ancient Egypt, Carthage, and Nubian kingdoms",
      classical: "Roman and Byzantine provinces, Islamic conquest",
      medieval: "Fatimid and Ayyubid dynasties, Berber empires",
      modern: "Ottoman rule, European colonization, independence movements",
    },
    civilizations: [
      {
        name: "Ancient Egypt",
        period: "3100-30 BCE",
        description:
          "One of the world's earliest and most enduring civilizations",
        achievements: [
          "Pyramid construction",
          "Hieroglyphic writing",
          "Mummification",
          "Calendar system",
        ],
        legacy: "Influenced art, architecture, and science worldwide",
      },
      {
        name: "Carthaginian Empire",
        period: "814-146 BCE",
        description: "Powerful maritime trading empire based in Tunisia",
        achievements: [
          "Naval supremacy",
          "Trade networks",
          "Military innovations",
          "Urban planning",
        ],
        legacy: "Challenged Roman expansion, influenced Mediterranean commerce",
      },
      {
        name: "Kingdom of Kush",
        period: "1070 BCE-350 CE",
        description: "Nubian kingdom that conquered and ruled Egypt",
        achievements: [
          "Iron technology",
          "Pyramid building",
          "Trade networks",
          "Meroitic script",
        ],
        legacy: "Preserved Egyptian traditions, spread iron working",
      },
    ],
    culture: {
      traditions: [
        "Islamic festivals",
        "Berber customs",
        "Coptic Christianity",
        "Sufi practices",
      ],
      arts: [
        "Arabic calligraphy",
        "Berber textiles",
        "Ancient sculptures",
        "Islamic architecture",
      ],
      music: [
        "Andalusian music",
        "Berber folk songs",
        "Classical Arabic",
        "Modern fusion",
      ],
      cuisine: ["Couscous", "Tagine", "Falafel", "Baklava", "Mint tea"],
    },
    modernSignificance: [
      "Oil and gas reserves",
      "Suez Canal strategic importance",
      "Archaeological treasures",
      "Solar energy potential",
      "Cultural tourism",
    ],
    featuredSites: [
      {
        name: "Pyramids of Giza",
        location: "Egypt",
        type: "Ancient Wonder",
        description: "Last surviving wonder of the ancient world",
      },
      {
        name: "Carthage",
        location: "Tunisia",
        type: "Archaeological Site",
        description: "Ruins of the ancient Carthaginian empire",
      },
      {
        name: "Valley of the Kings",
        location: "Egypt",
        type: "Royal Necropolis",
        description: "Burial place of Egyptian pharaohs",
      },
      {
        name: "Fez Medina",
        location: "Morocco",
        type: "Historic City",
        description: "Best preserved medieval city in the Arab world",
      },
    ],
    color: "from-yellow-400 to-orange-500",
    icon: "🏺",
    heroImage:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  2: {
    name: "West Africa",
    description:
      "West Africa has been the heartland of some of history's most powerful and wealthy empires. Known for its gold trade, sophisticated political systems, and rich cultural heritage, this region continues to influence global culture.",
    overview:
      "From the Atlantic coastline to the edge of the Sahara, West Africa encompasses diverse landscapes and has been home to great trading empires that connected sub-Saharan Africa with North Africa and beyond.",
    countries: [
      "Nigeria",
      "Ghana",
      "Senegal",
      "Mali",
      "Burkina Faso",
      "Ivory Coast",
      "Guinea",
      "Benin",
      "Togo",
      "Sierra Leone",
      "Liberia",
      "Guinea-Bissau",
      "Gambia",
      "Cape Verde",
      "Mauritania",
      "Niger",
    ],
    population: "400 million",
    area: "5.1 million km²",
    languages: [
      "French",
      "English",
      "Portuguese",
      "Arabic",
      "Hausa",
      "Yoruba",
      "Igbo",
      "Fulani",
    ],
    geography: {
      landscapes: [
        "Sahel Savanna",
        "Guinea Highlands",
        "Niger River Basin",
        "Atlantic Coastline",
      ],
      climate: "Tropical to arid, wet and dry seasons",
      features: [
        "Niger River",
        "Lake Chad",
        "Gold Coast",
        "Sahel transition zone",
      ],
    },
    history: {
      ancient: "Ghana Empire, early iron age settlements",
      classical: "Mali Empire, Songhai Empire, trans-Saharan trade",
      medieval: "Islamic influence, Timbuktu scholarship, coastal kingdoms",
      modern: "Atlantic slave trade, colonial period, independence movements",
    },
    civilizations: [
      {
        name: "Mali Empire",
        period: "1230-1600 CE",
        description: "One of the wealthiest empires in human history",
        achievements: [
          "Gold trade monopoly",
          "Islamic scholarship",
          "Timbuktu university",
          "Architectural marvels",
        ],
        legacy: "Established trade networks, preserved Islamic learning",
      },
      {
        name: "Songhai Empire",
        period: "1464-1591 CE",
        description: "Largest empire in African history by land area",
        achievements: [
          "Military organization",
          "Trade regulation",
          "Educational centers",
          "Administrative systems",
        ],
        legacy: "Advanced government structures, cultural preservation",
      },
      {
        name: "Kingdom of Benin",
        period: "1180-1897 CE",
        description: "Sophisticated kingdom known for bronze artistry",
        achievements: [
          "Bronze casting",
          "Ivory carving",
          "Palace architecture",
          "Military organization",
        ],
        legacy: "Artistic traditions, urban planning innovations",
      },
    ],
    culture: {
      traditions: [
        "Griot storytelling",
        "Mask ceremonies",
        "Ancestral worship",
        "Festival celebrations",
      ],
      arts: [
        "Bronze sculptures",
        "Kente cloth",
        "Wood carving",
        "Contemporary Afrobeat",
      ],
      music: ["Djembe drumming", "Afrobeat", "Highlife", "Traditional folk"],
      cuisine: [
        "Jollof rice",
        "Fufu",
        "Plantains",
        "Groundnut stew",
        "Palm wine",
      ],
    },
    modernSignificance: [
      "Cultural exports (music, arts)",
      "Natural resources (oil, minerals)",
      "Agricultural production",
      "Diaspora influence",
      "Democratic developments",
    ],
    featuredSites: [
      {
        name: "Timbuktu",
        location: "Mali",
        type: "Historic City",
        description: "Ancient center of learning and trade",
      },
      {
        name: "Great Mosque of Djenné",
        location: "Mali",
        type: "Religious Architecture",
        description: "Largest mud-brick building in the world",
      },
      {
        name: "Elmina Castle",
        location: "Ghana",
        type: "Historic Fort",
        description: "Important site in Atlantic slave trade history",
      },
      {
        name: "Benin City",
        location: "Nigeria",
        type: "Historic Capital",
        description: "Former center of the Benin Empire",
      },
    ],
    color: "from-green-400 to-emerald-500",
    icon: "👑",
    heroImage:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  3: {
    name: "East Africa",
    description:
      "Known as the cradle of humanity, East Africa has been a crossroads of cultures for millennia. From ancient Christian kingdoms to Swahili trading cities, this region showcases remarkable diversity and historical depth.",
    overview:
      "Stretching from the Red Sea to the Indian Ocean, East Africa encompasses the Great Rift Valley, ancient highlands, and a coastline that has facilitated trade between Africa, Arabia, and Asia for over a millennium.",
    countries: [
      "Ethiopia",
      "Kenya",
      "Tanzania",
      "Uganda",
      "Rwanda",
      "Burundi",
      "South Sudan",
      "Eritrea",
      "Djibouti",
      "Somalia",
      "Comoros",
      "Madagascar",
    ],
    population: "445 million",
    area: "6.2 million km²",
    languages: [
      "Swahili",
      "Amharic",
      "English",
      "French",
      "Arabic",
      "Somali",
      "Oromo",
    ],
    geography: {
      landscapes: [
        "Great Rift Valley",
        "Ethiopian Highlands",
        "Swahili Coast",
        "Serengeti Plains",
      ],
      climate: "Tropical highlands to arid lowlands, monsoon influences",
      features: [
        "Lake Victoria",
        "Mount Kilimanjaro",
        "Nile source",
        "Coral reefs",
      ],
    },
    history: {
      ancient: "Human origins, early agricultural societies",
      classical: "Kingdom of Aksum, early Christianity",
      medieval: "Swahili city-states, Islamic influence, Ethiopian empire",
      modern: "Colonial partition, independence struggles, modern nations",
    },
    civilizations: [
      {
        name: "Kingdom of Aksum",
        period: "100-960 CE",
        description: "Ancient trading empire and early Christian kingdom",
        achievements: [
          "Obelisk construction",
          "Coinage system",
          "International trade",
          "Christianity adoption",
        ],
        legacy: "Ethiopian Orthodox tradition, architectural innovations",
      },
      {
        name: "Swahili City-States",
        period: "800-1500 CE",
        description: "Cosmopolitan trading cities along the coast",
        achievements: [
          "Maritime trade",
          "Cultural synthesis",
          "Urban development",
          "Swahili language",
        ],
        legacy: "Indian Ocean commerce, cultural fusion",
      },
      {
        name: "Ethiopian Empire",
        period: "1270-1974 CE",
        description: "One of Africa's longest-lasting empires",
        achievements: [
          "Christian preservation",
          "Military innovations",
          "Architectural marvels",
          "Literary traditions",
        ],
        legacy: "Independence maintenance, religious heritage",
      },
    ],
    culture: {
      traditions: [
        "Coffee ceremony",
        "Orthodox Christianity",
        "Maasai customs",
        "Swahili culture",
      ],
      arts: [
        "Ethiopian paintings",
        "Makonde sculptures",
        "Textile weaving",
        "Contemporary art",
      ],
      music: [
        "Traditional drums",
        "Ethiopian jazz",
        "Taarab music",
        "Modern fusion",
      ],
      cuisine: [
        "Injera bread",
        "Berbere spice",
        "Ugali",
        "Seafood dishes",
        "Coffee culture",
      ],
    },
    modernSignificance: [
      "Wildlife conservation",
      "Archaeological discoveries",
      "Coffee production",
      "Tourism industry",
      "Regional stability efforts",
    ],
    featuredSites: [
      {
        name: "Lalibela",
        location: "Ethiopia",
        type: "Rock Churches",
        description: "Medieval churches carved from solid rock",
      },
      {
        name: "Olduvai Gorge",
        location: "Tanzania",
        type: "Archaeological Site",
        description: "Key site for human evolution studies",
      },
      {
        name: "Stone Town",
        location: "Zanzibar, Tanzania",
        type: "Historic City",
        description: "Heart of the Swahili coast culture",
      },
      {
        name: "Ruins of Kilwa",
        location: "Tanzania",
        type: "Medieval City",
        description: "Former Swahili trading metropolis",
      },
    ],
    color: "from-blue-400 to-cyan-500",
    icon: "🌍",
    heroImage:
      "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  4: {
    name: "Central Africa",
    description:
      "Central Africa's dense rainforests have nurtured sophisticated societies for centuries. From the powerful Kongo Kingdom to the artistic traditions of the region, Central Africa showcases remarkable cultural and political innovations.",
    overview:
      "Dominated by the Congo Basin rainforest, Central Africa has been home to complex political systems, artistic traditions, and trade networks that connected the interior with both Atlantic and Indian Ocean trade routes.",
    countries: [
      "Democratic Republic of Congo",
      "Central African Republic",
      "Cameroon",
      "Chad",
      "Republic of Congo",
      "Equatorial Guinea",
      "Gabon",
      "São Tomé and Príncipe",
      "Angola",
    ],
    population: "180 million",
    area: "6.6 million km²",
    languages: [
      "French",
      "Portuguese",
      "English",
      "Lingala",
      "Kikongo",
      "Sango",
      "Arabic",
    ],
    geography: {
      landscapes: [
        "Congo Basin Rainforest",
        "Central African Plateau",
        "Atlantic Coastline",
        "Great Lakes Region",
      ],
      climate: "Tropical rainforest, equatorial climate",
      features: [
        "Congo River",
        "Dense rainforests",
        "Mineral deposits",
        "Biodiversity hotspots",
      ],
    },
    history: {
      ancient: "Bantu migrations, early iron age societies",
      classical: "Kingdom of Kongo, Luba Empire, Lunda Kingdom",
      medieval:
        "Trade networks, political confederations, artistic developments",
      modern:
        "European exploration, colonial exploitation, independence struggles",
    },
    civilizations: [
      {
        name: "Kingdom of Kongo",
        period: "1390-1914 CE",
        description:
          "Sophisticated African kingdom with complex political structure",
        achievements: [
          "Political organization",
          "Iron working",
          "Textile production",
          "Trade networks",
        ],
        legacy: "Influenced regional politics, cultural traditions",
      },
      {
        name: "Luba Empire",
        period: "1585-1889 CE",
        description: "Central African empire known for oral traditions",
        achievements: [
          "Oral history",
          "Artistic traditions",
          "Political innovations",
          "Trade facilitation",
        ],
        legacy: "Cultural preservation, artistic influence",
      },
      {
        name: "Lunda Kingdom",
        period: "1665-1887 CE",
        description: "Powerful kingdom controlling trade routes",
        achievements: [
          "Trade monopolies",
          "Military organization",
          "Administrative systems",
          "Cultural unity",
        ],
        legacy: "Regional trade networks, political structures",
      },
    ],
    culture: {
      traditions: [
        "Ancestral veneration",
        "Initiation ceremonies",
        "Oral literature",
        "Community governance",
      ],
      arts: [
        "Wood carving",
        "Mask making",
        "Textile arts",
        "Contemporary sculpture",
      ],
      music: [
        "Polyrhythmic drumming",
        "Soukous music",
        "Traditional chants",
        "Modern fusion",
      ],
      cuisine: [
        "Cassava-based dishes",
        "Plantain preparations",
        "River fish",
        "Forest fruits",
        "Palm wine",
      ],
    },
    modernSignificance: [
      "Biodiversity conservation",
      "Mineral resources",
      "Carbon sequestration",
      "Cultural preservation",
      "Regional integration efforts",
    ],
    featuredSites: [
      {
        name: "Mbanza Kongo",
        location: "Angola",
        type: "Historic Capital",
        description: "Former capital of the Kingdom of Kongo",
      },
      {
        name: "Sangha Trinational",
        location: "Cameroon/CAR/Congo",
        type: "Protected Forest",
        description: "UNESCO World Heritage rainforest site",
      },
      {
        name: "Lopé National Park",
        location: "Gabon",
        type: "Archaeological Site",
        description: "Evidence of early human settlement",
      },
    ],
    color: "from-emerald-400 to-green-600",
    icon: "🌳",
    heroImage:
      "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  5: {
    name: "Southern Africa",
    description:
      "Southern Africa combines ancient archaeological sites with modern nations. From the stone cities of Great Zimbabwe to the mineral wealth that shaped modern economies, this region tells a story of resilience and innovation.",
    overview:
      "Characterized by high plateaus, mineral wealth, and diverse landscapes, Southern Africa has been shaped by indigenous kingdoms, colonial encounters, and the struggle for liberation and equality.",
    countries: [
      "South Africa",
      "Zimbabwe",
      "Botswana",
      "Namibia",
      "Zambia",
      "Malawi",
      "Mozambique",
      "Lesotho",
      "Eswatini",
      "Madagascar",
    ],
    population: "185 million",
    area: "5.3 million km²",
    languages: [
      "English",
      "Afrikaans",
      "Portuguese",
      "Zulu",
      "Xhosa",
      "Sotho",
      "Shona",
      "Malagasy",
    ],
    geography: {
      landscapes: [
        "Kalahari Desert",
        "Drakensberg Mountains",
        "High Plateau",
        "Indian Ocean Coast",
      ],
      climate: "Subtropical to arid, Mediterranean in southwest",
      features: [
        "Victoria Falls",
        "Mineral deposits",
        "Unique wildlife",
        "Diverse ecosystems",
      ],
    },
    history: {
      ancient: "San people, Bantu expansion, early settlements",
      classical: "Great Zimbabwe, Mapungubwe, Mutapa Empire",
      medieval: "Trading kingdoms, Portuguese contact, interior exploration",
      modern: "Mineral discoveries, colonial rule, liberation struggles",
    },
    civilizations: [
      {
        name: "Great Zimbabwe",
        period: "1100-1450 CE",
        description: "Medieval stone city and trading center",
        achievements: [
          "Stone architecture",
          "Gold trade",
          "Urban planning",
          "Political organization",
        ],
        legacy: "Architectural innovations, trade networks",
      },
      {
        name: "Mapungubwe",
        period: "1075-1220 CE",
        description: "Early African kingdom with class-based society",
        achievements: [
          "Gold working",
          "Trade networks",
          "Social stratification",
          "Urban development",
        ],
        legacy: "Southern African state formation",
      },
      {
        name: "Mutapa Empire",
        period: "1430-1760 CE",
        description: "Successor to Great Zimbabwe controlling gold trade",
        achievements: [
          "Trade monopolies",
          "Political expansion",
          "Cultural integration",
          "Mining expertise",
        ],
        legacy: "Regional political systems, trade traditions",
      },
    ],
    culture: {
      traditions: [
        "Ubuntu philosophy",
        "Praise poetry",
        "Rainmaking ceremonies",
        "Coming-of-age rituals",
      ],
      arts: ["Rock art", "Beadwork", "Pottery", "Contemporary arts"],
      music: ["Mbira music", "Isicathamiya", "Marabi", "Modern genres"],
      cuisine: [
        "Biltong",
        "Pap and wors",
        "Sadza",
        "Seafood",
        "Traditional beer",
      ],
    },
    modernSignificance: [
      "Mining industry",
      "Wildlife tourism",
      "Liberation history",
      "Democratic transitions",
      "Regional leadership",
    ],
    featuredSites: [
      {
        name: "Great Zimbabwe Ruins",
        location: "Zimbabwe",
        type: "Archaeological Site",
        description: "Medieval stone city ruins",
      },
      {
        name: "Robben Island",
        location: "South Africa",
        type: "Historic Site",
        description: "Former political prison, symbol of liberation",
      },
      {
        name: "Victoria Falls",
        location: "Zambia/Zimbabwe",
        type: "Natural Wonder",
        description: "One of the world's largest waterfalls",
      },
      {
        name: "Tsodilo Hills",
        location: "Botswana",
        type: "Rock Art Site",
        description: "Ancient San rock paintings",
      },
    ],
    color: "from-purple-400 to-violet-500",
    icon: "🏔️",
    heroImage:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
};

// Regional map component (keeping the same)
function RegionalMap({
  regionId,
  regionName,
}: {
  regionId: number;
  regionName: string;
}) {
  // ... (same implementation as before)
  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border">
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
        <h4 className="text-sm text-gray-900">{regionName} Regional Map</h4>
      </div>
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-300 border border-green-500 rounded-sm mr-1"></div>
            Region
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            Countries
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegionDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const regionId = id ? parseInt(id) : null;
  const region = regionId ? regionData[regionId] : null;

  if (!region) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-2">Region Not Found</h2>
          <p className="text-gray-600 mb-4">
            The requested region could not be found.
          </p>
          <Link to="/regions">
            <Button>Back to Regions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getGeographyIcon = (feature: string) => {
    if (feature.toLowerCase().includes("desert"))
      return <Mountain className="w-4 h-4" />;
    if (
      feature.toLowerCase().includes("coast") ||
      feature.toLowerCase().includes("ocean")
    )
      return <Waves className="w-4 h-4" />;
    if (
      feature.toLowerCase().includes("forest") ||
      feature.toLowerCase().includes("rainforest")
    )
      return <TreePine className="w-4 h-4" />;
    return <Landmark className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Link to="/regions">
                <Button variant="outline" size="sm" className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Regions
                </Button>
              </Link>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${region.color} flex items-center justify-center text-3xl`}
                >
                  {region.icon}
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl text-gray-900">
                    {region.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    {region.countries.length} countries • {region.population}{" "}
                    people
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {region.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Area:</span>
                  <div className="text-gray-900">{region.area}</div>
                </div>
                <div>
                  <span className="text-gray-500">Languages:</span>
                  <div className="text-gray-900">
                    {region.languages.slice(0, 3).join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore History
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-4 h-4 mr-2" />
                  Save Region
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src={region.heroImage}
                alt={region.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-center">
                  <div className="text-2xl text-amber-600">
                    {region.countries.length}
                  </div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="sites">Sites</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      {region.overview}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg text-gray-900 mb-3">
                          Countries in this Region
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {region.countries.map(
                            (country: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="justify-center p-2"
                              >
                                {country}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg text-gray-900 mb-3">
                          Modern Significance
                        </h4>
                        <div className="space-y-2">
                          {region.modernSignificance.map(
                            (significance: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center text-sm text-gray-600"
                              >
                                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                                {significance}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-2xl text-gray-900 mb-6 text-center">
                      Major Civilizations
                    </h2>
                    <div className="space-y-6">
                      {region.civilizations.map((civ: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-xl text-gray-900">
                                    {civ.name}
                                  </h3>
                                  <div className="flex items-center text-amber-600 mt-1">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {civ.period}
                                  </div>
                                </div>
                                <Badge className="bg-amber-100 text-amber-800">
                                  Major Civilization
                                </Badge>
                              </div>

                              <p className="text-gray-700">{civ.description}</p>

                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm text-gray-900 mb-2">
                                    Key Achievements:
                                  </h4>
                                  <div className="space-y-1">
                                    {civ.achievements.map(
                                      (
                                        achievement: string,
                                        achIndex: number
                                      ) => (
                                        <div
                                          key={achIndex}
                                          className="flex items-center text-sm text-gray-600"
                                        >
                                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                          {achievement}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-sm text-gray-900 mb-2">
                                    Historical Legacy:
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {civ.legacy}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Historical Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(region.history).map(
                          ([period, description], index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-4"
                            >
                              <div className="w-3 h-3 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <h4 className="text-lg text-gray-900 capitalize">
                                  {period} Period
                                </h4>
                                <p className="text-gray-600">{description}</p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="culture" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(region.culture).map(
                    ([category, items], index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="capitalize">
                            {category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {(items as string[]).map(
                              (item: string, itemIndex: number) => (
                                <div
                                  key={itemIndex}
                                  className="flex items-center text-gray-700"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                  {item}
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="geography" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                {/* Regional Map Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      {region.name} Regional Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RegionalMap
                      regionId={regionId!}
                      regionName={region.name}
                    />
                    <p className="text-sm text-gray-600 mt-4">
                      Interactive map showing the countries and major
                      geographical features of {region.name}. Click on country
                      markers to explore more details.
                    </p>
                  </CardContent>
                </Card>

                {/* Geographic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Landscapes & Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {region.geography.landscapes.map(
                          (landscape: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center text-gray-700"
                            >
                              {getGeographyIcon(landscape)}
                              <span className="ml-3">{landscape}</span>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Climate & Key Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Climate:</h4>
                        <p className="text-gray-700">
                          {region.geography.climate}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">
                          Notable Features:
                        </h4>
                        <div className="space-y-2">
                          {region.geography.features.map(
                            (feature: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center text-gray-700"
                              >
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                {feature}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sites" className="space-y-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-gray-900">
                    Featured Historical Sites
                  </h2>
                  <div className="flex space-x-4">
                    <Select
                      value={selectedCountry}
                      onValueChange={setSelectedCountry}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {region.countries.map((country: string) => (
                          <SelectItem
                            key={country}
                            value={country.toLowerCase()}
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {region.featuredSites.map((site: any, index: number) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg text-gray-900">
                                {site.name}
                              </h3>
                              <div className="flex items-center text-gray-600 mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {site.location}
                              </div>
                            </div>
                            <Badge variant="outline">{site.type}</Badge>
                          </div>

                          <p className="text-gray-700 text-sm">
                            {site.description}
                          </p>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              asChild
                            >
                              <Link to="/interactive-map">
                                <MapPin className="w-3 h-3 mr-1" />
                                View on Map
                              </Link>
                            </Button>
                            <Button size="sm" className="flex-1" asChild>
                              <Link
                                to={`/sites/${site.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                <ArrowRight className="w-3 h-3 mr-1" />
                                Learn More
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
