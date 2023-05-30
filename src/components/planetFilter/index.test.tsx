import { render, fireEvent, screen } from "@testing-library/react";
import PlanetFilter from "./index";

describe("PlanetFilter", () => {
  it("should call the 'add' function when the add icon is clicked", () => {
    // Mock function
    const mockAdd = jest.fn();

    // Render the component
    render(<PlanetFilter add={mockAdd} setPlanetSearchFilter={() => ({})} />);

    // Find the add icon and click it
    const addIcon = screen.getByTitle("Add new planet") as HTMLElement;
    fireEvent.click(addIcon);

    // Check if the mock function was called
    expect(mockAdd).toHaveBeenCalledWith(true);
  });

  it("should call the 'setPlanetSearchFilter' function when the input value changes", () => {
    // Mock function
    const mockSetPlanetSearchFilter = jest.fn();

    // Render the component
    render(<PlanetFilter add={() => ({})} setPlanetSearchFilter={mockSetPlanetSearchFilter} />);

    // Find the input element
    const searchInput = screen.getByPlaceholderText("Search by planet name, climate, terrain") as HTMLInputElement;

    // Change the input value
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Check if the mock function was called with the correct value
    expect(mockSetPlanetSearchFilter).toHaveBeenCalledWith("test");
  });
});