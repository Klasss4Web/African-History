// import { useState } from "react";
// import {
//   MapPin,
//   Filter,
//   Search,
//   Globe,
//   Calendar,
//   Users,
//   BookOpen,
//   ArrowRight,
// } from "lucide-react";

// import { Badge } from "./ui/badge";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Card, CardContent } from "./ui/card";
// import { useNavigation } from "./Navigation";
// import { ImageWithFallback } from "./fallbacks/ImageWithFallback";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// const regionStats = {
//   totalCountries: 54,
//   totalPopulation: "1.4 billion",
//   totalArea: "30.3 million km²",
//   languages: "2000+",
//   civilizations: "100+",
//   historicalSites: "1000+",
// };

// const regions = [
//   {
//     id: 1,
//     name: "North Africa",
//     countries: 7,
//     population: "245 million",
//     area: "11.6 million km²",
//     featured: "Ancient Egypt & Carthage",
//     description:
//       "Home to the oldest civilizations and the mighty Sahara Desert. This region has been a bridge between Africa, Europe, and Asia for millennia.",
//     color: "from-yellow-400 to-orange-500",
//     icon: "🏺",
//     highlights: [
//       "Pyramids of Giza",
//       "Sahara Desert",
//       "Mediterranean Trade",
//       "Nile River",
//     ],
//     keyPeriods: [
//       "Ancient Egypt (3100-30 BCE)",
//       "Carthaginian Empire (814-146 BCE)",
//       "Islamic Conquest (640-1050 CE)",
//     ],
//     modernChallenges: [
//       "Water scarcity",
//       "Political transitions",
//       "Economic diversification",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//   },
//   {
//     id: 2,
//     name: "West Africa",
//     countries: 16,
//     population: "400 million",
//     area: "5.1 million km²",
//     featured: "Mali & Songhai Empires",
//     description:
//       "Birthplace of powerful trading empires and rich cultural traditions. Known for the legendary wealth of Mansa Musa and the scholarship of Timbuktu.",
//     color: "from-green-400 to-emerald-500",
//     icon: "👑",
//     highlights: [
//       "Gold Trade Routes",
//       "Timbuktu University",
//       "Oral Traditions",
//       "Artistic Heritage",
//     ],
//     keyPeriods: [
//       "Ghana Empire (300-1200 CE)",
//       "Mali Empire (1235-1600 CE)",
//       "Songhai Empire (1464-1591 CE)",
//     ],
//     modernChallenges: [
//       "Climate change",
//       "Youth employment",
//       "Democratic governance",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//   },
//   {
//     id: 3,
//     name: "East Africa",
//     countries: 12,
//     population: "445 million",
//     area: "6.2 million km²",
//     featured: "Ethiopia & Swahili Coast",
//     description:
//       "Cradle of humanity and ancient trading civilizations. Home to unique cultures, from highland kingdoms to coastal trading cities.",
//     color: "from-blue-400 to-cyan-500",
//     icon: "🌍",
//     highlights: [
//       "Human Origins",
//       "Rock Churches",
//       "Swahili Culture",
//       "Trade Networks",
//     ],
//     keyPeriods: [
//       "Kingdom of Aksum (100-960 CE)",
//       "Swahili City-States (800-1500 CE)",
//       "Ethiopian Empire (1270-1974 CE)",
//     ],
//     modernChallenges: [
//       "Regional conflicts",
//       "Food security",
//       "Infrastructure development",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1696224742102-26309ea4d181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWZyaWNhbiUyMGNpdmlsaXphdGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTQ0Njk4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//   },
//   {
//     id: 4,
//     name: "Central Africa",
//     countries: 9,
//     population: "180 million",
//     area: "6.6 million km²",
//     featured: "Kongo Kingdom",
//     description:
//       "Dense rainforests and sophisticated political systems. Rich in biodiversity and home to complex traditional governance structures.",
//     color: "from-emerald-400 to-green-600",
//     icon: "🌳",
//     highlights: [
//       "Congo Rainforest",
//       "Traditional Kingdoms",
//       "Art & Crafts",
//       "Biodiversity",
//     ],
//     keyPeriods: [
//       "Kingdom of Kongo (1390-1914 CE)",
//       "Luba Empire (1585-1889 CE)",
//       "Colonial Period (1880-1960 CE)",
//     ],
//     modernChallenges: [
//       "Forest conservation",
//       "Political stability",
//       "Resource management",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//   },
//   {
//     id: 5,
//     name: "Southern Africa",
//     countries: 10,
//     population: "185 million",
//     area: "5.3 million km²",
//     featured: "Great Zimbabwe",
//     description:
//       "Stone cities and mineral wealth that shaped civilizations. Known for archaeological wonders and the struggle for liberation.",
//     color: "from-purple-400 to-violet-500",
//     icon: "🏔️",
//     highlights: [
//       "Stone Architecture",
//       "Mineral Wealth",
//       "Liberation History",
//       "Wildlife",
//     ],
//     keyPeriods: [
//       "Great Zimbabwe (1100-1450 CE)",
//       "Mfecane Period (1815-1840 CE)",
//       "Liberation Movements (1960-1994 CE)",
//     ],
//     modernChallenges: [
//       "Inequality reduction",
//       "Land reform",
//       "Economic transformation",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//   },
// ];

