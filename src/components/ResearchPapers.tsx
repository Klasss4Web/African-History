import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Filter,
  Search,
  Users,
  Star,
  ExternalLink,
  Quote,
  BookOpen,
  Award,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import AnimatedCounter from "./AnimatedCounter";

// Research papers data
const researchPapers = [
  {
    id: 1,
    title:
      "New Archaeological Evidence from Great Zimbabwe: Reassessing Trade Networks in Medieval Southern Africa",
    authors: [
      "Dr. Nomsa Dlamini",
      "Prof. Robert Mitchell",
      "Dr. Thabo Mofokeng",
    ],
    journal: "Journal of African Archaeology",
    year: 2024,
    volume: "Vol. 22, Issue 1",
    pages: "pp. 45-68",
    doi: "10.1080/0067270X.2024.2285647",
    keywords: [
      "Great Zimbabwe",
      "Medieval Africa",
      "Trade networks",
      "Indian Ocean commerce",
      "Archaeological evidence",
    ],
    category: "Archaeology",
    abstract: `This paper presents new archaeological evidence from recent excavations at Great Zimbabwe that challenges existing theories about the extent and nature of medieval trade networks in Southern Africa. Our analysis of newly discovered artifacts, including Chinese ceramics, Indian Ocean glass beads, and Persian metalwork, suggests that Great Zimbabwe's commercial reach was more extensive than previously understood.

The research team employed advanced dating techniques and compositional analysis to examine over 500 artifacts collected from three previously unexcavated areas of the site. Radiocarbon dating places the most significant finds between 1200-1400 CE, coinciding with Great Zimbabwe's peak prosperity.

Key findings include evidence of direct trade connections with the Swahili coast, likely through intermediary settlements, and the presence of luxury goods that indicate participation in Indian Ocean commerce networks. The scale and diversity of imported materials suggest that Great Zimbabwe served not merely as a regional center, but as a crucial node in transcontinental trade routes.

These discoveries necessitate a revision of our understanding of medieval African economic systems and highlight the sophisticated nature of indigenous African commercial networks. The implications extend beyond Southern Africa, contributing to broader discussions about African agency in global trade systems during the medieval period.`,
    citation: `Dlamini, N., Mitchell, R., & Mofokeng, T. (2024). New Archaeological Evidence from Great Zimbabwe: Reassessing Trade Networks in Medieval Southern Africa. Journal of African Archaeology, 22(1), 45-68. https://doi.org/10.1080/0067270X.2024.2285647`,
    downloads: 342,
    rating: 4.7,
    openAccess: true,
    peerReviewed: true,
    featured: true,
  },
  {
    id: 2,
    title:
      "Islamic Scholarship in Medieval Timbuktu: A Digital Analysis of Manuscript Collections",
    authors: [
      "Dr. Fatima Al-Zahra",
      "Prof. Ahmed Ibn Yusuf",
      "Dr. Maria Santos",
    ],
    journal: "Digital Humanities Quarterly",
    year: 2023,
    volume: "Vol. 17, Issue 4",
    pages: "pp. 112-145",
    doi: "10.16995/dhq.7854",
    keywords: [
      "Timbuktu",
      "Islamic manuscripts",
      "Digital humanities",
      "Medieval scholarship",
      "West Africa",
    ],
    category: "Digital Humanities",
    abstract: `This groundbreaking study employs digital humanities methodologies to analyze the extensive manuscript collections of medieval Timbuktu, providing new insights into the intellectual landscape of West African Islamic scholarship between the 13th and 16th centuries.

Using machine learning algorithms and natural language processing, we analyzed over 2,000 digitized manuscripts from the Ahmed Baba Institute and private collections. Our computational analysis revealed previously unrecognized patterns in knowledge transmission, scholarly networks, and the circulation of ideas across the Sahara.

The research identifies 47 distinct scholarly families and maps their intellectual genealogies across three centuries. We discovered evidence of original contributions to Islamic jurisprudence, astronomy, and mathematics that were subsequently transmitted to Cairo, Mecca, and Cordoba, challenging narratives that position Timbuktu merely as a recipient of external knowledge.

Particularly significant is our identification of a previously unknown tradition of astronomical calculation that represents an independent West African contribution to Islamic science. The manuscripts reveal sophisticated mathematical techniques for determining prayer times and religious calendar dates adapted for West African geographical conditions.

This study demonstrates the potential of digital methods to uncover hidden patterns in historical sources while contributing to decolonized narratives of African intellectual history. The database and analytical tools developed for this project are made available as open-source resources for future scholarship.`,
    citation: `Al-Zahra, F., Ibn Yusuf, A., & Santos, M. (2023). Islamic Scholarship in Medieval Timbuktu: A Digital Analysis of Manuscript Collections. Digital Humanities Quarterly, 17(4), 112-145. https://doi.org/10.16995/dhq.7854`,
    downloads: 567,
    rating: 4.9,
    openAccess: true,
    peerReviewed: true,
    featured: true,
  },
  {
    id: 3,
    title:
      "Climate Change and the Decline of the Kingdom of Kush: A Multi-Proxy Environmental Study",
    authors: [
      "Dr. Sarah Johnson",
      "Prof. Mohamed Hassan",
      "Dr. Elena Komnenos",
    ],
    journal: "Quaternary Research",
    year: 2023,
    volume: "Vol. 112",
    pages: "pp. 89-106",
    doi: "10.1017/qua.2023.25",
    keywords: [
      "Kingdom of Kush",
      "Climate change",
      "Environmental archaeology",
      "Nile River",
      "Ancient Nubia",
    ],
    category: "Environmental Archaeology",
    abstract: `This interdisciplinary study examines the role of climate change in the decline of the Kingdom of Kush (c. 1070 BCE - 350 CE) through multi-proxy environmental reconstruction. By integrating archaeological evidence with paleoclimatic data, we present a comprehensive picture of environmental pressures that contributed to the kingdom's eventual collapse.

Our research team collected sediment cores from multiple locations along the Nile in ancient Nubia, analyzing pollen, diatoms, and geochemical markers to reconstruct past climate conditions. Radiocarbon dating provides a chronological framework spanning 1500 years of environmental change.

Results indicate a significant aridification trend beginning around 300 CE, characterized by reduced Nile flood levels and increased variability in annual inundation patterns. This environmental stress coincided with archaeological evidence for settlement abandonment, agricultural decline, and the centralization of population in fewer, more defensible locations.

The study reveals how environmental pressures interacted with political and economic factors to precipitate the kingdom's transformation. Rather than simple environmental determinism, we argue for a complex relationship between climate stress and human adaptive responses, including changes in settlement patterns, agricultural strategies, and trade relationships.

These findings have important implications for understanding the resilience and vulnerability of ancient civilizations to climate change, providing historical perspective on contemporary discussions about climate adaptation in the Nile Valley.`,
    citation: `Johnson, S., Hassan, M., & Komnenos, E. (2023). Climate Change and the Decline of the Kingdom of Kush: A Multi-Proxy Environmental Study. Quaternary Research, 112, 89-106. https://doi.org/10.1017/qua.2023.25`,
    downloads: 423,
    rating: 4.5,
    openAccess: false,
    peerReviewed: true,
    featured: false,
  },
  {
    id: 4,
    title:
      "Women in Ancient Egyptian Administration: New Evidence from Deir el-Medina Papyri",
    authors: ["Dr. Miriam Cohen", "Prof. Joann Fletcher"],
    journal: "Journal of Egyptian History",
    year: 2024,
    volume: "Vol. 17, Issue 1",
    pages: "pp. 23-47",
    doi: "10.1163/18741665-12340089",
    keywords: [
      "Ancient Egypt",
      "Women's history",
      "Administration",
      "Deir el-Medina",
      "Gender studies",
    ],
    category: "Gender Studies",
    abstract: `This paper presents new translations and analysis of previously unstudied papyri from Deir el-Medina that reveal significant female participation in ancient Egyptian administrative systems during the New Kingdom period (1550-1077 BCE).

Our examination of 23 previously untranslated documents from the village archives reveals that women held formal administrative positions beyond those traditionally recognized in Egyptological scholarship. The papyri document women serving as record-keepers, dispute mediators, and resource distributors within the royal tomb-building community.

Most significantly, we identify a woman named Henutweret who appears to have held an official supervisory role over textile production, with authority to allocate materials and resolve labor disputes. Her seal appears on multiple administrative documents, suggesting formal recognition of her authority within the village hierarchy.

The evidence challenges conventional narratives that limit women's roles in ancient Egyptian administration to religious or domestic spheres. These documents reveal a more complex picture of gender roles in New Kingdom Egypt, where practical administrative needs sometimes superseded traditional gender restrictions.

The study contributes to growing scholarship on women's agency in ancient societies and demonstrates the importance of village-level archives for understanding social structures beyond elite circles documented in royal and temple inscriptions.`,
    citation: `Cohen, M., & Fletcher, J. (2024). Women in Ancient Egyptian Administration: New Evidence from Deir el-Medina Papyri. Journal of Egyptian History, 17(1), 23-47. https://doi.org/10.1163/18741665-12340089`,
    downloads: 289,
    rating: 4.6,
    openAccess: true,
    peerReviewed: true,
    featured: false,
  },
];

