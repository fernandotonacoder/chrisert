import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, it, expect } from "vitest";
import ContactPage from "./ContactPage";

const renderWithProviders = (component) => {
  return render(<HelmetProvider>{component}</HelmetProvider>);
};

describe("ContactPage", () => {
  it("renders the page title", () => {
    renderWithProviders(<ContactPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /entre em contacto/i })
    ).toBeInTheDocument();
  });

  it("renders the contact form with required fields", () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    renderWithProviders(<ContactPage />);

    expect(
      screen.getByRole("button", { name: /enviar mensagem/i })
    ).toBeInTheDocument();
  });

  it("renders contact information", () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByText(/info@chrisert.pt/i)).toBeInTheDocument();
    expect(screen.getByText(/\+351 932 741 391/i)).toBeInTheDocument();
    expect(screen.getByText(/águeda/i)).toBeInTheDocument();
  });

  it("mentions Portugal continental coverage", () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByText(/portugal continental/i)).toBeInTheDocument();
  });
});
