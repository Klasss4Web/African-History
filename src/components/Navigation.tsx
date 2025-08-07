import React, { createContext, useContext, useState } from "react";

export type ViewType =
  | "home"
  | "timeline"
  | "regions"
  | "stories"
  | "people"
  | "period-detail"
  | "region-detail"
  | "story-detail"
  | "country-detail"
  | "search"
  | "educational-resources"
  | "teacher-guides"
  | "student-activities"
  | "virtual-tours"
  | "research-papers"
  | "interactive-map";

export interface NavigationState {
  currentView: ViewType;
  selectedId?: string | number;
  searchQuery?: string;
  previousView?: ViewType;
  filters?: {
    period?: string;
    region?: string;
    category?: string;
    country?: string;
  };
}

interface NavigationContextType {
  state: NavigationState;
  navigateTo: (
    view: ViewType,
    options?: { id?: string | number; query?: string; filters?: any }
  ) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<NavigationState>({ currentView: "home" });
  const [history, setHistory] = useState<NavigationState[]>([
    { currentView: "home" },
  ]);

  const navigateTo = (
    view: ViewType,
    options?: { id?: string | number; query?: string; filters?: any }
  ) => {
    const newState: NavigationState = {
      currentView: view,
      selectedId: options?.id,
      searchQuery: options?.query,
      filters: options?.filters,
      previousView: state.currentView,
    };

    setState(newState);
    setHistory((prev) => [...prev, newState]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousState = newHistory[newHistory.length - 1];
      setState(previousState);
      setHistory(newHistory);
    }
  };

  const canGoBack = history.length > 1;

  return (
    <NavigationContext.Provider
      value={{ state, navigateTo, goBack, canGoBack }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
