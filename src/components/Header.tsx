import { useState } from "react";
import { Search, Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigation } from "./Navigation";
import { AfricanMap } from "./icons/african-map";

export default function Header() {
  const { state, navigateTo } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo("search", { query: searchQuery.trim() });
      setSearchQuery("");
    }
  };

  const navigationItems = [
    { label: "Timeline", view: "timeline" as const },
    { label: "Regions", view: "regions" as const },
    { label: "Stories", view: "stories" as const },
    { label: "People", view: "people" as const },
    { label: "Resources", view: "educational-resources" as const },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigateTo("home")}
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
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.view}
                onClick={() => navigateTo(item.view)}
                className={`text-gray-700 hover:text-amber-600 transition-colors ${
                  state.currentView === item.view ? "text-amber-600" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-2"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </form>

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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search history..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </form>

              {/* Mobile Navigation Items */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => {
                      navigateTo(item.view);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                      state.currentView === item.view
                        ? "bg-amber-50 text-amber-600"
                        : ""
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
