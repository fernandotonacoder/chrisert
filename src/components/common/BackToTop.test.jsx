import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BackToTop } from "./BackToTop";

describe("BackToTop", () => {
  let scrollToMock;

  beforeEach(() => {
    scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the back to top button", () => {
    render(<BackToTop />);
    const button = screen.getByRole("button", { name: /voltar ao topo/i });
    expect(button).toBeInTheDocument();
  });

  it("is hidden when scroll position is below minHeight", () => {
    render(<BackToTop minHeight={300} />);
    const button = screen.getByRole("button", { name: /voltar ao topo/i });
    expect(button).toHaveClass("opacity-0");
    expect(button).toHaveClass("pointer-events-none");
  });

  it("becomes visible when scroll position exceeds minHeight", () => {
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 400,
      writable: true,
      configurable: true,
    });

    render(<BackToTop minHeight={300} />);
    fireEvent.scroll(document);

    const button = screen.getByRole("button", { name: /voltar ao topo/i });
    expect(button).toHaveClass("opacity-100");
  });

  it("scrolls to top when clicked", () => {
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 500,
      writable: true,
      configurable: true,
    });

    render(<BackToTop />);
    fireEvent.scroll(document);

    const button = screen.getByRole("button", { name: /voltar ao topo/i });
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("scrolls to custom position when scrollTo prop is set", () => {
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 500,
      writable: true,
      configurable: true,
    });

    render(<BackToTop scrollTo={100} />);
    fireEvent.scroll(document);

    const button = screen.getByRole("button", { name: /voltar ao topo/i });
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 100,
      behavior: "smooth",
    });
  });

  it("applies custom className", () => {
    render(<BackToTop className="custom-class" />);
    const button = screen.getByRole("button", { name: /voltar ao topo/i });
    expect(button).toHaveClass("custom-class");
  });

  it("cleans up scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<BackToTop />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
