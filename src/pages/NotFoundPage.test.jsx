import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NotFoundPage", () => {
  it("renders 404 heading", () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders page not found message", () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });

  it("renders link to home page", () => {
    renderWithRouter(<NotFoundPage />);
    expect(
      screen.getByRole("link", { name: /ir para a página inicial/i })
    ).toBeInTheDocument();
  });

  it("shows countdown message", () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByText(/a redirecionar em/i)).toBeInTheDocument();
  });
});
