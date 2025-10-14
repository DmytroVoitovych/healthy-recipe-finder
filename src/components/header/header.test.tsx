Object.defineProperty(window, "matchMedia", {
  // only mobile view
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: query.includes("max-width: 1024px"),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 768,
});

jest.mock("@/utils/svgimports", () => ({
  HamburgerMenu: (props: React.HTMLProps<HTMLDivElement>) => (
    <div {...props} data-testid="hamburger-menu">
      ☰
    </div>
  ),
}));

jest.mock("../logo/Logo", () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

jest.mock("./navigation/HeaderNavigation", () => ({
  HeaderNavigation: ({ isVisible }: menuVisibility) => (
    <nav id="navigation" aria-hidden={!isVisible}>
      Navigation
    </nav>
  ),
}));

jest.mock("../shared/ButtonAsLink", () => ({
  ButtonAsLink: ({ content }: { content: string }) => <button>{content}</button>,
}));

import { Header } from "./Header";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { menuVisibility } from "./navigation/HeaderNavigation";

 beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Header", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("opens menu when menu button is clicked", async () => {
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: /menu/i });

    await user.click(menuButton);
    expect(screen.getByRole("navigation")).toBeVisible();
  });

  it("closes menu when clicked again", async () => {
    render(<Header />);
    const menuButton = screen.getByRole("button", { name: /menu/i });

    await user.click(menuButton); // open
    await user.click(menuButton); // close

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("navigation", { hidden: true })).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});
