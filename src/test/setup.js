import "@testing-library/jest-dom";

// Mock matchMedia for embla-carousel
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock IntersectionObserver for embla-carousel
class IntersectionObserver {
  // Mock implementation - intentionally empty for testing
  observe() {
    return undefined;
  }
  unobserve() {
    return undefined;
  }
  disconnect() {
    return undefined;
  }
}
window.IntersectionObserver = IntersectionObserver;

// Mock ResizeObserver for embla-carousel
class ResizeObserver {
  // Mock implementation - intentionally empty for testing
  observe() {
    return undefined;
  }
  unobserve() {
    return undefined;
  }
  disconnect() {
    return undefined;
  }
}
window.ResizeObserver = ResizeObserver;
