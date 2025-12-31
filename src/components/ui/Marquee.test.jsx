import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "./Marquee";

describe("Marquee", () => {
  it("renders with default classes", () => {
    render(<Marquee data-testid="marquee" />);
    const marquee = screen.getByTestId("marquee");
    expect(marquee).toHaveClass("relative", "w-full", "overflow-hidden");
  });

  it("applies custom className", () => {
    render(<Marquee data-testid="marquee" className="custom-class" />);
    const marquee = screen.getByTestId("marquee");
    expect(marquee).toHaveClass("custom-class");
  });

  it("passes additional props", () => {
    render(<Marquee data-testid="marquee" id="my-marquee" />);
    const marquee = screen.getByTestId("marquee");
    expect(marquee).toHaveAttribute("id", "my-marquee");
  });
});

describe("MarqueeContent", () => {
  it("renders with default props", () => {
    render(<MarqueeContent>Content</MarqueeContent>);
    expect(screen.getAllByText("Content").length).toBeGreaterThan(0);
  });

  it("accepts loop prop", () => {
    render(<MarqueeContent loop={3}>Content</MarqueeContent>);
    expect(screen.getAllByText("Content").length).toBeGreaterThan(0);
  });

  it("accepts autoFill prop", () => {
    render(<MarqueeContent autoFill={false}>Content</MarqueeContent>);
    expect(screen.getAllByText("Content").length).toBeGreaterThan(0);
  });

  it("accepts pauseOnHover prop", () => {
    render(<MarqueeContent pauseOnHover={false}>Content</MarqueeContent>);
    expect(screen.getAllByText("Content").length).toBeGreaterThan(0);
  });
});

describe("MarqueeFade", () => {
  it("renders left fade with correct classes", () => {
    render(<MarqueeFade data-testid="fade" side="left" />);
    const fade = screen.getByTestId("fade");
    expect(fade).toHaveClass("left-0", "bg-linear-to-r");
  });

  it("renders right fade with correct classes", () => {
    render(<MarqueeFade data-testid="fade" side="right" />);
    const fade = screen.getByTestId("fade");
    expect(fade).toHaveClass("right-0", "bg-linear-to-l");
  });

  it("applies custom className", () => {
    render(<MarqueeFade data-testid="fade" side="left" className="custom" />);
    const fade = screen.getByTestId("fade");
    expect(fade).toHaveClass("custom");
  });
});

describe("MarqueeItem", () => {
  it("renders with default classes", () => {
    render(<MarqueeItem data-testid="item">Item</MarqueeItem>);
    const item = screen.getByTestId("item");
    expect(item).toHaveClass("mx-2", "shrink-0", "object-contain");
  });

  it("renders children", () => {
    render(<MarqueeItem>Test Content</MarqueeItem>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <MarqueeItem data-testid="item" className="custom-item">
        Item
      </MarqueeItem>
    );
    const item = screen.getByTestId("item");
    expect(item).toHaveClass("custom-item");
  });
});
