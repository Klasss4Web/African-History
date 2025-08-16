import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, BookOpen, Users, Map, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface NavigationProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

const navigationItems = [
  {
    label: "Timeline",
    href: "/timeline",
    icon: Calendar,
    description: "Interactive historical timeline",
  },
  {
    label: "Regions",
    href: "/regions",
    icon: Map,
    description: "Explore African regions",
    submenu: [
      { label: "North Africa", href: "/regions/1" },
      { label: "West Africa", href: "/regions/2" },
      { label: "East Africa", href: "/regions/3" },
      { label: "Central Africa", href: "/regions/4" },
      { label: "Southern Africa", href: "/regions/5" },
    ],
  },
  {
    label: "Stories",
    href: "/stories",
    icon: BookOpen,
    description: "Historical narratives",
  },
  {
    label: "People",
    href: "/people",
    icon: Users,
    description: "Historical figures",
  },
  {
    label: "Resources",
    href: "/resources",
    icon: BookOpen,
    description: "Educational materials",
    submenu: [
      { label: "Teacher Guides", href: "/resources/teacher-guides" },
      { label: "Student Activities", href: "/resources/student-activities" },
      { label: "Virtual Tours", href: "/resources/virtual-tours" },
      { label: "Research Papers", href: "/resources/research-papers" },
    ],
  },
];

// Custom Dropdown Component
interface CustomDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function CustomDropdown({
  trigger,
  children,
  isOpen,
  onToggle,
}: CustomDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={onToggle}>{trigger}</div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Navigation({
  mobile = false,
  onItemClick,
}: NavigationProps) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some((item) => isActive(item.href));
  };

  const handleItemClick = () => {
    setOpenDropdown(null);
    onItemClick?.();
  };

  const handleDropdownToggle = (itemLabel: string) => {
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
  };

  if (mobile) {
    return (
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <div key={item.label} className="space-y-1">
            <Link
              to={item.href}
              onClick={handleItemClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "bg-amber-100 text-amber-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-gray-500 truncate">
                  {item.description}
                </div>
              </div>
              {isActive(item.href) && (
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              )}
            </Link>

            {item.submenu && (
              <div className="ml-8 space-y-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    onClick={handleItemClick}
                    className={`block px-3 py-1 text-sm rounded transition-colors ${
                      isActive(subItem.href)
                        ? "text-amber-700 bg-amber-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    );
  }

  // Desktop Navigation
  return (
    <nav className="flex items-center space-x-1">
      {navigationItems.map((item) => (
        <div key={item.label}>
          {item.submenu ? (
            <CustomDropdown
              isOpen={openDropdown === item.label}
              onToggle={() => handleDropdownToggle(item.label)}
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-10 px-3 transition-colors text-md ${
                    isActive(item.href) || isSubmenuActive(item.submenu)
                      ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                  <ChevronDown
                    className={`w-3 h-3 ml-1 opacity-50 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              }
            >
              {/* Dropdown Header */}
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="flex items-center">
                  <item.icon className="w-4 h-4 mr-2 text-gray-500" />
                  <div>
                    <div className="font-medium text-sm text-gray-900">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* View All Link */}
              <Link
                to={item.href}
                onClick={handleItemClick}
                className={`flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  isActive(item.href)
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-700"
                }`}
              >
                <span>View All {item.label}</span>
                {isActive(item.href) && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Current
                  </Badge>
                )}
              </Link>

              {/* Separator */}
              <div className="border-t border-gray-100 my-1"></div>

              {/* Submenu Items */}
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.href}
                  to={subItem.href}
                  onClick={handleItemClick}
                  className={`flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    isActive(subItem.href)
                      ? "bg-amber-50 text-amber-700"
                      : "text-gray-700"
                  }`}
                >
                  <span>{subItem.label}</span>
                  {isActive(subItem.href) && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Active
                    </Badge>
                  )}
                </Link>
              ))}
            </CustomDropdown>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={`h-10 px-3 transition-colors text-md ${
                isActive(item.href)
                  ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Link to={item.href} onClick={handleItemClick}>
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            </Button>
          )}
        </div>
      ))}
    </nav>
  );
}
