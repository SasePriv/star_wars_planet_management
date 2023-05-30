import { render, screen, fireEvent } from "@testing-library/react";
import PlanetList from "./index";
import { Planet } from "../../types/planet";


jest.mock("../../assets/images/tatooine.jpeg", () => {
  return {
    default: "tatooine.jpeg",
  };
});
describe("PlanetList", () => {
  const mockPlanetList: Planet[] = [
    {
        name: 'Earth',
        diameter: "12742",
        url: "",
        climate: 'Temperate',
        terrain: 'Grasslands, Forests',
        population: "7850000000",
        residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/']
    },
    {
        name: 'Earth2',
        diameter: "127423",
        url: "",
        climate: 'Temperate',
        terrain: 'Grasslands, Forests',
        population: "7850000000",
        residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/']
    },
    {
        name: 'Earth3',
        diameter: "127424",
        url: "",
        climate: 'Temperate',
        terrain: 'Grasslands, Forests',
        population: "7850000000",
        residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/']
    }
  ];

  it("should render the list of planets", () => {
    render(
      <PlanetList
        planetList={mockPlanetList}
        detailPlanet={() => ({})}
        editPlanet={() => ({})}
        deletePlanet={() => ({})}
      />
    );

    // Check if each planet name is rendered
    mockPlanetList.forEach((planet) => {
      const planetNameElement = screen.getByText(planet.name);
      expect(planetNameElement).toBeInTheDocument();
    });
  });

  it("should call the 'detailPlanet' function when a planet card is clicked", () => {
    // Mock function
    const mockDetailPlanet = jest.fn();

    render(
      <PlanetList
        planetList={mockPlanetList}
        detailPlanet={mockDetailPlanet}
        editPlanet={() => ({})}
        deletePlanet={() => ({})}
      />
    );

    // Find the first planet card and click it
    const firstPlanetCard = screen.getByText(mockPlanetList[0].name);
    fireEvent.click(firstPlanetCard);

    // Check if the mock function was called with the correct planet
    expect(mockDetailPlanet).toHaveBeenCalledWith(mockPlanetList[0]);
  });

  it("should call the 'editPlanet' function when the Edit button is clicked", () => {
    // Mock function
    const mockEditPlanet = jest.fn();

    render(
      <PlanetList
        planetList={mockPlanetList}
        detailPlanet={() => ({})}
        editPlanet={mockEditPlanet}
        deletePlanet={() => ({})}
      />
    );

    // Find the first Edit button and click it
    const editButtons = screen.getAllByTestId("card-edit");
    const firstEditButton = editButtons[0];
    fireEvent.click(firstEditButton);
    // Check if the mock function was called with the correct planet
    expect(mockEditPlanet).toHaveBeenCalledWith(mockPlanetList[0]);
  });

  it("should call the 'deletePlanet' function when the Delete button is clicked", () => {
    // Mock function
    const mockDeletePlanet = jest.fn();

    render(
      <PlanetList
        planetList={mockPlanetList}
        detailPlanet={() => ({})}
        editPlanet={() => ({})}
        deletePlanet={mockDeletePlanet}
      />
    );

    // Find all elements with the "card-delete" data-testid
    const deleteButtons = screen.getAllByTestId("card-delete");

    // Select the first Delete button and click it
    const firstDeleteButton = deleteButtons[0];
    fireEvent.click(firstDeleteButton);

    // Check if the mock function was called with the correct planet
    expect(mockDeletePlanet).toHaveBeenCalledWith(mockPlanetList[0]);
  });
});