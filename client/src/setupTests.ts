import "@testing-library/jest-dom";

// ---- Mock IntersectionObserver ----
class IntersectionObserverMock {
  constructor(private callback: any) {}
  observe = () => this.callback([{ isIntersecting: true }]);
  unobserve = () => {};
  disconnect = () => {};
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// ---- Mock matchMedia (used by Embla) ----
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// ---- Mock serviceWorker (used in registerPeriodicSync) ----
Object.defineProperty(navigator, "serviceWorker", {
  writable: true,
  value: {
    ready: Promise.resolve({
      periodicSync: { register: async () => {} },
    }),
    register: async () => {},
  },
});

// Mock the ResizeObserver API
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Assign the mock to the global window object
window.ResizeObserver = ResizeObserver;
