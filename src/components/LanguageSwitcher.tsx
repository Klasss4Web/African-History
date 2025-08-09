import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage, supportedLanguages } from "../utils/LanguageContext";

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  // Group languages by popularity for better UX
  const popularLanguages = ["en", "ar", "fr", "sw", "ha", "yo"];
  const otherLanguages = supportedLanguages.filter(
    (lang) => !popularLanguages.includes(lang.code)
  );

  const handleLanguageChange = (langCode: string) => {
    console.log("Language change requested:", langCode); // Debug log
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang?.flag}</span>
          <span className="hidden md:inline">{currentLang?.nativeName}</span>
          <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 max-h-96 overflow-y-auto"
      >
        <DropdownMenuLabel className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          {t("selectLanguage")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Popular/Main Languages */}
        <div className="p-2">
          <div className="text-xs text-gray-500 mb-2 px-2">
            Popular Languages
          </div>
          <div className="grid gap-1">
            {supportedLanguages
              .filter((lang) => popularLanguages.includes(lang.code))
              .map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div>
                      <div className="font-medium">{lang.nativeName}</div>
                      <div className="text-xs text-gray-500">{lang.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {lang.family}
                    </Badge>
                    {currentLanguage === lang.code && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Other African Languages */}
        <div className="p-2">
          <div className="text-xs text-gray-500 mb-2 px-2">
            Other African Languages
          </div>
          <div className="grid gap-1">
            {otherLanguages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className="text-xs text-gray-500">{lang.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {lang.family}
                  </Badge>
                  {currentLanguage === lang.code && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Language Info */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="text-sm text-gray-700 mb-2">
            🌍 <strong>16 African Languages</strong> supported
          </div>
          <div className="text-xs text-gray-600">
            We're continuously adding more African languages to make historical
            knowledge accessible to all.
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
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
