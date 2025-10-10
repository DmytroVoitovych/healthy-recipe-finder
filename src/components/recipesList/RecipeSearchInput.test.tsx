import { render, screen, fireEvent } from "@testing-library/react";
import { RecipesSearchInput } from "./RecipesSearchInput";

describe("RecipesSearchInput", () => {
  it("calls updateField when user types", () => {
    const mockUpdateField = jest.fn();
    render(<RecipesSearchInput updateField={mockUpdateField} value="" />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "chicken" } });

    expect(mockUpdateField).toHaveBeenCalledWith("q", "chicken");
  });
});
