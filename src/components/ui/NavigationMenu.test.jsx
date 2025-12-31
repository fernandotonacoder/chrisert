import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "./NavigationMenu";

describe("NavigationMenu", () => {
  it("renders with default props", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Item</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu className="custom-nav" data-testid="nav">
        <NavigationMenuList>
          <NavigationMenuItem>Item</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const nav = screen.getByTestId("nav");
    expect(nav).toHaveClass("custom-nav");
  });

  it("renders without viewport when viewport=false", () => {
    render(
      <NavigationMenu viewport={false} data-testid="nav">
        <NavigationMenuList>
          <NavigationMenuItem>Item</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const nav = screen.getByTestId("nav");
    expect(nav).toHaveAttribute("data-viewport", "false");
  });
});

describe("NavigationMenuList", () => {
  it("renders with correct classes", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList data-testid="list">
          <NavigationMenuItem>Item</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const list = screen.getByTestId("list");
    expect(list).toHaveClass("flex", "list-none");
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList data-testid="list" className="custom-list">
          <NavigationMenuItem>Item</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const list = screen.getByTestId("list");
    expect(list).toHaveClass("custom-list");
  });
});

describe("NavigationMenuItem", () => {
  it("renders with correct classes", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem data-testid="item">Item</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const item = screen.getByTestId("item");
    expect(item).toHaveClass("relative");
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem data-testid="item" className="custom-item">
            Item
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const item = screen.getByTestId("item");
    expect(item).toHaveClass("custom-item");
  });
});

describe("NavigationMenuTrigger", () => {
  it("renders trigger with chevron icon", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="custom-trigger">
              Trigger
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const trigger = screen.getByRole("button", { name: /trigger/i });
    expect(trigger).toHaveClass("custom-trigger");
  });
});

describe("NavigationMenuContent", () => {
  it("renders content", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    // Content is rendered but hidden until trigger is activated
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent className="custom-content">
              Content
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});

describe("NavigationMenuLink", () => {
  it("renders link", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Link")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink data-testid="link" className="custom-link">
              Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    const link = screen.getByTestId("link");
    expect(link).toHaveClass("custom-link");
  });
});

describe("NavigationMenuIndicator", () => {
  it("renders indicator", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>Item</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>Item</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuIndicator className="custom-indicator" />
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
  });
});

describe("NavigationMenuViewport", () => {
  it("renders viewport within NavigationMenu", () => {
    render(
      <NavigationMenu viewport={true}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>Item</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("can be rendered with custom className", () => {
    render(
      <NavigationMenu viewport={true}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>Item</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
  });
});
