export const countryData: { [key: string]: any } = {
  egypt: {
    name: "Egypt",
    officialName: "Arab Republic of Egypt",
    region: "North Africa",
    capital: "Cairo",
    population: "104.3 million",
    area: "1,010,408 km²",
    languages: ["Arabic", "English", "French"],
    currency: "Egyptian Pound (EGP)",
    timeZone: "UTC+2",
    overview:
      "Egypt is a transcontinental country spanning the northeast corner of Africa and southwest corner of Asia. It is home to one of the world's oldest civilizations and contains numerous archaeological treasures.",
    flag: "🇪🇬",
    coordinates: { lat: 26.8206, lng: 30.8025 },
    images: {
      hero: "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      gallery: [
        "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
    },
    geography: {
      regions: [
        "Nile Valley",
        "Nile Delta",
        "Western Desert",
        "Eastern Desert",
        "Sinai Peninsula",
      ],
      climate: "Desert climate with hot, dry summers and mild winters",
      naturalFeatures: [
        "Nile River",
        "Sahara Desert",
        "Red Sea Coast",
        "Mediterranean Coast",
        "Suez Canal",
      ],
      resources: ["Oil", "Natural Gas", "Iron Ore", "Phosphates", "Gold"],
    },
    history: {
      ancient: {
        periods: [
          {
            name: "Predynastic Period",
            dates: "6000-3100 BCE",
            description:
              "Early development of Egyptian civilization along the Nile",
          },
          {
            name: "Old Kingdom",
            dates: "2686-2181 BCE",
            description: "Age of pyramid building, capital at Memphis",
          },
          {
            name: "Middle Kingdom",
            dates: "2055-1650 BCE",
            description: "Classical period of Egyptian art and literature",
          },
          {
            name: "New Kingdom",
            dates: "1550-1077 BCE",
            description: "Egyptian Empire at its height, famous pharaohs",
          },
        ],
        achievements: [
          "Developed hieroglyphic writing system",
          "Built the Great Pyramid of Giza",
          "Advanced mummification techniques",
          "Created solar calendar with 365 days",
          "Established trade networks across ancient world",
        ],
      },
      modern: {
        keyEvents: [
          { year: "1922", event: "Independence from British protectorate" },
          { year: "1952", event: "Free Officers Revolution" },
          { year: "1956", event: "Suez Canal nationalization" },
          { year: "1979", event: "Camp David Accords with Israel" },
          { year: "2011", event: "Arab Spring revolution" },
        ],
      },
    },
    culture: {
      traditions: [
        "Islamic festivals",
        "Coptic celebrations",
        "Ancient Egyptian revival",
        "Sufi practices",
      ],
      arts: [
        "Islamic calligraphy",
        "Coptic art",
        "Modern Egyptian cinema",
        "Traditional music",
      ],
      literature: [
        "Arabic literature",
        "Nobel Prize winners",
        "Ancient texts",
        "Modern novels",
      ],
      cuisine: [
        "Ful medames",
        "Koshari",
        "Molokhia",
        "Baklava",
        "Egyptian bread",
      ],
    },
    sites: [
      {
        name: "Pyramids of Giza",
        type: "Archaeological Site",
        significance: "Last surviving Wonder of the Ancient World",
        location: "Giza",
        visitorsPerYear: "14.7 million",
        unescoSite: true,
      },
      {
        name: "Valley of the Kings",
        type: "Archaeological Site",
        significance: "Royal burial ground of pharaohs",
        location: "Luxor",
        visitorsPerYear: "2.1 million",
        unescoSite: true,
      },
      {
        name: "Abu Simbel",
        type: "Archaeological Site",
        significance: "Ramesses II's temple complex",
        location: "Aswan",
        visitorsPerYear: "800,000",
        unescoSite: true,
      },
      {
        name: "Islamic Cairo",
        type: "Historic District",
        significance: "Largest collection of historic Islamic architecture",
        location: "Cairo",
        visitorsPerYear: "5.2 million",
        unescoSite: true,
      },
    ],
    economy: {
      gdp: "$469.09 billion",
      gdpPerCapita: "$4,295",
      majorIndustries: [
        "Tourism",
        "Agriculture",
        "Manufacturing",
        "Oil & Gas",
        "Textiles",
      ],
      exports: ["Petroleum", "Textiles", "Agricultural products", "Chemicals"],
      tourismRevenue: "$13.6 billion",
    },
    demographics: {
      urbanPopulation: "43%",
      literacyRate: "71.2%",
      lifeExpectancy: "72.0 years",
      religions: [
        { name: "Islam", percentage: 90 },
        { name: "Christianity", percentage: 10 },
      ],
      ethnicGroups: [
        { name: "Egyptian", percentage: 99 },
        { name: "Other", percentage: 1 },
      ],
    },
    education: {
      universities: [
        "Al-Azhar University",
        "Cairo University",
        "American University in Cairo",
      ],
      literacyRate: "71.2%",
      educationExpenditure: "2.5% of GDP",
    },
    modernChallenges: [
      "Water scarcity from Nile River disputes",
      "Rapid population growth",
      "Economic diversification",
      "Tourism industry volatility",
      "Preservation of archaeological sites",
    ],
  },
  ethiopia: {
    name: "Ethiopia",
    officialName: "Federal Democratic Republic of Ethiopia",
    region: "East Africa",
    capital: "Addis Ababa",
    population: "120.3 million",
    area: "1,104,300 km²",
    languages: ["Amharic", "Oromo", "Tigrinya", "English"],
    currency: "Ethiopian Birr (ETB)",
    timeZone: "UTC+3",
    overview:
      "Ethiopia is a landlocked country in the Horn of Africa. It is one of the few African countries never to have been fully colonized and is home to ancient civilizations and the source of the Blue Nile.",
    flag: "🇪🇹",
    coordinates: { lat: 9.145, lng: 40.4897 },
    images: {
      hero: "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      gallery: [
        "https://images.unsplash.com/photo-1652355008626-22da23215341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBhcnQlMjB0ZXh0aWxlfGVufDF8fHx8MTc1NDQ2OTg1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
    },
    geography: {
      regions: [
        "Ethiopian Highlands",
        "Great Rift Valley",
        "Danakil Depression",
        "Simien Mountains",
      ],
      climate: "Varied from tropical to alpine depending on elevation",
      naturalFeatures: [
        "Blue Nile Falls",
        "Erta Ale volcano",
        "Lake Tana",
        "Simien Mountains",
      ],
      resources: ["Coffee", "Gold", "Platinum", "Potash", "Natural Gas"],
    },
    history: {
      ancient: {
        periods: [
          {
            name: "Kingdom of Aksum",
            dates: "100-960 CE",
            description:
              "Ancient trading empire, one of the great powers of the ancient world",
          },
          {
            name: "Zagwe Dynasty",
            dates: "1137-1270 CE",
            description: "Built the famous rock churches of Lalibela",
          },
          {
            name: "Ethiopian Empire",
            dates: "1270-1974 CE",
            description: "Long-lasting empire that maintained independence",
          },
        ],
        achievements: [
          "One of the first nations to accept Christianity",
          "Created unique rock-hewn churches",
          "Maintained independence from colonial powers",
          "Developed ancient trade networks with Rome and India",
          "Preserved unique cultural and religious traditions",
        ],
      },
      modern: {
        keyEvents: [
          { year: "1896", event: "Battle of Adwa - defeated Italian invasion" },
          { year: "1930", event: "Haile Selassie becomes Emperor" },
          { year: "1936-1941", event: "Brief Italian occupation" },
          { year: "1974", event: "Revolution ends imperial rule" },
          {
            year: "1991",
            event:
              "Ethiopian People's Revolutionary Democratic Front takes power",
          },
        ],
      },
    },
    culture: {
      traditions: [
        "Ethiopian Orthodox Christianity",
        "Coffee ceremony",
        "Traditional festivals",
        "Tribal customs",
      ],
      arts: [
        "Religious paintings",
        "Traditional music",
        "Dance",
        "Handicrafts",
      ],
      literature: ["Ge'ez manuscripts", "Oral traditions", "Modern literature"],
      cuisine: [
        "Injera bread",
        "Wat stews",
        "Coffee",
        "Berbere spice",
        "Honey wine",
      ],
    },
    sites: [
      {
        name: "Rock Churches of Lalibela",
        type: "Religious Site",
        significance: "11 medieval churches carved from solid rock",
        location: "Lalibela",
        visitorsPerYear: "200,000",
        unescoSite: true,
      },
      {
        name: "Aksum",
        type: "Archaeological Site",
        significance: "Ancient capital of the Aksumite Empire",
        location: "Tigray",
        visitorsPerYear: "50,000",
        unescoSite: true,
      },
      {
        name: "Simien Mountains",
        type: "Natural Site",
        significance: "Dramatic mountain landscape and endemic wildlife",
        location: "Amhara",
        visitorsPerYear: "25,000",
        unescoSite: true,
      },
    ],
    economy: {
      gdp: "$111.27 billion",
      gdpPerCapita: "$936",
      majorIndustries: ["Agriculture", "Manufacturing", "Services", "Mining"],
      exports: ["Coffee", "Oilseeds", "Gold", "Leather products"],
      tourismRevenue: "$3.5 billion",
    },
    demographics: {
      urbanPopulation: "22%",
      literacyRate: "51.8%",
      lifeExpectancy: "67.8 years",
      religions: [
        { name: "Ethiopian Orthodox", percentage: 44 },
        { name: "Islam", percentage: 34 },
        { name: "Protestant", percentage: 19 },
        { name: "Other", percentage: 3 },
      ],
      ethnicGroups: [
        { name: "Oromo", percentage: 35 },
        { name: "Amhara", percentage: 27 },
        { name: "Somali", percentage: 6 },
        { name: "Tigray", percentage: 6 },
        { name: "Other", percentage: 26 },
      ],
    },
    education: {
      universities: [
        "Addis Ababa University",
        "Jimma University",
        "Haramaya University",
      ],
      literacyRate: "51.8%",
      educationExpenditure: "4.7% of GDP",
    },
    modernChallenges: [
      "Ethnic tensions and conflicts",
      "Poverty and food security",
      "Infrastructure development",
      "Climate change impacts",
      "Youth unemployment",
    ],
  },
};
