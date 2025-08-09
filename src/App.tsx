import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedPeriods from "./components/FeaturedPeriods";
import RegionalExploration from "./components/RegionalExploration";
import FeaturedStories from "./components/FeaturedStories";
import Footer from "./components/Footer";
import InteractiveTimeline from "./components/InteractiveTimeline";
import PeriodDetail from "./components/PeriodDetail";
import RegionDetail from "./components/RegionDetail";
import SearchResults from "./components/SearchResults";
import StoryDetail from "./components/StoryDetail";
import EducationalResources from "./components/EducationalResources";
import InteractiveMap from "./components/InteractiveMap";
import CountryDetail from "./components/CountryDetail";
import StudentActivities from "./components/StudentActivities";
import VirtualTours from "./components/VirtualTours";
import TeacherGuides from "./components/TeacherGuides";
import ResearchPapers from "./components/ResearchPapers";
import Contributors from "./components/Contributors";
import Leaderboards from "./components/Leaderboards";
import HistoricalFigures from "./components/HistoricalFigures";
import SiteDetail from "./components/SiteDetail";
import ArtifactMatcher from "./components/ArtifactMatcher";
import { ComingSoon } from "./components/ComingSoonView";
import ContributorProfile from "./components/ContributorProfile";
import TourGuide from "./components/TourGuide";
import { LanguageProvider } from "./utils/LanguageContext";
import { navigationAnalytics } from "./utils/navigationAnalytics";
import { routePreloader } from "./utils/routePreloader";
import { offlineSupport } from "./utils/offlineSupport";

function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedPeriods />
      <RegionalExploration />
      <FeaturedStories />
    </main>
  );
}

function RegionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            African Regions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the diverse regions of Africa and their unique histories,
            from the ancient civilizations of the north to the kingdoms of the
            south.
          </p>
        </div>
        <RegionalExploration />
      </div>
    </div>
  );
}

function StoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            African Stories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover fascinating stories from across African history and
            culture.
          </p>
        </div>
        <FeaturedStories />
      </div>
    </div>
  );
}

// Navigation tracking component
function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track navigation when location changes
    navigationAnalytics.trackNavigation(location.pathname, document.referrer);

    // Preload related routes based on current path
    const preloadRoutes = [];

    if (location.pathname === "/") {
      preloadRoutes.push("/timeline", "/regions", "/stories");
    } else if (location.pathname.startsWith("/timeline")) {
      preloadRoutes.push("/regions", "/interactive-map");
    } else if (location.pathname.startsWith("/regions")) {
      preloadRoutes.push("/timeline", "/stories");
    } else if (location.pathname.startsWith("/resources")) {
      preloadRoutes.push(
        "/resources/virtual-tours",
        "/resources/student-activities"
      );
    }

    if (preloadRoutes.length > 0) {
      routePreloader.preloadRoutes(preloadRoutes);
    }
  }, [location]);

  // Initialize offline support on app start
  useEffect(() => {
    offlineSupport.preloadEssentialContent();
  }, []);

  return null;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NavigationTracker />
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />
          <Route
            path="/timeline"
            element={
              <AppLayout>
                <InteractiveTimeline />
              </AppLayout>
            }
          />
          <Route
            path="/timeline/period/:id"
            element={
              <AppLayout>
                <PeriodDetail />
              </AppLayout>
            }
          />
          <Route
            path="/regions"
            element={
              <AppLayout>
                <RegionsPage />
              </AppLayout>
            }
          />
          <Route
            path="/regions/:id"
            element={
              <AppLayout>
                <RegionDetail />
              </AppLayout>
            }
          />
          <Route
            path="/regions/:regionId/countries/:countryCode"
            element={
              <AppLayout>
                <CountryDetail countryCode="NG" />
              </AppLayout>
            }
          />
          <Route
            path="/regions/:regionId/countries/:countryCode/tour-guide"
            element={
              <AppLayout>
                <TourGuide />
              </AppLayout>
            }
          />
          <Route
            path="/stories"
            element={
              <AppLayout>
                <StoriesPage />
              </AppLayout>
            }
          />
          <Route
            path="/stories/:id"
            element={
              <AppLayout>
                <StoryDetail />
              </AppLayout>
            }
          />
          <Route
            path="/search"
            element={
              <AppLayout>
                <SearchResults />
              </AppLayout>
            }
          />
          <Route
            path="/resources"
            element={
              <AppLayout>
                <EducationalResources />
              </AppLayout>
            }
          />
          <Route
            path="/resources/teacher-guides"
            element={
              <AppLayout>
                <TeacherGuides />
              </AppLayout>
            }
          />
          <Route
            path="/resources/student-activities"
            element={
              <AppLayout>
                <StudentActivities />
              </AppLayout>
            }
          />
          <Route
            path="/resources/virtual-tours"
            element={
              <AppLayout>
                <VirtualTours />
              </AppLayout>
            }
          />
          <Route
            path="/resources/research-papers"
            element={
              <AppLayout>
                <ResearchPapers />
              </AppLayout>
            }
          />
          <Route
            path="/interactive-map"
            element={
              <AppLayout>
                <InteractiveMap />
              </AppLayout>
            }
          />
          <Route
            path="/people"
            element={
              <AppLayout>
                <HistoricalFigures />
              </AppLayout>
            }
          />
          <Route
            path="/contributors"
            element={
              <AppLayout>
                <Contributors />
              </AppLayout>
            }
          />
          <Route
            path="/contributors/:id"
            element={
              <AppLayout>
                <ContributorProfile />
              </AppLayout>
            }
          />
          <Route
            path="/leaderboards"
            element={
              <AppLayout>
                <Leaderboards />
              </AppLayout>
            }
          />
          <Route
            path="/sites/:id"
            element={
              <AppLayout>
                <SiteDetail />
              </AppLayout>
            }
          />
          <Route
            path="/games/artifact-matcher"
            element={
              <AppLayout>
                <ArtifactMatcher />
              </AppLayout>
            }
          />
          <Route
            path="/coming-soon"
            element={
              <AppLayout>
                <ComingSoon />
              </AppLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
