import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import PortfolioPage from "./PortfolioPage";

describe("PortfolioPage", () => {
  it("renders the page title and description", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /portfólio/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/conheça alguns dos nossos projetos/i)
    ).toBeInTheDocument();
  });

  it("renders carousel with images", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders social media links", () => {
    render(
      <MemoryRouter>
        <PortfolioPage />
      </MemoryRouter>
    );

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
