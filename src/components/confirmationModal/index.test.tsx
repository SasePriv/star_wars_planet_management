import { render, fireEvent, RenderResult } from "@testing-library/react";
import ConfirmationModal, { ConfirmationModalProps } from "./index";

describe("ConfirmationModal", () => {
  let component: RenderResult;
  let onHideMock: jest.Mock;
  let onConfirmMock: jest.Mock;

  beforeEach(() => {
    onHideMock = jest.fn();
    onConfirmMock = jest.fn();

    const props: ConfirmationModalProps = {
      show: true,
      onHide: onHideMock,
      onConfirm: onConfirmMock,
      title: "Confirmation Modal",
    };

    component = render(<ConfirmationModal {...props} />);
  });

  it("should render the modal with the correct title", () => {
    const { getByText } = component;

    const modalTitle = getByText("Confirmation Modal");

    expect(modalTitle).toBeInTheDocument();
  });

  it("should call onConfirm when the accept button is clicked", () => {
    const { getByText } = component;

    const acceptButton = getByText("Accept");
    fireEvent.click(acceptButton);

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it("should call onHide when the cancel button is clicked", () => {
    const { getByText } = component;

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onHideMock).toHaveBeenCalled();
  });
});