function AbstractModal({
  paper,
  isOpen,
  onClose,
}: {
  paper: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">{paper.title}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{paper.category}</Badge>
            <Badge variant="outline">{paper.year}</Badge>
            {paper.openAccess && (
              <Badge className="bg-green-600">Open Access</Badge>
            )}
            {paper.peerReviewed && (
              <Badge variant="outline">Peer Reviewed</Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg text-gray-900 mb-2">Authors</h3>
            <p className="text-gray-700">{paper.authors.join(", ")}</p>
          </div>

          <div>
            <h3 className="text-lg text-gray-900 mb-2">Publication Details</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Journal:</span>
                <div className="text-gray-900">{paper.journal}</div>
              </div>
              <div>
                <span className="text-gray-500">Volume:</span>
                <div className="text-gray-900">{paper.volume}</div>
              </div>
              <div>
                <span className="text-gray-500">Pages:</span>
                <div className="text-gray-900">{paper.pages}</div>
              </div>
              <div>
                <span className="text-gray-500">DOI:</span>
                <div className="text-blue-600 text-xs">{paper.doi}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-gray-900 mb-2">Abstract</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="prose prose-sm max-w-none text-gray-800">
                {paper.abstract
                  .split("\n\n")
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="mb-3 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-gray-900 mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((keyword: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg text-gray-900 mb-2">Citation</h3>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Quote className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-800 font-mono leading-relaxed">
                  {paper.citation}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Paper
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ResearchPapers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesSearch =
      searchQuery === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      paper.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || paper.category === selectedCategory;
    const matchesYear =
      selectedYear === "all" || paper.year.toString() === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  const categories = [
    ...new Set(researchPapers.map((paper) => paper.category)),
  ];
  const years = [
    ...new Set(researchPapers.map((paper) => paper.year.toString())),
  ]
    .sort()
    .reverse();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Animated Stats */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 text-blue-800"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Academic Research
            </Badge>
            <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
              Research Papers
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access cutting-edge academic research in African history and
              archaeology. Discover peer-reviewed papers from leading scholars
              and emerging researchers worldwide.
            </p>
          </div>

          {/* Research Stats with Animation */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                label: "Research Papers",
                target: 156,
                suffix: "+",
                icon: FileText,
              },
              { label: "Open Access", target: 78, suffix: "%", icon: Award },
              {
                label: "Total Citations",
                target: 2300,
                suffix: "+",
                icon: Quote,
              },
              { label: "Research Areas", target: 12, suffix: "", icon: Users },
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl text-gray-900 mb-1">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg text-gray-900">Research Database</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search papers, authors, keywords..."
                  className="pl-10 w-full sm:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Research Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Papers List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {filteredPapers.map((paper) => (
              <Card
                key={paper.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl text-gray-900 mb-2 leading-relaxed">
                          {paper.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Users className="w-4 h-4 mr-2" />
                          {paper.authors.join(", ")}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {paper.featured && (
                          <Badge className="bg-amber-600">Featured</Badge>
                        )}
                        {paper.openAccess && (
                          <Badge className="bg-green-600">Open Access</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Journal:</span>
                        <div className="text-gray-900">{paper.journal}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Published:</span>
                        <div className="text-gray-900">
                          {paper.year} • {paper.volume}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <div className="text-gray-900">{paper.category}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-900 mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {paper.keywords
                          .slice(0, 5)
                          .map((keyword: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        {paper.keywords.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{paper.keywords.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <AnimatedCounter target={paper.downloads} /> downloads
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-amber-500" />
                          {paper.rating} rating
                        </div>
                        {paper.peerReviewed && (
                          <Badge variant="outline" className="text-xs">
                            Peer Reviewed
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPaper(paper)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Abstract
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Full Paper
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No papers found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Abstract Modal */}
      {selectedPaper && (
        <AbstractModal
          paper={selectedPaper}
          isOpen={!!selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      )}
    </div>
  );
}
