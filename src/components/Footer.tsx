import {
  BookOpen,
  Users,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Flag,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { LanguageStats } from "./LanguageSwitcher";
import { AfricanMap } from "./icons/african-map";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                {/* <Globe className="w-6 h-6 text-white" /> */}
                <AfricanMap />
              </div>
              <div>
                <h3 className="text-xl">AfricanHistory</h3>
                <p className="text-sm text-gray-400">Explore Our Heritage</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Discover the rich history and diverse cultures of Africa through
              interactive storytelling, educational resources, and immersive
              experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="text-lg">Explore</h4>
            <div className="space-y-2">
              <Link
                to="/timeline"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Interactive Timeline
              </Link>
              <Link
                to="/regions"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                African Regions
              </Link>
              <Link
                to="/countries"
                className="block text-gray-400 hover:text-white text-sm transition-colors flex items-center"
              >
                <Flag className="w-3 h-3 mr-2" />
                All Countries
              </Link>
              <Link
                to="/stories"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Historical Stories
              </Link>
              <Link
                to="/people"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Historical Figures
              </Link>
              <Link
                to="/interactive-map"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Interactive Map
              </Link>
              <Link
                to="/contributors"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Contributors
              </Link>
            </div>
          </div>

          {/* Educational Resources */}
          <div className="space-y-4">
            <h4 className="text-lg">Educational Resources</h4>
            <div className="space-y-2">
              <Link
                to="/resources"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Resource Center
              </Link>
              <Link
                to="/resources/teacher-guides"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Teacher Guides
              </Link>
              <Link
                to="/resources/student-activities"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Student Activities
              </Link>
              <Link
                to="/resources/virtual-tours"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Virtual Tours
              </Link>
              <Link
                to="/resources/research-papers"
                className="block text-gray-400 hover:text-white text-sm transition-colors"
              >
                Research Papers
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg">Connect</h4>
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
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
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

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 AfricanHistory. All rights reserved.
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
