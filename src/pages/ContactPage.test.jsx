import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactPage from "./ContactPage";

describe("ContactPage", () => {
  it("renders the page title", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /entre em contacto/i })
    ).toBeInTheDocument();
  });

  it("renders the contact form with required fields", () => {
    render(<ContactPage />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("button", { name: /enviar mensagem/i })
    ).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<ContactPage />);

    expect(screen.getByText(/info@chrisert.pt/i)).toBeInTheDocument();
    expect(screen.getByText(/\+351 932 741 391/i)).toBeInTheDocument();
    expect(screen.getByText(/águeda/i)).toBeInTheDocument();
  });

  it("mentions Portugal continental coverage", () => {
    render(<ContactPage />);

    expect(screen.getByText(/portugal continental/i)).toBeInTheDocument();
  });
});
