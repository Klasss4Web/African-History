interface CachedResource {
  id: string;
  title: string;
  content: string;
  type: "article" | "guide" | "activity" | "tour";
  cachedAt: number;
  size: number;
}

class OfflineSupport {
  private readonly CACHE_KEY = "african_history_offline_cache";
  private readonly MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
  private cache = new Map<string, CachedResource>();

  constructor() {
    this.loadCacheFromStorage();
    this.setupServiceWorker();
  }

  private loadCacheFromStorage() {
    try {
      const stored = localStorage.getItem(this.CACHE_KEY);
      if (stored) {
        const cacheData = JSON.parse(stored);
        Object.entries(cacheData).forEach(([id, resource]) => {
          this.cache.set(id, resource as CachedResource);
        });
      }
    } catch (error) {
      console.warn("Failed to load offline cache:", error);
    }
  }

  private saveCacheToStorage() {
    try {
      const cacheObj = Object.fromEntries(this.cache);
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheObj));
    } catch (error) {
      console.warn("Failed to save offline cache:", error);
      // If storage is full, try to free up space
      this.clearOldestItems(5);
    }
  }

  private setupServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) =>
          console.warn("Service worker registration failed:", error)
        );
    }
  }

  private clearOldestItems(count: number) {
    const sortedItems = Array.from(this.cache.entries()).sort(
      ([, a], [, b]) => a.cachedAt - b.cachedAt
    );

    for (let i = 0; i < Math.min(count, sortedItems.length); i++) {
      this.cache.delete(sortedItems[i][0]);
    }

    this.saveCacheToStorage();
  }

  private getCurrentCacheSize(): number {
    return Array.from(this.cache.values()).reduce(
      (total, resource) => total + resource.size,
      0
    );
  }

  cacheResource(resource: Omit<CachedResource, "cachedAt" | "size">) {
    const size = new Blob([resource.content]).size;

    // Check if adding this resource would exceed cache limit
    if (this.getCurrentCacheSize() + size > this.MAX_CACHE_SIZE) {
      this.clearOldestItems(Math.ceil(this.cache.size * 0.2)); // Clear 20% of items
    }

    const cachedResource: CachedResource = {
      ...resource,
      cachedAt: Date.now(),
      size,
    };

    this.cache.set(resource.id, cachedResource);
    this.saveCacheToStorage();
  }

  getCachedResource(id: string): CachedResource | null {
    return this.cache.get(id) || null;
  }

  isCached(id: string): boolean {
    return this.cache.has(id);
  }

  getCachedResources(): CachedResource[] {
    return Array.from(this.cache.values()).sort(
      (a, b) => b.cachedAt - a.cachedAt
    );
  }

  removeCachedResource(id: string) {
    this.cache.delete(id);
    this.saveCacheToStorage();
  }

  clearAllCache() {
    this.cache.clear();
    localStorage.removeItem(this.CACHE_KEY);
  }

  getCacheStats() {
    const resources = Array.from(this.cache.values());
    return {
      totalItems: resources.length,
      totalSize: this.getCurrentCacheSize(),
      byType: resources.reduce((acc, resource) => {
        acc[resource.type] = (acc[resource.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      oldestItem: resources.reduce(
        (oldest, current) =>
          !oldest || current.cachedAt < oldest.cachedAt ? current : oldest,
        null as CachedResource | null
      ),
      newestItem: resources.reduce(
        (newest, current) =>
          !newest || current.cachedAt > newest.cachedAt ? current : newest,
        null as CachedResource | null
      ),
    };
  }

  isOnline(): boolean {
    return navigator.onLine;
  }

  // Preload frequently accessed resources
  async preloadEssentialContent() {
    const essentialContent = [
      {
        id: "intro-ancient-egypt",
        title: "Introduction to Ancient Egypt",
        content: "Essential content about Ancient Egyptian civilization...",
        type: "article" as const,
      },
      {
        id: "mali-empire-overview",
        title: "Mali Empire Overview",
        content: "Essential content about the Mali Empire...",
        type: "article" as const,
      },
      {
        id: "great-zimbabwe-guide",
        title: "Great Zimbabwe Guide",
        content: "Essential content about Great Zimbabwe...",
        type: "guide" as const,
      },
    ];

    essentialContent.forEach((content) => {
      if (!this.isCached(content.id)) {
        this.cacheResource(content);
      }
    });
  }
}

export const offlineSupport = new OfflineSupport();
