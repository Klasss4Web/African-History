import { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useLanguage, supportedLanguages } from "../utils/LanguageContext";

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Ensure component is mounted before showing language info
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const currentLang = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  // Group languages by popularity for better UX
  const popularLanguages = ["en", "ar", "fr", "sw", "ha", "yo"];
  const popularLangs = supportedLanguages.filter((lang) =>
    popularLanguages.includes(lang.code)
  );
  const otherLanguages = supportedLanguages.filter(
    (lang) => !popularLanguages.includes(lang.code)
  );

  const handleLanguageChange = (langCode: string) => {
    console.log("Language change requested:", langCode); // Debug log
    setLanguage(langCode);
    setIsOpen(false);

    // Force component re-render
    setMounted(false);
    setTimeout(() => setMounted(true), 50);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2 min-w-[100px]">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">🇺🇸</span>
        <span className="hidden md:inline">English</span>
        <ChevronDown className="w-3 h-3" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        className="gap-2 min-w-[100px]"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang?.flag || "🇺🇸"}</span>
        <span className="hidden md:inline text-sm">
          {currentLang?.nativeName || "English"}
        </span>
        <span className="sm:hidden text-xs">
          {(currentLang?.code || "EN").toUpperCase()}
        </span>
        <ChevronDown
          className={`w-3 h-3 opacity-50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-900">
                <Globe className="w-4 h-4" />
                <span>{t("selectLanguage")}</span>
              </div>
            </div>

            {/* Popular Languages */}
            <div className="p-2">
              <div className="text-xs text-gray-500 mb-2 px-2 uppercase tracking-wide">
                Popular Languages
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {popularLangs.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="w-full flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <div className="text-left">
                        <div
                          className={`text-sm ${
                            currentLanguage === lang.code
                              ? "font-medium text-amber-600"
                              : "font-normal text-gray-900"
                          }`}
                        >
                          {lang.nativeName}
                        </div>
                        <div className="text-xs text-gray-500">{lang.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {lang.family}
                      </Badge>
                      {currentLanguage === lang.code && (
                        <Check className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className="border-t" />

            {/* Other African Languages */}
            <div className="p-2">
              <div className="text-xs text-gray-500 mb-2 px-2 uppercase tracking-wide">
                Other African Languages
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {otherLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="w-full flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <div className="text-left">
                        <div
                          className={`text-sm ${
                            currentLanguage === lang.code
                              ? "font-medium text-amber-600"
                              : "font-normal text-gray-900"
                          }`}
                        >
                          {lang.nativeName}
                        </div>
                        <div className="text-xs text-gray-500">{lang.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {lang.family}
                      </Badge>
                      {currentLanguage === lang.code && (
                        <Check className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-t">
              <div className="text-sm text-gray-700 mb-2">
                🌍 <strong>16 African Languages</strong> supported
              </div>
              <div className="text-xs text-gray-600">
                We're continuously adding more African languages to make
                historical knowledge accessible to all.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Language Statistics Component - moved from Hero
export function LanguageStats() {
  const families = [...new Set(supportedLanguages.map((lang) => lang.family))];
  const speakerCounts = {
    "Niger-Congo": "525M+",
    Semitic: "180M+",
    Cushitic: "65M+",
    Chadic: "85M+",
    Bantu: "350M+",
    Romance: "280M+",
    Germanic: "1.5B+",
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg text-gray-900 mb-2">
            🌍 African Linguistic Diversity
          </h3>
          <p className="text-sm text-gray-600">
            Our platform supports {supportedLanguages.length} languages across{" "}
            {families.length} language families
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {families.map((family) => (
            <div
              key={family}
              className="flex items-center justify-between p-2 bg-white/50 rounded"
            >
              <span className="text-gray-700">{family}</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {
                    supportedLanguages.filter((lang) => lang.family === family)
                      .length
                  }{" "}
                  langs
                </Badge>
                <span className="text-xs text-gray-500">
                  {speakerCounts[family as keyof typeof speakerCounts] || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Badge className="bg-green-600">
            Total: 2.8B+ African language speakers worldwide
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