// export default function RegionsOverview() {
//   const { navigateTo } = useNavigation();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("name");

//   const filteredRegions = regions
//     .filter((region) => {
//       const matchesSearch =
//         searchTerm === "" ||
//         region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         region.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         region.featured.toLowerCase().includes(searchTerm.toLowerCase());

//       return matchesSearch;
//     })
//     .sort((a, b) => {
//       if (sortBy === "name") return a.name.localeCompare(b.name);
//       if (sortBy === "population")
//         return (
//           parseInt(b.population.split(" ")[0]) -
//           parseInt(a.population.split(" ")[0])
//         );
//       if (sortBy === "area")
//         return (
//           parseFloat(b.area.split(" ")[0]) - parseFloat(a.area.split(" ")[0])
//         );
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <Badge
//               variant="secondary"
//               className="mb-4 bg-amber-100 text-amber-800"
//             >
//               <Globe className="w-4 h-4 mr-2" />
//               Continental Overview
//             </Badge>
//             <h1 className="text-4xl lg:text-6xl text-gray-900 mb-4">
//               African Regions
//             </h1>
//             <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
//               Discover the incredible diversity of Africa through its five major
//               regions. Each area tells a unique story of civilizations,
//               cultures, and historical achievements that have shaped humanity.
//             </p>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
//             {Object.entries(regionStats).map(([key, value]) => (
//               <Card key={key} className="text-center">
//                 <CardContent className="p-4">
//                   <div className="text-2xl text-amber-600 mb-1">{value}</div>
//                   <div className="text-sm text-gray-600 capitalize">
//                     {key.replace(/([A-Z])/g, " $1").trim()}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Filters and Search */}
//       <section className="py-8 bg-white border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Filter className="w-5 h-5 text-gray-600" />
//               <h3 className="text-lg text-gray-900">Explore Regions</h3>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Search regions..."
//                   className="pl-10 w-full sm:w-64"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="w-full sm:w-40">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="name">Name</SelectItem>
//                   <SelectItem value="population">Population</SelectItem>
//                   <SelectItem value="area">Area</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Regions Content */}
//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <Tabs defaultValue="grid" className="space-y-8">
//             <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
//               <TabsTrigger value="grid">Grid View</TabsTrigger>
//               <TabsTrigger value="detailed">Detailed View</TabsTrigger>
//             </TabsList>

