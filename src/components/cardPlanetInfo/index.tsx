import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Planet } from '../../types/planet';
import Taootine from '../../assets/images/tatooine.jpeg'
import { CSSProperties } from "react";
import './style.css'

export interface Props {
    planet: Planet;
    onDetail: (planet: Planet) => void;
    onEdit: (planet: Planet) => void;
    onDelete: (planet: Planet) => void;
}

function CardPlanetInfo({ planet, onDetail, onEdit, onDelete }: Props) {
    const cardStyle: CSSProperties = {
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 10%, 
        rgba(0, 0, 0, 0.9) 100%), url(${Taootine})`,
      };

    const handleDetails = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onDetail(planet)
    }

    const handleEdit= (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onEdit(planet)
    }

    const handleDelete= (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onDelete(planet)
    }

    return (
        <div onClick={handleDetails} className="card" style={cardStyle} data-testid="card">
          <div className="options">
              <div onClick={handleEdit} data-testid="card-edit" className="options-icons"><AiFillEdit/></div>
              <div onClick={handleDelete} data-testid="card-delete" className="options-icons"><AiFillDelete/></div>
          </div>
          <div className="card-description">
              <h2 className="planet-name">{planet.name}</h2>
              <p className="planet-items">Diameter: {planet.diameter}</p>
              <p className="planet-items">Climate: {planet.climate}</p>
              <p className="planet-items">Terrain: {planet.terrain}</p>
              <p className="planet-items">Population: {planet.population}</p>
          </div>
        </div>
    );

}

export default CardPlanetInfo;