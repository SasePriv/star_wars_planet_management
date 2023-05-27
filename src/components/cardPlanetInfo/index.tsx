import React from "react";
import { AiFillHeart, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Planet } from '../../types/planet';
import Taootine from '../../assets/images/tatooine.jpeg'
import './style.css'

interface Props {
    planet: Planet
}

function CardPlanetInfo({ planet }: Props) {
    const cardStyle: React.CSSProperties = {
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.03) 10%, 
        rgba(0, 0, 0, 0.9) 100%), url(${Taootine})`,
      };
      return (
        <div className="card" style={cardStyle}>
          <div className="options">
              <div className="options-icons fav-icon"><AiFillHeart/></div>
              <div className="options-icons"><AiFillEdit/></div>
              <div className="options-icons"><AiFillDelete/></div>
          </div>
          <div className="card-description">
              <h2 className="planet-name">Taooine</h2>
              <p className="planet-items">Diameter: 10465</p>
              <p className="planet-items">Climate: arid</p>
              <p className="planet-items">Terrain: desert</p>
              <p className="planet-items">Population: 200000</p>
          </div>
        </div>
      );

}

export default CardPlanetInfo;