import { NavigationProvider, useNavigation } from "./components/Navigation";
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

function NotFoundView({
  title,
  message,
  backAction,
}: {
  title: string;
  message: string;
  backAction: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <button
          onClick={backAction}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

function ComingSoonView({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚧</span>
            </div>
            <h2 className="text-2xl text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're building this feature to enhance your African history
              learning experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
              {features.map((feature, index) => (
                <div key={index}>{feature}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { state, navigateTo } = useNavigation();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case "home":
        return (
          <main>
            <Hero />
            <FeaturedPeriods />
            <RegionalExploration />
            <FeaturedStories />
          </main>
        );

      case "timeline":
        return <InteractiveTimeline />;

      case "period-detail":
        return state.selectedId ? (
          <PeriodDetail periodId={Number(state.selectedId)} />
        ) : (
          <NotFoundView
            title="Period Not Found"
            message="The requested period could not be found."
            backAction={() => navigateTo("timeline")}
          />
        );

      case "region-detail":
        return state.selectedId ? (
          <RegionDetail regionId={Number(state.selectedId)} />
        ) : (
          <NotFoundView
            title="Region Not Found"
            message="The requested region could not be found."
            backAction={() => navigateTo("regions")}
          />
        );

      case "country-detail":
        return state.selectedId ? (
          <CountryDetail countryCode={String(state.selectedId)} />
        ) : (
          <NotFoundView
            title="Country Not Found"
            message="The requested country could not be found."
            backAction={() => navigateTo("regions")}
          />
        );

      case "story-detail":
        return state.selectedId ? (
          <StoryDetail storyId={Number(state.selectedId)} />
        ) : (
          <NotFoundView
            title="Story Not Found"
            message="The requested story could not be found."
            backAction={() => navigateTo("stories")}
          />
        );

      case "search":
        return state.searchQuery ? (
          <SearchResults query={state.searchQuery} />
        ) : (
          <NotFoundView
            title="No Search Query"
            message="Please enter a search term."
            backAction={() => navigateTo("home")}
          />
        );

      case "regions":
        return (
          <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl text-gray-900 mb-4">
                  African Regions
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore the diverse regions of Africa and their unique
                  histories, from the ancient civilizations of the north to the
                  kingdoms of the south.
                </p>
              </div>
              <RegionalExploration />
            </div>
          </div>
        );

      case "stories":
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

      case "educational-resources":
        return <EducationalResources />;

      case "teacher-guides":
        return (
          <ComingSoonView
            title="Teacher Guides"
            description="Comprehensive curriculum guides for educators teaching African history."
            features={[
              "Lesson Plans",
              "Assessment Tools",
              "Multimedia Resources",
              "Grade-Specific Content",
            ]}
          />
        );

      case "student-activities":
        return <StudentActivities />;

      case "virtual-tours":
        return <VirtualTours />;

      case "research-papers":
        return (
          <ComingSoonView
            title="Research Papers"
            description="Access to the latest academic research in African history and archaeology."
            features={[
              "Peer-Reviewed Papers",
              "Open Access Content",
              "Citation Tools",
              "Research Database",
            ]}
          />
        );

      case "interactive-map":
        return <InteractiveMap />;

      case "people":
        return (
          <ComingSoonView
            title="Historical Figures"
            description="Learn about the remarkable people who shaped African history."
            features={[
              "Ancient Rulers",
              "Military Leaders",
              "Scholars & Artists",
              "Modern Pioneers",
            ]}
          />
        );

      default:
        return (
          <main>
            <Hero />
            <FeaturedPeriods />
            <RegionalExploration />
            <FeaturedStories />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {renderCurrentView()}
      {state.currentView === "home" && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
