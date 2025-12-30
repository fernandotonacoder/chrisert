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
    expect(badges.length).toBe(5);
  });

  it("renders call-to-action buttons in hero section", () => {
    renderWithRouter(<HomePage />);

    // Verifica que existem links de contacto (hero + CTA final)
    const contactLinks = screen.getAllByRole("link", {
      name: /entrar em contacto/i,
    });
    expect(contactLinks.length).toBeGreaterThanOrEqual(2);

    // Verifica o link "Ver Serviços" no hero
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

  it("renders the 'Quem Somos' section with values", () => {
    renderWithRouter(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /quem somos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /^qualidade$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /inovação/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /confiança/i })
    ).toBeInTheDocument();
  });

  it("renders the final CTA section", () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText(/pronto para transformar/i)).toBeInTheDocument();
  });
});
