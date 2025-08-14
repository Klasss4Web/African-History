import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogoHeader, LogoMobile } from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b shadow-sm"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            {/* Desktop Logo with tagline */}
            <div className="hidden md:block">
              <LogoHeader />
            </div>

            {/* Tablet Logo - compact version without tagline to save space */}
            <div className="hidden sm:block md:hidden">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 rounded-xl shadow-lg">
                    <div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white">
                      <svg viewBox="0 0 100 120" className="w-full h-full">
                        <path
                          d="M50 10 C35 10, 25 20, 25 35 Q20 45, 25 55 L20 70 Q18 80, 25 85 L30 95 Q35 105, 45 105 L55 105 Q65 105, 70 95 L75 85 Q82 80, 80 70 L75 55 Q80 45, 75 35 C75 20, 65 10, 50 10 Z"
                          className="fill-current"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <Link
                    to="/"
                    className="text-xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight"
                  >
                    AfricanHistory
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Logo - icon only */}
            <div className="sm:hidden">
              <LogoMobile />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Navigation />
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search African history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 text-sm border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-colors"
                />
              </div>
            </form>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => navigate("/search")}
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* Language Switcher */}
            <div className="flex-shrink-0">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b bg-white">
                    <div className="flex items-center justify-between">
                      <LogoHeader />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Search */}
                  <div className="p-6 border-b bg-gray-50">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search African history..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full text-sm bg-white"
                      />
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto bg-white">
                    <div className="p-6">
                      <Navigation mobile onItemClick={() => setIsOpen(false)} />
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t bg-gray-50">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">
                        Explore African Heritage
                      </div>
                      <div className="flex justify-center space-x-4 text-xs text-gray-500">
                        <Link
                          to="/about"
                          className="hover:text-amber-600 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          About
                        </Link>
                        <Link
                          to="/contact"
                          className="hover:text-amber-600 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Contact
                        </Link>
                        <Link
                          to="/help"
                          className="hover:text-amber-600 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Help
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Progress indicator for scrolled state */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
      )}
    </header>
  );
}
