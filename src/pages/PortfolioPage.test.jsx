import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PortfolioPage from "./PortfolioPage";

describe("PortfolioPage", () => {
  it("renders the page title", () => {
    render(<PortfolioPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /portfólio/i })
    ).toBeInTheDocument();
  });

  it("renders project cards", () => {
    render(<PortfolioPage />);

    expect(screen.getByText(/remodelação residencial/i)).toBeInTheDocument();
    expect(screen.getByText(/isolamento térmico/i)).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<PortfolioPage />);

    expect(
      screen.getByText(/conheça alguns dos nossos projetos/i)
    ).toBeInTheDocument();
  });
});
