import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServicesPage from "./ServicesPage";

describe("ServicesPage", () => {
  it("renders the page title", () => {
    render(<ServicesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /serviços/i })
    ).toBeInTheDocument();
  });

  it("renders the ETICS service card", () => {
    render(<ServicesPage />);

    expect(screen.getByText(/sistema etics/i)).toBeInTheDocument();
    expect(
      screen.getByText(/isolamento térmico pelo exterior/i)
    ).toBeInTheDocument();
  });

  it("renders the remodeling service card", () => {
    render(<ServicesPage />);

    expect(screen.getByText(/remodelações/i)).toBeInTheDocument();
  });

  it("renders the consulting service card", () => {
    render(<ServicesPage />);

    expect(screen.getByText(/consultoria/i)).toBeInTheDocument();
  });
});
