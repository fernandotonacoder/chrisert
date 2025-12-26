import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import HomePage from "./HomePage";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("HomePage", () => {
  it("renders the hero section with main heading", () => {
    renderWithRouter(<HomePage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/isolamento térmico/i);
  });

  it("renders the service badges", () => {
    renderWithRouter(<HomePage />);

    const badges = screen
      .getAllByRole("generic", { hidden: true })
      .filter((el) => el.getAttribute("data-slot") === "badge");
    expect(badges.length).toBe(4);
  });

  it("renders call-to-action buttons", () => {
    renderWithRouter(<HomePage />);

    expect(
      screen.getByRole("link", { name: /entrar em contacto/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /ver serviços/i })
    ).toBeInTheDocument();
  });

  it("renders the features section", () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText(/porquê escolher a chrisert/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /eficiência energética/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /qualidade superior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /equipa experiente/i })
    ).toBeInTheDocument();
  });

  it("renders the final CTA section", () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText(/pronto para transformar/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contacte-nos hoje/i })
    ).toBeInTheDocument();
  });
});
