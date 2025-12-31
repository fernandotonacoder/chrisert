import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactPage from "./ContactPage";

const renderWithProviders = (component) => {
  return render(component);
};

describe("ContactPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  describe("Form validation", () => {
    it("shows error when name is too short", async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactPage />);

      const nameInput = screen.getByLabelText(/nome/i);
      await user.type(nameInput, "A");

      // Submit the form to trigger validation
      const submitButton = screen.getByRole("button", {
        name: /enviar mensagem/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/o nome deve ter pelo menos 2 caracteres/i)
        ).toBeInTheDocument();
      });
    });

    it("shows error when subject is too short", async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactPage />);

      const subjectInput = screen.getByLabelText(/assunto/i);
      await user.type(subjectInput, "Test");

      // Submit the form to trigger validation
      const submitButton = screen.getByRole("button", {
        name: /enviar mensagem/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/o assunto deve ter pelo menos 5 caracteres/i)
        ).toBeInTheDocument();
      });
    });

    it("shows error when message is too short", async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactPage />);

      const messageInput = screen.getByLabelText(/mensagem/i);
      await user.type(messageInput, "Short");

      // Submit the form to trigger validation
      const submitButton = screen.getByRole("button", {
        name: /enviar mensagem/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/a mensagem deve ter pelo menos 10 caracteres/i)
        ).toBeInTheDocument();
      });
    });

    it("accepts valid phone number", async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactPage />);

      const phoneInput = screen.getByLabelText(/telefone/i);
      await user.type(phoneInput, "912345678");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.queryByText(/telefone deve ter pelo menos 9 dígitos/i)
        ).not.toBeInTheDocument();
      });
    });

    it("allows empty phone (optional field)", async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactPage />);

      const phoneInput = screen.getByLabelText(/telefone/i);
      await user.click(phoneInput);
      await user.tab();

      await waitFor(() => {
        expect(
          screen.queryByText(/telefone deve ter pelo menos 9 dígitos/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Form submission", () => {
    it("shows error dialog when submission fails", async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

      renderWithProviders(<ContactPage />);

      await user.type(screen.getByLabelText(/nome/i), "João Silva");
      await user.type(screen.getByLabelText(/email/i), "joao@teste.pt");
      await user.type(screen.getByLabelText(/assunto/i), "Orçamento ETICS");
      await user.type(
        screen.getByLabelText(/mensagem/i),
        "Gostaria de pedir um orçamento para a minha moradia."
      );

      await user.click(
        screen.getByRole("button", { name: /enviar mensagem/i })
      );

      await waitFor(() => {
        expect(
          screen.getByText(/erro ao enviar mensagem/i)
        ).toBeInTheDocument();
      });
    });

    it("shows error dialog when server returns error", async () => {
      const user = userEvent.setup();
      global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

      renderWithProviders(<ContactPage />);

      await user.type(screen.getByLabelText(/nome/i), "João Silva");
      await user.type(screen.getByLabelText(/email/i), "joao@teste.pt");
      await user.type(screen.getByLabelText(/assunto/i), "Orçamento ETICS");
      await user.type(
        screen.getByLabelText(/mensagem/i),
        "Gostaria de pedir um orçamento para a minha moradia."
      );

      await user.click(
        screen.getByRole("button", { name: /enviar mensagem/i })
      );

      await waitFor(() => {
        expect(
          screen.getByText(/erro ao enviar mensagem/i)
        ).toBeInTheDocument();
      });
    });
  });
});
