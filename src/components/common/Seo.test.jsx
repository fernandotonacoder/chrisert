import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Seo } from "./Seo";

describe("Seo", () => {
  it("renders title with site name", () => {
    render(<Seo title="Contactos" />);
    expect(document.title).toBe("Contactos | Chrisert");
  });

  it("renders default title when no title prop provided", () => {
    render(<Seo />);
    expect(document.title).toBe(
      "Chrisert - Especialistas em ETICS e Isolamento Térmico"
    );
  });

  it("renders meta description", () => {
    render(<Seo description="Descrição personalizada" />);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute("content", "Descrição personalizada");
  });

  it("renders default description when not provided", () => {
    render(<Seo />);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toContain("ETICS");
  });

  it("renders meta keywords", () => {
    render(<Seo keywords="isolamento, capoto" />);
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords).toHaveAttribute("content", "isolamento, capoto");
  });

  it("renders canonical URL with base URL", () => {
    render(<Seo canonical="/contactos" />);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink).toHaveAttribute(
      "href",
      "https://chrisert.pt/contactos"
    );
  });

  it("renders default canonical URL when not provided", () => {
    render(<Seo />);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink).toHaveAttribute("href", "https://chrisert.pt");
  });

  it("renders Open Graph meta tags", () => {
    render(
      <Seo
        title="Portfolio"
        description="Os nossos trabalhos"
        canonical="/portfolio"
      />
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogType = document.querySelector('meta[property="og:type"]');
    const ogSiteName = document.querySelector('meta[property="og:site_name"]');

    expect(ogTitle).toHaveAttribute("content", "Portfolio | Chrisert");
    expect(ogDescription).toHaveAttribute("content", "Os nossos trabalhos");
    expect(ogUrl).toHaveAttribute("content", "https://chrisert.pt/portfolio");
    expect(ogType).toHaveAttribute("content", "website");
    expect(ogSiteName).toHaveAttribute("content", "Chrisert");
  });

  it("renders custom ogType", () => {
    render(<Seo ogType="article" />);
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType).toHaveAttribute("content", "article");
  });

  it("renders custom ogImage", () => {
    render(<Seo ogImage="https://example.com/image.jpg" />);
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toHaveAttribute("content", "https://example.com/image.jpg");
  });

  it("renders Twitter meta tags", () => {
    render(<Seo title="FAQ" description="Perguntas frequentes" />);

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );

    expect(twitterCard).toHaveAttribute("content", "summary_large_image");
    expect(twitterTitle).toHaveAttribute("content", "FAQ | Chrisert");
    expect(twitterDescription).toHaveAttribute(
      "content",
      "Perguntas frequentes"
    );
  });
});
