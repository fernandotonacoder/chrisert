import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ScrollRestoration } from "./ScrollRestoration";

// Helper to render with router at a specific path
const renderWithRouter = (initialPath = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ScrollRestoration />
    </MemoryRouter>
  );
};

describe("ScrollRestoration", () => {
  let scrollToMock;

  beforeEach(() => {
    scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders nothing (returns null)", () => {
    const { container } = renderWithRouter("/");
    expect(container).toBeEmptyDOMElement();
  });

  it("scrolls to top on initial render", () => {
    renderWithRouter("/contactos");
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it("scrolls to top when pathname changes", () => {
    // Verify scroll is called for different paths
    // Each render at a new path triggers scrollTo
    renderWithRouter("/");
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);

    // Reset and render at different path
    scrollToMock.mockClear();
    renderWithRouter("/contactos");
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it("does not scroll again if pathname remains the same", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/servicos"]}>
        <ScrollRestoration />
      </MemoryRouter>
    );

    expect(scrollToMock).toHaveBeenCalledTimes(1);

    // Re-render with same path
    rerender(
      <MemoryRouter initialEntries={["/servicos"]}>
        <ScrollRestoration />
      </MemoryRouter>
    );

    // Should still be 1 because pathname didn't change
    expect(scrollToMock).toHaveBeenCalledTimes(1);
  });
});
