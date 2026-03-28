import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CustomFooter from "./Footer";

describe("CustomFooter", () => {
  it("renders copyright with current year", () => {
    const currentYear = new Date().getFullYear();
    render(<CustomFooter />);

    expect(
      screen.getByText(new RegExp(`© ${currentYear} Chrisert`)),
    ).toBeInTheDocument();
  });

  it("renders social media follow text", () => {
    render(<CustomFooter />);

    expect(screen.getByText("Siga-nos nas redes sociais!")).toBeInTheDocument();
  });

  it("renders Facebook link with correct attributes", () => {
    render(<CustomFooter />);

    const facebookLinks = screen.getAllByLabelText(/Abrir Facebook/i);
    expect(facebookLinks[0]).toHaveAttribute(
      "href",
      "https://facebook.com/chrisert.pt",
    );
    expect(facebookLinks[0]).toHaveAttribute("target", "_blank");
    expect(facebookLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Instagram link with correct attributes", () => {
    render(<CustomFooter />);

    const instagramLinks = screen.getAllByLabelText(/Abrir Instagram/i);
    expect(instagramLinks[0]).toHaveAttribute(
      "href",
      "https://www.instagram.com/chrisert.pt",
    );
    expect(instagramLinks[0]).toHaveAttribute("target", "_blank");
    expect(instagramLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders developer link", () => {
    render(<CustomFooter />);

    const devLink = screen.getByRole("link", { name: /Fernando Tona/i });
    expect(devLink).toHaveAttribute(
      "href",
      "https://fernandotonacoder.github.io/",
    );
    expect(devLink).toHaveAttribute("target", "_blank");
    expect(devLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
