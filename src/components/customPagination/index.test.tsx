import { render, screen, fireEvent } from "@testing-library/react";
import CustomPagination from "./index";

describe("CustomPagination", () => {
  it("should call onChangePage with the previous page number when the Previous button is clicked", () => {
    const mockOnChangePage = jest.fn();
    render(
      <CustomPagination
        total={5}
        current={3}
        onChangePage={mockOnChangePage}
        pageSize={10}
        onChangePageSize={() => ({})}
      />
    );

    // Find the Previous button
    const previousButton = screen.getByRole("button", { name: "Previous" });

    // Click the Previous button
    fireEvent.click(previousButton);

    // Check if onChangePage was called with the correct page number
    expect(mockOnChangePage).toHaveBeenCalledWith(2);
  });

  it("should call onChangePage with the page number when a page item is clicked", () => {
    const mockOnChangePage = jest.fn();
    render(
      <CustomPagination
        total={5}
        current={3}
        onChangePage={mockOnChangePage}
        pageSize={10}
        onChangePageSize={() => ({})}
      />
    );

    // Find a page item
    const pageItem = screen.getByText("2");

    // Click the page item
    fireEvent.click(pageItem);

    // Check if onChangePage was called with the correct page number
    expect(mockOnChangePage).toHaveBeenCalledWith(2);
  });

  it("should call onChangePage with the next page number when the Next button is clicked", () => {
    const mockOnChangePage = jest.fn();
    render(
      <CustomPagination
        total={5}
        current={3}
        onChangePage={mockOnChangePage}
        pageSize={10}
        onChangePageSize={() => ({})}
      />
    );

    // Find the Next button
    const nextButton = screen.getByRole("button", { name: "Next" });

    // Click the Next button
    fireEvent.click(nextButton);

    // Check if onChangePage was called with the correct page number
    expect(mockOnChangePage).toHaveBeenCalledWith(4);
  });

  it("should call onChangePageSize with the selected page size when the page size is changed", () => {
    const mockOnChangePageSize = jest.fn();
    render(
      <CustomPagination
        total={5}
        current={3}
        onChangePage={() => ({})}
        pageSize={10}
        onChangePageSize={mockOnChangePageSize}
      />
    );

    // Find the page size select element
    const pageSizeSelect = screen.getByLabelText("Select page size");

    // Change the page size
    fireEvent.change(pageSizeSelect, { target: { value: "20" } });

    // Check if onChangePageSize was called with the correct page size
    expect(mockOnChangePageSize).toHaveBeenCalledWith(20);
  });

  // Add more test cases as needed
});