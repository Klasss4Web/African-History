import {
  BookOpen,
  Users,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Flag,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { LanguageStats } from "./LanguageSwitcher";
import { LogoFooter } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <LogoFooter />
            <p className="text-gray-400 text-sm">
              Discover the rich history and diverse cultures of Africa through
              interactive storytelling, educational resources, and immersive
              experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-amber-600/20"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-amber-600/20"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-amber-600/20"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-amber-600/20"
              >
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-amber-400">Explore</h4>
            <div className="space-y-2">
              <Link
                to="/timeline"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Interactive Timeline
              </Link>
              <Link
                to="/regions"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                African Regions
              </Link>
              <Link
                to="/countries"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center"
              >
                <Flag className="w-3 h-3 mr-2" />
                All Countries
              </Link>
              <Link
                to="/stories"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Historical Stories
              </Link>
              <Link
                to="/people"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Historical Figures
              </Link>
              <Link
                to="/interactive-map"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Interactive Map
              </Link>
              <Link
                to="/contributors"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Contributors
              </Link>
            </div>
          </div>

          {/* Educational Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-amber-400">
              Educational Resources
            </h4>
            <div className="space-y-2">
              <Link
                to="/resources"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Resource Center
              </Link>
              <Link
                to="/resources/teacher-guides"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Teacher Guides
              </Link>
              <Link
                to="/resources/student-activities"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Student Activities
              </Link>
              <Link
                to="/resources/virtual-tours"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Virtual Tours
              </Link>
              <Link
                to="/resources/research-papers"
                className="block text-gray-400 hover:text-amber-400 text-sm transition-colors"
              >
                Research Papers
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-amber-400">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@africanhistory.org</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Users className="w-4 h-4" />
                <span>Educational Partners</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                <BookOpen className="w-4 h-4 mr-2" />
                Newsletter
              </Button>
              <p className="text-gray-400 text-xs">
                Get weekly stories and educational content
              </p>
            </div>
          </div>
        </div>

        {/* Language Support Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="mb-8">
            <LanguageStats />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 AfricanHistory. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Accessibility
              </a>
            </div>
          </div>

          {/* Heritage Accent */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2 opacity-40">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
