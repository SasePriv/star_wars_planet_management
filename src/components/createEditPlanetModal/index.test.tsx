import { render, fireEvent, RenderResult } from "@testing-library/react";
import CreateEditPlanetModal, { ModalProps } from "./index";

describe("CreateEditPlanetModal", () => {
  let component: RenderResult;
  let onHideMock: jest.Mock;
  let onSaveMock: jest.Mock;

  beforeEach(() => {
    onHideMock = jest.fn();
    onSaveMock = jest.fn();

    const props: ModalProps = {
      show: true,
      onHide: onHideMock,
      type: "create",
      onSave: onSaveMock,
      peopleList: [],
      planet: null,
      planetsUrl: [],
    };

    component = render(<CreateEditPlanetModal {...props} />);
  });

  it("should render the modal with the correct title when in create mode", () => {
    const { getByText } = component;

    const modalTitle = getByText("Create new planet");

    expect(modalTitle).toBeInTheDocument();
  });

  it("should call onSave when the save button is clicked and inputs are not valid", () => {
    const { getByText } = component;
    // Simulate save button click
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    expect(onSaveMock).toHaveBeenCalledTimes(0);
  });

  it("should call onSave when the save button is clicked and inputs are valid", () => {
    const { getByText, getByLabelText } = component;

    // Mock input values
    const nameInput = getByLabelText("Planet name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Test Planet" } });
    const urlInput = getByLabelText("Planet url") as HTMLInputElement;
    fireEvent.change(urlInput, { target: { value: "url.com" } });
    const diameterInput = getByLabelText("Diameter") as HTMLInputElement;
    fireEvent.change(diameterInput, { target: { value: 1 } });
    const climateInput = getByLabelText("Climate") as HTMLInputElement;
    fireEvent.change(climateInput, { target: { value: "clear" } });
    const terrainInput = getByLabelText("Terrain") as HTMLInputElement;
    fireEvent.change(terrainInput, { target: { value: "ground" } });


    // Simulate save button click
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);

    expect(onSaveMock).toHaveBeenCalledWith({
      name: "Test Planet",
      diameter: "1",
      climate: "clear",
      terrain: "ground",
      population: 0,
      residents: [],
      url: "url.com",
    });
  });

  it("should call onHide when the close button is clicked", () => {
    const { getByText } = component;

    // Simulate close button click
    const closeButton = getByText("Close");
    fireEvent.click(closeButton);

    expect(onHideMock).toHaveBeenCalled();
  });
});