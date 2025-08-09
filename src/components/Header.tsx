import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Globe } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../utils/LanguageContext";
import { AfricanMap } from "./icons/african-map";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navigationItems = [
    { label: t("timeline"), path: "/timeline" },
    { label: t("regions"), path: "/regions" },
    { label: t("stories"), path: "/stories" },
    { label: t("people"), path: "/people" },
    { label: t("resources"), path: "/resources" },
    { label: t("contributors"), path: "/contributors" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              {/* <Globe className="w-6 h-6 text-white" /> */}
              <AfricanMap />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl text-gray-900">AfricanHistory</h1>
              <p className="text-xs text-gray-500">Explore Our Heritage</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-700 hover:text-amber-600 transition-colors text-lg ${
                  isActivePath(item.path) ? "text-amber-600" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar & Language Switcher */}
          <div className="hidden md:flex items-center space-x-3">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("search") + " history..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-3 pr-10 w-48 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                >
                  <Search className="w-4 h-4 text-gray-400 hover:text-amber-600" />
                </Button>
              </div>
            </form>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="md:hidden">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={t("search") + " history..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-3 pr-10 w-full bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </form>

              {/* Mobile Language Switcher */}
              <div className="md:hidden flex justify-center">
                <LanguageSwitcher />
              </div>

              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                      isActivePath(item.path)
                        ? "bg-amber-50 text-amber-600"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
