import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactErrorDialog from "./ContactErrorDialog";

describe("ContactErrorDialog", () => {
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dialog when open is true", () => {
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByText(/erro ao enviar mensagem/i)).toBeInTheDocument();
  });

  it("does not render dialog when open is false", () => {
    render(<ContactErrorDialog open={false} onOpenChange={mockOnOpenChange} />);

    expect(
      screen.queryByText(/erro ao enviar mensagem/i)
    ).not.toBeInTheDocument();
  });

  it("renders email contact option", () => {
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByText(/enviar email/i)).toBeInTheDocument();
    expect(screen.getByText(/info@chrisert.pt/i)).toBeInTheDocument();
  });

  it("renders phone contact option", () => {
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    expect(screen.getByText(/ligar agora/i)).toBeInTheDocument();
    expect(screen.getByText(/932 741 391/i)).toBeInTheDocument();
  });

  it("has correct mailto link", () => {
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    const emailLink = screen.getByRole("link", { name: /enviar email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:info@chrisert.pt");
  });

  it("has correct tel link", () => {
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    const phoneLink = screen.getByRole("link", { name: /ligar agora/i });
    expect(phoneLink).toHaveAttribute("href", "tel:+351932741391");
  });

  it("calls onOpenChange when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    await user.click(screen.getByRole("button", { name: /fechar/i }));

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders copy buttons for email and phone", () => {
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    const copyButtons = screen.getAllByTitle(/copiar/i);
    expect(copyButtons).toHaveLength(2);
  });

  it("shows check icon after clicking copy button", async () => {
    const user = userEvent.setup();
    render(<ContactErrorDialog open={true} onOpenChange={mockOnOpenChange} />);

    const copyButtons = screen.getAllByTitle(/copiar/i);
    await user.click(copyButtons[0]);

    await waitFor(() => {
      expect(copyButtons[0].querySelector("svg")).toBeInTheDocument();
    });
  });
});
