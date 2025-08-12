interface NavigationEvent {
  path: string;
  timestamp: number;
  referrer?: string;
  sessionId: string;
  timeSpent?: number;
}

interface SessionData {
  sessionId: string;
  startTime: number;
  events: NavigationEvent[];
  totalTimeSpent: number;
}

class NavigationAnalytics {
  private sessionId: string;
  private currentPath: string = "";
  private pageStartTime: number = 0;
  private sessionData: SessionData;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionData = {
      sessionId: this.sessionId,
      startTime: Date.now(),
      events: [],
      totalTimeSpent: 0,
    };
    this.loadExistingSession();
    this.setupBeforeUnloadListener();
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private loadExistingSession() {
    try {
      const existing = localStorage.getItem("navigation_session");
      if (existing) {
        const session = JSON.parse(existing);
        // If session is less than 30 minutes old, continue it
        if (Date.now() - session.startTime < 30 * 60 * 1000) {
          this.sessionData = session;
          this.sessionId = session.sessionId;
        }
      }
    } catch (error) {
      console.warn("Failed to load existing session:", error);
    }
  }

  private saveSession() {
    try {
      localStorage.setItem(
        "navigation_session",
        JSON.stringify(this.sessionData)
      );
    } catch (error) {
      console.warn("Failed to save session:", error);
    }
  }

  private setupBeforeUnloadListener() {
    window.addEventListener("beforeunload", () => {
      this.trackPageExit();
      this.saveSession();
    });

    // Also save periodically
    setInterval(() => {
      this.saveSession();
    }, 10000); // Every 10 seconds
  }

  trackNavigation(path: string, referrer?: string) {
    // Track time spent on previous page
    if (this.currentPath && this.pageStartTime) {
      const timeSpent = Date.now() - this.pageStartTime;
      this.updateLastEventTimeSpent(timeSpent);
      this.sessionData.totalTimeSpent += timeSpent;
    }

    // Create new navigation event
    const event: NavigationEvent = {
      path,
      timestamp: Date.now(),
      referrer: referrer || this.currentPath,
      sessionId: this.sessionId,
    };

    this.sessionData.events.push(event);
    this.currentPath = path;
    this.pageStartTime = Date.now();
    this.saveSession();
  }

  private trackPageExit() {
    if (this.currentPath && this.pageStartTime) {
      const timeSpent = Date.now() - this.pageStartTime;
      this.updateLastEventTimeSpent(timeSpent);
      this.sessionData.totalTimeSpent += timeSpent;
    }
  }

  private updateLastEventTimeSpent(timeSpent: number) {
    const lastEvent =
      this.sessionData.events[this.sessionData.events.length - 1];
    if (lastEvent) {
      lastEvent.timeSpent = timeSpent;
    }
  }

  getSessionData(): SessionData {
    return { ...this.sessionData };
  }

  getPopularPaths(): Array<{
    path: string;
    visits: number;
    averageTime: number;
  }> {
    const pathStats = new Map<string, { visits: number; totalTime: number }>();

    this.sessionData.events.forEach((event) => {
      if (!pathStats.has(event.path)) {
        pathStats.set(event.path, { visits: 0, totalTime: 0 });
      }
      const stats = pathStats.get(event.path)!;
      stats.visits++;
      if (event.timeSpent) {
        stats.totalTime += event.timeSpent;
      }
    });

    return Array.from(pathStats.entries())
      .map(([path, stats]) => ({
        path,
        visits: stats.visits,
        averageTime: stats.visits > 0 ? stats.totalTime / stats.visits : 0,
      }))
      .sort((a, b) => b.visits - a.visits);
  }

  getUserJourney(): NavigationEvent[] {
    return [...this.sessionData.events];
  }

  clearSession() {
    localStorage.removeItem("navigation_session");
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      events: [],
      totalTimeSpent: 0,
    };
    this.currentPath = "";
    this.pageStartTime = Date.now();
  }
}

export const navigationAnalytics = new NavigationAnalytics();
