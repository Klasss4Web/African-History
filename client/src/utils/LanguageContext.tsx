import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// African languages and lingua francas
export const supportedLanguages = [
  // Major African Languages
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    family: "Germanic",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇪🇬",
    family: "Semitic",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    family: "Romance",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    family: "Romance",
  },
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    flag: "🇹🇿",
    family: "Bantu",
  },
  {
    code: "ha",
    name: "Hausa",
    nativeName: "Harshen Hausa",
    flag: "🇳🇬",
    family: "Chadic",
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    flag: "🇪🇹",
    family: "Semitic",
  },
  {
    code: "yo",
    name: "Yoruba",
    nativeName: "Èdè Yorùbá",
    flag: "🇳🇬",
    family: "Niger-Congo",
  },
  {
    code: "ig",
    name: "Igbo",
    nativeName: "Asụsụ Igbo",
    flag: "🇳🇬",
    family: "Niger-Congo",
  },
  {
    code: "zu",
    name: "Zulu",
    nativeName: "IsiZulu",
    flag: "🇿🇦",
    family: "Bantu",
  },
  {
    code: "xh",
    name: "Xhosa",
    nativeName: "IsiXhosa",
    flag: "🇿🇦",
    family: "Bantu",
  },
  {
    code: "af",
    name: "Afrikaans",
    nativeName: "Afrikaans",
    flag: "🇿🇦",
    family: "Germanic",
  },
  {
    code: "so",
    name: "Somali",
    nativeName: "Af-Soomaali",
    flag: "🇸🇴",
    family: "Cushitic",
  },
  {
    code: "om",
    name: "Oromo",
    nativeName: "Afaan Oromoo",
    flag: "🇪🇹",
    family: "Cushitic",
  },
  {
    code: "ff",
    name: "Fulfulde",
    nativeName: "Fulfulde",
    flag: "🇸🇳",
    family: "Niger-Congo",
  },
  {
    code: "wo",
    name: "Wolof",
    nativeName: "Wolof",
    flag: "🇸🇳",
    family: "Niger-Congo",
  },
];

