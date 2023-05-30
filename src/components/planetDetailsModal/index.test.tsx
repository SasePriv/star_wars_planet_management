import { render, screen, fireEvent } from '@testing-library/react';
import PlanetDetailsModal from './index';
import { Planet } from '../../types/planet';
import { People } from '../../types/people';

describe('PlanetDetailsModal', () => {
  const planet: Planet = {
    name: 'Earth',
    diameter: "12742",
    url: "",
    climate: 'Temperate',
    terrain: 'Grasslands, Forests',
    population: "7850000000",
    residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/']
  };

  const peoples: People[] = [
    { url: 'https://swapi.dev/api/people/1/', name: 'Luke Skywalker' },
    { url: 'https://swapi.dev/api/people/2/', name: 'Darth Vader' },
    { url: 'https://swapi.dev/api/people/3/', name: 'Han Solo' },
  ];

  test('renders PlanetDetailsModal with correct planet details', () => {
    render(<PlanetDetailsModal show onHide={() => ({})} planet={planet} peoples={peoples} />);

    expect(screen.getByText(`${planet.diameter} Km`)).toBeInTheDocument();
    expect(screen.getByText(`${planet.climate}`)).toBeInTheDocument();
    expect(screen.getByText(`${planet.terrain}`)).toBeInTheDocument();
    expect(screen.getByText(`${planet.population}`)).toBeInTheDocument();
    expect(screen.getByText(`${planet.residents.length}`)).toBeInTheDocument();

    planet.residents.forEach((resident) => {
      const residentName = peoples.find((people) => people.url === resident)?.name;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(screen.getByText(residentName!)).toBeInTheDocument();
    });
  });

  test('calls onHide when Close button is clicked', () => {
    const onHideMock = jest.fn();
    render(<PlanetDetailsModal show onHide={onHideMock} planet={planet} peoples={peoples} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(onHideMock).toHaveBeenCalledTimes(1);
  });
});