//             <TabsContent value="grid" className="space-y-8">
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredRegions.map((region) => (
//                   <Card
//                     key={region.id}
//                     className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
//                     onClick={() =>
//                       navigateTo("region-detail", { id: region.id })
//                     }
//                   >
//                     <div className="relative">
//                       <ImageWithFallback
//                         src={region.image}
//                         alt={region.name}
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
//                         <span className="text-2xl">{region.icon}</span>
//                       </div>
//                       <div
//                         className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${region.color}`}
//                       ></div>
//                     </div>

//                     <CardContent className="p-6 space-y-4">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-xl text-gray-900 group-hover:text-amber-600 transition-colors">
//                           {region.name}
//                         </h3>
//                         <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
//                       </div>

//                       <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
//                         <div className="flex items-center">
//                           <MapPin className="w-3 h-3 mr-1" />
//                           {region.countries} countries
//                         </div>
//                         <div className="flex items-center">
//                           <Users className="w-3 h-3 mr-1" />
//                           {region.population}
//                         </div>
//                       </div>

//                       <p className="text-gray-600 text-sm line-clamp-2">
//                         {region.description}
//                       </p>

//                       <div className="space-y-2">
//                         <div className="text-xs text-amber-600">Featured:</div>
//                         <div className="text-sm text-gray-700">
//                           {region.featured}
//                         </div>
//                       </div>

//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="w-full group-hover:bg-amber-50 group-hover:text-amber-600"
//                       >
//                         Explore {region.name}
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="detailed" className="space-y-6">
//               {filteredRegions.map((region) => (
//                 <Card
//                   key={region.id}
//                   className="hover:shadow-lg transition-shadow cursor-pointer"
//                   onClick={() => navigateTo("region-detail", { id: region.id })}
//                 >
//                   <CardContent className="p-8">
//                     <div className="grid lg:grid-cols-3 gap-8">
//                       <div className="lg:col-span-1">
//                         <div className="relative">
//                           <ImageWithFallback
//                             src={region.image}
//                             alt={region.name}
//                             className="w-full h-48 object-cover rounded-lg"
//                           />
//                           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
//                             <span className="text-2xl">{region.icon}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="lg:col-span-2 space-y-6">
//                         <div className="flex items-center justify-between">
//                           <h2 className="text-2xl text-gray-900 hover:text-amber-600 transition-colors">
//                             {region.name}
//                           </h2>
//                           <ArrowRight className="w-6 h-6 text-gray-400" />
//                         </div>

//                         <div className="grid md:grid-cols-3 gap-4 text-sm">
//                           <div>
//                             <span className="text-gray-500">Countries:</span>
//                             <div className="text-gray-900">
//                               {region.countries}
//                             </div>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Population:</span>
//                             <div className="text-gray-900">
//                               {region.population}
//                             </div>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Area:</span>
//                             <div className="text-gray-900">{region.area}</div>
//                           </div>
//                         </div>

//                         <p className="text-gray-700 leading-relaxed">
//                           {region.description}
//                         </p>

//                         <div className="space-y-4">
//                           <div>
//                             <h4 className="text-sm text-amber-600 mb-2">
//                               Key Historical Periods:
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                               {region.keyPeriods.map((period, index) => (
//                                 <Badge
//                                   key={index}
//                                   variant="outline"
//                                   className="text-xs"
//                                 >
//                                   {period}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <h4 className="text-sm text-amber-600 mb-2">
//                               Notable Features:
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                               {region.highlights.map((highlight, index) => (
//                                 <Badge
//                                   key={index}
//                                   className="bg-amber-100 text-amber-700 text-xs"
//                                 >
//                                   {highlight}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                         </div>

//                         <Button className="bg-amber-600 hover:bg-amber-700">
//                           <BookOpen className="w-4 h-4 mr-2" />
//                           Explore {region.name} in Detail
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
//         <div className="container mx-auto px-4 text-center">
//           <div className="max-w-2xl mx-auto space-y-6">
//             <h2 className="text-3xl text-white">
//               Ready to Explore African History?
//             </h2>
//             <p className="text-lg text-orange-100">
//               Journey through thousands of years of rich African heritage with
//               our interactive timeline and detailed historical content.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button
//                 variant="secondary"
//                 size="lg"
//                 onClick={() => navigateTo("timeline")}
//               >
//                 <Calendar className="w-4 h-4 mr-2" />
//                 View Interactive Timeline
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="bg-transparent border-white text-white hover:bg-white hover:text-amber-600"
//                 onClick={() => navigateTo("stories")}
//               >
//                 <BookOpen className="w-4 h-4 mr-2" />
//                 Read Historical Stories
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