// Translation data structure
export const translations = {
  en: {
    // Navigation
    home: "Home",
    timeline: "Timeline",
    regions: "Regions",
    stories: "Stories",
    resources: "Resources",
    people: "People",
    map: "Interactive Map",
    contributors: "Contributors",

    // Common phrases
    welcome: "Explore African Heritage",
    learnMore: "Learn More",
    exploreNow: "Start Exploring",
    readMore: "Read More",
    viewAll: "View All",
    backToTop: "Back to Top",

    // Hero section
    heroTitle: "Discover Africa's Rich History",
    heroSubtitle:
      "Journey through millennia of African civilizations, from ancient kingdoms to modern nations",

    // Time periods
    ancient: "Ancient",
    medieval: "Medieval",
    modern: "Modern",
    contemporary: "Contemporary",

    // Categories
    empires: "Empires & Kingdoms",
    culture: "Art & Culture",
    science: "Science & Learning",
    trade: "Trade & Commerce",
    resistance: "Resistance & Leadership",

    // Interface
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    language: "Language",
    selectLanguage: "Select Language",
  },

  sw: {
    // Navigation - Swahili
    home: "Nyumbani",
    timeline: "Ratiba ya Wakati",
    regions: "Maeneo",
    stories: "Hadithi",
    resources: "Rasilimali",
    people: "Watu",
    map: "Ramani ya Maingiliano",
    contributors: "Wachangiaji",

    // Common phrases
    welcome: "Chunguza Urithi wa Afrika",
    learnMore: "Jifunze Zaidi",
    exploreNow: "Anza Kuchunguza",
    readMore: "Soma Zaidi",
    viewAll: "Ona Yote",
    backToTop: "Rudi Juu",

    // Hero section
    heroTitle: "Gundua Historia Tajiri ya Afrika",
    heroSubtitle:
      "Safari kupitia maelfu ya miaka ya ustaarabu wa Afrika, kutoka falme za kale hadi mataifa ya kisasa",

    // Time periods
    ancient: "Za Kale",
    medieval: "Za Kati",
    modern: "Za Kisasa",
    contemporary: "Za Sasa",

    // Categories
    empires: "Milki na Ufalme",
    culture: "Sanaa na Utamaduni",
    science: "Sayansi na Elimu",
    trade: "Biashara na Uchumi",
    resistance: "Upinzani na Uongozi",

    // Interface
    search: "Tafuta",
    filter: "Chuja",
    sort: "Panga",
    language: "Lugha",
    selectLanguage: "Chagua Lugha",
  },

  ar: {
    // Navigation - Arabic
    home: "الرئيسية",
    timeline: "الجدول الزمني",
    regions: "المناطق",
    stories: "القصص",
    resources: "الموارد",
    people: "الأشخاص",
    map: "الخريطة التفاعلية",
    contributors: "المساهمون",

    // Common phrases
    welcome: "اكتشف التراث الأفريقي",
    learnMore: "تعلم المزيد",
    exploreNow: "ابدأ الاستكشاف",
    readMore: "اقرأ المزيد",
    viewAll: "عرض الكل",
    backToTop: "العودة إلى الأعلى",

    // Hero section
    heroTitle: "اكتشف التاريخ الغني لأفريقيا",
    heroSubtitle:
      "رحلة عبر آلاف السنين من الحضارات الأفريقية، من الممالك القديمة إلى الدول الحديثة",

    // Time periods
    ancient: "القديم",
    medieval: "الوسطى",
    modern: "الحديث",
    contemporary: "المعاصر",

    // Categories
    empires: "الإمبراطوريات والممالك",
    culture: "الفن والثقافة",
    science: "العلوم والتعليم",
    trade: "التجارة والاقتصاد",
    resistance: "المقاومة والقيادة",

    // Interface
    search: "البحث",
    filter: "تصفية",
    sort: "ترتيب",
    language: "اللغة",
    selectLanguage: "اختر اللغة",
  },

  fr: {
    // Navigation - French
    home: "Accueil",
    timeline: "Chronologie",
    regions: "Régions",
    stories: "Histoires",
    resources: "Ressources",
    people: "Personnages",
    map: "Carte Interactive",
    contributors: "Contributeurs",

    // Common phrases
    welcome: "Explorez l'Héritage Africain",
    learnMore: "En Savoir Plus",
    exploreNow: "Commencer à Explorer",
    readMore: "Lire Plus",
    viewAll: "Voir Tout",
    backToTop: "Retour en Haut",

    // Hero section
    heroTitle: "Découvrez la Riche Histoire de l'Afrique",
    heroSubtitle:
      "Voyage à travers des millénaires de civilisations africaines, des royaumes anciens aux nations modernes",

    // Time periods
    ancient: "Antique",
    medieval: "Médiéval",
    modern: "Moderne",
    contemporary: "Contemporain",

    // Categories
    empires: "Empires et Royaumes",
    culture: "Art et Culture",
    science: "Science et Apprentissage",
    trade: "Commerce et Économie",
    resistance: "Résistance et Leadership",

    // Interface
    search: "Rechercher",
    filter: "Filtrer",
    sort: "Trier",
    language: "Langue",
    selectLanguage: "Sélectionner la Langue",
  },

  ha: {
    // Navigation - Hausa
    home: "Gida",
    timeline: "Jadawalin Lokaci",
    regions: "Yankuna",
    stories: "Labarai",
    resources: "Albarkatu",
    people: "Mutane",
    map: "Taswirar Mu'amala",
    contributors: "Masu Bayarwa",

    // Common phrases
    welcome: "Binciki Tarihin Afrika",
    learnMore: "Kara Koyo",
    exploreNow: "Fara Bincike",
    readMore: "Kara Karanta",
    viewAll: "Duba Duka",
    backToTop: "Koma Sama",

    // Hero section
    heroTitle: "Gano Wadatar Tarihin Afrika",
    heroSubtitle:
      "Tafiya ta tsawon dubunnan shekaru na wayewar Afrika, daga daular da suka wuce zuwa kasashen zamani",

    // Time periods
    ancient: "Na Dā",
    medieval: "Na Tsakiya",
    modern: "Na Zamani",
    contemporary: "Na Yanzu",

    // Categories
    empires: "Daular da Sarauta",
    culture: "Fasaha da Al'ada",
    science: "Kimiyya da Ilimi",
    trade: "Kasuwanci da Tattalin Arziki",
    resistance: "Tsayin Daka da Jagoranci",

    // Interface
    search: "Nema",
    filter: "Tace",
    sort: "Jera",
    language: "Harshe",
    selectLanguage: "Zaɓi Harshe",
  },

  yo: {
    // Navigation - Yoruba
    home: "Ile",
    timeline: "Akoko Iṣẹlẹ",
    regions: "Awọn Agbegbe",
    stories: "Awọn Itan",
    resources: "Awọn Ohun Elo",
    people: "Awọn Eniyan",
    map: "Maapu Ajọpọ",
    contributors: "Awọn Oluranlọwọ",

    // Common phrases
    welcome: "Ṣawari Ogún Afrika",
    learnMore: "Kọ Diẹ Sii",
    exploreNow: "Bẹrẹ Ṣawari",
    readMore: "Ka Diẹ Sii",
    viewAll: "Wo Gbogbo",
    backToTop: "Pada si Oke",

    // Hero section
    heroTitle: "Ṣawari Itan Ọlọrọ Afrika",
    heroSubtitle:
      "Irin-ajo nipasẹ ẹgbẹẹgbẹrun ọdun ti awọn eto-ọrọ Afrika, lati awọn ijọba atijọ si awọn orilẹ-ede igbalode",

    // Time periods
    ancient: "Atijọ",
    medieval: "Aarin",
    modern: "Igbalode",
    contemporary: "Lọwọlọwọ",

    // Categories
    empires: "Awọn Ijọba ati Ọba",
    culture: "Iṣẹ-ọna ati Aṣa",
    science: "Imọ-jinlẹ ati Ẹkọ",
    trade: "Iṣowo ati Ọrọ-aje",
    resistance: "Atako ati Adari",

    // Interface
    search: "Wa",
    filter: "Ṣẹ",
    sort: "Ṣeto",
    language: "Ede",
    selectLanguage: "Yan Ede",
  },
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (
      savedLanguage &&
      supportedLanguages.find((lang) => lang.code === savedLanguage)
    ) {
      setCurrentLanguage(savedLanguage);
      // Apply document direction and language immediately
      document.documentElement.dir = ["ar"].includes(savedLanguage)
        ? "rtl"
        : "ltr";
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const setLanguage = (lang: string) => {
    console.log("Setting language to:", lang); // Debug log
    setCurrentLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
    // Update document direction for RTL languages
    document.documentElement.dir = ["ar"].includes(lang) ? "rtl" : "ltr";
    document.documentElement.lang = lang;

    // Force component re-render by updating the force update state
    setForceUpdate((prev) => prev + 1);

    // Dispatch a custom event to notify all components
    window.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { language: lang } })
    );
  };

  const t = (key: string): string => {
    const translation =
      translations[currentLanguage as keyof typeof translations];
    const fallback = translations.en[key as keyof typeof translations.en];
    const result =
      translation?.[key as keyof typeof translation] || fallback || key;
    return result;
  };

  const isRTL = ["ar"].includes(currentLanguage);

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, setLanguage, t, isRTL }}
    >
      <div key={forceUpdate}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
