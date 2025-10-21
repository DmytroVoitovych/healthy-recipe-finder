import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BaseMenuOptionSelect } from "./BaseMenuOptionSelect";

jest.mock("@/utils/svgimports", () => ({
  ArrowDownIco: () => <svg data-testid="arrow-icon" />,
}));

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("BaseMenuOptionSelect", () => {
  const defaultProps = {
    placeholder: "Max Prep Time",
    optionList: ["0 minutes", "5 minutes", "10 minutes"],
    legend: "Select preparation time",
    popoverId: "prep-time-menu",
    radioName: "prepTime",
    containerClass: "menu",
    checkedValue: "",
    updateField: jest.fn(),
    clearField: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders button with placeholder text", () => {
    render(<BaseMenuOptionSelect {...defaultProps} />);
    const button = screen.getByRole("button", { name: /^Max Prep Time$/i });
    expect(button).toBeInTheDocument();
  });

  it("renders all option labels", () => {
    render(<BaseMenuOptionSelect {...defaultProps} />);
    expect(screen.getByLabelText("0 minutes")).toBeInTheDocument();
    expect(screen.getByLabelText("5 minutes")).toBeInTheDocument();
    expect(screen.getByLabelText("10 minutes")).toBeInTheDocument();
  });

  it("calls updateField when an option is selected", () => {
    render(<BaseMenuOptionSelect {...defaultProps} />);
    const option = screen.getByLabelText("5 minutes");
    fireEvent.click(option);
    expect(defaultProps.updateField).toHaveBeenCalledWith("prepTime", "5 minutes");
  });

  it("calls clearField when Clear button is clicked", () => {
    render(<BaseMenuOptionSelect {...defaultProps} checkedValue="5 minutes" />);
    const clearButton = screen.getByRole("button", {
      name: /clear max prep time selection/i,
    });
    fireEvent.click(clearButton);
    expect(defaultProps.clearField).toHaveBeenCalledWith("prepTime");
  });

  it("marks the correct radio as checked when checkedValue is set", () => {
    render(<BaseMenuOptionSelect {...defaultProps} checkedValue="10 minutes" />);
    const radio = screen.getByLabelText("10 minutes") as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });
});
