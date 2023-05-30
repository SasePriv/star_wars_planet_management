import { render, fireEvent, RenderResult } from "@testing-library/react";
import CardPlanetInfo, { Props } from "./index";
import { Planet } from '../../types/planet';

const mockPlanet: Planet = {
  name: "Tatooine",
  diameter: "10465",
  residents: ['resident.com'],
  url: "example.com",
  climate: "Arid",
  terrain: "Desert",
  population: "200000"
};

jest.mock("../../assets/images/tatooine.jpeg", () => {
  return {
    default: "tatooine.jpeg",
  };
});
describe("CardPlanetInfo", () => {
  let component: RenderResult;
  let onDetailMock: jest.Mock;
  let onEditMock: jest.Mock;
  let onDeleteMock: jest.Mock;

  beforeEach(() => {
    onDetailMock = jest.fn();
    onEditMock = jest.fn();
    onDeleteMock = jest.fn();

    const props: Props = {
      planet: mockPlanet,
      onDetail: onDetailMock,
      onEdit: onEditMock,
      onDelete: onDeleteMock,
    };

    component = render(<CardPlanetInfo {...props} />);
  });

  it("should render planet information correctly", () => {
    const { getByText, getByTestId } = component;

    const planetName = getByText("Tatooine");
    const planetDiameter = getByText("Diameter: 10465");
    const planetClimate = getByText("Climate: Arid");
    const planetTerrain = getByText("Terrain: Desert");
    const planetPopulation = getByText("Population: 200000");
    const editButton = getByTestId("card-edit");
    const deleteButton = getByTestId("card-delete");

    expect(planetName).toBeInTheDocument();
    expect(planetDiameter).toBeInTheDocument();
    expect(planetClimate).toBeInTheDocument();
    expect(planetTerrain).toBeInTheDocument();
    expect(planetPopulation).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("should call onDetail when clicked", () => {
    const { getByTestId } = component;

    const card = getByTestId("card");
    fireEvent.click(card);
    const cardEdit = getByTestId("card-edit");
    fireEvent.click(cardEdit);
    const cardDelete = getByTestId("card-delete");
    fireEvent.click(cardDelete);

    expect(onDetailMock).toHaveBeenCalledWith(mockPlanet);
    expect(onEditMock).toHaveBeenCalledWith(mockPlanet);
    expect(onDeleteMock).toHaveBeenCalledWith(mockPlanet);
  });
});