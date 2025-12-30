import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import FAQPage from "./FAQPage";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("FAQPage", () => {
  it("renders the page title", () => {
    renderWithRouter(<FAQPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /perguntas frequentes/i })
    ).toBeInTheDocument();
  });

  it("renders all FAQ categories", () => {
    renderWithRouter(<FAQPage />);

    expect(screen.getByText(/questões técnicas/i)).toBeInTheDocument();
    expect(screen.getByText(/investimento e poupança/i)).toBeInTheDocument();
    expect(screen.getByText(/processo e manutenção/i)).toBeInTheDocument();
  });

  it("renders the myths and facts section", () => {
    renderWithRouter(<FAQPage />);

    expect(
      screen.getByRole("heading", { name: /mitos e verdades/i })
    ).toBeInTheDocument();
    // Check for myth/fact indicators
    expect(screen.getAllByText(/mito/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/verdade/i).length).toBeGreaterThan(0);
  });

  it("expands FAQ item when clicked", async () => {
    renderWithRouter(<FAQPage />);

    const firstQuestion = screen.getByRole("button", {
      name: /o que é exatamente o sistema etics/i,
    });
    fireEvent.click(firstQuestion);

    expect(
      screen.getByText(/external thermal insulation composite system/i)
    ).toBeInTheDocument();
  });

  it("renders the CTA section with contact link", () => {
    renderWithRouter(<FAQPage />);

    expect(
      screen.getByRole("heading", { name: /ainda tem dúvidas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /falar com um técnico/i })
    ).toHaveAttribute("href", "/contactos");
  });

  it("renders location/SEO text", () => {
    renderWithRouter(<FAQPage />);

    expect(screen.getByText(/águeda/i)).toBeInTheDocument();
    expect(screen.getByText(/portugal continental/i)).toBeInTheDocument();
  });
});
