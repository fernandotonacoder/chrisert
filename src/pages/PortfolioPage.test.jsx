import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import PortfolioPage from "./PortfolioPage";

const renderWithProviders = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("PortfolioPage", () => {
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
});
