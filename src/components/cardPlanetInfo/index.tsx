import React from "react";
import { AiFillHeart, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Planet } from '../../types/planet';
import Taootine from '../../assets/images/tatooine.jpeg'
import './style.css'

interface Props {
    planet: Planet;
    onDetail: (planet: Planet) => void;
    onEdit: (planet: Planet) => void;
    onDelete: (planet: Planet) => void;
}

function CardPlanetInfo({ planet, onDetail, onEdit, onDelete }: Props) {
    const cardStyle: React.CSSProperties = {
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 10%, 
        rgba(0, 0, 0, 0.9) 100%), url(${Taootine})`,
      };

    const handleDetails = (e) => {
        e.stopPropagation();
        onDetail(planet)
    }

    const handleEdit= (e) => {
        e.stopPropagation();
        onEdit(planet)
    }

    const handleDelete= (e) => {
        e.stopPropagation();
        onDelete(planet)
    }

    return (
        <div onClick={handleDetails} className="card" style={cardStyle}>
          <div className="options">
              <div onClick={handleEdit} className="options-icons"><AiFillEdit/></div>
              <div onClick={handleDelete} className="options-icons"><AiFillDelete/></div>
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