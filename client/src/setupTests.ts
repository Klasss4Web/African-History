import "@testing-library/jest-dom";

// ---- Mock IntersectionObserver ----
// Use traditional class/method syntax to avoid class-field/parameter-property
// features that may be rejected by certain TS compilation modes.
function createIntersectionObserverMock() {
  function IntersectionObserverMock(this: any, callback: any) {
    // store callback on the instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any)._callback = callback;
  }

  IntersectionObserverMock.prototype.observe = function () {
    try {
      (this as any)._callback([{ isIntersecting: true }]);
    } catch (e) {
      // ignore during tests
    }
  };

  IntersectionObserverMock.prototype.unobserve = function () {};
  IntersectionObserverMock.prototype.disconnect = function () {};

  return IntersectionObserverMock as any;
}

Object.defineProperty(window as any, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: createIntersectionObserverMock(),
});

// ---- Mock matchMedia (used by Embla) ----
Object.defineProperty(window as any, "matchMedia", {
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
Object.defineProperty(navigator as any, "serviceWorker", {
  writable: true,
  value: {
    ready: Promise.resolve({
      periodicSync: { register: async () => {} },
    }),
    register: async () => {},
  },
});

// Mock the ResizeObserver API
function ResizeObserverMock() {}
ResizeObserverMock.prototype.observe = function () {};
ResizeObserverMock.prototype.unobserve = function () {};
ResizeObserverMock.prototype.disconnect = function () {};

// Assign the mock to the global window object (cast to any to satisfy TS)
(window as any).ResizeObserver = ResizeObserverMock;
