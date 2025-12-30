import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, it, expect } from "vitest";
import ServicesPage from "./ServicesPage";

const renderWithRouter = (component) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};

describe("ServicesPage", () => {
  it("renders the page title", () => {
    renderWithRouter(<ServicesPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /os nossos serviços/i })
    ).toBeInTheDocument();
  });

  it("renders all service cards", () => {
    renderWithRouter(<ServicesPage />);

    // Verifica os títulos dos cards de serviços (h3)
    expect(
      screen.getByRole("heading", { name: /sistema etics/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /pintura exterior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /barramento/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /recuperação de fachadas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /impermeabilização/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /manutenção de exteriores/i })
    ).toBeInTheDocument();
  });

  it("renders the ETICS benefits section", () => {
    renderWithRouter(<ServicesPage />);

    expect(
      screen.getByRole("heading", { name: /porquê escolher etics/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /conforto térmico/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /poupança energética/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /sustentabilidade/i })
    ).toBeInTheDocument();
  });

  it("renders the process steps section", () => {
    renderWithRouter(<ServicesPage />);

    expect(
      screen.getByRole("heading", { name: /como trabalhamos/i })
    ).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("renders the CTA section with contact link", () => {
    renderWithRouter(<ServicesPage />);

    expect(
      screen.getByRole("heading", {
        name: /pronto para transformar o exterior/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /entrar em contacto/i })
    ).toHaveAttribute("href", "/contactos");
  });
});
