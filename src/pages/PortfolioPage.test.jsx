import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PortfolioPage from "./PortfolioPage";

const renderWithProviders = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("PortfolioPage", () => {
  let originalRequestFullscreen;
  let originalExitFullscreen;

  beforeEach(() => {
    originalRequestFullscreen = Element.prototype.requestFullscreen;
    originalExitFullscreen = document.exitFullscreen;

    Element.prototype.requestFullscreen = vi.fn().mockResolvedValue();
    document.exitFullscreen = vi.fn().mockResolvedValue();
  });

  afterEach(() => {
    Element.prototype.requestFullscreen = originalRequestFullscreen;
    document.exitFullscreen = originalExitFullscreen;
  });

  it("renders the page title and description", () => {
    renderWithProviders(<PortfolioPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /portfólio/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/conheça alguns dos nossos projetos/i)
    ).toBeInTheDocument();
  });

  it("renders carousel with images", () => {
    renderWithProviders(<PortfolioPage />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders social media links", () => {
    renderWithProviders(<PortfolioPage />);

    expect(screen.getByText(/@chrisert.pt/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /@chrisert.pt/i })).toHaveAttribute(
      "href",
      "https://www.instagram.com/chrisert.pt/"
    );
    expect(screen.getByRole("link", { name: /chrisert$/i })).toHaveAttribute(
      "href",
      "https://www.facebook.com/chrisert.pt/"
    );
  });

  it("renders carousel navigation buttons", () => {
    renderWithProviders(<PortfolioPage />);

    expect(screen.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
  });

  it("renders dot indicators for navigation", () => {
    renderWithProviders(<PortfolioPage />);

    const dotButtons = screen.getAllByRole("button", { name: /ir para projeto/i });
    expect(dotButtons.length).toBeGreaterThan(0);
  });

  it("renders CTA section", () => {
    renderWithProviders(<PortfolioPage />);

    expect(screen.getByText(/gostou do que viu/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pedir orçamento/i })).toBeInTheDocument();
  });

  it("renders fullscreen viewer container", () => {
    renderWithProviders(<PortfolioPage />);

    expect(
      screen.getByLabelText("Visualizador de imagens em ecrã inteiro")
    ).toBeInTheDocument();
  });

  it("opens fullscreen when clicking on image", async () => {
    renderWithProviders(<PortfolioPage />);

    const imageButtons = screen.getAllByRole("button", { name: /ver projeto/i });
    
    await act(async () => {
      fireEvent.click(imageButtons[0]);
    });

    expect(Element.prototype.requestFullscreen).toHaveBeenCalled();
  });
});
