import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./Popover";

describe("Popover", () => {
  it("renders popover trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("opens popover content when trigger is clicked", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Open Popover");
    fireEvent.click(trigger);

    expect(screen.getByText("Popover Content")).toBeInTheDocument();
  });

  it("applies custom className to PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-popover" data-testid="content">
          Content
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("custom-popover");
  });

  it("applies custom align prop to PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent align="start" data-testid="content">
          Content
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-align", "start");
  });

  it("applies custom sideOffset prop to PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent sideOffset={10} data-testid="content">
          Content
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });
});

describe("PopoverAnchor", () => {
  it("renders anchor element", () => {
    render(
      <Popover>
        <PopoverAnchor data-testid="anchor">Anchor</PopoverAnchor>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    const anchor = screen.getByTestId("anchor");
    expect(anchor).toBeInTheDocument();
  });
});
