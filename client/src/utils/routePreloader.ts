// Route preloading utility
class RoutePreloader {
  private preloadedRoutes = new Set<string>();
  private preloadQueue = new Set<string>();

  preloadRoute(path: string) {
    if (this.preloadedRoutes.has(path) || this.preloadQueue.has(path)) {
      return;
    }

    this.preloadQueue.add(path);

    // Simulate preloading by creating a link element
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    link.onload = () => {
      this.preloadedRoutes.add(path);
      this.preloadQueue.delete(path);
    };
    link.onerror = () => {
      this.preloadQueue.delete(path);
    };

    document.head.appendChild(link);

    // Clean up after a short delay
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }, 100);
  }

  preloadRoutes(paths: string[]) {
    paths.forEach((path) => this.preloadRoute(path));
  }

  isPreloaded(path: string): boolean {
    return this.preloadedRoutes.has(path);
  }
}

export const routePreloader = new RoutePreloader();

// Common routes to preload
export const commonRoutes = [
  "/timeline",
  "/regions",
  "/stories",
  "/resources",
  "/interactive-map",
  "/people",
];
